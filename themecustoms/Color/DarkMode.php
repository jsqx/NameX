<?php

/**
 * @package Theme Customs
 * @author Diego Andrés <diegoandres_cortes@outlook.com>
 * @copyright Copyright (c) 2022, SMF Tricks
 * @license MIT
 */

namespace ThemeCustoms\Color;

if (!defined('SMF'))
	die('No direct access...');

class DarkMode
{
	/**
	 * @var array The dark mode master setting
	 */
	private $_darkmode = true;

	/**
	 * @var int Order position for the dark mode file
	 */
	private $_order_position = 150;

	/**
	 * DarkMode::__construct()
	 *
	 * Initializes the theme dark mode related features
	 * 
	 * @return void|bool Returns false if dark mode is not enabled
	 */
	public function __construct()
	{
		// Check if darkmode is enabled
		if (empty($this->_darkmode))
			return false;

		// Add the dark mode to the theme variables
		add_integration_function('integrate_theme_context', __CLASS__ . '::themeVar#', false, '$themedir/themecustoms/Color/DarkMode.php');

		// Insert the variants using the theme settings.
		if (isset($_REQUEST['th']) && !empty($_REQUEST['th']) && $_REQUEST['th'] == $GLOBALS['settings']['theme_id'])
			add_integration_function('integrate_theme_settings', __CLASS__ . '::settings', false, '$themedir/themecustoms/Color/DarkMode.php');

		// Add the theme variants as a theme option too
		add_integration_function('integrate_theme_options', __CLASS__ . '::userOptions', false, '$themedir/themecustoms/Color/DarkMode.php');

		// Load dark mode CSSS
		$this->darkCSS();

		// Insert the variants JS vars
		$this->addJavaScriptVars();

		// Load the JS file for the variants
		$this->darkJS();
	}

	/**
	 * DarkMode::themeVar()
	 * 
	 * Add a variable for theme settings to have more control over the dark mode
	 * 
	 * @return void
	 */
	public function themeVar()
	{
		global $settings;

		// Add the dark mode to the variables
		$settings['customtheme_darkmode'] = $this->_darkmode;
	}

	/**
	 * DarkMode::setting()
	 *
	 * Inserts the theme settings for the dark mode
	 * 
	 * @return void
	 */
	public static function settings()
	{
		global $context, $txt;

		// Setting type
		if (!empty($context['st_themecustoms_setting_types']))
		{
			// Add the color setting type
			array_push($context['st_themecustoms_setting_types'], 'color');
			// Don't duplicate it if it's already there
			$context['st_themecustoms_setting_types'] = array_unique($context['st_themecustoms_setting_types']);
		}

		// Master setting
		$context['theme_settings'][] = [
			'section_title' => $txt['st_dark_mode'],
			'id' => 'st_theme_mode_default',
			'label' => $txt['st_theme_mode_default'],
			'description' => $txt['st_theme_mode_default_desc'],
			'options' => [
				'light' => $txt['st_light_mode'],
				'dark' => $txt['st_dark_mode'],
			],
			'type' => 'list',
			'default' => 'light',
			'theme_type' => 'color',
		];

		// Allow users to select mode?
		$context['theme_settings'][] = [
			'id' => 'st_enable_dark_mode',
			'label' => $txt['st_enable_dark_mode'],
			'type' => 'checkbox',
			'theme_type' => 'color',
		];
	}

	/**
	 * DarkMode::userOptions()
	 *
	 * Adds the mode selection to the theme options
	 *
	 * @return void
	 */
	public static function userOptions()
	{
		global $context, $txt, $settings;

		// Insert the theme options
		$context['theme_options'] = array_merge(
			[
				$txt['st_theme_mode'],
				[
					'id' => 'st_theme_mode',
					'label' => $txt['st_theme_mode_select'],
					'options' => [
						'light' => $txt['st_light_mode'],
						'dark' => $txt['st_dark_mode'],
					],
					'default' => isset($settings['st_theme_mode_default']) && !empty($settings['st_theme_mode_default']) ? $settings['st_theme_mode_default'] : 'light',
					'enabled' => !empty($settings['st_enable_dark_mode']),
				],
			],
			$context['theme_options']
		);
	}

	/**
	 * DarkMode::darkCSS()
	 *
	 * Loads the dark CSS.
	 *
	 * @return void
	 */
	private function darkCSS()
	{
		global $settings, $options;

		// Do we need dark mode?
		if (empty($settings['st_enable_dark_mode']) && (!isset($settings['st_theme_mode_default']) ||$settings['st_theme_mode_default'] !== 'dark'))
			return;

		// Add the HTML data attribute for color mode
		$settings['themecustoms_html_attributes']['data']['darkmode'] = (!empty($settings['st_enable_dark_mode']) ? ('data-colormode="' . (isset($options['st_theme_mode']) && $options['st_theme_mode'] === 'dark' ? 'dark' : 'light') . '"') : 'data-colormode="dark"');

		// Load the dark CSS
		loadCSSFile('dark.css', ['order_pos' => $this->_order_position], 'smf_darkmode');
	}

	/**
	 * DarkMode::addJavaScriptVars()
	 *
	 * Loads the dark mode JS vars.
	 *
	 * @return void
	 */
	private function addJavaScriptVars()
	{
		global $options, $settings;

		// Theme Mode
		if (!empty($settings['st_enable_dark_mode']))
			addJavaScriptVar('smf_darkmode', '\'' . (isset($options['st_theme_mode']) && $options['st_theme_mode'] === 'dark' ? 'dark' : 'light') . '\'');
	}

	/**
	 * DarkMode::darkJS()
	 *
	 * Loads the dark mode JS.
	 *
	 * @return void
	 */
	private function darkJS()
	{
		global $settings;

		// Load the file only if the swtylswitch is enabled and the user can change variants
		if (!empty($settings['st_enable_dark_mode']))
			loadJavascriptFile(
				'dark.js',
				[
					'minimize' => false,
					'defer' => true,
				],
				'smftheme_js_darkmode'
			);
	}
}