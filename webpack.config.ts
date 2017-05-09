import {addToEntries, createConfiguration} from 'wcb'
import {BannerPlugin} from 'webpack'

// Build base configuration
let configuration = addToEntries(createConfiguration({
  log: message => console.log(message),
  pattern: ['**/main.ts'],
  target: 'node',
}), ['dotenv/config'])

// Add banner to bin files
configuration = {
  ...configuration,
  plugins: [
    ...configuration.plugins,
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      entryOnly: true,
      raw: true,
    }),
  ],
}

// tslint:disable-next-line:no-default-export
export default configuration
