const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
module.exports = {
	...defaultConfig,
	entry: {
		'flipbox-block': './src/blocks/flipbox-block',
		'flipbox-block-2': './src/blocks/flipbox-block-2',
	},
};
