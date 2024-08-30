<?php

/**
 * Core plugin functionality
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

namespace Flex;

/**
 * Core class.
 *
 * @since 1.0.0
 */
final class ExamsCore {

	/**
	 * Class constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );
	}

	/**
	 * Init core functionality.
	 *
	 * @since 1.0.0
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_settings' ) );
		add_action( 'init', array( $this, 'register_shortcodes' ) );
		add_action( 'init', array( $this, 'remove_default_editor_for_flex_quiz' ) );
		add_action( 'init', array( $this, 'register_api' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_examination_frontend_script' ) );
		add_filter( 'use_block_editor_for_post_type', array( $this, 'disable_gutenberg_for_post_type' ), 10, 2 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_flex_quiz_scripts' ) );

		add_action( 'admin_enqueue_scripts', array( $this, 'custom_dequeue_admin_script' ), 100 );

		add_action( 'wp_enqueue_scripts', array( $this, 'add_custom_inline_styles' ), 20 );
	}

	/**
	 * Load plugin translated strings.
	 *
	 * @since 1.0.0
	 */
	public function load_plugin_textdomain() {
		// echo dirname(dirname(dirname( plugin_basename( __FILE__ ) )));die; // => flex-quiz (plugin directory)
		load_plugin_textdomain( 'flex-quiz', false, 'flex-quiz/languages' );
	}

	/**
	 * Register custom post types.
	 *
	 * @since 1.0.0
	 */
	public function register_post_types() {
		( new PostTypes\Exam() )->register();
		( new PostTypes\Submission() )->register();
		( new PostTypes\Participant() )->register();
	}

	public function register_settings() {
		new Settings\ExamSettings();
	}

	public function register_shortcodes() {
		new Shortcodes\Quiz();
	}

	public function register_api() {
		new Api\Exam();
		new Api\LayoutSettings();
		new Api\NotificationSettings();
		new Api\Settings();
		new Api\Submission();
	}

	/**
	 * Enqueue plugin scripts and styles.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_styles(): void {
		global $wp_query;
	}

	public function remove_default_editor_for_flex_quiz() {
		remove_post_type_support( 'flex-quiz', 'editor' );
	}

	private function get_localize_script() {
		$post_id         = esc_html( get_the_ID() );
		$post_status     = esc_html( get_post_status( $post_id ) );
		$is_edit         = ( $post_id && 'auto-draft' !== $post_status );
		$localize_script = array(
			'api_url'        => home_url( '/wp-json' ),
			'exams_slug'     => FLEX_QUIZ_REWRITE_EXAMS_SLUG,
			'nonce'          => wp_create_nonce( 'wp_rest' ),
			'post_id'        => $post_id,
			'post_status'    => get_post_status( $post_id ),
			'is_page'        => $is_edit ? 'edit' : 'addnew',
			'home_url'       => home_url(),
			'language'       => '',
			'wpDashboardUrl' => admin_url(),
		);
		return $localize_script;
	}

	public function custom_dequeue_admin_script( $hook ) {
		global $post;

		if ( 'post-new.php' === $hook || 'post.php' === $hook ) {
			if ( 'flex-quiz' === $post->post_type ) {
				wp_dequeue_script( 'annotations' ); // Replace 'script-handle' with the handle of the script you want to dequeue
				wp_dequeue_script( 'yoast-seo-post-edit-classic' );
				wp_dequeue_script( 'post' );
				wp_dequeue_script( 'media-editor' );
			}
		}
	}

	public function enqueue_flex_quiz_scripts( $hook ) {
		global $post;

		$valid_hooks = array( 'post-new.php', 'post.php', 'flex-quiz_page_exams-settings' );

		if ( in_array( $hook, $valid_hooks, true ) ) {
			$js_file = ( 'flex-quiz_page_exams-settings' === $hook ) ? 'settings.js' : 'exam-edit.js';

			if ( ( isset( $post ) && PostTypes\Exam::$name === $post->post_type ) || 'flex-quiz_page_exams-settings' === $hook ) {
				$this->enqueue_media_and_scripts( $js_file );
			}
		}
	}

	private function enqueue_media_and_scripts( $js_file ) {
			wp_enqueue_media();

			wp_enqueue_script_module(
				'flex-quiz-script',
				FLEX_QUIZ_DIR_URL . '/build/backend-ui/' . $js_file,
				array( 'wp-element', 'media-editor', 'wp-components', 'wp-data', 'wp-i18n' ),
				filemtime( FLEX_QUIZ_DIR_PATH . 'build/backend-ui/' . $js_file ),
				true
			);

			wp_enqueue_style(
				'flex-quiz-backend-style',
				FLEX_QUIZ_DIR_URL . 'build/backend-ui/main.css',
				array(),
				filemtime( FLEX_QUIZ_DIR_PATH . '/build/backend-ui/main.css' )
			);

			wp_enqueue_style(
				'flex-quiz-settings-style',
				FLEX_QUIZ_DIR_URL . 'build/backend-ui/settings.css',
				array(),
				filemtime( FLEX_QUIZ_DIR_PATH . '/build/backend-ui/settings.css' )
			);
			wp_print_inline_script_tag('const flexQuizLocalizer = ' . wp_json_encode( $this->get_localize_script() ));
	}

	public function enqueue_examination_frontend_script() {
		global $post;

		// Define the post types for easier reference
		$exam_post_type        = PostTypes\Exam::$name;
		$submission_post_type  = PostTypes\Submission::$name;
		$participant_post_type = PostTypes\Participant::$name;

		// Check if the current post is singular and of a specific post type
		$is_exam        = is_singular( $exam_post_type );
		$is_submission  = is_singular( $submission_post_type );
		$is_participant = is_singular( $participant_post_type );

		// Check if the post contains the 'flex-quiz' shortcode
		$has_flex_quiz_shortcode = $post && has_shortcode( $post->post_content, 'flex-quiz' );

		if ( $is_exam || $is_submission || $is_participant || $has_flex_quiz_shortcode ) {
			wp_enqueue_script(
				'flex-quiz-app',
				FLEX_QUIZ_DIR_URL . 'build/frontend-ui/app.js',
				array( 'wp-i18n', 'wp-data', 'wp-api-fetch' ),
				filemtime( FLEX_QUIZ_DIR_PATH . '/build/frontend-ui/app.js' ),
				true
			);
			wp_localize_script(
				'flex-quiz-app',
				'flexQuizData',
				array(
					'post_id'         => get_the_ID(),
					'api_url'         => home_url( '/wp-json' ),
					'plugin_url'      => FLEX_QUIZ_DIR_URL,
					'nonce'           => wp_create_nonce( 'wp_rest' ),
					'generalSettings' => Services\Settings::general(),
				)
			);

			$i18n     = array();
			$language = get_locale();
			if ( isset( $language ) && ! empty( $language ) ) {
				$translate_file = FLEX_QUIZ_DIR_PATH . "/languages/flex-quiz-$language.l10n.php";
				if ( file_exists( $translate_file ) ) {
					$i18n = require $translate_file;
				}
			}

			$translate_data = [];

			if ( isset( $i18n['messages'] ) ) {
				$translate_data = $i18n['messages'];
			}

			wp_localize_script( 'flex-quiz-app', 'flexQuizI18n', $translate_data );

			wp_enqueue_style(
				'flex-quiz-front-style',
				FLEX_QUIZ_DIR_URL . 'build/frontend-ui/app.css',
				array(),
				filemtime( FLEX_QUIZ_DIR_PATH . '/build/frontend-ui/app.css' ),
			);
		}
	}

	public function add_custom_inline_styles() {
		$custom_css = "
			body {
					--fx-primary: " . esc_html( get_option( 'fxq_exams_main_color', '#0e2954' ) ) . ";
					--fx-secondary: " . esc_html( get_option( 'fxq_exams_result_text_color', '#fff' ) ) . ";
					--fx-tertiary: " . esc_html( get_option( 'fxq_exams_next_button_color', '#e40713' ) ) . ";
					--fx-primary-box: " . esc_html( get_option( 'fxq_exams_box_color', '#fff' ) ) . ";
					--fx-secondary-box: " . esc_html( get_option( 'fxq_exams_result_box_color', '#0e2954' ) ) . ";
					--fx-text-color: " . esc_html( get_option( 'fxq_exams_main_color', '#0e2954' ) ) . ";
					--fx-checkbox: " . esc_html( get_option( 'fxq_exams_checkbox_color', '#0e2954' ) ) . ";
			}";
	
		wp_add_inline_style( 'flex-quiz-front-style', $custom_css );
	}
	


	public function disable_gutenberg_for_post_type( $can_edit, $post_type ) {
		if ( PostTypes\Exam::$name === $post_type ) {
			return false;
		}
		return $can_edit;
	}
}
