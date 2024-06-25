import React, { useState } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'

import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'

import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { Line, Bar, PolarArea } from 'react-chartjs-2'
import { useToast } from '@chakra-ui/react'

const Analytics = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [showTDS, setShowTDS] = useState(false)

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleDownload = () => {
    const csvContent = [
      ['Chart Type', 'Labels', 'Data'],
      ['Chlorine Levels', chlorineData.labels.join(','), chlorineData.datasets[0].data.join(',')],
      ['TSS Levels', data.labels.join(','), data.datasets[0].data.join(',')],
      ['pH Levels', phData.labels.join(','), phData.datasets[0].data.join(',')],
      [
        showTDS ? 'TDS' : 'Electrical Conductivity',
        electricalConductivityData.labels.join(','),
        electricalConductivityData.datasets[0].data.join(','),
      ],
      ['Pressure Levels', data4.labels.join(','), data4.datasets[0].data.join(',')],
      [
        'Water Temperature',
        temperatureData.labels.join(','),
        temperatureData.datasets[0].data.join(','),
      ],
      ['Flow Rate', flowRateData.labels.join(','), flowRateData.datasets[0].data.join(',')],
      [
        'Totalized Volume',
        totalizerData.labels.join(','),
        totalizerData.datasets[0].data.join(','),
      ],
    ]
      .map((e) => e.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'analytics_data.csv'
    link.click()
  }

  const toast = useToast()
  const chlorineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Chlorine (mg/l)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: [1.2, 1.4, 1.1, 1.3, 1.0, 1.5, 1.2],
      },
    ],
  }

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Chlorine (mg/l)',
        },
        suggestedMin: 0,
        suggestedMax: 2,
      },
    },
  }

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'TSS (mg/l)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        data: [15, 18, 17, 16, 19, 20],
      },
    ],
  }

  const options1 = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'TSS (mg/l)',
        },
        suggestedMin: 0,
        suggestedMax: 25,
      },
    },
  }

  const phValue = 7
  let phColor

  if (phValue < 7) {
    phColor = 'rgba(255, 99, 132, 0.5)'
  } else if (phValue === 7) {
    phColor = 'rgba(255, 206, 86, 0.5)'
  } else {
    phColor = 'rgba(75, 192, 192, 0.5)'
  }

  const phData = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM'],
    datasets: [
      {
        label: 'pH Level',
        data: [4.2, 7, 12, 6, 8], // Example pH values corresponding to timestamps
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointBackgroundColor: (context) => {
          const phValue = context.dataset.data[context.dataIndex]
          return phValue < 7
            ? 'rgba(255, 99, 132, 1)'
            : phValue === 7
              ? 'rgba(255, 206, 86, 1)'
              : 'rgba(75, 192, 192, 1)'
        },
        pointBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  }

  const phOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'pH Level',
        },
        beginAtZero: true,
        max: 14,
      },
      y: {
        title: {
          display: true,
          text: 'Category',
        },
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }

  const [selectedOptions, setSelectedOptions] = useState('electricalConductivity')

  const handleChanges = (event) => {
    setSelectedOptions(event.target.value)
  }

  const handleButtonClick = (option) => {
    setSelectedOptions(option)
  }

  const electricalConductivityData = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM'],
    datasets: [
      {
        label: selectedOption === 'tds' ? 'TDS (ppm)' : 'EC (uS/cm)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: selectedOption === 'tds' ? [150, 160, 140, 165, 155] : [75, 80, 70, 85, 78],
      },
    ],
  }

  const options3 = {
    scales: {
      r: {
        suggestedMin: selectedOption === 'tds' ? 100 : 60,
        suggestedMax: selectedOption === 'tds' ? 200 : 90,
      },
    },
  }

  const data4 = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM'],
    datasets: [
      {
        label: 'Pressure (Bar)',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [1.5, 1.7, 1.4, 1.6, 1.8], // Replace with your Pressure data
      },
    ],
  }

  const options4 = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Monitoring Sites',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Pressure (Bar)',
        },
        suggestedMin: 1,
        suggestedMax: 2,
      },
    },
  }

  const temperatureData = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'],
    datasets: [
      {
        label: 'Water Temperature (°C)',
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: [22, 24, 23, 25, 24, 26, 27],
      },
    ],
  }

  const options5 = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        suggestedMin: 20,
        suggestedMax: 30,
      },
    },
  }

  const flowRateData = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'],
    datasets: [
      {
        label: 'Flow Rate (L/s)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        data: [5, 6, 5.5, 6.2, 5.8, 6.5, 7],
      },
    ],
  }

  const options6 = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Flow Rate (L/s)',
        },
        suggestedMin: 4,
        suggestedMax: 8,
      },
    },
  }

  const totalizerData = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'],
    datasets: [
      {
        label: 'Totalized Volume (m³)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [100, 150, 200, 250, 300, 350, 400],
      },
    ],
  }

  const options7 = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Totalized Volume (m³)',
        },
        suggestedMin: 0,
        suggestedMax: 500,
      },
    },
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Analytics</h4>
        <Box display="flex" justifyContent="flex-end" p={2} marginLeft={'530px'}>
          <FormControl variant="outlined" sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel id="dropdown-label">Select Device</InputLabel>
            <Select
              labelId="dropdown-label"
              id="dropdown"
              value={selectedOption}
              onChange={handleChange}
              label="Select Option"
            >
              <MenuItem value="">{/* <em>None</em> */}</MenuItem>
              <MenuItem value={10}>Device1</MenuItem>
              <MenuItem value={20}>Device2</MenuItem>
              <MenuItem value={30}>Device3</MenuItem>
              <MenuItem value={40}>Device4</MenuItem>
              <MenuItem value={50}>Device5</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel id="dropdown-label">Select Site</InputLabel>
            <Select
              labelId="dropdown-label"
              id="dropdown"
              value={selectedOption}
              onChange={handleChange}
              label="Select Option"
            >
              <MenuItem value="">{/* <em>None</em> */}</MenuItem>
              <MenuItem value={10}>Site1</MenuItem>
              <MenuItem value={20}>Site2</MenuItem>
              <MenuItem value={30}>Site3</MenuItem>
              <MenuItem value={40}>Site4</MenuItem>
              <MenuItem value={50}>Site5</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <IconButton color="primary" onClick={handleDownload}>
          <DownloadIcon />
        </IconButton>
      </div>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4 fixed-size-card">
            <CCardBody>
              <h4>Chlorine Levels</h4>
              <Line data={chlorineData} options={options} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>TSS Levels</h4>
              <Bar data={data} options={options1} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>pH Levels</h4>
              <Bar data={phData} options={phOptions} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>Electrical Conductivity / TDS</h4>

              <div className="mb-3">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleButtonClick('electricalConductivity')}
                >
                  Electrical Conductivity
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleButtonClick('tds')}
                >
                  TDS
                </Button>
              </div>
              <PolarArea data={electricalConductivityData} options={options3} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>Pressure Levels</h4>
              <Line data={data4} options={options4} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>Water Temperature</h4>
              <Bar data={temperatureData} options={options5} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>Flow Rate</h4>
              <Line data={flowRateData} options={options6} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4 ">
            <CCardBody>
              <h4>Totalized Volume</h4>
              <Bar data={totalizerData} options={options7} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Analytics
