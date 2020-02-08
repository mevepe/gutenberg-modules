<?php

/**
 * Plugin Name: Gutenberg Core
 * Plugin URI: https://github.com/WordPress/gutenberg-examples
 * Description: This is a plugin demonstrating how to register new blocks for the Gutenberg editor.
 * Version: 1.1.0
 * Author: the Gutenberg Team
 *
 * @package gutenberg-examples
 */

function enqueue_modules()
{
    $asset_file = include(plugins_url(__FILE__) . 'build/index.asset.php');

    wp_register_script(
        'modules-src',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-data', 'wp-element', 'wp-components', 'wp-editor'),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type('gutenberg-modules/columns', array(
        'editor_script' => 'modules-src',
    ));
}
add_action('enqueue_block_editor_assets', 'enqueue_modules');
