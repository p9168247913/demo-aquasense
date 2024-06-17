import React, {useState} from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import { Line, Bar, PolarArea, Radar, Doughnut } from 'react-chartjs-2';

const Dashboard = () => {

  const chlorineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Chlorine (mg/l)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: [1.2, 1.4, 1.1, 1.3, 1.0, 1.5, 1.2], // Replace with your Chlorine data
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
        suggestedMax: 2, // Adjust based on your data range
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
        data: [15, 18, 17, 16, 19, 20], // Replace with your TSS data
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
        suggestedMax: 25, // Adjust based on your data range
      },
    },
  };

  const data2 = {
    labels: ['Acidic', 'Neutral', 'Alkaline'],
    datasets: [
      {
        label: 'pH Levels',
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        data: [25, 50, 30], // Replace with your pH data percentage (sum should be 100%)
      },
    ],
  };

  const options2 = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  const [showTDS, setShowTDS] = useState(false); // State to toggle between EC and TDS

  const electricalConductivityData = {
    labels: ['Parameter 1', 'Parameter 2', 'Parameter 3', 'Parameter 4', 'Parameter 5'],
    datasets: [
      {
        label: showTDS ? 'TDS (ppm)' : 'EC (uS/cm)', // Toggle label based on state
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: showTDS ? [150, 160, 140, 165, 155] : [75, 80, 70, 85, 78], // EC and TDS data
      },
    ],
  };

  const options3 = {
    scales: {
      r: {
        suggestedMin: showTDS ? 100 : 60, // Adjust min and max based on EC or TDS
        suggestedMax: showTDS ? 200 : 90,
      },
    },
  };

  const data4 = {
    labels: ['Site 1', 'Site 2', 'Site 3', 'Site 4', 'Site 5'],
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
  };;

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
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                pH
              </h4>
              <div className="small text-body-secondary">January - July 2024</div>
              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <PolarArea data={data2} options={options2} />
              </div>
            </CCol>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                Electric Conductivity / TDS
              </h4>
              <div className="small text-body-secondary">January - July 2024</div>
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
              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <Radar data={electricalConductivityData} options={options3} />
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <h4 id="traffic" className="card-title mb-0">
                Pressure
              </h4>
              <div className="small text-body-secondary">January - July 2024</div>
              <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
                <Line data={data4} options={options4} />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
