const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = function override(config, env) {

	config.resolve.plugins = [
		new TsconfigPathsPlugin({
			configFile: 'tsconfig.json',
		}),
	].concat(config.resolve.plugins);
	// config.resolve = {
	// 	...config.resolve,
	// 	alias: {
	// 		...config.alias,
	// 		'styles': resolve(__dirname, 'src/styling/scss/'),
	// 		'routes': resolve(__dirname, 'src/routes'),
	// 		'utils': resolve(__dirname, 'src/utils'),
	// 		'stores': resolve(__dirname, 'src/stores'),
	// 		'services': resolve(__dirname, 'src/services'),
	// 		'models': resolve(__dirname, 'src/models'),
	// 		'webshop': resolve(__dirname, 'src/pages/webshop'),
	// 		'backoffice': resolve(__dirname, 'src/pages/backoffice'),
	// 		'components': resolve(__dirname, 'src/components')
	// 	}
	// }
	return config;
}