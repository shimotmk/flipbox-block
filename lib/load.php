<?php
/**
 * Load API functions, register scripts and actions, etc.
 *
 * @package flipbox-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Silence is golden.' );
}

// 0.1.18 compat.
require __DIR__ . '/compat/0.1.18/index.php';

// 1.0.0 compat.
require __DIR__ . '/compat/1.0.0/index.php';

// Plugin specific code.
require __DIR__ . '/blocks.php';
