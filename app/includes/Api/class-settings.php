<?php

/**
 * Settings API
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

namespace Flex\Api;

use Flex\Helpers\Common;
use Flex\Services;

class Settings {
	protected $rest_base = '/settings';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route(
			Common::API_SLUG,
			$this->rest_base,
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_settings' ),
				'permission_callback' => array( $this, 'permissions_check' ),
			)
		);

		register_rest_route(
			Common::API_SLUG,
			$this->rest_base,
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'save_settings' ),
				'permission_callback' => array( $this, 'permissions_check' ),
			)
		);
	}

	public function permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}

	public function get_settings( $request ) {
		$private_settings = array(
			'sendExamResultToAdmin'       => get_option( 'fxq_exams_send_exam_result_to_admin', false ),
			'sendExamResultToParticipant' => get_option( 'fxq_exams_send_exam_result_to_participant', false ),
			'createWpUser'                => get_option( 'fxq_exams_create_wp_user', false ),
			'createParticipantAfterStep1' => get_option( 'fxq_exams_create_participant_after_step_1', false ),
		);

		$settings = array_merge( Services\Settings::general(), $private_settings );
		;

		return rest_ensure_response( $settings );
	}

	public function save_settings( $request ) {
		$params = $request->get_json_params();

		update_option( 'fxq_exams_submission_status', sanitize_text_field( $params['submissionStatus'] ) );
		update_option( 'fxq_exams_redirect_url', sanitize_text_field( $params['redirectUrl'] ) );
		update_option( 'fxq_exams_admin_emails', sanitize_text_field( $params['adminEmails'] ) );
		update_option( 'fxq_exams_send_exam_result_to_admin', isset( $params['sendExamResultToAdmin'] ) ? (bool) $params['sendExamResultToAdmin'] : false );
		update_option( 'fxq_exams_send_exam_result_to_participant', isset( $params['sendExamResultToParticipant'] ) ? (bool) $params['sendExamResultToParticipant'] : false );
		update_option( 'fxq_exams_show_steps_bar', isset( $params['showStepsBar'] ) ? (bool) $params['showStepsBar'] : false );
		update_option( 'fxq_exams_create_wp_user', isset( $params['createWpUser'] ) ? (bool) $params['createWpUser'] : false );
		update_option( 'fxq_exams_create_participant_after_step_1', isset( $params['createParticipantAfterStep1'] ) ? (bool) $params['createParticipantAfterStep1'] : false );
		update_option( 'fxq_exams_subscribe_newsletter', isset( $params['subscribeNewsletter'] ) ? (bool) $params['subscribeNewsletter'] : false );
		update_option( 'fxq_exams_allow_single_attempt', isset( $params['allowSingleAttempt'] ) ? (bool) $params['allowSingleAttempt'] : false );
		update_option( 'fxq_exams_headline', sanitize_text_field( $params['headline'] ) );
		update_option( 'fxq_exams_personal_info_step_text', sanitize_text_field( $params['personalInfoStepText'] ) );

		return rest_ensure_response( array( 'success' => true ) );
	}
}
