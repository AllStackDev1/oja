import { CountryCodes } from 'react-flags-select/build/types'

export interface IPhoneInputData {
  countries?: CountryCodes
  customLabels?: Record<string, string>
  data: Record<string, Record<string, string>>
}
