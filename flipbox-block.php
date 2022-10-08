<?php
/**
 * Plugin Name:       Flip Box Block
 * Plugin URI:        https://flip-box-block.shimomuratomoki.com/
 * Description:       Flip Box Block is a block plugin for the WordPress block editor that allows you to freely place blocks in front and behind.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.18
 * Stable tag:        0.1.18
 * Author:            Tomoki Shimomura
 * Author URI:        https://flip-box-block.shimomuratomoki.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flipbox-block
 *
 * @package           flipbox-block
 */

defined( 'ABSPATH' ) || exit;

define( 'FLIP_BOX_BLOCK_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'FLIP_BOX_BLOCK_DIR_URL', plugin_dir_url( __FILE__ ) );

require_once __DIR__ . '/lib/load.php';
