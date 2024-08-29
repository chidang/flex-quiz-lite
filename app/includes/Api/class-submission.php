<?php

/**
 * Submission API
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

namespace Flex\Api;

use Flex\Services;
use Flex\PostTypes;
use Flex\Helpers\Common;

class Submission {


	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route(
			Common::API_SLUG,
			'/submit-exam',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'handle_exam_submission' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			Common::API_SLUG,
			'/check-personal-info',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'check_personal_info' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	public function check_personal_info( $request ) {
		$params       = $request->get_json_params();
		$exam_id      = intval( $params['exam_id'] );
		$personalInfo = $params['personalInfo'];
		$email        = sanitize_email( $personalInfo['email'] );
		$phone        = sanitize_text_field( $personalInfo['phone'] );
		$address      = sanitize_text_field( $personalInfo['address'] );

		if ( Services\Submission::check_participant_exam_submission( $exam_id, $email ) ) {
			$message = __( 'You have already started this exam. This exam can only be done once.', 'flex-quiz' );
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => $message,
				),
				200
			);
		} else {
			//create participant if Store Participant information after Step 1 = true
			if ( get_option( 'fxq_exams_create_participant_after_step_1', false ) ) {
				$participant = array(
					'full_name'  => sanitize_text_field( $personalInfo['fullName'] ),
					'birth_date' => sanitize_text_field( $personalInfo['dateOfBirth'] ),
					'email'      => $email,
					'phone'      => $phone,
					'address'    => $address,
				);
				Services\Participant::create_or_update_participant( $participant );
			}

			return new \WP_REST_Response( array( 'success' => true ), 200 );
		}
	}

	public function handle_exam_submission( $request ) {
		$params               = $request->get_json_params();
		$title                = sanitize_text_field( $params['title'] );
		$personalInfo         = $params['personalInfo'];
		$exam_id              = intval( $params['post_id'] );
		$subscribe_newsletter = $personalInfo['subscribeNewsletter'];
		$email                = sanitize_email( $personalInfo['email'] );
		$phone                = sanitize_text_field( $personalInfo['phone'] );
		$address              = sanitize_text_field( $personalInfo['address'] );
		$answers              = $params['answers'];
		$achieved_score       = sanitize_text_field( $params['achievedScore'] );
		$max_points           = sanitize_text_field( $params['maxPoints'] );
		// Create a new post in the 'exam_submission' custom post type
		$submission_id = wp_insert_post(
			array(
				'post_title'  => $title,
				'post_type'   => PostTypes\Submission::$name,
				'post_status' => 'publish',
				'meta_input'  => array(
					'exam_id'              => $exam_id,
					'subscribe_newsletter' => $subscribe_newsletter,
					'full_name'            => sanitize_text_field( $personalInfo['fullName'] ),
					'phone'                => $phone,
					'email'                => $email,
					'birth_date'           => sanitize_text_field( $personalInfo['dateOfBirth'] ),
					'address'              => $address,
					'answers'              => maybe_serialize( $answers ),
					'achieved_score'       => intval( $achieved_score ),
					'max_points'           => intval( $max_points ),
				),
			)
		);

		if ( is_wp_error( $submission_id ) ) {
			return new \WP_Error( 'submission_failed', __( 'Failed to create exam submission', 'flex-quiz' ), array( 'status' => 500 ) );
		}

		$participant = array(
			'full_name'  => sanitize_text_field( $personalInfo['fullName'] ),
			'birth_date' => sanitize_text_field( $personalInfo['dateOfBirth'] ),
			'email'      => $email,
			'phone'      => $phone,
			'address'    => $address,
		);

		$participant_id = Services\Participant::create_or_update_participant( $participant, $submission_id );

		update_post_meta( $submission_id, 'participant_id', $participant_id );

		Services\Exam::update_participants( $exam_id, $participant );// save paticipant into exams (participants array)

		if ( get_option( 'fxq_exams_send_exam_result_to_admin', false ) ) {
			Services\Notification::admin_notify( $submission_id );
		}

		if ( get_option( 'fxq_exams_send_exam_result_to_participant', false ) ) {
			Services\Notification::participant_submisson_result_notify( $submission_id );
		}

		return new \WP_REST_Response(
			array(
				'success'       => true,
				'submission_id' => $submission_id,
			),
			200
		);
	}
}
