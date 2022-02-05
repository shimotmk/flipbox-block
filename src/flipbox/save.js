import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		flipboxHeight,
	} = attributes;

	let style;
	if (flipboxHeight) {
		style = { height: flipboxHeight };
	}

	const blockProps = useBlockProps.save({
		className: `flip-box-block`,
		style,
	});

	return (
		<div {...blockProps }>
			<div className="flip-box-block-innner">
				<InnerBlocks.Content/>
			</div>
		</div>
	);
}
