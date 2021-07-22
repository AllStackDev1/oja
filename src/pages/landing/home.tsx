import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Box } from '@chakra-ui/react'

import {
  SectionOne,
  CTASection,
  HeroSection,
  KeyBenefitsSection,
  SecurityFeaturesSection
} from 'components/Home'

const Home = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="This is the landing page" />
        <title>Oj'a. | Home</title>
        <link rel="canonical" href="/home" />
      </Helmet>
      <HeroSection />
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
