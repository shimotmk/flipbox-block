<?php
/**
 * 0系バージョン互換用
 *
 * @package flipbox-block
 */

/**
 * CSS
 */
function flip_box_block_get_style_v0_1_18() {
	$css = '
	.flip-box-block:not(.block-editor-block-list__block) {
		background-color: transparent;
		height: 500px;
		perspective: 10000px;
	}
	.flip-box-block:not(.block-editor-block-list__block) .flip-box-block-innner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform;
		transition-duration: 1s;
		transform-style: preserve-3d;
	}
	.flip-box-block:not(.block-editor-block-list__block):hover > .flip-box-block-innner {
		transform: rotateY(180deg);
	}
	.flip-box-block:not(.block-editor-block-list__block) .flip-box-block-front,
	.flip-box-block:not(.block-editor-block-list__block) .flip-box-block-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}
	.flip-box-block:not(.block-editor-block-list__block) .flip-box-block-back {
		transform: rotateY(180deg);
	}
	';
	return $css;
}

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
	$css = flip_box_block_get_style_v0_1_18();
	wp_enqueue_block_support_styles( 'wp-block-library', $css );
	return $block_content;

}
add_filter( 'render_block_flipbox-block/flipbox', 'flip_box_block_render_block_v0_1_18', 10, 2 );
