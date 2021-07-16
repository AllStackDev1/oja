import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Text, Fade } from '@chakra-ui/react'
import { useQuery } from 'react-query'

import {
  HeroSection,
  SectionOne,
  KeyBenefitsSection,
  SecurityFeaturesSection,
  CTASection
} from 'components/Home'
import Splash from 'components/Loading/Splash'
import { ICountry, ResponsePayload } from 'interface'
import { convertArrayToObject } from 'utils/helpers'
import useApi from 'context/Api'

const Home = (): JSX.Element => {
  const { getCountries } = useApi()

  const { data, isLoading, error } = useQuery<
    ResponsePayload<ICountry[], string>
  >('countries', () => getCountries({ status: true }))

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
            <Fade in={true}>
              <HeroSection
                countriesData={convertArrayToObject(data?.data, 'code')}
              />
              <SectionOne />
              <KeyBenefitsSection />
              <SecurityFeaturesSection />
              <CTASection />
            </Fade>
          )}
        </>
      )}
    </>
  )
}

Home.propTypes = {}

export default Home
