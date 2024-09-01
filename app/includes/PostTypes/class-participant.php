<?php

/**
 * Participant custom post type
 *
 * @since 1.0.0
 * @package FlexQuiz
 */

namespace FlexQuiz\PostTypes;

defined( 'ABSPATH' ) || exit;

use FlexQuiz\Helpers\Common;

/**
 * Participant class.
 *
 * @since 1.0.0
 */
final class Participant extends CPT {

	/**
	 * Participant CPT name.
	 *
	 * @since 1.0.0
	 *
	 * @var string $name
	 */
	public static string $name = 'fxq-participant';

	/**
	 * Meta fields.
	 *
	 * @since 1.0.0
	 *
	 * @var array $meta_fields
	 */
	protected array $meta_fields = array(
		'full_name'  => 'string',
		'birth_date' => 'string',
		'email'      => 'string',
		'user_id'    => 'integer',
		'exams'      => array(
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
		$this->singular = esc_html__( 'Quiz Participant', 'flex-quiz' );
		$this->plural   = esc_html__( 'Quiz Participants', 'flex-quiz' );
		add_action( 'add_meta_boxes', array( $this, 'add_participant_meta_box' ) );
		add_action( 'add_meta_boxes', array( $this, 'remove_yoast_seo_meta_box' ), 11 );
		add_action( 'admin_menu', array( $this, 'remove_default_menu' ) );
		add_action( 'admin_menu', array( $this, 'add_custom_menu' ) );
		add_action( 'admin_init', array( $this, 'add_ob_start' ) );
		add_action( 'save_post', array( $this, 'save_meta_box_data' ) );
		add_filter( 'manage_fxq-participant_posts_columns', array( $this, 'set_custom_columns' ) );
		add_action( 'manage_fxq-participant_posts_custom_column', array( $this, 'custom_column' ), 10, 2 );
		add_filter( 'template_include', array( $this, 'template' ) );
	}

	public function remove_yoast_seo_meta_box() {
		remove_meta_box( 'wpseo_meta', self::$name, 'normal' );
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
		add_submenu_page( 'edit.php?post_type=' . Exam::$name, 'Participants', 'Participants', 'manage_options', self::$name, array( $this, 'participants_page' ) );
	}

	public function participants_page() {
		wp_safe_redirect( admin_url() . 'edit.php?post_type=' . self::$name );
		exit;
	}

	public function add_participant_meta_box() {
		add_meta_box(
			'fxquiz_participant_meta_box',
			esc_html__( 'Participant Details', 'flex-quiz' ),
			array( $this, 'render_participant_meta_box' ),
			self::$name,
			'normal',
			'high'
		);
	}

	public function render_participant_meta_box( $post ) {
		$birth_date = get_post_meta( $post->ID, 'birth_date', true );
		$email      = get_post_meta( $post->ID, 'email', true );
		$title      = get_the_title( $post->ID );

		wp_nonce_field( basename( __FILE__ ), 'quiz_participants_nonce' );
		?>
		<table>
			<tr>
				<td>Full Name</td>
				<td><strong><?php echo esc_html( $title ); ?></strong></td>
			</tr>
			<tr>
				<td>Email</td>
				<td><strong><?php echo esc_attr( $email ); ?></strong></td>
			</tr>
			<tr>
					<td style="width: 100%">Date of Birth</td>
					<td><input type="date" size="80" name="birth_date" value="<?php echo esc_attr( $birth_date ); ?>" /></td>
			</tr>
		</table>
		<?php
	}

	public function save_meta_box_data( $post_id ) {
		// Check if nonce is set
		if ( ! isset( $_POST['quiz_participants_nonce'] ) ) {
				return $post_id;
		}
		$nonce = sanitize_text_field( wp_unslash( $_POST['quiz_participants_nonce'] ) );

		// Verify the nonce
		if ( ! wp_verify_nonce( $nonce, basename( __FILE__ ) ) ) {
				return $post_id;
		}

		// Check if auto-saving
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
				return $post_id;
		}

		// Check permissions
		if ( isset( $_POST['post_type'] ) && 'exam-participants' === $_POST['post_type'] ) {
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
					return $post_id;
			}
		} elseif ( ! current_user_can( 'edit_page', $post_id ) ) {
					return $post_id;
		}

		// Sanitize and save the birth_date meta field
		if ( isset( $_POST['birth_date'] ) ) {
				$birth_date = sanitize_text_field( wp_unslash( $_POST['birth_date'] ) );
				update_post_meta( $post_id, 'birth_date', $birth_date );
		}
	}

	public function set_custom_columns( $columns ) {
		// Add new columns
		$columns['email']      = esc_html( 'Email' );
		$columns['birth_date'] = esc_html( 'Date of Birth' );
		$columns['total_quiz'] = esc_html( 'Total quiz' );

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
		switch ( $column ) {
			case 'email':
					$email = get_post_meta( $post_id, 'email', true );
					echo esc_html( $email );
				break;
			case 'birth_date':
					$birth_date = Common::participant_birth_date( $post_id );
					echo esc_html( $birth_date );
				break;
			case 'total_quiz':
					$quizzes    = get_post_meta( $post_id, 'submissions', [] );
					$total_quiz = count( array_unique( $quizzes ) );
					echo esc_html( $total_quiz );
				break;
		}
	}

	public function template( string $template ): string {
		global $post;

		if ( ! $post || ! is_a( $post, 'WP_Post' ) || self::$name !== $post->post_type ) {
			return $template;
		}

		if ( is_single() ) {
			return FLEX_QUIZ_DIR_PATH . '/app/templates/single-participant.php';
		}

		return $template;
	}
}
