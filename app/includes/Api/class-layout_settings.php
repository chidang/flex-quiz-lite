<?php

/**
 * Layout Settings API
 *
 * @since 1.0.0
 * @package FlexQuiz
 */

namespace FlexQuiz\Api;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\Helpers\Common;
use FlexQuiz\Services;

class LayoutSettings {
	protected $rest_base = '/layout-settings';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route(
			Common::API_SLUG,
			$this->rest_base,
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_settings' ),
				'permission_callback' => array( $this, 'permissions_check' ),
			)
		);

		register_rest_route(
			Common::API_SLUG,
			$this->rest_base,
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'save_settings' ),
				'permission_callback' => array( $this, 'permissions_check' ),
			)
		);
	}

	public function permissions_check( $request ) {
		return current_user_can( 'manage_options' );
	}

	public function get_settings( $request ) {
		$settings = Services\Settings::layout();

		return rest_ensure_response( $settings );
	}

	public function save_settings( $request ) {
		$params = $request->get_json_params();

		update_option( 'fxquiz_main_color', sanitize_hex_color( $params['mainColor'] ) );
		update_option( 'fxquiz_box_color', sanitize_hex_color( $params['boxColor'] ) );
		update_option( 'fxquiz_result_box_color', sanitize_hex_color( $params['resultBoxColor'] ) );
		update_option( 'fxquiz_result_text_color', sanitize_hex_color( $params['resultTextColor'] ) );
		update_option( 'fxquiz_checkbox_color', sanitize_hex_color( $params['checkboxColor'] ) );
		update_option( 'fxquiz_next_button_color', sanitize_hex_color( $params['nextButtonColor'] ) );
		update_option( 'fxquiz_exam_banner', (int) $params['examBanner'] );
		update_option( 'fxquiz_show_banner', isset( $params['showBanner'] ) ? (bool) $params['showBanner'] : false );

		return rest_ensure_response( array( 'success' => true ) );
	}
}
