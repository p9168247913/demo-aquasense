import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, Grid, Container, Card, CardContent } from '@mui/material'
import baseUrl from '../../API/baseUrl'
import axios from 'axios'

const Dashboard = () => {
  const [sppStatus, setSppStatus] = useState('Ok')
  const [apidata, setAPIData] = useState([])
  const [displaydata, setdisplayData] = useState([])

  const getAPIData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data`)

      setAPIData(response.data)
      setdisplayData(response.data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAPIData()
    console.log(displaydata, '=====')
  }, [])

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
    watts: '227W',
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
    {
      title: 'Conductivity',
      value: displaydata.conductivity !== '' ? displaydata.conductivity : '--',
      unit: 'µS/cm',
      range: '0 - 5000 µS/cm',
    },
    {
      title: 'TDS',
      value: displaydata.tds !== '' ? displaydata.tds : '--',
      unit: 'mg/l',
      range: '0 - 2000 mg/L',
    },
    {
      title: 'pH',
      value: displaydata.ph !== '' ? displaydata.ph : '--',
      unit: '',
      range: '0 - 14',
    },
    {
      title: 'Residual Chlorine',
      value: displaydata.residualChlorine !== '' ? displaydata.residualChlorine : '--',
      unit: 'mg/L',
      range: '0 - 2.00 mg/L',
    },
    {
      title: 'Temperature',
      value: displaydata.temperature !== '' ? displaydata.temperature : '--',
      unit: '°C',
      range: '0 - 100 °C',
    },
    {
      title: 'TSS',
      value: displaydata.tss !== '' ? displaydata.tss : '--',
      unit: 'mg/L',
      range: '0 - 2000 mg/L',
    },
    {
      title: 'Pressure',
      value: displaydata.pressure !== '' ? displaydata.pressure : '--',
      unit: 'bar',
      range: '0 - 10 bar',
    },
    {
      title: 'Flow Rate',
      value: displaydata.flowRate !== '' ? displaydata.flowRate : '--',
      unit: 'm3/hr',
      range: '0 - 100 m³/hr',
    },
    {
      title: 'Totalizer',
      value: displaydata.totalizer !== '' ? displaydata.totalizer : '--',
      unit: 'm³',
      range: '0 - 10000 m³',
    },
  ]

  const SensorCard = ({ title, value, unit, range }) => {
    const cardGradients = {
      Conductivity: 'linear-gradient(to left, #24c6dc, #514a9d)',
      TDS: 'linear-gradient(to left, #373b44, #4286f4)',
      pH: 'linear-gradient(to left, #fe8c00, #f83600)', // Updated gradient for pH
      'Residual Chlorine': 'linear-gradient(to left, #52c234, #061700)',
      Temperature: 'linear-gradient(to left, #f12711, #f5af19)',
      TSS: 'linear-gradient(to left, #667db6, #0082c8, #0082c8, #667db6)',
      Pressure: 'linear-gradient(to left, #000428, #004e92)',
      'Flow Rate': 'linear-gradient(to left, #5c258d, #4389a2)',
      Totalizer: 'linear-gradient(to left, #360033, #0b8793)',
    }

    const currentDate = new Date()
    const dateString = currentDate.toLocaleString()

    return (
      <Card sx={{ minWidth: 275, margin: 2, background: cardGradients[title] }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: 'white' }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ color: 'white' }}>
            {value} {unit}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Range: {range}
          </Typography>
          <Typography variant="body2" sx={{ color: 'white' }}>
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
