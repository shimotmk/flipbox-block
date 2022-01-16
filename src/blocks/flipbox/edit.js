import { __ } from '@wordpress/i18n';
import { InnerBlocks,
	useBlockProps, InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';
import './editor.scss';
import { select } from '@wordpress/data';

export default function Edit(props) {
	const { attributes, setAttributes, clientId, toggleSelection } = props;
	const {
		selectedFlipbox,
		flipboxType,
		flipboxWidth,
		flipboxHeight,
		transitionSpeed
	} = attributes;

	const ALLOWED_BLOCKS = ['flipbox-block/flipbox-front', 'flipbox-block/flipbox-back'];
	const TEMPLATE = [['flipbox-block/flipbox-front'], ['flipbox-block/flipbox-back']];

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={__('Balloon setting', 'flipbox-block')}>
					<ToggleControl
						label={__('Set the back side', 'flipbox-block')}
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
			<GenerateFlipboxEditorCss {...props} />
			<div
				className={
					selectedFlipbox
					? 'flip-box selected-flipbox'
					: 'flip-box'
				}
				style={{
					height: flipboxHeight,
				}}
				>
				<InnerBlocks
					className={
						selectedFlipbox
							? 'flip-box-inner selected-flipbox'
							: 'flip-box-inner'
					}
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
					templateLock="all"
				/>
			</div>
		</div>
	);
}

const GenerateFlipboxEditorCss = (props) => {
	const { attributes, clientId } = props;
	const {
		selectedFlipbox,
		flipboxType,
		flipboxWidth,
		flipboxHeight,
		transitionSpeed,
		style
	} = attributes;

	if (flipboxWidth) {
		return (
			<style>
				{`
				.wp-block-flipbox-block-flipbox .flip-box-front,
				.wp-block-flipbox-block-flipbox .flip-box-back{
					height: ${flipboxHeight};
				}
				`}
			</style>
		);
	}
};
