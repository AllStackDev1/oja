import React from 'react'
import Wrapper from 'containers/Layout/Wrapper'
import { Grid, GridItem } from '@chakra-ui/react'
import { ActiveTransactions } from 'components/Dashboard/Home'
import {
  DebitFrom,
  CreditTo,
  TransactionSummary
} from 'components/Dashboard/VentTo'
import { CustomButton } from 'components/Auth'
import { FiArrowRight } from 'react-icons/fi'

const VentTo = (): JSX.Element => {
  const [viewSummary, setViewSummary] = React.useState(false)
  return (
    <Wrapper
      title="Vending | Dashboard"
      href="/dashboard/vending"
      content="This is the application dashboard vent to page"
    >
      <Grid
        mt={14}
        ml={{ base: 28, '4xl': 32 }}
        mr={10}
        columnGap={{ base: 24, '4xl': 44 }}
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        <GridItem colSpan={2} rowSpan={2}>
          <form>
            <Grid rowGap={8}>
              {!viewSummary ? (
                <>
                  <DebitFrom />
                  <CreditTo />
                </>
              ) : (
                <TransactionSummary />
              )}

              <GridItem>
                <CustomButton
                  px={8}
                  w="70%"
                  d="flex"
                  color="white"
                  bgColor="ojaDark"
                  _hover={{ bgColor: 'ojaDark' }}
                  title={!viewSummary ? 'Continue' : 'Complete Transaction'}
                  fontSize={{ base: 'sm', xl: 'md' }}
                  rightIcon={
                    <FiArrowRight fontSize={20} className="auth-btn-arrow" />
                  }
                  onClick={() => setViewSummary(true)}
                />
              </GridItem>
            </Grid>
          </form>
        </GridItem>
        <ActiveTransactions w={110} />
      </Grid>
    </Wrapper>
  )
}

export default VentTo
