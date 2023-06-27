import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import json from './block.json';
import edit from './edit';
import save from './save';
import { flipBoxBackIcon } from './icon.js';

const { name, ...settings } = json;

registerBlockType( name, {
	title: __( 'Flip Box Back', 'flip-box-block' ),
	description: __( 'The block that appears in the back.', 'flip-box-block' ),
	icon: flipBoxBackIcon,
	...settings,
	edit,
	save,
} );
