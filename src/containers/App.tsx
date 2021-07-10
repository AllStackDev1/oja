import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { theme } from 'utils/theme'
import 'assets/css/custom.css'
import 'assets/fonts/stylesheet.css'

import Register from 'routes/register'
import { AuthContextProvider } from 'context/Auth'
import { ApiContextProvider } from 'context/Api'
import { AppContextProvider } from 'context/App'

const queryClient = new QueryClient()

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ApiContextProvider>
          <AppContextProvider>
            <BrowserRouter>
              <Route path="/" component={Register} />
            </BrowserRouter>
          </AppContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </ChakraProvider>
)
