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
  InputLabel,
} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import Swal from 'sweetalert2'

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
    setPumpOn(isChecked)

    // Swal.fire({
    //   title: 'Pump Switch',
    //   text: isChecked ? 'The pump has been turned ON.' : 'The pump has been turned OFF.',
    //   icon: 'info',
    //   confirmButtonText: 'Do you really want to switch off the pump?',
    // })
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
        text: isChecked ? 'The pump has been turned ON.' : 'The pump has been turned OFF',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: isChecked ? 'Pump on' : 'Pump Off',
            text: 'Your file has been deleted.',
            icon: 'success',
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          })
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

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Motor Control and Monitoring Panel
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} checked={pumpOn} onChange={handlePumpSwitchChange} />}
          label="Pump Switch"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <LightbulbIcon sx={{ fontSize: 40, color: pumpOn ? 'yellow' : 'grey' }} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            {pumpOn ? '' : ''}
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
                {/* <InputLabel id="spp-status-label">SPP Status</InputLabel> */}
                <Select
                  labelId="spp-status-label"
                  value={sppStatus}
                  label=""
                  onChange={handleSppStatusChange}
                  style={{height: '15px'}}
                >
                  <MenuItem value="Ok">Reverse</MenuItem>
                  <MenuItem value="Warning">Missing</MenuItem>
                  <MenuItem value="Error">Asymmetry</MenuItem>
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
    </Box>
  )
}

export default RemoteOperation
