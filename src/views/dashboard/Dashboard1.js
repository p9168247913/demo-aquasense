import React from 'react'

import CIcon from '@coreui/icons-react'

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
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
import { Line } from 'react-chartjs-2';

const Dashboard1 = () => {

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



  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <div>
            <h4 id="traffic" className="card-title mb-0">
              Chlorine
            </h4>
            <div className="small text-body-secondary">January - July 2024</div>

            <div className="chart-wrapper" style={{ height: '300px', marginTop: '40px' }}>
              <Line data={chlorineData} options={options} />
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard1
