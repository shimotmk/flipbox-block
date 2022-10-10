/**
 * WordPress dependencies
 */
import { BlockList } from '@wordpress/block-editor';
import { useContext, createPortal } from '@wordpress/element';

export default function InlineStyles( { flipboxHeight, instanceId } ) {
	const styleElement = useContext( BlockList.__unstableElementContext );

	const editorCss = `.flip-box-block-edit-${ instanceId } {
		height: ${ flipboxHeight }!important;
	}`;

	const InlineStyle = () => {
		return <style>{ editorCss }</style>;
	};

	return editorCss && styleElement
		? createPortal( <InlineStyle />, styleElement )
		: null;
}
