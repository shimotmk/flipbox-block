import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import './editor.scss';

export default function Edit() {
	// インナーブロックの外側の要素を指定
	const blockProps = useBlockProps({
		className: 'flip-box-block-front',
	});

	// 許可するブロックをflipbox-blockは除く
	const getBlockTypes = select('core/blocks').getBlockTypes();
	const AllBlockName = getBlockTypes.map((blockType) => (
		blockType.name
	));
	const ALLOWED_BLOCKS = AllBlockName.filter(item => !item.match(/flipbox-block/));

	return (
		<>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					templateLock={false}
				/>
			</div>
		</>
	);
}
