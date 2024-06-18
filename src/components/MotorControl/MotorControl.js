import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Paper, FormControlLabel, Switch, Grid } from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

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

const MotorControl = () => {
  const [pumpOn, setPumpOn] = useState(true)

  const handlePumpSwitchChange = (event) => {
    setPumpOn(event.target.checked)
  }

  const sensorData = {
    tankLow: false,
    tankHigh: true,
    dolTrip: false,
    pumpStatus: pumpOn ? 'Running' : 'Stopped',
    sppStatus: 'Ok',
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
              <Typography variant="h6">Tank High</Typography>
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
              <Typography variant="body1" sx={{ color: getStatusColor(sensorData.sppStatus) }}>
                {sensorData.sppStatus}
              </Typography>
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

export default MotorControl
