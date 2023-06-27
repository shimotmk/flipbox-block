import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './style.scss';
import { flipBoxIcon } from './icon.js';
import json from './block.json';
import edit from './edit';
import save from './save';

const { name, ...settings } = json;

registerBlockType( name, {
	title: __( 'Flip Box', 'flip-box-block' ),
	description: __( 'Flip Box is a block that allows you to freely place blocks back and forth.', 'flip-box-block' ),
	icon: flipBoxIcon,
	...settings,
	edit,
	save,
} );
