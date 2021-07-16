import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { HelmetProvider } from 'react-helmet-async'

import { theme } from 'utils/theme'
import 'assets/css/custom.css'
import 'assets/fonts/stylesheet.css'

import Register from 'routes/register'
import { AuthContextProvider } from 'context/Auth'
import { ApiContextProvider } from 'context/Api'
import { AppContextProvider } from 'context/App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 24 * 60 * 60 * 1000
    }
  }
})

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ApiContextProvider>
          <AppContextProvider>
            <BrowserRouter>
              <HelmetProvider>
                <Route path="/" component={Register} />
              </HelmetProvider>
            </BrowserRouter>
          </AppContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </ChakraProvider>
)
