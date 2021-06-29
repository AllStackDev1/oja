import React from 'react'
import { Helmet } from 'react-helmet'
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
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="This is the unique leaf page description"
        />
        <title>Home</title>
        <link rel="canonical" href="" />
      </Helmet>
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
