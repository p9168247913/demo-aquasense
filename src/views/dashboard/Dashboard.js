import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
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
    operationMode:'automatically',
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
      <Card style={{ minWidth: '275px', margin: '10px',border:"2px" ,background: cardGradients[title] }}>
        <Card.Body>
          <Card.Title style={{ color: 'white' }}>{title}</Card.Title>
          <Card.Text style={{ color: 'white', fontSize: '1.5rem' }}>
            {value} {unit}
          </Card.Text>
          <Card.Text style={{ color: 'white' }}>Range: {range}</Card.Text>
          <Card.Text style={{ color: 'white' }}>Last Updated: {dateString}</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Container>
      <h3 className="text-primary fw-bold text-center mt-4 mb-4">Recent Measurement</h3>
      <Row>
        {additionalSensorData.map((sensor, index) => (
          <Col xs={12} sm={6} md={4} key={index}>
            <SensorCard
              title={sensor.title}
              value={sensor.value}
              unit={sensor.unit}
              range={sensor.range}
            />
          </Col>
        ))}
      </Row>
      <h3 className="text-primary fw-bold text-center mt-4 mb-4">Recent Status Indicator</h3>
      <Card className="p-3 mt-4">
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>Tank Low</Card.Title>
              <Card.Text className={sensorData.tankLow ? 'text-danger' : 'text-secondary'}>
                {sensorData.tankLow ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>Tank Overflow</Card.Title>
              <Card.Text className={sensorData.tankHigh ? 'text-danger' : 'text-secondary'}>
                {sensorData.tankHigh ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>DOL Trip</Card.Title>
              <Card.Text className={sensorData.dolTrip ? 'text-danger' : 'text-secondary'}>
                {sensorData.dolTrip ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>Pump Status</Card.Title>
              <Card.Text style={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>SPP Status</Card.Title>
              <Card.Text style={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>SPP Status (Reverse)</Card.Title>
              <Card.Text style={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>SPP Status (Missing)</Card.Title>
              <Card.Text style={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>SPP Status (Asymmetry)</Card.Title>
              <Card.Text style={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'OK'}
              </Card.Text>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Card className="p-2 mb-2">
              <Card.Title>Operation Mode</Card.Title>
              <Card.Text style={{ color: getStatusColor(sensorData.pumpStatus) }}>
                {sensorData.pumpStatus ? 'Alert' : 'Automatically'}
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <div className="mt-4">
          <h5>Electrical Parameters</h5>
          <Row>
            <Col xs={12} sm={4}>
              <Card className="p-2 mb-2">
                <Card.Title>Voltage</Card.Title>
                <Card.Text>{sensorData.voltage}</Card.Text>
              </Card>
            </Col>
            <Col xs={12} sm={4}>
              <Card className="p-2 mb-2">
                <Card.Title>Current</Card.Title>
                <Card.Text>{sensorData.current}</Card.Text>
              </Card>
            </Col>
            <Col xs={12} sm={4}>
              <Card className="p-2 mb-2">
                <Card.Title>Watts</Card.Title>
                <Card.Text>{sensorData.watts}</Card.Text>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
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
