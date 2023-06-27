import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import json from './block.json';
import edit from './edit';
import save from './save';
import { flipBoxFrontIcon } from './icon.js';

const { name, ...settings } = json;

registerBlockType( name, {
	title: __( 'Flip Box Front', 'flip-box-block' ),
	description: __( 'The block that appears in the front.', 'flip-box-block' ),
	icon: flipBoxFrontIcon,
	...settings,
	edit,
	save,
} );
