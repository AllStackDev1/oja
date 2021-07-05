import * as yup from 'yup'
import validator from 'validator'

export const RegistrationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required*'),
  lastName: yup.string().required('This field is required*'),
  userName: yup.string().required('This field is required*'),
  email: yup
    .string()
    .email('Provide a valid email address*')
    .required('This field is required*'),
  address: yup.object({
    country: yup.string().required('This field is required*')
  }),
  phoneNumber: yup
    .string()
    .test(
      'valid',
      'Provide a valid phone number, exclude country code*',
      value =>
        value
          ? validator.isMobilePhone(value, 'any', { strictMode: true })
          : true
    )
    .required('This field is required*'),
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: `
        Provide a minimum 8 characters with; <br/> 
        An uppercase <br/> 
        A lowercase <br/> 
        A number <br/> 
        A special <br/> 
        A character <br/> 
    `
    })
    .required('This field is required*'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match*')
    .required('This field is required*')
})

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('This field is required*'),
  password: yup.string().required('This field is required*')
})

export const ForgotPassSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email!')
    .required('This field is required*')
})

export const ResetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        'Minimum 8 characters, at least an uppercase, lowercase, number and special character*'
    })
    .required('This field is required*'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match!')
    .required('This field is required*')
})
