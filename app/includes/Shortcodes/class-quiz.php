<?php

/**
 * Quiz Shortcode
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

/**
 * Example
 * [exam id='123']
 */

namespace Flex\Shortcodes;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Quiz {

	public function __construct() {
		// Register the shortcode
		add_shortcode( 'flex-quiz', array( $this, 'render_exams_shortcode' ) );
	}

	public function render_exams_shortcode( $atts ) {
		$atts    = shortcode_atts(
			array(
				'id' => 0,
			),
			$atts,
			'flex-quiz'
		);
		$post_id = intval( $atts['id'] );

		if ( ! $post_id ) {
			return '<p>Invalid Quiz ID.</p>';
		}

		ob_start();
		require FLEX_QUIZ_DIR_PATH . '/app/templates/style.php';
		?>
	<div class="exam-content">
		<input id="flex-quiz-id" type="hidden" value="<?php echo esc_attr( $post_id ); ?>" />
		<div id="flex-quiz-app"></div>
	</div>
		<?php
		return ob_get_clean();
	}
}
