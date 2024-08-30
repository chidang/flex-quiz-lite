<?php

/**
 *  Notification Settings API
 *
 * @since 1.0.0
 * @package FlexQuiz
 */

namespace FlexQuiz\Api;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\Helpers\Common;

class NotificationSettings {

	protected $rest_base = 'notification-settings';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route(
			Common::API_SLUG,
			$this->rest_base,
			array(
				array(
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_participant_submission_result_notification_settings' ),
					'permission_callback' => array( $this, 'permissions_check' ),
				),
				array(
					'methods'             => 'POST',
					'callback'            => array( $this, 'save_participant_submission_result_notification_settings' ),
					'permission_callback' => array( $this, 'permissions_check' ),
				),
			)
		);
	}

	public function permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}

	public function get_participant_submission_result_notification_settings( $request ) {
		$settings = array(
			'subject'         => get_option( 'fxquiz_participant_submission_result_notification_subject', '' ),
			'message_content' => get_option( 'fxquiz_participant_submission_result_notification_message_content', '' ),
		);

		return rest_ensure_response( $settings );
	}

	public function save_participant_submission_result_notification_settings( $request ) {
		$params = $request->get_json_params();

		update_option( 'fxquiz_participant_submission_result_notification_subject', sanitize_text_field( $params['subject'] ) );
		update_option( 'fxquiz_participant_submission_result_notification_message_content', wp_kses_post( $params['message_content'] ) );

		return rest_ensure_response( array( 'success' => true ) );
	}
}
