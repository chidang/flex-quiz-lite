<?php

/**
 * Exam settings
 *
 * @since 2.0.0
 * @package FlexQuiz\Settings
 */

namespace FlexQuiz\Settings;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\PostTypes;

final class ExamSettings {

	// Constructor to initialize the class
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_settings_submenu' ) );
	}

	// Add submenu under 'exams' custom post type
	public function add_settings_submenu() {
		add_submenu_page(
			'edit.php?post_type=' . PostTypes\Exam::$name, // Parent slug (custom post type)
			esc_html__( 'Flex Quiz Settings', 'flex-quiz' ), // Page title
			esc_html__( 'Settings', 'flex-quiz' ), // Menu title
			'manage_options', // Capability
			'exams-settings', // Menu slug
			array( $this, 'settings_page_html' ) // Callback function
		);
	}

	public function settings_page_html() {
		?>
		<div class="wrap">
			Loading...
		</div>
		<?php
	}
}
