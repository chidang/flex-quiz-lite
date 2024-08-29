<?php

/**
 * ApiValidation functionality
 *
 * @since 1.0.0
 * @package Flex\Services
 */

namespace Flex\Services;

/**
 * ApiValidation class.
 *
 * @since 1.0.0
 */
final class ApiValidation {

	/**
	 * Class constructor.
	 *
	 * @since 1.0.0
	 */

	private $request;

	public function __construct( $request ) {
		$this->request = $request;
	}

	public function validate() {
		$nonce = $this->request->get_header( 'X-WP-Nonce' );

		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return array(
				'valid' => false,
				'data'  => rest_ensure_response(
					array(
						'status'  => 'error',
						'message' => 'Nonce verification failed.',
					)
				),
			);
		}

		return array( 'valid' => true );
	}
}
