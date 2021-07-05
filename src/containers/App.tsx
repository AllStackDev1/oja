import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter } from 'react-router-dom'

import { theme } from 'utils/theme'
import 'assets/css/custom.css'
import 'assets/fonts/stylesheet.css'

import Register from 'routes/register'
import { AuthContextProvider } from 'context/Auth'
import { ApiContextProvider } from 'context/Api'
import { AppContextProvider } from 'context/App'

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <AuthContextProvider>
      <ApiContextProvider>
        <AppContextProvider>
          <BrowserRouter>
            <Route path="/" component={Register} />
          </BrowserRouter>
        </AppContextProvider>
      </ApiContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
)
