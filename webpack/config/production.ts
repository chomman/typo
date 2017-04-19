import {Configuration, LoaderOptionsPlugin} from 'webpack'
import * as BabiliPlugin from 'babili-webpack-plugin'

/**
 * Add production build settings to Webpack configuration
 * @param config Configuration to modify
 * @return Updated configuration
 */
export function addProduction({
  plugins = [],
  ...config,
}: Configuration): Configuration {
  return {
    ...config,
    plugins: [
      ...plugins,
      new LoaderOptionsPlugin({minimize: true, debug: false}),
      new BabiliPlugin(),
    ],
  }
}
