<?php

/**
 * Submission functionality
 *
 * @since 1.0.0
 * @package FlexQuiz\TemplateBuilder
 */

namespace FlexQuiz\TemplateBuilder;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\Services;
use FlexQuiz\Helpers\Common;
/**
 * Submission class.
 *
 * @since 1.0.0
 */
final class Submission {

	public static function result( $recipient_type, $submission_id ) {
		$exam_id        = get_post_meta( $submission_id, 'exam_id', true );
		$exam           = get_post( $exam_id );
		$exam_title     = get_the_title( $exam_id );
		$participant_id = get_post_meta( $submission_id, 'participant_id', true );
		$participant    = get_post( $participant_id );
		$submission     = get_post( $submission_id );

		$mail_body = '';
		if ( 'participant' === $recipient_type ) {
			$mail_body = self::participant_quiz_result_template();
		} else {
			$mail_body = self::admin_quiz_result_template();
		}

		$achieved_score = get_post_meta( $submission_id, 'achieved_score', true );
		$max_points     = get_post_meta( $submission_id, 'max_points', true );
		$average        = round( 100 * $achieved_score / $max_points );

		if ( $participant ) {
			$mail_body = str_replace( '@participant_fullname', get_the_title( $participant_id ), $mail_body );
			$mail_body = str_replace( '@participant_email', get_post_meta( $participant_id, 'email', true ), $mail_body );
			$mail_body = str_replace( '@participant_date_of_birth', Common::participant_birth_date( $participant_id ), $mail_body );
			$mail_body = str_replace( '@participant_phone', get_post_meta( $participant_id, 'phone', true ), $mail_body );
			$mail_body = str_replace( '@participant_address', get_post_meta( $participant_id, 'address', true ), $mail_body );
		}

		if ( $exam ) {
			$mail_body = str_replace( '@quiz_title', $exam_title, $mail_body );
			$mail_body = str_replace( '@quiz_link', get_permalink( $exam_id ), $mail_body );
		}

		if ( $submission ) {
			$mail_body = str_replace( '@result_total_points', $max_points, $mail_body );
			$mail_body = str_replace( '@result_average', $average . '%', $mail_body );
			$mail_body = str_replace( '@result_link', get_permalink( $submission_id ), $mail_body );
		}

		return $mail_body;
	}

	private static function participant_quiz_result_template() {
		$template_settings      = Services\Settings::notification();
		$email_content_template = $template_settings['participant_submission_result_content'];
		if ( empty( $email_content_template ) ) {
			ob_start();
			include FLEX_QUIZ_DIR_PATH . '/app/email-templates/participant-submission-result-notification.php';
			$email_content_template = ob_get_clean();
		}

		return $email_content_template;
	}

	private static function admin_quiz_result_template() {
		ob_start();
		include FLEX_QUIZ_DIR_PATH . '/app/email-templates/admin-submission-result-notification.php';
		$email_content_template = ob_get_clean();

		return $email_content_template;
	}
}
