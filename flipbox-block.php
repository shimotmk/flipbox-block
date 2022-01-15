<?php
/**
 * Plugin Name:       flipbox-block
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Tomoki Shimomura
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flipbox-block
 *
 * @package           flipbox-block
 */

define( 'EXAMPLE_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'EXAMPLE_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
$example_plugin_data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
define( 'EXAMPLE_PLUGIN_VERSION', $example_plugin_data['version'] );

add_action('init',
	function () {
		$blocks = array(
			'flipbox-block',
			'flipbox-block-2'
		);

		foreach ( $blocks as $block ) {
			/**
			 * Front_style & Editor
			 */
			wp_register_style(
				'flipbox-block/' . $block ,
				EXAMPLE_PLUGIN_URL . 'build/style-' . $block . '.css',
				array(),
				EXAMPLE_PLUGIN_VERSION
			);

			/**
			 * Editor_style
			 */
			wp_register_style(
				'flipbox-block/' . $block . '-editor-css',
				EXAMPLE_PLUGIN_URL . 'build/' . $block . '.css',
				array(),
				EXAMPLE_PLUGIN_VERSION
			);

			$asset = include EXAMPLE_PLUGIN_PATH .'build/' . $block .'.asset.php';
			wp_register_script(
				$block . '-script',
				EXAMPLE_PLUGIN_URL . 'build/' . $block . '.js',
				$asset['dependencies'],
				EXAMPLE_PLUGIN_VERSION
			);

			/**
			 * Translation script
			 */
			wp_set_script_translations(
				$block . '-script',
				'flipbox-block',
				EXAMPLE_PLUGIN_PATH . 'languages'
			);

			register_block_type(
				plugin_dir_path( __FILE__ ) . 'src/blocks/' . $block . '/',
				array(
					'style'         => 'flipbox-block/' . $block,
					'editor_style'  => 'flipbox-block/' . $block . '-editor-css',
					'editor_script' => $block . '-script',
				)
			);
		}
	}
);
