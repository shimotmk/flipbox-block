import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: `flip-box-block`,
	} );

	return (
		<div { ...blockProps }>
			<div className="flip-box-block-innner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
