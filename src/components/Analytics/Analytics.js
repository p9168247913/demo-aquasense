import React, { useEffect, useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { Line, Bar } from 'react-chartjs-2'
import { useToast } from '@chakra-ui/react'
import baseUrl from '../../API/baseUrl'
import axios from 'axios'
import { format } from 'date-fns'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Chip from '@mui/material/Chip'

const Analytics = () => {
  const [apiData, setApiData] = useState([])
  const [chlorineData, setChlorineData] = useState({ labels: [], datasets: [] })
  const [tssData, setTssData] = useState({ labels: [], datasets: [] })
  const [phData, setphData] = useState({ labels: [], datasets: [] })
  const [ecData, setecData] = useState({ labels: [], datasets: [] })
  const [pressureData, setPressureData] = useState({ labels: [], datasets: [] })
  const [temperatureData, setTemperatureData] = useState({ labels: [], datasets: [] })
  const [flowRateData, setFlowRateData] = useState({ labels: [], datasets: [] })
  const [totalizerData, setTotalizerData] = useState({ labels: [], datasets: [] })
  const [selectedColumns, setSelectedColumns] = useState([])

  const getData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data`)
      if (response.data) {
        const limitedData = response.data.slice(0, 10)
        const sortedData = limitedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

        setApiData(response.data)
        console.log('response', response.data)
        processChlorineData(sortedData)
        processTssData(sortedData)
        processphData(sortedData)
        processECData(sortedData)
        processPresureData(sortedData)
        processTemperatureData(sortedData)
        processFlowRateData(sortedData)
        processTotalizerData(sortedData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownload = () => {
    const filteredData = apiData.map(({ _id, createdAt, updatedAt, __v, ...rest }) => rest)
    const dataWithHeadings = [
      {
        deviceId: 'Device ID',
        dateTime: 'Date Time',
        phoneNo: 'Phone Number',
        batteryPercentage: 'Battery Percentage',
        conductivity: 'Conductivity',
        tds: 'TDS',
        ph: 'pH',
        residualChlorine: 'Residual Chlorine',
        temperature: 'Temperature',
        tss: 'TSS',
        pressure: 'Pressure',
        flowRate: 'Flow Rate',
        totalizer: 'Totalizer',
      },
      ...filteredData,
    ]

    const filteredColumns = selectedColumns.length
      ? ['deviceId', 'dateTime', 'phoneNo', 'batteryPercentage', ...selectedColumns]
      : [
          'deviceId',
          'dateTime',
          'phoneNo',
          'batteryPercentage',
          'conductivity',
          'tds',
          'ph',
          'residualChlorine',
          'temperature',
          'tss',
          'pressure',
          'flowRate',
          'totalizer',
        ]

    const worksheetData = dataWithHeadings.map((row) =>
      filteredColumns.reduce((acc, column) => {
        acc[column] = row[column]
        return acc
      }, {}),
    )

    const worksheet = XLSX.utils.json_to_sheet(worksheetData, { skipHeader: true })
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'IoT Data')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'iot_data.xlsx')
  }

  const processChlorineData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const residualChlorine = data.map((item) =>
      item.residualChlorine === '' ? null : item.residualChlorine,
    )

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Residual Chlorine (mg/l)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: residualChlorine,
        },
      ],
    }
    setChlorineData(chartData)
  }
  const processTssData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const tss = data.map((item) => (item.tss === '' ? null : item.tss))

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'TSS Levels (mg/l)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: tss,
        },
      ],
    }
    setTssData(chartData)
  }
  const processphData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const ph = data.map((item) => (item.ph === '' ? null : item.ph))

    const backgroundColors = ph.map((value) => {
      if (value < 7) {
        return 'rgba(255, 99, 132, 0.5)' // Red for acidic
      } else if (value == 7) {
        return 'rgba(255, 206, 86, 0.5)' // Yellow for neutral
      } else {
        return 'rgba(75, 192, 192, 0.5)' // Blue for basic
      }
    })

    const borderColors = ph.map((value) => {
      if (value < 7) {
        return 'rgba(255, 99, 132, 1)' // Red for acidic
      } else if (value == 7) {
        return 'rgba(255, 206, 86, 1)' // Yellow for neutral
      } else {
        return 'rgba(75, 192, 192, 1)' // Blue for basic
      }
    })

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'pH',
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
          data: ph,
        },
      ],
    }
    setphData(chartData)
  }
  const processECData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const conductivity = data.map((item) => (item.conductivity === '' ? null : item.conductivity))

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Electrical Conductivity (mS/cm)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: conductivity,
        },
      ],
    }
    setecData(chartData)
  }
  const processPresureData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const pressure = data.map((item) => (item.pressure === '' ? null : item.pressure))

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Pressure (Bar)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: pressure,
        },
      ],
    }
    setPressureData(chartData)
  }
  const processTemperatureData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const temperature = data.map((item) => (item.temperature === '' ? null : item.temperature))

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: temperature,
        },
      ],
    }
    setTemperatureData(chartData)
  }
  const processFlowRateData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const flowRate = data.map((item) => (item.flowRate === '' ? null : item.flowRate))

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Flow Rate (L/min)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: flowRate,
        },
      ],
    }
    setFlowRateData(chartData)
  }
  const processTotalizerData = (data) => {
    const labels = data.map((item) => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const totalizer = data.map((item) => (item.totalizer === '' ? null : item.totalizer))

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Totalizer (L)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          data: totalizer,
        },
      ],
    }
    setTotalizerData(chartData)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSelectChange = (event) => {
    setSelectedColumns(event.target.value)
  }

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Analytics</h4>
      </div>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                  <InputLabel>Columns</InputLabel>
                  <Select
                    multiple
                    value={selectedColumns}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label="Columns" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="conductivity">
                      <Checkbox checked={selectedColumns.indexOf('conductivity') > -1} />
                      <ListItemText primary="Conductivity" />
                    </MenuItem>
                    <MenuItem value="tds">
                      <Checkbox checked={selectedColumns.indexOf('tds') > -1} />
                      <ListItemText primary="TDS" />
                    </MenuItem>
                    <MenuItem value="ph">
                      <Checkbox checked={selectedColumns.indexOf('ph') > -1} />
                      <ListItemText primary="pH" />
                    </MenuItem>
                    <MenuItem value="residualChlorine">
                      <Checkbox checked={selectedColumns.indexOf('residualChlorine') > -1} />
                      <ListItemText primary="Residual Chlorine" />
                    </MenuItem>
                    <MenuItem value="temperature">
                      <Checkbox checked={selectedColumns.indexOf('temperature') > -1} />
                      <ListItemText primary="Temperature" />
                    </MenuItem>
                    <MenuItem value="tss">
                      <Checkbox checked={selectedColumns.indexOf('tss') > -1} />
                      <ListItemText primary="TSS" />
                    </MenuItem>
                    <MenuItem value="pressure">
                      <Checkbox checked={selectedColumns.indexOf('pressure') > -1} />
                      <ListItemText primary="Pressure" />
                    </MenuItem>
                    <MenuItem value="flowRate">
                      <Checkbox checked={selectedColumns.indexOf('flowRate') > -1} />
                      <ListItemText primary="Flow Rate" />
                    </MenuItem>
                    <MenuItem value="totalizer">
                      <Checkbox checked={selectedColumns.indexOf('totalizer') > -1} />
                      <ListItemText primary="Totalizer" />
                    </MenuItem>
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
              </Box>
              <Box>
                <CRow>
                  <CCol xs={12} md={6} mb={4}>
                    <h4>Chlorine Levels</h4>
                    <Box mb={4}>
                      <Line data={chlorineData} />
                    </Box>
                  </CCol>
                  <CCol xs={12} md={6} mb={4}>
                    <h4>TSS Levels</h4>
                    <Box mb={4}>
                      <Line data={tssData} />
                    </Box>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} md={6} mb={4}>
                    <h4>pH Levels</h4>
                    <Box mb={4}>
                      <Line data={phData} />
                    </Box>
                  </CCol>
                  <CCol xs={12} md={6} mb={4}>
                    <h4>Electrical Conductivity / TDS</h4>
                    <Box mb={4}>
                      <Line data={ecData} />
                    </Box>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} md={6} mb={4}>
                  <h4>Pressure Bar</h4>
                    <Box mb={4}>
                      <Line data={pressureData} />
                    </Box>
                  </CCol>
                  <CCol xs={12} md={6} mb={4}>
                  <h4>Temperature</h4>
                    <Box mb={4}>
                      <Line data={temperatureData} />
                    </Box>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={12} md={6} mb={4}>
                  <h4>Flow Rate</h4>
                    <Box mb={4}>
                      <Line data={flowRateData} />
                    </Box>
                  </CCol>
                  <CCol xs={12} md={6} mb={4}>
                  <h4>Totalizer</h4>
                    <Box mb={4}>
                      <Line data={totalizerData} />
                    </Box>
                  </CCol>
                </CRow>
              </Box>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Analytics
