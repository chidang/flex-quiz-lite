<?php

/**
 * Post Type API
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */


namespace Flex\Api;

defined( 'ABSPATH' ) || exit;

use Flex\Services\ApiValidation;
use Flex\Helpers\Common;

final class Participants {

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route(
			Common::API_SLUG,
			'/participants',
			array(
				'methods'  => 'GET',
				'callback' => array( $this, 'index' ),
			)
		);
	}

	public function index( $request ) {
		$validation = ( new ApiValidation( $request ) )->validate();

		if ( ! $validation['valid'] ) {
			return $validation['data'];
		}

		return ( new Service\Participant() )->list( $request );
	}
}
