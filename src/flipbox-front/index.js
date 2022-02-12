import { registerBlockType } from '@wordpress/blocks';

import json from './block.json';
import edit from './edit';
import save from './save';
import { flipBoxFrontIcon } from './icon.js';

const { name, ...settings } = json;

registerBlockType( name, {
	icon: flipBoxFrontIcon,
	...settings,
	edit,
	save,
} );
