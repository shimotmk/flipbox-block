import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import json from './block.json';
import edit from './edit';
import save from './save';

const { name, ...settings } = json;

registerBlockType( name, {
	...settings,
	edit,
	save,
} );
