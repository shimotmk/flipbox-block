import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

import './editor.scss';

export default function flipboxEdit(props) {
	const { attributes, setAttributes, clientId, toggleSelection } = props;
	const {
		editFlipbox,
		flipboxType,
		selectedFlipbox,
		flipboxWidth,
		flipboxHeight,
		transitionSpeed
	} = attributes;

	const ALLOWED_BLOCKS = ['flipbox-block/flipbox-front', 'flipbox-block/flipbox-back'];
	const TEMPLATE = [['flipbox-block/flipbox-front'], ['flipbox-block/flipbox-back']];

	// 編集画面のみで一意のidを振る
	const instanceId = useInstanceId(flipboxEdit);

	// このブロックの一番外側に高さを持たせる
	let style;
	if (flipboxHeight) {
		style = { height: flipboxHeight };
	}
	const blockProps = useBlockProps({
		className: `flip-box-block flip-box-block-edit-${instanceId}`,
		style,
	});

	// エディター用のインラインCSSを作る
	let editorInlineStyle = '';
	editorInlineStyle += `
		.flip-box-block-edit-${instanceId} {
			height: ${flipboxHeight}!important;
		}
	`;

	return (
		<div>
			<InspectorControls>
				<PanelBody title={__('Balloon setting', 'flipbox-block')}>
					<ButtonGroup>
						<Button
							className={editFlipbox === 'front' ? 'is-primary' : 'is-default'}
							onClick={() =>
								setAttributes({ editFlipbox: 'front' })
							}
						>
							Front
						</Button>
						<Button
							className={editFlipbox === 'back' ? 'is-primary' : 'is-default'}
							onClick={() =>
								setAttributes({ editFlipbox: 'back' })
							}
						>
							Back
						</Button>
					</ButtonGroup>
					<ToggleControl
						label={__('Stop Animation', 'flipbox-block')}
						checked={selectedFlipbox}
						onChange={(checked) =>
							setAttributes({ selectedFlipbox: checked })
						}
					/>
					<UnitControl
						label={__('Height')}
						labelPosition="edge"
						value={flipboxHeight}
						__unstableInputWidth="80px"
						onChange={(value) => {
							setAttributes({ flipboxHeight: value });
						}}
					/>
					<UnitControl
						label={__('Width')}
						labelPosition="edge"
						value={flipboxWidth}
						__unstableInputWidth="80px"
						onChange={(value) => {
							setAttributes({ flipboxWidth: value });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<style>
				{editorInlineStyle}
			</style>
			<div {...blockProps}>
				<div
					className={
						editFlipbox === 'front'
						? 'flip-box selected-flipbox-front'
						: 'flip-box selected-flipbox-back'
					}
					style={{
						height: flipboxHeight,
					}}
					>
					<InnerBlocks
						style={{
							height: flipboxHeight,
						}}
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock="all"
					/>
				</div>
			</div>
		</div>
	);
}
