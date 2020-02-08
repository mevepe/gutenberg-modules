/**
 * WordPress dependencies
 */
import '@wordpress/core-data';
import '@wordpress/block-editor';
import {
	registerBlockType,
	setDefaultBlockName,
	setFreeformContentHandlerName,
	setUnregisteredTypeHandlerName,
	setGroupingBlockName,
	unstable__bootstrapServerSideBlockDefinitions, // eslint-disable-line camelcase
} from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as columns from './columns';
import * as column from './column';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */
const registerBlock = ( block ) => {
	if ( ! block ) {
		return;
	}
	const { metadata, settings, name } = block;

	console.log(name);

	if ( metadata ) {
		unstable__bootstrapServerSideBlockDefinitions( { [ name ]: metadata } );
	}
	registerBlockType( name, settings );
};

/**
 * Function to register core blocks provided by the block editor.
 *
 * @example
 * ```js
 * import { registerCoreBlocks } from '@wordpress/block-library';
 *
 * registerCoreBlocks();
 * ```
 */
export const registerNewBlocks = () => {
	[
		// Register all remaining core blocks.
		columns,
		column,
	].forEach( registerBlock );

	// setDefaultBlockName( paragraph.name );
	// if ( window.wp && window.wp.oldEditor ) {
	// 	setFreeformContentHandlerName( classic.name );
	// }
	// setUnregisteredTypeHandlerName( missing.name );
};

registerNewBlocks();

/**
 * Function to register experimental core blocks depending on editor settings.
 *
 * @param {Object} settings Editor settings.
 *
 * @example
 * ```js
 * import { __experimentalRegisterExperimentalCoreBlocks } from '@wordpress/block-library';
 *
 * __experimentalRegisterExperimentalCoreBlocks( settings );
 * ```
 */
export const __experimentalRegisterExperimentalCoreBlocks =
	process.env.GUTENBERG_PHASE === 2
		? ( settings ) => {
				const {
					__experimentalEnableLegacyWidgetBlock,
					__experimentalEnableFullSiteEditing,
				} = settings;

				[
					__experimentalEnableLegacyWidgetBlock ? legacyWidget : null,
					socialLinks,
					...socialLink.sites,

					// Register Full Site Editing Blocks.
					...( __experimentalEnableFullSiteEditing
						? [
								siteTitle,
								templatePart,
								postTitle,
								postContent,
								postAuthor,
								postDate,
								postExcerpt,
						  ]
						: [] ),
				].forEach( registerBlock );
		  }
		: undefined;
