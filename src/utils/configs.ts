const ENV = process.env.NODE_ENV?.toUpperCase() || ''
export const BASE_URL = process.env[`REACT_APP_${ENV}_BASE_URL`]
export const X_CHANGE_API_URL = process.env[`REACT_APP_${ENV}_X_CHANGE_API_URL`]
export const X_CHANGE_API_KEY = process.env[`REACT_APP_${ENV}_X_CHANGE_API_KEY`]
