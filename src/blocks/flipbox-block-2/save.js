import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ __(
				'Example Plugin – hello from the saved content!',
				'example-plugin'
			) }
		</p>
	);
}
