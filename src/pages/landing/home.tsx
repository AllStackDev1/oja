import React from 'react'
import {
  HeroSection,
  SectionOne,
  KeyBenefitsSction,
  SecurityFeaturesSection,
  CTASection
} from 'components/Home'

const Home = (): JSX.Element => {
  return (
    <>
      <HeroSection />
      <SectionOne />
      <KeyBenefitsSction />
      <SecurityFeaturesSection />
      <CTASection />
    </>
  )
}

Home.propTypes = {}

export default Home
