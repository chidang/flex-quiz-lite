<?php
/**
 * Taxonomy base abstract class
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

namespace Flex\Taxonomies;

defined( 'ABSPATH' ) || exit;

/**
 * Abstract Taxonomy class.
 *
 * @since 1.0.0
 */
abstract class Taxonomy {
	/**
	 * Taxonomy name.
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
	 * Object type with which the taxonomy should be associated.
	 *
	 * @since 1.0.0
	 *
	 * @var string $object_type
	 */
	protected string $object_type;

	/**
	 * Get CPT options.
	 *
	 * @return array
	 */
	private function get_options(): array {
		$default_options = array(
			'hierarchical' => true,
			'labels'       => $this->get_labels(),
			'public'       => true,
			'show_in_rest' => true,
		);

		return apply_filters( 'flex_quiz_taxonomy_options', $default_options, static::$name );
	}

	/**
	 * Get taxonomy labels.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	private function get_labels(): array {
		return array(
			'name'              => $this->plural,
			'singular_name'     => $this->singular,
			/* translators: %s - plural CPT/taxonomy name */
			'all_items'         => sprintf( __( 'All %s', 'flex-quiz' ), $this->plural ),
			/* translators: %s - singular CPT/taxonomy name */
			'edit_item'         => sprintf( __( 'Edit %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'view_item'         => sprintf( __( 'View %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'update_item'       => sprintf( __( 'Update %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'add_new_item'      => sprintf( __( 'Add New %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'new_item_name'     => sprintf( __( 'New %s Name', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'parent_item'       => sprintf( __( 'Parent %s', 'flex-quiz' ), $this->singular ),
			/* translators: %s - singular CPT/taxonomy name */
			'parent_item_colon' => sprintf( __( 'Parent %s:', 'flex-quiz' ), $this->singular ),
			/* translators: %s - plural CPT/taxonomy name */
			'search_items'      => sprintf( __( 'Search %s', 'flex-quiz' ), $this->plural ),
			/* translators: %s - plural CPT/taxonomy name */
			'popular_items'     => sprintf( __( 'Popular %s', 'flex-quiz' ), $this->plural ),
			/* translators: %s - plural CPT/taxonomy name */
			'not_found'         => sprintf( __( 'No %s found.', 'flex-quiz' ), strtolower( $this->plural ) ),
		);
	}

	/**
	 * Register custom post type and associated taxonomies.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		register_taxonomy( static::$name, $this->object_type, $this->get_options() );
	}

	/**
	 * Get a list of available terms for taxonomy.
	 *
	 * @since 1.0.0
	 *
	 * @return array
	 */
	public static function get(): array {
		$args = array(
			'taxonomy'   => static::$name,
			'hide_empty' => true,
		);

		$terms = get_terms( $args );

		if ( is_wp_error( $terms ) ) {
			return array();
		}

		return $terms;
	}
}
