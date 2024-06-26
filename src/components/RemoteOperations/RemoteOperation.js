import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Button } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import GetAppIcon from '@mui/icons-material/GetApp';
import axios from 'axios'; // Import axios for making API requests
import baseUrl from '../../API/baseUrl';

const PumpButton = styled(Button)(({ theme }) => ({
  width: '150px',
  height: '50px',
  backgroundColor: 'red',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'orange',
  },
  '&.on': {
    backgroundColor: '#28a745',
    '&:hover': {
      backgroundColor: '#218838',
    },
  },
}));

const RemoteOperation = () => {
  const [pumpOn, setPumpOn] = useState(false);

  const handlePumpSwitchChange = () => {
    const isChecked = !pumpOn;
    const previousState = pumpOn;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: isChecked ? 'The pump will be turned ON.' : 'The pump will be turned OFF',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          setPumpOn(isChecked);

          axios.post(`${baseUrl}/control/pump`, {
            deviceId: 'IOT001', 
            command: isChecked ? 'PUMP_ON' : 'PUMP_OFF',
            uniqueId: `#${Date.now()}`, 
          })
            .then(response => {
              console.log('Command sent successfully:', response.data);
              swalWithBootstrapButtons.fire({
                title: isChecked ? 'Pump is ON' : 'Pump is OFF',
                text: 'The pump has been turned.',
                icon: 'success',
              });
            })
            .catch(error => {
              console.error('Error sending command:', error);
              setPumpOn(previousState);
              swalWithBootstrapButtons.fire({
                title: 'Error',
                text: 'Failed to send command.',
                icon: 'error',
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'The pump state remains unchanged.',
            icon: 'error',
          });
          setPumpOn(previousState);
        }
      });
  };

  const columns = [
    { field: 'id', headerName: 'PID', width: 80 },
    { field: 'timestamps', headerName: 'TimeStamp', width: 270 },
    { field: 'username', headerName: 'User name', width: 190 },
    { field: 'action', headerName: 'Action', width: 190 },
    { field: 'result', headerName: 'Results', width: 190 },
  ];

  const rows = [
    {
      id: 1,
      timestamps: new Date().toLocaleString(),
      username: 'Amit',
      action: 'done',
      result: 'success',
    },
    {
      id: 2,
      timestamps: new Date().toLocaleString(),
      username: 'Aqua',
      action: 'pending',
      result: '-',
    },
  ];

  const handleDownload = () => {
    const csvContent = [
      columns.map((column) => column.headerName).join(','),
      ...rows.map((row) => columns.map((column) => row[column.field]).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pump Control
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PumpButton className={pumpOn ? 'on' : ''} onClick={handlePumpSwitchChange}>
          {pumpOn ? 'Pump is ON' : 'Pump is OFF'}
          <LightbulbIcon sx={{ fontSize: 40, color: pumpOn ? 'red' : 'grey' }} />
        </PumpButton>
      </Paper>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <h3>Logs</h3>
        <GetAppIcon onClick={handleDownload} style={{ cursor: 'pointer' }} />
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Box>
  );
};

export default RemoteOperation;
