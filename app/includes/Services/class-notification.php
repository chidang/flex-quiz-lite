<?php

/**
 * Notification functionality
 *
 * @since 1.0.0
 * @package FlexQuiz\Services
 */

namespace FlexQuiz\Services;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\TemplateBuilder;

/**
 * Notification class.
 *
 * @since 1.0.0
 */
final class Notification {

	public static function admin_notify( $submission_id ) {
		$site_name = get_bloginfo( 'name' );
		$from      = get_option( 'admin_email' );

		$subject = get_option( 'fxquiz_participant_submission_result_notification_subject', 'Quiz Results and Personal Information Confirmation' );

		$admin_emails = get_option( 'fxquiz_admin_emails', '' );

		if ( empty( $admin_emails ) ) {
			return;
		}

		// Email headers.
		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			"From: $site_name <$from>",
		);

		self::configure_smtp();

		$mail_body = TemplateBuilder\Submission::result( 'admin', $submission_id );

		wp_mail( $admin_emails, $subject, $mail_body, $headers );
	}

	public static function participant_submisson_result_notify( $submission_id ) {
		$site_name = get_bloginfo( 'name' );
		$from      = get_option( 'admin_email' );

		$subject = get_option( 'fxquiz_participant_submission_result_notification_subject', 'Quiz Results and Personal Information Confirmation' );

		$participant_email = get_post_meta( $submission_id, 'email', true );

		if ( empty( $participant_email ) ) {
			return;
		}

		// Email headers.
		$headers = array(
			'Content-Type: text/html; charset=UTF-8',
			"From: $site_name <$from>",
		);

		$mail_cc = get_option( 'fxquiz_participant_submission_result_notification_cc', '' );
		if ( ! empty( $mail_cc ) ) {
			$mails = explode( ',', $mail_cc );
			if ( ! empty( $mails ) ) {
				foreach ( $mails as $mail ) {
					$headers[] = 'CC: ' . $mail;
				}
			}
		}

		self::configure_smtp();

		$mail_body = TemplateBuilder\Submission::result( 'participant', $submission_id );

		wp_mail( $participant_email, $subject, $mail_body, $headers );
	}
}
