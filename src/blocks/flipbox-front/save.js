import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save() }>
			<h2>Front Side</h2>
			<InnerBlocks.Content />
		</div>
	);
}
