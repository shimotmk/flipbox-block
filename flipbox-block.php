<?php
/**
 * Plugin Name:       Flip Box Block
 * Plugin URI:        https://github.com/shimotmk/flipbox-block
 * Description:       Flip Box Block is a block plugin for the WordPress block editor that allows you to freely place blocks in front and behind.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.2
 * Author:            Tomoki Shimomura
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flipbox-block
 *
 * @package           flipbox-block
 */

defined( 'ABSPATH' ) || exit;

add_action('init',
	function () {
		$blocks = array(
			'flipbox',
			'flipbox-front',
			'flipbox-back'
		);
		foreach ( $blocks as $block ) {
			register_block_type(
				plugin_dir_path( __FILE__ ) . 'build/' . $block . '/',
			);
		}
	}
);
