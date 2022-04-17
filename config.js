// import dotenv from 'dotenv'

// const loadEnv = async ({ options, resolveConfigurationProperty }) => {
//     const envVars = dotenv.config({ path: '.env.local' }).parsed;
//     return envVars;
// } 

// export default loadEnv;

const dotenv = require('dotenv');

module.exports = async ({ options, resolveConfigurationProperty }) => {
  // Load env vars into Serverless environment
  // You can do more complicated env var resolution with dotenv here
  const envVars = dotenv.config({ path: '.env.local' }).parsed;
  return envVars;
};