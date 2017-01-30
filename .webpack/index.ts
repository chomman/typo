import {Configuration} from 'webpack'
import createBase from './base'
import addAssets from './assets'
import addDevelopment from './development'
import addProduction from './production'
import addHot from './hot'

/** Options for webpack build */
interface Options {
  source: string
  destination: string
  assets: string
}

/**
 * Build Webpack configuration
 * @param {IndexOptions} options Options
 * @return {Object} Webpack configuration
 */
export default function createConfig({
  source,
  destination,
  assets,
}: Options): Configuration {
  // Create base configuration and export
  const hotModulesEnabled = process.env.HOT_MODULES === 'true'
  let config = createBase(source, destination, hotModulesEnabled)

  // Add to configuration based on environment
  switch(process.env.NODE_ENV) {
  case 'development':
    config = addDevelopment(addAssets(config, assets))
    console.info('--- webpack: using development configuration')
    break
  case 'production':
    config = addProduction(addAssets(config, assets))
    console.info('--- webpack: using production configuration')
    break
  default:
    throw new Error('NODE_ENV is not set or is an unsupported environment')
  }

  // Add hot reload support if explicitly specified
  if(hotModulesEnabled) {
    config = addHot(config)
    console.info('--- webpack: using hot modules configuration')
  }

  return config
}
