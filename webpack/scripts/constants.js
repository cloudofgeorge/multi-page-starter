const ASSETS_PATH = process.env.ASSET_PATH || 'public';
const PAGES_PATH = process.env.PAGES_PATH || 'src/templates/pages';
const OUTPUT_PATH = process.env.OUTPUT_PATH || 'dist';
const TEMP_PATH = process.env.OUTPUT_PATH || 'temp';

module.exports = { ASSET_PATH: ASSETS_PATH, PAGES_PATH, OUTPUT_PATH, TEMP_PATH };
