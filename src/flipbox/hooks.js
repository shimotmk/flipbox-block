/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

function flipboxBlockCanInsertBlockType(
	canInsert,
	blockType,
	rootClientId,
	{ getBlock, getBlockParentsByBlockName }
) {
	if ( blockType.name !== 'flipbox-block/flipbox' ) {
		return canInsert;
	}
	const hasDisallowedParent =
		getBlock( rootClientId )?.name === 'flipbox-block/flipbox' ||
		getBlockParentsByBlockName( rootClientId, 'flipbox-block/flipbox' )
			.length;
	if ( hasDisallowedParent ) {
		return false;
	}
	return true;
}

addFilter(
	'blockEditor.__unstableCanInsertBlockType',
	'flipbox-block/__unstableCanInsertBlockType',
	flipboxBlockCanInsertBlockType
);
