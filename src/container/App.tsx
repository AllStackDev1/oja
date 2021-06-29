import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { theme } from 'theme'
import 'assets/css/custom.css'
import 'assets/fonts/stylesheet.css'

import Router from 'routes/register'

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ChakraProvider>
)
