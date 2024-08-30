<?php

/**
 * Exam API
 *
 * @since 1.0.0
 * @package FlexQuiz
 */

namespace FlexQuiz\Api;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\Helpers\Common;
use FlexQuiz\PostTypes;

class Exam {

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	public function register_routes() {
		register_rest_route(
			Common::API_SLUG,
			'/exam/(?P<id>\d+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_exam_by_id' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			Common::API_SLUG,
			'/exam-by-slug/(?P<slug>[\w-]+)',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_exam_by_slug' ),
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			Common::API_SLUG,
			'/exam',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'create_exam' ),
				'permission_callback' => array( $this, 'permission_check' ),
			)
		);

		register_rest_route(
			Common::API_SLUG,
			'/exam/(?P<id>\d+)',
			array(
				'methods'             => 'PUT',
				'callback'            => array( $this, 'update_exam' ),
				'permission_callback' => array( $this, 'permission_check' ),
			)
		);
	}

	public function get_exam_by_id( $data ) {
		$post_id = $data['id'];
		$post    = get_post( $post_id );

		if ( ! $post || 'flex-quiz' !== $post->post_type ) {
			return new \WP_Error( 'no_exam', __( 'Exam not found', 'flex-quiz' ), array( 'status' => 404 ) );
		}

		$exam_steps = get_post_meta( $post_id, 'exam_steps', true );

		return array(
			'id'              => $post->ID,
			'title'           => $post->post_title,
			'slug'            => $post->post_name,
			'required_points' => get_post_meta( $post_id, 'required_points', true ),
			'steps'           => $exam_steps,
		);
	}

	public function create_exam( $data ) {
		$post_id = wp_insert_post(
			array(
				'post_title'  => sanitize_text_field( $data['title'] ),
				'post_name'   => sanitize_text_field( $data['slug'] ),
				'post_type'   => PostTypes\Exam::$name,
				'post_status' => 'publish',
			)
		);

		if ( is_wp_error( $post_id ) ) {
			return $post_id;
		}

		update_post_meta( $post_id, 'exam_steps', $data['steps'] );
		update_post_meta( $post_id, 'required_points', $data['requiredPoints'] );

		return array(
			'id'      => $post_id,
			'message' => __( 'Exam created successfully', 'flex-quiz' ),
		);
	}

	public function update_exam( $data ) {
		$post_id = $data['id'];

		$post = get_post( $post_id );

		if ( ! $post || 'flex-quiz' !== $post->post_type ) {
			return new \WP_Error( 'no_exam', __( 'Exam not found', 'flex-quiz' ), array( 'status' => 404 ) );
		}

		wp_update_post(
			array(
				'ID'         => $post_id,
				'post_title' => sanitize_text_field( $data['title'] ),
				'post_name'  => sanitize_text_field( $data['slug'] ),
			)
		);

		update_post_meta( $post_id, 'exam_steps', $data['steps'] );
		update_post_meta( $post_id, 'required_points', $data['requiredPoints'] );

		return array(
			'id'      => $post_id,
			'message' => __( 'Exam updated successfully', 'flex-quiz' ),
		);
	}

	public function permission_check() {
		return current_user_can( 'edit_posts' );
	}

	public function get_exam_by_slug( $data ) {
		$slug = $data['slug'];
		$post = get_page_by_path( $slug, OBJECT, 'flex-quiz' );

		if ( ! $post ) {
			return new WP_Error( 'no_exam', __( 'Exam not found', 'flex-quiz' ), array( 'status' => 404 ) );
		}

		$exam_steps      = get_post_meta( $post->ID, 'exam_steps', true );
		$required_points = get_post_meta( $post->ID, 'required_points', true );
		return array(
			'id'              => $post->ID,
			'title'           => $post->post_title,
			'slug'            => $post->post_name,
			'required_points' => $required_points,
			'steps'           => $exam_steps,
		);
	}
}
