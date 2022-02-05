import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save({
		className: `flip-box-block-front`,
	});
	return (
		<div {...blockProps}>
			<div className="flip-box-block-front-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
