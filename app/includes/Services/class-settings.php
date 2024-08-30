<?php

/**
 * Settings functionality
 *
 * @since 1.0.0
 * @package FlexQuiz\Services
 */

namespace FlexQuiz\Services;

defined( 'ABSPATH' ) || exit;

/**
 * Settings class.
 *
 * @since 1.0.0
 */
final class Settings {

	public static function general() {
		$redirect_url = get_option( 'fxquiz_redirect_url', home_url() );

		return array(
			'submissionStatus'     => get_option( 'fxquiz_submission_status', 'public' ),
			'redirectUrl'          => empty( $redirect_url ) ? home_url() : $redirect_url,
			'adminEmails'          => get_option( 'fxquiz_admin_emails', '' ),
			'showStepsBar'         => get_option( 'fxquiz_show_steps_bar', false ),
			'subscribeNewsletter'  => get_option( 'fxquiz_subscribe_newsletter', false ),
			'allowSingleAttempt'   => get_option( 'fxquiz_allow_single_attempt', false ),
			'headline'             => get_option( 'fxquiz_headline', esc_html__( 'Good Luck on the Exam!', 'flex-quiz' ) ),
			'personalInfoStepText' => get_option( 'fxquiz_personal_info_step_text', esc_html__( 'Please enter your Name, Date of Birth and E-mail', 'flex-quiz' ) ),
		);
	}

	public static function layout() {
		$banner_id = get_option( 'fxquiz_exam_banner', '' );
		$bannerUrl = wp_get_attachment_url( $banner_id );

		return array(
			'mainColor'       => get_option( 'fxquiz_main_color', '#0e2954' ),
			'boxColor'        => get_option( 'fxquiz_box_color', '#fff' ),
			'resultBoxColor'  => get_option( 'fxquiz_result_box_color', '#0e2954' ),
			'resultTextColor' => get_option( 'fxquiz_result_text_color', '#fff' ),
			'checkboxColor'   => get_option( 'fxquiz_checkbox_color', '#14325b' ),
			'nextButtonColor' => get_option( 'fxquiz_next_button_color', '#e40713' ),
			'examBanner'      => get_option( 'fxquiz_exam_banner', '' ),
			'examBannerUrl'   => $bannerUrl,
			'showBanner'      => get_option( 'fxquiz_show_banner', false ),
		);
	}

	public static function notification() {
		return array(
			'participant_submission_result_subject' => get_option( 'fxquiz_participant_submission_result_notification_subject', 'Quiz Results and Personal Information Confirmation' ),
			'participant_submission_result_cc'      => get_option( 'fxquiz_participant_submission_result_notification_cc', '' ),
			'participant_submission_result_content' => get_option( 'fxquiz_participant_submission_result_notification_message_content', '' ),
		);
	}
}
