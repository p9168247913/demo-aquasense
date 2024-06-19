import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();


createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </ChakraProvider>,
)
// ce5e952b955837f9d684c269d989ea0742156a0b