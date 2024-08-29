<?php

/**
 * Submission functionality
 *
 * @since 1.0.0
 * @package Flex\Services
 */

namespace Flex\Services;

use Flex\PostTypes;

/**
 * Submission class.
 *
 * @since 1.0.0
 */
final class Submission {

	public static function check_participant_exam_submission( $exam_id, $email ) {
		if ( empty( get_option( 'fxq_exams_allow_single_attempt', false ) ) ) {
			return false;
		}

		// Define the meta query
		$meta_query = array(
			'relation' => 'AND',
			array(
				'key'     => 'exam_id',
				'value'   => $exam_id,
				'compare' => '=',
			),
			array(
				'key'     => 'email',
				'value'   => sanitize_email( $email ),
				'compare' => '=',
			),
		);

		// Define the query arguments
		$args = array(
			'post_type'      => PostTypes\Submission::$name,
			'meta_query'     => $meta_query,
			'posts_per_page' => 1, // We only need to know if at least one post exists
		);

		// Execute the query
		$query = new \WP_Query( $args );

		// Check if any posts were found
		if ( $query->have_posts() ) {
			return true; // The user has already submitted the exam
		} else {
			return false; // No submission found
		}
	}
}
