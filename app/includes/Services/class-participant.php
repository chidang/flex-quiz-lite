<?php

/**
 * Participant functionality
 *
 * @since 1.0.0
 * @package FlexQuiz\Services
 */

namespace FlexQuiz\Services;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\PostTypes;

/**
 * Participant class.
 *
 * @since 1.0.0
 */
final class Participant {

	private static function update_submissions( $participant_id, int $submission_id ) {
		if ( ! $submission_id ) {
			return false;
		}
		$submissions = get_post_meta( $participant_id, 'submissions', true );

		if ( empty( $submissions ) ) {
			$submissions = array( $submission_id );
		} elseif ( ! in_array( $submission_id, $submissions, true ) ) {
			$submissions[] = $submission_id;
		}

		update_post_meta( $participant_id, 'submissions', $submissions );
	}

	public static function create_or_update_participant( $data, int $submission_id = 0 ) {
		// Ensure the email and phone are provided
		if ( empty( $data['email'] ) ) {
			return new \WP_Error( 'missing_data', 'Email are required.' );
		}
		$title      = sanitize_text_field( $data['full_name'] );
		$email      = sanitize_email( $data['email'] );
		$birth_date = sanitize_text_field( $data['birth_date'] );
		$phone      = sanitize_text_field( $data['phone'] );
		$address    = sanitize_text_field( $data['address'] );

		// Check if a participant with this email already exists
		$args = array(
			'post_type'  => PostTypes\Participant::$name,
			'meta_query' => array(
				array(
					'key'     => 'email',
					'value'   => $email,
					'compare' => '=',
				),
			),
		);

		$query = new \WP_Query( $args );

		if ( $query->have_posts() ) {
			// If a participant exists, update it
			$participant_id = $query->posts[0]->ID;
			$post_data      = array(
				'ID'         => $participant_id,
				'meta_input' => array(
					'birth_date' => $birth_date,
					'phone'      => $phone,
					'address'    => $address,
				),
			);
			wp_update_post( $post_data );
		} else {
			// If no participant exists, create a new one
			$post_data      = array(
				'post_type'   => PostTypes\Participant::$name,
				'post_title'  => $title,
				'post_status' => 'publish',
				'meta_input'  => array(
					'email'      => $email,
					'birth_date' => $birth_date,
					'phone'      => $phone,
					'address'    => $address,
				),
			);
			$participant_id = wp_insert_post( $post_data );
		}

		if ( get_option( 'fxquiz_create_wp_user', false ) ) {
			User::create_or_update_user( $data );
		}

		if ( $submission_id > 0 ) {
			self::update_submissions( $participant_id, $submission_id );
		}

		return $participant_id;
	}
}
