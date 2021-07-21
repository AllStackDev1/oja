import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from 'react-query'
import { Box } from '@chakra-ui/react'

import {
  SectionOne,
  CTASection,
  HeroSection,
  KeyBenefitsSection,
  SecurityFeaturesSection
} from 'components/Home'
import { convertArrayToObject } from 'utils/helpers'

import useApi from 'context/Api'

const Home = (): JSX.Element => {
  const { getCountries } = useApi()

  const { data } = useQuery('countries', () => getCountries({ status: true }))

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="This is the landing page" />
        <title>Oj'a. | Home</title>
        <link rel="canonical" href="/home" />
      </Helmet>
      <HeroSection countriesData={convertArrayToObject(data?.data, 'code')} />
      <Box bgColor="#fff">
        <SectionOne />
        <KeyBenefitsSection />
        <SecurityFeaturesSection />
        <CTASection />
      </Box>
    </>
  )
}

Home.propTypes = {}

export default Home
