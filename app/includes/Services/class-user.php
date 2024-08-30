<?php

/**
 * User functionality
 *
 * @since 1.0.0
 * @package Flex\Services
 */

namespace Flex\Services;

defined( 'ABSPATH' ) || exit;

/**
 * User class.
 *
 * @since 1.0.0
 */
final class User {

	/**
	* Create or update a user in WordPress.
	*
	* @param array $data {
	*     An array of user data.
	*
	*     @type string $email      User's email address.
	*     @type string $full_name  User's full name.
	*     @type string $birth_date User's birth date.
	*     @type string $phone      User's phone.
	* }
	*
	* @return int|WP_Error The user's ID on success, WP_Error object on failure.
	*/
	public static function create_or_update_user( $data ) {
		if ( empty( $data['email'] ) ) {
			return new \WP_Error( 'missing_data', 'Required user data is missing.' );
		}

		$email      = sanitize_email( $data['email'] );
		$full_name  = sanitize_text_field( $data['full_name'] );
		$birth_date = sanitize_text_field( $data['birth_date'] );
		$phone      = sanitize_text_field( $data['phone'] );
		$address    = sanitize_text_field( $data['address'] );

		if ( ! is_email( $email ) ) {
			return new \WP_Error( 'invalid_email', 'Invalid email address.' );
		}

		$user = get_user_by( 'email', $email );

		if ( $user ) {
			// Update existing user
			$user_id = wp_update_user(
				array(
					'ID'           => $user->ID,
					'user_email'   => $email,
					'display_name' => $full_name,
					'first_name'   => explode( ' ', $full_name )[0],
					'last_name'    => explode( ' ', $full_name, 2 )[1] ?? '',
				)
			);

			if ( is_wp_error( $user_id ) ) {
				return $user_id;
			}

			// Optionally update user meta (like birth date)
			update_user_meta( $user_id, 'birth_date', $birth_date );
			update_user_meta( $user_id, 'phone', $phone );
			update_user_meta( $user_id, 'address', $address );

		} else {
			// Create new user
			$user_id = wp_insert_user(
				array(
					'user_login'   => $email,
					'user_email'   => $email,
					'display_name' => $full_name,
					'first_name'   => explode( ' ', $full_name )[0],
					'last_name'    => explode( ' ', $full_name, 2 )[1] ?? '',
					'user_pass'    => wp_generate_password(), // Set a random password
				)
			);

			if ( is_wp_error( $user_id ) ) {
				return $user_id;
			}

			// Add user meta (like birth date)
			update_user_meta( $user_id, 'birth_date', $birth_date );
			update_user_meta( $user_id, 'phone', $phone );
			update_user_meta( $user_id, 'address', $address );
		}

		return $user_id;
	}
}
