const ENV = process.env.NODE_ENV?.toUpperCase()
export const BASE_URL = process.env[`REACT_APP_${ENV}_BASE_URL`]
