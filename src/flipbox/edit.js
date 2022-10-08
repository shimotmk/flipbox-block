/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function flipboxEdit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { flipboxHeight } = attributes;

	const ALLOWED_BLOCKS = [
		'flipbox-block/flipbox-front',
		'flipbox-block/flipbox-back',
	];
	const TEMPLATE = [
		[ 'flipbox-block/flipbox-front' ],
		[ 'flipbox-block/flipbox-back' ],
	];

	useEffect( () => {
		// deprecatedがあったら変えていく
		setAttributes( { flipboxVersion: '1.0.0' } );
	}, [ clientId ] );

	// 編集画面のみで一意のidを振る
	const instanceId = useInstanceId( flipboxEdit );

	const blockProps = useBlockProps( {
		className: `flip-box-block flip-box-block-edit-${ instanceId }`,
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
		<div>
			<InspectorControls>
				<PanelBody
					title={ __( 'Flip Box Block setting', 'flipbox-block' ) }
				>
					<ButtonGroup>
						<Button
							className={
								isAnimation === 'front'
									? 'is-primary'
									: 'is-default'
							}
							onClick={ () => {
								setIsAnimation( 'front' );
							} }
						>
							Front
						</Button>
						<Button
							className={
								isAnimation === 'back'
									? 'is-primary'
									: 'is-default'
							}
							onClick={ () => {
								setIsAnimation( 'back' );
							} }
						>
							Back
						</Button>
					</ButtonGroup>
					<UnitControl
						label={ __( 'Height', 'flipbox-block' ) }
						labelPosition="edge"
						value={ flipboxHeight }
						__unstableInputWidth="80px"
						onChange={ ( value ) => {
							setAttributes( { flipboxHeight: value } );
						} }
					/>
				</PanelBody>
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
		</div>
	);
}
