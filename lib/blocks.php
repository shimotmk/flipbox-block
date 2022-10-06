<?php
/**
 * Load API functions, register scripts and actions, etc.
 *
 * @package flipbox-block
 */

add_action('init',
	function () {
		$blocks = array(
			'flipbox',
			'flipbox-front',
			'flipbox-back'
		);
		foreach ( $blocks as $block ) {
			register_block_type(
				FLIP_BOX_BLOCK_DIR_PATH . 'build/' . $block . '/',
			);
		}
	}
);
