import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Example Plugin – hello from the editor!',
				'example-plugin'
			) }
			<br />
			{__(
				'editor translate add!',
				'example-plugin'
			)}
		</p>
	);
}
