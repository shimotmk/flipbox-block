import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import './editor.scss';
import { useEffect } from '@wordpress/element';

export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;
	const blockProps = useBlockProps({
		className: 'flip-box-front',
	});
	const getBlockTypes = select('core/blocks').getBlockTypes();
	const AllBlockName = getBlockTypes.map((blockType) => (
		blockType.name
	));
	const ALLOWED_BLOCKS = AllBlockName.filter(item => !item.match(/flipbox-block/));

	return (
		<div {...blockProps}>
			<GenerateFlipboxFrontEditorCss {...props} />
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}/>
		</div>
	);
}

const GenerateFlipboxFrontEditorCss = (props) => {
	const { attributes, setAttributes,clientId } = props;
	const {
		flipboxHeight,
		style
	} = attributes;

	// 親ブロックのclientIdを配列で取得
	// 親ブロックの値を取得
	var parentId = select('core/block-editor').getBlockParents(clientId);
	let parentAtts = select('core/block-editor').getBlockAttributes(parentId);

	if (typeof style !== 'undefined'){
		const spacing = style['spacing'];
		if (typeof spacing !== 'undefined') {
			const padding = spacing['padding'];
		}
	}
	let paddingTop = '2rem';
	let paddingBottom = '2rem';
	if (typeof padding !== 'undefined') {
		paddingTop = padding['top'];
		paddingBottom = padding['bottom'];
	}

	if (parentAtts.flipboxHeight) {
		return (
			<style>
				{`
				.wp-block-flipbox-block-flipbox .flip-box-front .block-editor-inner-blocks,
				.wp-block-flipbox-block-flipbox .flip-box-back .block-editor-inner-blocks{
					/*padddingの値を取得して高さを計算*/
					height: calc( ${parentAtts.flipboxHeight} - ${paddingTop} - ${paddingBottom} )!important;
				}
				`}
			</style>
		);
	}
};

