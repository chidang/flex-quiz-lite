<?php

/**
 * Exam functionality
 *
 * @since 1.0.0
 * @package FlexQuiz\Services
 */

namespace FlexQuiz\Services;

defined( 'ABSPATH' ) || exit;

/**
 * Exam class.
 *
 * @since 1.0.0
 */
final class Exam {

	public static function update_participants( int $exam_id, $participant_id ) {
		if ( ! $participant_id ) {
			return false;
		}
		$participants = get_post_meta( $exam_id, 'participants', true );

		if ( empty( $participants ) ) {
			$participants = array( $participant_id );
		} elseif ( ! in_array( $participant_id, $participants, true ) ) {
			$participants[] = $participant_id;
		}

		update_post_meta( $exam_id, 'participants', $participants );
	}
}
