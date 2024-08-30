<?php

/**
 * Submission custom post type
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

namespace Flex\PostTypes;

use Flex\Helpers\Common;

/**
 * Exam class.
 *
 * @since 1.0.0
 */
final class Submission extends CPT {

	/**
	 * Exam CPT name.
	 *
	 * @since 1.0.0
	 *
	 * @var string $name
	 */
	public static string $name = 'fxq-submission';

	/**
	 * Meta fields.
	 *
	 * @since 1.0.0
	 *
	 * @var array $meta_fields
	 */
	protected array $meta_fields = array();

	/**
	 * Class constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->singular = esc_html__( 'Quiz Result', 'flex-quiz' );
		$this->plural   = esc_html__( 'Quiz Results', 'flex-quiz' );
		add_action( 'add_meta_boxes', array( $this, 'add_submission_meta_box' ) );
		add_action( 'add_meta_boxes', array( $this, 'remove_yoast_seo_meta_box' ), 11 );
		add_action( 'admin_menu', array( $this, 'remove_default_menu' ) );
		add_action( 'admin_menu', array( $this, 'add_custom_menu' ) );
		add_action( 'admin_init', array( $this, 'add_ob_start' ) );
		add_filter( 'template_include', array( $this, 'template' ) );
		add_filter( 'manage_fxq-submission_posts_columns', array( $this, 'set_custom_columns' ) );
		add_action( 'manage_fxq-submission_posts_custom_column', array( $this, 'custom_column' ), 10, 2 );
	}

	public function add_ob_start() {
		if ( is_admin() ) {
			ob_start();
		}
	}

	public function remove_default_menu() {
		remove_menu_page( 'edit.php?post_type=' . self::$name );
	}

	public function add_custom_menu() {
		add_submenu_page( 'edit.php?post_type=' . Exam::$name, 'Results', 'Results', 'manage_options', self::$name, array( $this, 'submissions_page' ) );
	}

	public function submissions_page() {
		wp_safe_redirect( admin_url() . 'edit.php?post_type=' . self::$name );
		exit;
	}

	public function add_submission_meta_box() {
		add_meta_box(
			'fxq_submission_meta_box',
			esc_html__( 'Submission Details', 'flex-quiz' ),
			array( $this, 'render_submission_meta_box' ),
			self::$name,
			'normal',
			'high'
		);
	}

	public function render_submission_meta_box( $post ) {
		$exam_id             = get_post_meta( $post->ID, 'exam_id', true );
		$exam_title          = get_the_title( $exam_id );
		$full_name           = get_post_meta( $post->ID, 'full_name', true );
		$email               = get_post_meta( $post->ID, 'email', true );
		$birth_date          = Common::participant_birth_date( $post->ID );
		$answers             = maybe_unserialize( get_post_meta( $post->ID, 'answers', true ) );
		$achieved_score      = get_post_meta( $post->ID, 'achieved_score', true );
		$max_points          = get_post_meta( $post->ID, 'max_points', true );
		$subsribe_newsletter = get_post_meta( get_the_ID(), 'subscribe_newsletter', true ) ? esc_html__( 'Yes', 'flex-quiz' ) : esc_html__( 'No', 'flex-quiz' );

		echo '<h3>' . esc_html__( 'Flex Quiz:', 'flex-quiz' ) . '</h3>';
		echo '<p><strong>ID:</strong> ' . esc_html( $exam_id ) . '</p>';
		echo '<p><strong>Title:</strong> ' . esc_html( $exam_title ) . '</p>';
		echo '<h3>' . esc_html__( 'User Information', 'flex-quiz' ) . '</h3>';
		echo '<p><strong>' . esc_html__( 'Full Name:', 'flex-quiz' ) . '</strong> ' . esc_html( $full_name ) . '</p>';
		echo '<p><strong>' . esc_html__( 'Email:', 'flex-quiz' ) . '</strong> ' . esc_html( $email ) . '</p>';
		echo '<p><strong>' . esc_html__( 'Date of Birth:', 'flex-quiz' ) . '</strong> ' . esc_html( $birth_date ) . '</p>';
		echo '<p><strong>' . esc_html__( 'Subscribe for newsletter:', 'flex-quiz' ) . '</strong> ' . esc_html( $subsribe_newsletter ) . '</p>';
		echo '<h3>' . esc_html__( 'Results', 'flex-quiz' ) . '</h3>';
		echo '<p><strong>' . esc_html__( 'Total points are:', 'flex-quiz' ) . '</strong> ' . esc_html( $achieved_score ) . '/' . esc_html( $max_points ) . '</p>';
		echo '<p><strong>' . esc_html__( 'The exam average is:', 'flex-quiz' ) . '</strong> ' . esc_html( round( 100 * $achieved_score / $max_points ) ) . '%</p>';
	}

	protected function show_in_menu() {
		return true;
	}

	public function remove_yoast_seo_meta_box() {
		remove_meta_box( 'wpseo_meta', self::$name, 'normal' );
	}

	public function template( string $template ): string {
		global $post;

		if ( ! $post || ! is_a( $post, 'WP_Post' ) || self::$name !== $post->post_type ) {
			return $template;
		}

		if ( is_single() ) {
			return FLEX_QUIZ_DIR_PATH . '/app/templates/single-submission.php';
		}

		return $template;
	}

	public function set_custom_columns( $columns ) {
		unset( $columns['author'] );
		// Add new columns
		$columns['full_name'] = esc_html( 'Full name' );
		$columns['email']     = esc_html( 'Email' );
		$columns['quiz_id']   = esc_html( 'Quiz ID' );
		// Reorder columns, move date to the end
		$new_columns = array();
		foreach ( $columns as $key => $value ) {
			if ( 'date' === $key ) {
					continue;
			}
				$new_columns[ $key ] = $value;
		}
		$new_columns['date'] = $columns['date'];

		return $new_columns;
	}

	public function custom_column( $column, $post_id ) {
		switch ( $column ) {
			case 'full_name':
				$full_name      = get_post_meta( $post_id, 'full_name', true );
				$participant_id = get_post_meta( $post_id, 'participant_id', true );
				echo '<a href="' . esc_url( get_permalink( $participant_id ) ) . '">' . esc_html( $full_name ) . '</a>';
				break;
			case 'email':
					$email = get_post_meta( $post_id, 'email', true );
					echo esc_html( $email );
				break;
			case 'quiz_id':
					$exam_id = get_post_meta( $post_id, 'exam_id', true );
					echo '<a href="' . esc_url( get_permalink( $exam_id ) ) . '">' . esc_html( $exam_id ) . '</a>';
				break;
		}
	}
}
