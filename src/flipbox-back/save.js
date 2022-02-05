import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: `flip-box-block-back`,
	} );
	return (
		<div { ...blockProps }>
			<div className="flip-box-block-back-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
