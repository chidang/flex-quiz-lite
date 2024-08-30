<?php

/**
 * Activate plugin functionality
 *
 * @since 1.0.0
 * @package FlexQuiz
 */

namespace FlexQuiz;

defined( 'ABSPATH' ) || exit;

/**
 * Core class.
 *
 * @since 1.0.0
 */
final class FlexQuizActivator {

	/**
	 * Class constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {

	}

	public function activate() {
		if ( is_multisite() ) {
			$blog_id = get_current_blog_id();
			switch_to_blog( $blog_id );
			if ( 'v1' !== get_option( 'fxquiz_update_secondary_version' ) ) {
				$this->update_global_settings();
				$this->update_default_settings();
			}
			restore_current_blog();
		} elseif ( 'v1' !== get_option( 'fxquiz_update_secondary_version' ) ) {
				$this->update_global_settings();
				$this->update_default_settings();
		}
	}

	public function update_global_settings() {
		update_option( 'fxquiz_update_secondary_version', 'v1' );
	}

	public function update_default_settings() {
		$this->update_default_email_templates();
	}

	public function update_default_email_templates() {
		$this->update_participant_submission_email_template();
	}

	public function update_participant_submission_email_template() {
		$email_subject = get_option( 'fxquiz_participant_submission_result_notification_subject', '' );
		if ( empty( $email_subject ) ) {
			update_option( 'fxquiz_participant_submission_result_notification_subject', 'Quiz Results and Personal Information Confirmation' );
		}
		$email_content = get_option( 'fxquiz_participant_submission_result_notification_message_content', '' );
		if ( empty( $email_content ) ) {
			ob_start();
			include FLEX_QUIZ_DIR_PATH . '/app/email-templates/participant-submission-result-notification.php';
			$email_content = ob_get_clean();
			update_option( 'fxquiz_participant_submission_result_notification_message_content', $email_content );
		}
	}

	public function deactivate() {
		update_option( 'fxquiz_update_secondary_version', '' );
	}
}
