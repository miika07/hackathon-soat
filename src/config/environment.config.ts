import dotenv from 'dotenv'
import * as path from 'path'
import * as pack from '../../package.json'
(() => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  const NODE_ENV = process.env.NODE_ENV
  dotenv.config({ path: path.join(__dirname , `/../../env/.env-${NODE_ENV}`) })
})()

const defaultRetry = { times: 3, delay: 5000 }

const config = {
  key: process.env.MAILGUN_API_KEY,
  env: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME ? process.env.APP_NAME : 'tech-challenge',
  projectVersion: pack.version,
  host: process.env.HOST || 'localhost',
  port: process.env.NODE_ENV == 'test' ? 3001 : process.env.PORT || 3000,
  service: {
    enabled: process.env.ENABLED_SERVICE === 'true'
  },
  plugins: {
    swagger: {
      options: {
        info: {
          title: 'tech-challenge',
          version: pack.version
        },
        securityDefinitions: {
          jwt: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'header',
              description: 'Bearer <token>'
          }
      },
        security: [{ jwt: [] }],
        schemes: ['http','https']
      }
    }
  }
}

export default config
