<?php
/**
 * Custom post type base abstract class
 *
 * @since 1.0.0
 * @package FlexQuiz
 */

namespace FlexQuiz\PostTypes;

defined( 'ABSPATH' ) || exit;

/**
 * Abstract CPT class.
 *
 * @since 1.0.0
 */
abstract class CPT {
	/**
	 * CPT name.
	 *
	 * @since 1.0.0
	 *
	 * @var string $name
	 */
	public static string $name;

	/**
	 * Singular name.
	 *
	 * @since 1.0.0
	 *
	 * @var string $singular
	 */
	protected string $singular;

	/**
	 * Plural name.
	 *
	 * @since 1.0.0
	 *
	 * @var string $plural
	 */
	protected string $plural;

	/**
	 * The icon to be used for the menu or the name of the icon from the iconfont.
	 *
	 * @since 1.0.0
	 *
	 * @var string $icon
	 */
	protected string $icon = 'dashicons-admin-post';

	/**
	 * Core feature(s) the post type supports. Serves as an alias for calling add_post_type_support() directly.
	 *
	 * @since 1.0.0
	 *
	 * @var array $supports
	 */
	protected array $supports = array( 'author', 'custom-fields', 'editor', 'excerpt', 'title' );

	/**
	 * CPT taxonomies.
	 *
	 * @since 1.0.0
	 *
	 * @var array $taxonomies
	 */
	protected array $taxonomies = array();

	/**
	 * List of meta fields.
	 *
	 * @since 1.0.0
	 *
	 * @var array $meta_fields
	 */
	protected array $meta_fields = array();

	/**
	 * Array of blocks to use as the default initial state for an editor session.
	 *
	 * @since 1.0.0
	 *
	 * @var array $template
	 */
	protected array $template = array();

	/**
	 * Get CPT options.
	 *
	 * @return array
	 */
	private function get_options(): array {
		$default_options = array(
			'has_archive'  => true,
			'labels'       => $this->get_labels(),
			'menu_icon'    => $this->icon,
			'public'       => true,
			'show_in_rest' => true,
			'supports'     => $this->supports,
			'template'     => $this->template,
		);

		$options = array_merge( $default_options, $this->custom_options() );

		return apply_filters( 'flex_quiz_cpt_options', $options, static::$name );
	}

	protected function custom_options(): array {
		return array();
	}

	/**
	 * Get CPT labels.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	private function get_labels(): array {
		return array(
			'name'                  => $this->singular,
			'singular_name'         => $this->plural,
			/* translators: %s - plural CPT/taxonomy name */
			'all_items'             => sprintf( __( 'All %s', 'flex-quiz' ), $this->plural ),
			/* translators: %s - singular CPT/taxonomy name */
			'add_new_item'          => sprintf( __( 'Add New %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'add_new'               => sprintf( __( 'Add New %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'edit_item'             => sprintf( __( 'Edit %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'new_item'              => sprintf( __( 'New %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'view_item'             => sprintf( __( 'View %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - plural CPT/taxonomy name */
			'search_items'          => sprintf( __( 'Search %s', 'flex-quiz' ), $this->plural ),
			/* translators: %s - plural CPT/taxonomy name */
			'not_found'             => sprintf( __( 'No %s found.', 'flex-quiz' ), strtolower( $this->plural ) ),
			/* translators: %s - plural CPT/taxonomy name */
			'not_found_in_trash'    => sprintf( __( 'No %s found in Trash.', 'flex-quiz' ), strtolower( $this->plural ) ),
			/* translators: %s - singular CPT/taxonomy name */
			'parent_item_colon'     => sprintf( __( 'Parent %s:', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'insert_into_item'      => sprintf( __( 'Insert into %s:', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'uploaded_to_this_item' => sprintf( __( 'Uploaded to this %s:', 'flex-quiz' ), $this->singular ),
			'featured_image'        => __( 'Featured Image', 'flex-quiz' ),
			'set_featured_image'    => __( 'Set featured image', 'flex-quiz' ),
			'menu_name'             => 'flex-quiz' === static::$name ? esc_html__( 'Flex Quiz', 'flex-quiz' ) : $this->plural,
			'name_admin_bar'        => 'flex-quiz' === static::$name ? esc_html__( 'Flex Quiz', 'flex-quiz' ) : $this->plural,
			/* translators: %s - singular CPT/taxonomy name */
			'item_updated'          => sprintf( __( '%s updated:', 'flex-quiz' ), $this->singular ),
		);
	}

	private function quiz_name() {
		'flex-quiz' === static::$name ? esc_html__( 'Quiz', 'flex-quiz' ) : $this->singular;
	}

	/**
	 * Register custom post type and associated taxonomies.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		register_post_type( static::$name, $this->get_options() );
		$this->register_taxonomies();
		$this->register_post_meta();
		if ( esc_html__( 'Flex Quiz', 'flex-quiz' ) === $this->singular ) {
			flush_rewrite_rules();
		}
	}

	/**
	 * Register taxonomies.
	 *
	 * @since 1.0.0
	 */
	private function register_taxonomies() {
		foreach ( $this->taxonomies as $taxonomy ) {
			register_taxonomy_for_object_type( $taxonomy, static::$name );
		}
	}

	/**
	 * Register post meta.
	 *
	 * @since 1.0.0
	 */
	private function register_post_meta() {
		foreach ( $this->meta_fields as $meta_field => $meta_args ) {
			$args = is_string( $meta_args ) ? array(
				'type'         => $meta_args,
				'single'       => true,
				'show_in_rest' => true,
			) : $meta_args;

			register_post_meta( static::$name, $meta_field, $args );
		}
	}
}
