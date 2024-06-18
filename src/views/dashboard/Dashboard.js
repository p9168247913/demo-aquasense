import React, { useState } from 'react'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { Line, Bar, PolarArea, Radar, Doughnut } from 'react-chartjs-2';
import Thermometer from 'react-thermometer-component';

const Dashboard = () => {

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
  };

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
  };

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
  };

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
  };

  const phValue = 7;
  let phColor;

  if (phValue < 7) {
    phColor = 'rgba(255, 99, 132, 0.5)';
  } else if (phValue === 7) {
    phColor = 'rgba(255, 206, 86, 0.5)';
  } else {
    phColor = 'rgba(75, 192, 192, 0.5)';
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
          const phValue = context.dataset.data[context.dataIndex];
          return phValue < 7 ? 'rgba(255, 99, 132, 1)' : phValue === 7 ? 'rgba(255, 206, 86, 1)' : 'rgba(75, 192, 192, 1)';
        },
        pointBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

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
  };

  const [showTDS, setShowTDS] = useState(false);

  const electricalConductivityData = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM'],
    datasets: [
      {
        label: showTDS ? 'TDS (ppm)' : 'EC (uS/cm)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: showTDS ? [150, 160, 140, 165, 155] : [75, 80, 70, 85, 78],
      },
    ],
  };

  const options3 = {
    scales: {
      r: {
        suggestedMin: showTDS ? 100 : 60,
        suggestedMax: showTDS ? 200 : 90,
      },
    },
  };

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
  };

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
  };

  const temperatureData = {
    labels: ['12:00 AM', '03:00 AM', '06:00 AM', '09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM'],
    datasets: [
      {
        label: 'Water Temperature (°C)',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(255, 159, 64, 0.2)', // Custom color
        borderColor: 'rgba(255, 159, 64, 1)', // Custom color
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255, 159, 64, 1)', // Custom color
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)', // Custom color
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [20, 21, 22, 23, 24, 25, 26], // Replace with your actual temperature data
      },
    ],
  };

  const options5 = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
        suggestedMin: 18,
        suggestedMax: 28, // Adjust based on your data range
      },
    },
  };

  const temperature = 72

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <h4 id="traffic" className="card-title mb-0">
                Chlorine(mg/l)
              </h4>
              <div className="small text-body-secondary">January - July 2024</div>

              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <Line data={chlorineData} options={options} />
              </div>
            </CCol>
            <CCol sm={6}>
              <h4 id="traffic" className="card-title mb-0">
                TSS(mg/l)
              </h4>
              <div className="small text-body-secondary">January - July 2024</div>

              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <Bar data={data} options={options1} />
              </div>
            </CCol>
          </CRow>
          <CRow className='mt-4'>
            <CCol sm={6}>
              <h4 id="traffic" className="card-title mb-0">
                Pressure
              </h4>
              <div className="small text-body-secondary">January - July 2024</div>
              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <Line data={data4} options={options4} />
              </div>
            </CCol>

            <CCol sm={6}>
              <div className='d-flex gap-4'>
                <div>
                  <h4 id="traffic" className="card-title mb-0">
                    Electric Conductivity / TDS
                  </h4>
                  <div className="small text-body-secondary">January - July 2024</div>
                </div>
                <div className="d-flex justify-content-end mb-2">
                  <CButtonGroup>
                    <CButton
                      color={showTDS ? 'outline-primary' : 'primary'}
                      onClick={() => setShowTDS(false)}
                    >
                      EC
                    </CButton>
                    <CButton
                      color={showTDS ? 'primary' : 'outline-primary'}
                      onClick={() => setShowTDS(true)}
                    >
                      TDS
                    </CButton>
                  </CButtonGroup>
                </div>
              </div>
              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <Line data={electricalConductivityData} options={options3} />
              </div>
            </CCol>
          </CRow>
          <CRow className='mt-4'>
            <CCol sm={6}>
              <h4 id="ph-levels" className="card-title mb-0">
                pH Levels
              </h4>
              <Line data={phData} options={phOptions} />
            </CCol>
            <CCol sm={6}>
              <h4 id="traffic" className="card-title mb-0">
                Temperature
              </h4>
              <div className="small text-body-secondary">January - July 2024</div>
              {/* <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <Line data={temperatureData} options={options5} />
              </div> */}
              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px', marginLeft: '100px' }}>
                <Thermometer
                  theme="light"
                  value={temperature}
                  max="100"
                  steps="3"
                  format="°C"
                  size="medium"
                  height="250"
                  width="100"
                />
              </div>
              <div className="current-temperature ml-3">{temperature} °C</div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
