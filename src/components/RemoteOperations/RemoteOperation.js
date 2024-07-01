import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import baseUrl from '../../API/baseUrl'

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
      text: `The pump will be turned ${command === 'PUMP_ON' ? 'ON' : 'OFF'}.`,
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
                `The pump will be turned ${command === 'PUMP_ON' ? 'ON' : 'OFF'}.`,
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

  const handleDownload = () => {
    const csvContent = [
      ['PID', 'TimeStamp', 'User name', 'Action', 'Results'].join(','),
      ...rows.map((row) =>
        [row.id, row.timestamps, row.username, row.action, row.result].join(','),
      ),
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
    <Container>
      <Row className="mb-4">
        <Col>
          <h4>Pump Control</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Select Device</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDevice}
                  onChange={(e) => changeValue(e.target.value)}
                >
                  <option value="">Select a device</option>
                  {devices.map((device) => (
                    <option key={device} value={device}>
                      {device}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                variant={pumpOn ? 'success' : 'danger'}
                onClick={handlePumpSwitchChange}
                className="d-flex align-items-center"
              >
                {pumpOn ? 'Pump is ON' : 'Pump is OFF'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h5>Logs</h5>
          <Button variant="info" className="mb-3" onClick={handleDownload}>
            Download Logs
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>PID</th>
                <th>TimeStamp</th>
                <th>User name</th>
                <th>Action</th>
                <th>Results</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.timestamps}</td>
                  <td>{row.username}</td>
                  <td>{row.action}</td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default RemoteOperation
