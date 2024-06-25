import React, { useEffect, useState } from 'react'
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
import baseUrl from "../../API/baseUrl"
import axios from "axios";
import { format } from 'date-fns'

const Analytics = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [showTDS, setShowTDS] = useState(false);
  const [apiData, setApiData] = useState([])
  const [chlorineData, setChlorineData] = useState({
    labels: [],
    datasets: [],
  });
  const [tssData, setTssData] = useState({
    labels: [],
    datasets: [],
  })
  const [phData, setphData] = useState({
    labels: [],
    datasets: [],
  })
  const [ecData, setecData] = useState({
    labels: [],
    datasets: [],
  })
  const [displayData, setDisplayData] = useState('ec');
  const [pressureData, setPressureData] = useState({
    labels: [],
    datasets: [],
  })
  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [],
  });
  const [flowRateData, setFlowRateData] = useState({
    labels: [],
    datasets: [],
  });
  const [totalizerData, setTotalizerData] = useState({
    labels: [],
    datasets: [],
  });

  const getData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data`)
      if (response.data) {
        const limitedData = response.data.slice(0, 5);
        setApiData(response.data)
        console.log("response", response.data);
        processChlorineData(limitedData)
        processTssData(limitedData)
        processphData(limitedData)
        processECData(limitedData)
        processPresureData(limitedData)
        processTemperatureData(limitedData);
        processFlowRateData(limitedData)
        processTotalizerData(limitedData)
      }

    } catch (error) {
      console.log(error);
    }
  }

  const processChlorineData = (data) => {
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const residualChlorine = data.map(item => item.residualChlorine === "" ? null : item.residualChlorine)

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
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const tss = data.map(item => item.tss === "" ? null : item.tss)

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
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const ph = data.map(item => item.ph === "" ? null : item.ph)

    const backgroundColors = ph.map(value => {
      if (value < 7) {
        return 'rgba(255, 99, 132, 0.5)'; // Red for acidic
      } else if (value == 7) {
        return 'rgba(255, 206, 86, 0.5)'; // Yellow for neutral
      } else {
        return 'rgba(75, 192, 192, 0.5)'; // Blue for basic
      }
    })

    const borderColors = ph.map(value => {
      if (value < 7) {
        return 'rgba(255, 99, 132, 1)'; // Red for acidic
      } else if (value == 7) {
        return 'rgba(255, 206, 86, 1)'; // Yellow for neutral
      } else {
        return 'rgba(75, 192, 192, 1)'; // Blue for basic
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
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const conductivity = data.map(item => item.conductivity === "" ? null : item.conductivity)

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
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'))
    const pressure = data.map(item => item.pressure === "" ? null : item.pressure)

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
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'));
    const temperature = data.map(item => item.temperature === "" ? null : item.temperature);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Water Temperature (°C)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2,
          data: temperature,
        },
      ],
    };
    setTemperatureData(chartData);
  };
  const processFlowRateData = (data) => {
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'));
    const flowRate = data.map(item => item.flowRate === "" ? null : item.flowRate);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Flow Rate (L/s)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 2,
          data: flowRate,
        },
      ],
    };
    setFlowRateData(chartData);
  };
  const processTotalizerData = (data) => {
    const labels = data.map(item => format(new Date(item.createdAt), 'MM/dd/yyyy HH:mm'));
    const totalizedVolume = data.map(item => item.totalizedVolume === "" ? null : item.totalizedVolume);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Totalized Volume (m³)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          data: totalizedVolume,
        },
      ],
    };
    setTotalizerData(chartData);
  };

  useEffect(() => {
    getData();
  }, [])

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleButtonClick = (option) => {
    setDisplayData(option);
  };

  const convertToTDS = (ecData) => {
    const conversionFactor = 0.67;
    return ecData.map(value => value * conversionFactor);
  };

  const ecOrTdsData = () => {
    if (displayData === 'tds') {
      const labels = ecData.labels;
      const tds = convertToTDS(ecData.datasets[0].data);

      return {
        labels: labels,
        datasets: [
          {
            label: 'Total Dissolved Solids (mg/l)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 2,
            data: tds,
          },
        ],
      };
    }
    return ecData;
  };

  const ECoptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: displayData === 'tds' ? 'TDS (mg/l)' : 'Electrical Conductivity (mS/cm)',
        },
        suggestedMin: 0,
        suggestedMax: Infinity,
        beginAtZero: true,
      },
    },
  };

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

  const toast = useToast();

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Chlorine (mg/l)',
        },
        suggestedMin: 0,
        suggestedMax: Infinity,
        beginAtZero: true,
      },
    },
  }

  const options1 = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'TSS (mg/l)',
        },
        suggestedMin: 0,
        suggestedMax: Infinity,
        beginAtZero: true,
      },
    },
  }

  const phOptions = {
    indexAxis: 'x',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
        stacked: true,
      },
      y: {
        title: {
          display: true,
          text: 'ph Level',
        },
        beginAtZero: true,
        max: 14,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }

  const pressureOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Pressure (Bar)',
        },
        suggestedMin: 0,
        suggestedMax: Infinity,
        beginAtZero: true,
      },
    },
  };

  const temperatureOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        suggestedMin: 0,
        suggestedMax: 40,
      },
    },
  };

  const flowRateOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Flow Rate (L/s)',
        },
        suggestedMin: 0,
        suggestedMax: 20,
        beginAtZero: true,
      },
    },
  };

  const totalizerOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Totalized Volume (m³)',
        },
        suggestedMin: 0,
        suggestedMax: 500,
        beginAtZero: true,
      },
    },
  };

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
              <Bar data={tssData} options={options1} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>pH Levels</h4>
              <Line data={phData} options={phOptions} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody >
              <div style={{ display: "flex", gap: "20px" }}>
                <h4>Electrical Conductivity / TDS</h4>

                <div className="mb-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick('electricalConductivity')}
                  >
                    EC
                  </Button>&nbsp;
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleButtonClick('tds')}
                  >
                    TDS
                  </Button>
                </div>
              </div>
              <Line data={ecOrTdsData()} options={ECoptions} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>Pressure Levels</h4>
              <Line data={pressureData} options={pressureOptions} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>Water Temperature</h4>
              <Line data={temperatureData} options={temperatureOptions} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardBody>
              <h4>Flow Rate</h4>
              <Line data={flowRateData} options={flowRateOptions} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={6}>
          <CCard className="mb-4 ">
            <CCardBody>
              <h4>Totalized Volume</h4>
              <Bar data={totalizerData} options={totalizerOptions} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Analytics
