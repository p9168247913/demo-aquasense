import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import Swal from 'sweetalert2'
import { DataGrid } from '@mui/x-data-grid'
import GetAppIcon from '@mui/icons-material/GetApp'
import axios from 'axios'
import baseUrl from '../../API/baseUrl'

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
}))

const RemoteOperation = () => {
  const [pumpOn, setPumpOn] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState('')
  const [devices, setDevices] = useState(['IOT001', 'IOT002'])
  const [rows, setRows] = useState([])

  const handlePumpSwitchChange = () => {
    if (!selectedDevice) {
      Swal.fire('Please select a device first')
      return
    }

    const command = !pumpOn ? 'PUMP_ON' : 'PUMP_OFF'
    const uniqueId = `${selectedDevice}_${new Date().toISOString()}`

    Swal.fire({
      title: 'Are you sure?',
      text: `The pump will be turneds ${command === 'PUMP_ON' ? 'ON' : 'OFF'}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${baseUrl}/control/pump`, { deviceId: selectedDevice, command, uniqueId })
          .then((response) => {
            if (response.data.success) {
              Swal.fire(
                'Request sent',
                `The pump will be turneds ${command === 'PUMP_ON' ? 'ON' : 'OFF'}.`,
                'success',
              )
              const newRow = {
                id: rows.length + 1,
                timestamps: new Date().toLocaleString(),
                deviceId: selectedDevice,
                action: command,
                result: 'pending',
              }
              setRows([...rows, newRow])
            } else {
              Swal.fire('Error', response.data.message, 'error')
            }
          })
          .catch((error) => {
            console.error('Error sending command:', error)
            Swal.fire('Error', 'Failed to send command', 'error')
          })
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'PID', width: 80 },
    { field: 'timestamps', headerName: 'TimeStamp', width: 270 },
    { field: 'username', headerName: 'User name', width: 190 },
    { field: 'action', headerName: 'Action', width: 190 },
    { field: 'result', headerName: 'Results', width: 190 },
  ]

  const handleDownload = () => {
    const csvContent = [
      columns.map((column) => column.headerName).join(','),
      ...rows.map((row) => columns.map((column) => row[column.field]).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'data.csv'
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const getStatusByDeviceId = () => {
    if (selectedDevice) {
      axios
        .get(`${baseUrl}/control/pump/status/${selectedDevice}`)
        .then((response) => {
          console.log('resp', response.data)
          if (response.data.success) {
            setPumpOn(response.data.status === 'ACK')
          }
        })
        .catch((error) => {
          console.error('Error fetching device status:', error)
        })
    }
  }
  const changeValue = (val) => {
    setSelectedDevice(val)
    getStatusByDeviceId()
  }
  useEffect(() => {
    getStatusByDeviceId()
  }, [selectedDevice])

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pump Control
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="device-select-label">Select Device</InputLabel>
          <Select
            labelId="device-select-label"
            value={selectedDevice}
            onChange={(e) => changeValue(e.target.value)}
          >
            {devices.map((device) => (
              <MenuItem key={device} value={device}>
                {device}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </Box>
  )
}

export default RemoteOperation
