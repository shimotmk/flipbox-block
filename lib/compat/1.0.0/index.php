<?php
/**
 * Server-side rendering of the `flipbox-block` block.
 *
 * @package flipbox-block
 */

 /**
 * Update allowed inline style attributes list.
 *
 * Note: This should be removed when the minimum required WP version is >= 6.1.
 * declarationsを使えるようにする
 *
 * @param string[] $attrs Array of allowed CSS attributes.
 * @return string[] CSS attributes.
 */
function flip_box_block_safe_style_attrs_6_1( $attrs ) {
	$attrs[] = 'perspective';
	$attrs[] = 'position';
	$attrs[] = 'transition';
	$attrs[] = 'transition-duration';
	$attrs[] = 'transform-style';
	$attrs[] = 'transform';
	$attrs[] = '-webkit-backface-visibility';
	return $attrs;
}
add_filter( 'safe_style_css', 'flip_box_block_safe_style_attrs_6_1' );

/**
 * rotateY(180deg))を使えるようにする
 */
function flip_box_block_safecss_filter_attr_allow_css( $allow_css, $css_test_string ) {
	$css_test_string = preg_replace( '/\(?rotateY\([0-9]deg\)*\)/', '', $css_test_string );
	return $css_test_string;
}
add_filter( 'safecss_filter_attr_allow_css', 'flip_box_block_safecss_filter_attr_allow_css', 10,2 );

/**
 * flip_box_block the CSS corresponding to the provided layout.
 *
 * @param string  $selector                      CSS selector.
 * @param array   $attributes
 *
 * @see https://github.com/WordPress/gutenberg/blob/3358251ae150e33dd6c0e0fb15be110cca1b5c59/lib/block-supports/layout.php#L41
 *
 * @return string                                CSS style.
 */
function flip_box_block_get_style_v1_0_0( $selector, $attributes ) {
	$css_rules = array();

	$css_rules = array(
		array(
			'selector'     => $selector,
			'declarations' => array(
				'background-color' => 'transparent',
				'height'           => $attributes['flipboxHeight'] ? $attributes['flipboxHeight'] : '500px',
				'perspective'      => '10000px',
			),
		),
		array(
			'selector'     => $selector . ' .flip-box-block-innner',
			'declarations' => array(
				'position'            => 'relative',
				'width'               => '100%',
				'height'              => '100%',
				'transition'          => 'transform',
				'transition-duration' => '1s',
				'transform-style'     => 'preserve-3d',
			),
		),
		array(
			'selector'     => $selector . ':hover > .flip-box-block-innner',
			'declarations' => array(
				'transform' => 'rotateY(180deg)',
			),
		),
		array(
			'selector'     => $selector . ' .flip-box-block-front,' . $selector . ' .flip-box-block-back',
			'declarations' => array(
				'position'=> 'absolute',
				'width'=> '100%',
				'height'=> '100%',
				'-webkit-backface-visibility'=> 'hidden',
				'backface-visibility'=> 'hidden',
			),
		),
		array(
			'selector'     => $selector . ' .flip-box-block-back',
			'declarations' => array(
				'transform' => 'rotateY(180deg)',
			),
		),
	);

	if ( ! empty( $css_rules ) ) {
		return wp_style_engine_get_stylesheet_from_css_rules(
			$css_rules,
			array(
				'context' => 'flipbox-block-styles',
				'enqueue' => true,
			)
		);
	}
}

/**
 * Renders the `flipbox-block` block on server.
 *
 * @param array $block_content The block attributes.
 * @param array $block    The block rendered content.
 */
function flip_box_block_render_block_v1_0_0( $block_content, $block ) {

	if ( $block['attrs']['flipboxVersion'] !== '1.0.0') {
		return $block_content;
	}

	$block_classname = 'flip-box-block';
	$class_names     = array();
	$unique_class    = wp_unique_id( 'flip-box-block-id-' );
	$class_names[]   = $unique_class;

	// enqueue css
	flip_box_block_get_style_v1_0_0( ".$block_classname.$unique_class", $block['attrs'] );

	$content = preg_replace(
		'/' . preg_quote( 'class="', '/' ) . '/',
		'class="' . esc_attr( implode( ' ', $class_names ) ) . ' ',
		$block_content,
		1
	);

	return $content;

}
add_filter( 'render_block_flipbox-block/flipbox', 'flip_box_block_render_block_v1_0_0', 10, 2 );
