import React, { useState } from 'react'
import { Box, Typography, Paper, Grid, Container, Card, CardContent } from '@mui/material'

const Dashboard = () => {
  const [sppStatus, setSppStatus] = useState('Ok')

  const handleSppStatusChange = (event) => {
    setSppStatus(event.target.value)
  }

  const sensorData = {
    tankLow: false,
    tankHigh: '',
    dolTrip: false,
    pumpStatus: '',
    sppStatus: 'ok',
    voltage: '212V',
    current: '0A',
    watts: '0W',
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

  const additionalSensorData = [
    { title: 'Conductivity', value: '15', unit: 'µS/cm', range: '0 - 5000 µS/cm' },
    { title: 'TDS', value: '300', unit: 'mg/l', range: '0 - 2000 mg/L' },
    { title: 'pH', value: '7', unit: '', range: '0 - 14' },
    { title: 'Residual Chlorine', value: '0.2', unit: 'mg/L', range: '0 - 2.00 mg/L' },
    { title: 'Temperature', value: '31', unit: '°C', range: '0 - 100 °C' },
    { title: 'TSS', value: '0.8', unit: 'mg/L', range: '0 - 2000 mg/L' },
    { title: 'Pressure', value: '7', unit: 'bar', range: '0 - 10 bar' },
    { title: 'Flow Rate', value: '530', unit: 'L/hr', range: '0 - 100 m³/hr' },
    { title: 'Totalizer', value: '5000', unit: 'm³', range: '0 - 10000 m³' },
  ]

  const SensorCard = ({ title, value, unit, range }) => {
    const cardColors = {
      Conductivity: '#FFCCCB',
      TDS: '#D3D3D3',
      pH: '#FFD700',
      'Residual Chlorine': '#ADD8E6',
      Temperature: '#90EE90',
      TSS: '#FFB6C1',
      Pressure: '#F08080',
      'Flow Rate': '#E0FFFF',
      Totalizer: '#E6E6FA',
    }

    const currentDate = new Date()
    const dateString = currentDate.toLocaleString()

    return (
      <Card sx={{ minWidth: 275, margin: 2, backgroundColor: cardColors[title] }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {value} {unit}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Range: {range}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last Updated: {dateString}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ mt: 4, mb: 4, color: '#1976d2', fontWeight: 'bold', textAlign: 'center' }}
      >
        Recent Measurement
      </Typography>
      <Grid container spacing={2}>
        {additionalSensorData.map((sensor, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SensorCard
              title={sensor.title}
              value={sensor.value}
              unit={sensor.unit}
              range={sensor.range}
            />
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="h3"
        sx={{ mt: 4, mb: 4, color: '#1976d2', fontWeight: 'bold', textAlign: 'center' }}
      >
        Recent Status Indicator
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Grid container spacing={2}>
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
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">SPP Status</Typography>
              <Typography variant="body1" sx={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">SPP Status (Reverse)</Typography>
              <Typography variant="body1" sx={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">SPP Status (Missing)</Typography>
              <Typography variant="body1" sx={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6">SPP Status (Asymmetry)</Typography>
              <Typography variant="body1" sx={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
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
    </Container>
  )
}

const App = () => {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App
