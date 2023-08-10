/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit() {
	// インナーブロックの外側の要素を指定
	const blockProps = useBlockProps( {
		className: 'flip-box-block-front',
	} );

	return (
		<>
			<div { ...blockProps }>
				<InnerBlocks templateLock={ false } />
			</div>
		</>
	);
}
