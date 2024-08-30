<?php

/**
 * Exams custom post type
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

namespace Flex\PostTypes;

defined( 'ABSPATH' ) || exit;

/**
 * Exam class.
 *
 * @since 1.0.0
 */
final class Exam extends CPT {

	/**
	 * Exam CPT name.
	 *
	 * @since 1.0.0
	 *
	 * @var string $name
	 */
	public static string $name = 'flex-quiz';

	/**
	 * Icon.
	 *
	 * @since 1.0.0
	 *
	 * @var string $icon
	 */

	protected string $icon = 'dashicons-list-view';

	/**
	 * Meta fields.
	 *
	 * @since 1.0.0
	 *
	 * @var array $meta_fields
	 */
	protected array $meta_fields = array(
		'required_points' => 'string',
		'participants'    => array(
			'type'         => 'array',
			'single'       => true,
			'show_in_rest' => array(
				'schema' => array(
					'type'  => 'array',
					'items' => array(
						'type' => 'integer',
					),
				),
			),
		),
	);

	/**
	 * Class constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->singular = esc_html__( 'Flex Quiz', 'flex-quiz' );
		$this->plural   = esc_html__( 'Flex Quizzes', 'flex-quiz' );
		add_filter( 'template_include', array( $this, 'template' ) );
		add_filter( 'manage_flex-quiz_posts_columns', array( $this, 'set_custom_columns' ) );
		add_action( 'manage_flex-quiz_posts_custom_column', array( $this, 'custom_column' ), 10, 2 );
	}

	protected function custom_options(): array {
		return array(
			'rewrite' => array( 'slug' => FLEX_QUIZ_REWRITE_EXAMS_SLUG ),
		);
	}

	protected function show_in_menu() {
		return true;
	}

	public function template( string $template ): string {
		global $post;

		if ( ! $post || ! is_a( $post, 'WP_Post' ) || self::$name !== $post->post_type ) {
			return $template;
		}

		if ( is_archive() ) {
			return FLEX_QUIZ_DIR_PATH . '/app/templates/archive-exams.php';
		}

		if ( is_single() ) {
			return FLEX_QUIZ_DIR_PATH . '/app/templates/single-exam.php';
		}

		return $template;
	}

	public function set_custom_columns( $columns ) {
		// Add new columns
		$columns['total_participant'] = esc_html( 'Total submission' );
		$columns['short_code']        = esc_html( 'Shortcode' );
		$columns['total_step']        = esc_html( 'Total step' );
		$columns['total_question']    = esc_html( 'Total question' );

		// Reorder columns, move date to the end
		$new_columns = array();
		foreach ( $columns as $key => $value ) {
			if ( 'date' === $key || 'author' === $key ) {
					continue;
			}
				$new_columns[ $key ] = $value;
		}
		$new_columns['date'] = $columns['date'];

		return $new_columns;
	}

	public function custom_column( $column, $post_id ) {
		$exam_steps     = get_post_meta( $post_id, 'exam_steps', true );
		$total_question = 0;

		foreach ( $exam_steps as $step_index => $step ) {
			$total_question += count( $step['questions'] );
		}

		switch ( $column ) {
			case 'total_participant':
					$participants = get_post_meta( $post_id, 'participants', true );
				if ( is_array( $participants ) && isset( $participants ) ) {
					$total_participant = count( $participants );
					echo esc_html( $total_participant );
				} else {
					esc_html_e( '0' );
				}

				break;
			case 'short_code':
					$short_code = '[flex-quiz id="' . $post_id . '"]';
					echo esc_html( $short_code );
				break;
			case 'total_step':
					echo esc_html( count( $exam_steps ) );
				break;
			case 'total_question':
					echo esc_html( $total_question );
				break;
		}
	}
}
