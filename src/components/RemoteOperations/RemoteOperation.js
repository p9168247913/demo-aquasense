import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import Swal from 'sweetalert2'
import { DataGrid } from '@mui/x-data-grid'
import GetAppIcon from '@mui/icons-material/GetApp' // Import the download icon

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

const RemoteOperation = () => {
  const [pumpOn, setPumpOn] = useState(true)
  const [sppStatus, setSppStatus] = useState('Ok')

  const handlePumpSwitchChange = (event) => {
    const isChecked = event.target.checked
    const previousState = pumpOn

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })

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
          setPumpOn(isChecked)
          swalWithBootstrapButtons.fire({
            title: isChecked ? 'Pump is ON' : 'Pump is OFF',
            text: 'The pump has been turned.',
            icon: 'success',
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'The pump state remains unchanged.',
            icon: 'error',
          })
          setPumpOn(previousState)
        }
      })
  }

  const handleSppStatusChange = (event) => {
    setSppStatus(event.target.value)
  }

  const sensorData = {
    tankLow: false,
    tankHigh: true,
    dolTrip: false,
    pumpStatus: pumpOn ? 'Running' : 'Stopped',
    sppStatus: sppStatus,
    voltage: '220V',
    current: '10A',
    watts: '2200W',
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running':
        return '#2ECA45'
      case 'Standby':
        return '#FFD700'
      case 'Stopped':
        return '#FF0000'
      default:
        return '#B0B0B0'
    }
  }

  const columns = [
    { field: 'id', headerName: 'PID', width: 80 },
    { field: 'timestamps', headerName: 'TimeStamp', width: 270 },
    { field: 'username', headerName: 'User name', width: 190 },
    { field: 'action', headerName: 'Action', width: 190 },
    { field: 'result', headerName: 'Results', width: 190 },
  ]

  const rows = [
    { id: 1, timestamps: new Date().toLocaleString(), username: 'Amit', action: 'done', result: 'success' },
    { id: 2, timestamps: new Date().toLocaleString(), username: 'Aqua', action:'pending',result:'-'}

  ]

  const handleDownload = () => {
    // Prepare data for download (e.g., convert to CSV format)
    const csvContent = [
      columns.map((column) => column.headerName).join(','),
      ...rows.map((row) => columns.map((column) => row[column.field]).join(',')),
    ].join('\n')

    // Create a blob object with CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element for downloading
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'data.csv'
    document.body.appendChild(a)
    a.click()
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pump Energy Monitoring
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} checked={pumpOn} onChange={handlePumpSwitchChange} />}
          label="Pump Switch"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <LightbulbIcon sx={{ fontSize: 40, color: pumpOn ? 'yellow' : 'grey' }} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            {pumpOn ? 'Pump is ON' : 'Pump is OFF'}
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">Tank Low</Typography>
              <Typography variant="body1" color={sensorData.tankLow ? 'error' : 'textSecondary'}>
                {sensorData.tankLow ? 'Alert' : 'OK'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">Tank Overflow</Typography>
              <Typography variant="body1" color={sensorData.tankHigh ? 'error' : 'textSecondary'}>
                {sensorData.tankHigh ? 'Alert' : 'OK'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">DOL Trip</Typography>
              <Typography variant="body1" color={sensorData.dolTrip ? 'error' : 'textSecondary'}>
                {sensorData.dolTrip ? 'Alert' : 'OK'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">Pump Status</Typography>
              <Typography variant="body1" sx={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">SPP Status</Typography>
              <FormControl fullWidth>
                <Select
                  labelId="spp-status-label"
                  value={sppStatus}
                  label=""
                  onChange={handleSppStatusChange}
                  style={{ height: '40px' }} // adjusted height
                >
                  <MenuItem value="Reverse">Reverse</MenuItem>
                  <MenuItem value="Missing">Missing</MenuItem>
                  <MenuItem value="Asymmetry">Asymmetry</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Electrical Parameters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6">Voltage</Typography>
                <Typography variant="body1">{sensorData.voltage}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6">Current</Typography>
                <Typography variant="body1">{sensorData.current}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="h6">Watts</Typography>
                <Typography variant="body1">{sensorData.watts}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
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
