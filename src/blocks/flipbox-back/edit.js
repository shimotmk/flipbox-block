import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import './editor.scss';

export default function Edit(props) {
	const blockProps = useBlockProps({
		className: 'flip-box-back',
	});
	const getBlockTypes = select('core/blocks').getBlockTypes();
	const AllBlockName = getBlockTypes.map((blockType) => (
		blockType.name
	));
	const ALLOWED_BLOCKS = AllBlockName.filter(item => !item.match(/flipbox-block/));

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS} />
		</div>
	);
}
