/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	HeightControl,
} from '@wordpress/block-editor';
import {
	__experimentalToolsPanel as ToolsPanel, // eslint-disable-line
	__experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOption as ToggleGroupControlOption, // eslint-disable-line
} from '@wordpress/components';
import { useInstanceId, useViewportMatch } from '@wordpress/compose';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

function useToolsPanelDropdownMenuProps() {
	const isMobile = useViewportMatch( 'medium', '<' );
	return ! isMobile
		? {
				popoverProps: {
					placement: 'left-start',
					// For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
					offset: 259,
				},
		  }
		: {};
}

export default function FlipBoxEdit( props ) {
	const { attributes, setAttributes } = props;
	const { flipboxHeight } = attributes;
	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	const ALLOWED_BLOCKS = [
		'flipbox-block/flipbox-front',
		'flipbox-block/flipbox-back',
	];
	const TEMPLATE = [
		[ 'flipbox-block/flipbox-front' ],
		[ 'flipbox-block/flipbox-back' ],
	];

	// 編集画面のみで一意のidを振る
	// 公開画面は以下のissuesがマージされてから
	// https://github.com/WordPress/gutenberg/pull/34750
	const instanceId = useInstanceId( FlipBoxEdit );

	// このブロックの一番外側に高さを持たせる
	let style;
	if ( flipboxHeight ) {
		style = { height: flipboxHeight };
	}
	const blockProps = useBlockProps( {
		className: `flip-box-block flip-box-block-edit-${ instanceId }`,
		style,
	} );

	// エディター用のインラインCSSを作る
	let editorInlineStyle = '';
	editorInlineStyle += `
		.flip-box-block-edit-${ instanceId } {
			height: ${ flipboxHeight }!important;
		}
	`;

	// Animationするかどうか
	const [ isAnimation, setIsAnimation ] = useState( 'front' );
	if ( isAnimation === 'back' ) {
		editorInlineStyle += `
			.flip-box-block-edit-${ instanceId } > .flip-box > .block-editor-inner-blocks > .block-editor-block-list__layout {
				transition: transform 0.8s;
				transform: rotateY(180deg);
			}
			.flip-box-block-edit-${ instanceId } > .selected-flipbox-back .flip-box-block-front{
				transform: rotateY(-180deg);
			}
			.flip-box-block-edit-${ instanceId } > .selected-flipbox-back .flip-box-block-back{
				transform: rotateY(180deg);
			}
		`;
	} else if ( isAnimation === 'front' ) {
		editorInlineStyle += `
			.flip-box-block-edit-${ instanceId } > .flip-box > .block-editor-inner-blocks > .block-editor-block-list__layout {
				// transition: transform 0.8s;
				// transform: rotateY(180deg);
			}
			.flip-box-block-edit-${ instanceId } > .selected-flipbox-back .flip-box-block-front{
				transform: rotateY(-180deg);
				z-index: 20;
			}
			.flip-box-block-edit-${ instanceId } > .selected-flipbox-back .flip-box-block-back{
				transform: rotateY(180deg);
				opacity: 0;
    		transition: 1s;
				z-index: 10;
			}
		`;
	}

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Settings' ) }
					resetAll={ () =>
						setAttributes( { flipboxHeight: '500px' } )
					}
					dropdownMenuProps={ dropdownMenuProps }
				>
					<ToolsPanelItem
						label={ __( 'Height' ) }
						isShownByDefault
						hasValue={ () => flipboxHeight !== '500px' }
						onDeselect={ () =>
							setAttributes( { flipboxHeight: '500px' } )
						}
						__nextHasNoMarginBottom
					>
						<ToggleGroupControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							isBlock
							onChange={ ( v ) => {
								setIsAnimation( v );
							} }
							value={ isAnimation }
						>
							<ToggleGroupControlOption
								label="Front"
								value="front"
							/>
							<ToggleGroupControlOption
								label="Back"
								value="back"
							/>
						</ToggleGroupControl>
						<hr />
						<HeightControl
							label={ __( 'Height', 'flip-box-block' ) }
							value={ flipboxHeight }
							onChange={ ( value ) => {
								setAttributes( { flipboxHeight: value } );
							} }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<style>{ editorInlineStyle }</style>
			<div { ...blockProps }>
				<div
					id="getRectBtn"
					className={
						isAnimation === 'front'
							? 'flip-box selected-flipbox-front'
							: 'flip-box selected-flipbox-back'
					}
					style={ {
						height: flipboxHeight,
					} }
				>
					<InnerBlocks
						style={ {
							height: flipboxHeight,
						} }
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock="all"
					/>
				</div>
			</div>
		</>
	);
}
