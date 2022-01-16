const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
	...defaultConfig,
	entry: {
		'flipbox': './src/blocks/flipbox',
		'flipbox-front': './src/blocks/flipbox-front',
		'flipbox-back': './src/blocks/flipbox-back',
	},
};
