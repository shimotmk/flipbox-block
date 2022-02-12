import { registerBlockType } from '@wordpress/blocks';

import json from './block.json';
import edit from './edit';
import save from './save';
import { flipBoxBackIcon } from './icon.js';

const { name, ...settings } = json;

registerBlockType( name, {
	icon: flipBoxBackIcon,
	...settings,
	edit,
	save,
} );
