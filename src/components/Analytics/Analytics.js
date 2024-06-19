import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DownloadIcon from '@mui/icons-material/Download'
import TablePagination from '@mui/material/TablePagination'

function createData(sno, timestamp, battery, waterLevel, temperature, conductivity) {
  return { sno, timestamp, battery, waterLevel, temperature, conductivity }
}

const rows = [
  createData(1, '2024-06-01 12:00', '75%', '50%', '22°C', '1.5 mS/cm'),
  createData(2, '2024-06-01 13:00', '74%', '48%', '23°C', '1.6 mS/cm'),
  createData(3, '2024-06-01 14:00', '73%', '47%', '24°C', '1.7 mS/cm'),
  createData(4, '2024-06-01 15:00', '72%', '45%', '25°C', '1.8 mS/cm'),
  createData(5, '2024-06-01 16:00', '71%', '43%', '26°C', '1.9 mS/cm'),
  createData(6, '2024-06-01 17:00', '70%', '42%', '27°C', '2.0 mS/cm'),
  createData(7, '2024-06-01 18:00', '69%', '41%', '28°C', '2.1 mS/cm'),
  createData(8, '2024-06-01 19:00', '68%', '40%', '29°C', '2.2 mS/cm'),
  createData(9, '2024-06-01 20:00', '67%', '39%', '30°C', '2.3 mS/cm'),
  createData(10, '2024-06-01 21:00', '66%', '38%', '31°C', '2.4 mS/cm'),
]

const Analytics = () => {
  const [selectedOption, setSelectedOption] = React.useState('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleDownload = () => {
    const csvContent = [
      ['S.NO', 'Timestamp', 'Battery', 'Water-Level', 'Temperature', 'Conductivity'],
      ...rows.map((row) => [
        row.sno,
        row.timestamp,
        row.battery,
        // row.waterLevel,
        row.temperature,
        row.conductivity,
      ]),
    ]
      .map((e) => e.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'table_data.csv'
    link.click()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <FormControl variant="outlined" sx={{ minWidth: 200, mr: 2 }}>
          <InputLabel id="dropdown-label">Select Site</InputLabel>
          <Select
            labelId="dropdown-label"
            id="dropdown"
            value={selectedOption}
            onChange={handleChange}
            label="Select Option"
          >
            <MenuItem value="">
              {/* <em>None</em> */}
            </MenuItem>
            <MenuItem value={10}>Site1</MenuItem>
            <MenuItem value={20}>Site2</MenuItem>
            <MenuItem value={30}>Site3</MenuItem>
            <MenuItem value={40}>Site4</MenuItem>
            <MenuItem value={50}>Site5</MenuItem>
          </Select>
        </FormControl>
        <IconButton onClick={handleDownload} color="primary" aria-label="download data">
          <DownloadIcon />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.NO</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Battery</TableCell>
              {/* <TableCell align="right">Water-Level</TableCell> */}
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Conductivity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.sno} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.sno}
                </TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
                <TableCell align="right">{row.battery}</TableCell>
                {/* <TableCell align="right">{row.waterLevel}</TableCell> */}
                <TableCell align="right">{row.temperature}</TableCell>
                <TableCell align="right">{row.conductivity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}

export default Analytics
