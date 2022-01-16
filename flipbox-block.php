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

define( 'FLIPBOX_BLOCK_URL', plugin_dir_url( __FILE__ ) );
define( 'FLIPBOX_BLOCK_PATH', plugin_dir_path( __FILE__ ) );
$example_plugin_data = get_file_data( __FILE__, array( 'version' => 'Version' ) );
define( 'FLIPBOX_VERSION', $example_plugin_data['version'] );

add_action('init',
	function () {
		$blocks = array(
			'flipbox',
			'flipbox-front',
			'flipbox-back'
		);

		foreach ( $blocks as $block ) {
			/**
			 * Front_style & Editor
			 */
			wp_register_style(
				'flipbox-block/' . $block ,
				FLIPBOX_BLOCK_URL . 'build/style-' . $block . '.css',
				array(),
				FLIPBOX_VERSION
			);

			/**
			 * Editor_style
			 */
			wp_register_style(
				'flipbox-block/' . $block . '-editor-css',
				FLIPBOX_BLOCK_URL . 'build/' . $block . '.css',
				array(),
				FLIPBOX_VERSION
			);

			$asset = include FLIPBOX_BLOCK_PATH .'build/' . $block .'.asset.php';
			wp_register_script(
				$block . '-script',
				FLIPBOX_BLOCK_URL . 'build/' . $block . '.js',
				$asset['dependencies'],
				FLIPBOX_VERSION
			);

			/**
			 * Translation script
			 */
			wp_set_script_translations(
				$block . '-script',
				'flipbox-block',
				FLIPBOX_BLOCK_PATH . 'languages'
			);

			register_block_type(
				FLIPBOX_BLOCK_PATH . 'src/blocks/' . $block . '/',
				array(
					'style'         => 'flipbox-block/' . $block,
					'editor_style'  => 'flipbox-block/' . $block . '-editor-css',
					'editor_script' => $block . '-script',
				)
			);
		}
	}
);
