/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

// const v1_0_0 = {
// 	attributes: {
// 		flipboxVersion: {
// 			type: "string"
// 		}
// 	},
// };

const blockAttributes = {
	editFlipbox: {
		type: 'string',
		default: 'front'
	},
	flipboxHeight: {
			type: 'string',
			default: '500px'
	},
};

 const deprecated = [
	 {
		 attributes: {
			...blockAttributes,
		 },
		 save( { attributes } ) {
				const { flipboxHeight } = attributes;

				let style;
				if ( flipboxHeight ) {
					style = {
						height: flipboxHeight,
					};
				}

				const blockProps = useBlockProps.save( {
					className: `flip-box-block`,
					style,
				} );
			 return (
				<div { ...blockProps }>
					<div className="flip-box-block-innner">
						<InnerBlocks.Content />
					</div>
				</div>
			 );
		 },
	 },
 ];

 export default deprecated;
