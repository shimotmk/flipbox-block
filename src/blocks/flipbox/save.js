import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<div { ...useBlockProps.save() }>
			<div className="flip-box">
				<div className="flip-box-inner">
					<div className="flip-box-front">
						<h2>Front Side</h2>
						<InnerBlocks.Content/>
					</div>
					<div className="flip-box-back">
						<h2>Back Side</h2>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
