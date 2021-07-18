import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Text } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import {
  SectionOne,
  CTASection,
  HeroSection,
  KeyBenefitsSection,
  SecurityFeaturesSection
} from 'components/Home'
import { Splash } from 'components/Loading'
import { convertArrayToObject } from 'utils/helpers'

import useApi from 'context/Api'

const Home = (): JSX.Element => {
  const { getCountries } = useApi()

  const { data, isLoading, error } = useQuery('countries', () =>
    getCountries({ status: true })
  )

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="This is the landing page" />
        <title>Oj'a. | Home</title>
        <link rel="canonical" href="/home" />
      </Helmet>
      {isLoading && <Splash />}
      {!isLoading && (
        <>
          {error ? (
            <Text>Error: {error}</Text>
          ) : (
            <>
              <HeroSection
                countriesData={convertArrayToObject(data?.data, 'code')}
              />
              <SectionOne />
              <KeyBenefitsSection />
              <SecurityFeaturesSection />
              <CTASection />
            </>
          )}
        </>
      )}
    </>
  )
}

Home.propTypes = {}

export default Home
