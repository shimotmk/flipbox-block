/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function FlepboxBackEdit() {
	const blockProps = useBlockProps( {
		className: 'flip-box-block-back',
	} );
	return (
		<>
			<div { ...blockProps }>
				<InnerBlocks templateLock={ false } />
			</div>
		</>
	);
}
