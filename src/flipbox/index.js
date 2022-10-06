import { registerBlockType } from '@wordpress/blocks';
import { flipBoxIcon } from './icon.js';

import deprecated from './deprecated';
import json from './block.json';
import edit from './edit';
import save from './save';

const { name, ...settings } = json;

registerBlockType( name, {
	icon: flipBoxIcon,
	...settings,
	edit,
	save,
	deprecated,
} );
