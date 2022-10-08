<?php
/**
 * 0系バージョン互換用
 *
 * @package flipbox-block
 */

/**
 * Renders the `flipbox-block` block on server.
 *
 * @param array $attributes The block attributes.
 * @param array $content    The block rendered content.
 */
function flip_box_block_render_block_v0_1_18( $block_content, $block ) {

	if ( ! empty( $block['attrs']['flipboxVersion'] )) {
		return $block_content;
	}

	// 0系バージョン互換用
	wp_enqueue_style( 'flipbox-block-v0-style', FLIP_BOX_BLOCK_DIR_URL . 'lib/compat/0.1.18/style.css' );
	return $block_content;

}
add_filter( 'render_block_flipbox-block/flipbox', 'flip_box_block_render_block_v0_1_18', 10, 2 );
