import React from 'react'
import { Helmet } from 'react-helmet'
import {
  HeroSection,
  SectionOne,
  KeyBenefitsSection,
  SecurityFeaturesSection,
  CTASection
} from 'components/Home'

const Home = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="This is the landing page" />
        <title>Home</title>
        <link rel="canonical" href="/home" />
      </Helmet>
      <HeroSection />
      <SectionOne />
      <KeyBenefitsSection />
      <SecurityFeaturesSection />
      <CTASection />
    </>
  )
}

Home.propTypes = {}

export default Home
