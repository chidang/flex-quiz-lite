<?php

/**
 * Settings functionality
 *
 * @since 1.0.0
 * @package Flex\Services
 */

namespace Flex\Services;

/**
 * Settings class.
 *
 * @since 1.0.0
 */
final class Settings {

	public static function general() {
		$redirect_url = get_option( 'fxq_exams_redirect_url', home_url() );

		return array(
			'submissionStatus'     => get_option( 'fxq_exams_submission_status', 'public' ),
			'redirectUrl'          => empty( $redirect_url ) ? home_url() : $redirect_url,
			'adminEmails'          => get_option( 'fxq_exams_admin_emails', '' ),
			'showStepsBar'         => get_option( 'fxq_exams_show_steps_bar', false ),
			'subscribeNewsletter'  => get_option( 'fxq_exams_subscribe_newsletter', false ),
			'allowSingleAttempt'   => get_option( 'fxq_exams_allow_single_attempt', false ),
			'headline'             => get_option( 'fxq_exams_headline', esc_html__( 'Good Luck on the Exam!', 'flex-quiz' ) ),
			'personalInfoStepText' => get_option( 'fxq_exams_personal_info_step_text', esc_html__( 'Please enter your Name, Date of Birth and E-mail', 'flex-quiz' ) ),
		);
	}

	public static function layout() {
		$banner_id = get_option( 'fxq_exams_exam_banner', '' );
		$bannerUrl = wp_get_attachment_url( $banner_id );

		return array(
			'mainColor'       => get_option( 'fxq_exams_main_color', '#0e2954' ),
			'boxColor'        => get_option( 'fxq_exams_box_color', '#fff' ),
			'resultBoxColor'  => get_option( 'fxq_exams_result_box_color', '#0e2954' ),
			'resultTextColor' => get_option( 'fxq_exams_result_text_color', '#fff' ),
			'checkboxColor'   => get_option( 'fxq_exams_checkbox_color', '#14325b' ),
			'nextButtonColor' => get_option( 'fxq_exams_next_button_color', '#e40713' ),
			'examBanner'      => get_option( 'fxq_exams_exam_banner', '' ),
			'examBannerUrl'   => $bannerUrl,
			'showBanner'      => get_option( 'fxq_exams_show_banner', false ),
		);
	}

	public static function notification() {
		return array(
			'participant_submission_result_subject' => get_option( 'fxq_participant_submission_result_notification_subject', 'Quiz Results and Personal Information Confirmation' ),
			'participant_submission_result_cc'      => get_option( 'fxq_participant_submission_result_notification_cc', '' ),
			'participant_submission_result_content' => get_option( 'fxq_participant_submission_result_notification_message_content', '' ),
		);
	}
}
