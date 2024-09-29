<?php
/**
 * Flex Quiz plugin
 *
 * @link              https://www.flexadmin.io/flex-quiz/
 * @since             1.1.2
 * @package           FlexQuiz
 *
 * @wordpress-plugin
 * Plugin Name:       Flex Quiz
 * Plugin URI:        https://www.flexadmin.io/flex-quiz/
 * Description:       Flex Quiz plugin makes it easy to create and manage multiple quiz exams effortlessly. Enhance your site with interactive quizzes and assessments with a user-friendly interface and powerful features.
 * Version:           1.1.2
 * Author:            Flexa
 * Author URI:        https://www.flexadmin.io
 * License:           GPLv3 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       flex-quiz
 * Domain Path:       /languages
 * Requires PHP:      7.4
 */

namespace FlexQuiz;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'FLEX_QUIZ_VERSION', '1.1.2' );
define( 'FLEX_QUIZ_DIR_PATH', __DIR__ );
define( 'FLEX_QUIZ_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'FLEX_QUIZ_INC_PATH', FLEX_QUIZ_DIR_PATH . '/app/includes' );
define( 'FLEX_QUIZ_EMAIL_TEMPLATE_PATH', FLEX_QUIZ_DIR_PATH . '/app/email-templates' );
define( 'FLEX_QUIZ_BLOCK_PATH', FLEX_QUIZ_DIR_PATH . '/build' );
define( 'FLEX_QUIZ_ORDER', 'ASC' );
define( 'FLEX_QUIZ_REWRITE_EXAMS_SLUG', 'examinations' );
define( 'FLEX_QUIZ_DAY_QUERY_FORMAT', 'Y-m-d' );

// $flex_email_template_files = glob( FLEX_QUIZ_EMAIL_TEMPLATE_PATH . '/*.php' );
// foreach ( $flex_email_template_files as $file ) {
// 	require_once $file;
// }

/**
 * Exams class.
 *
 * @since 1.0.7
 */
final class Exams {
	/**
	 * Plugin instance
	 *
	 * @since 1.0.7
	 *
	 * @var null|Exams
	 */
	private static ?Exams $instance = null;

	/**
	 * Class constructor.
	 *
	 * @since 1.0.7
	 */
	private function __construct() {
		spl_autoload_register( array( $this, 'autoload' ) );
		( new ExamsCore() )->init();
	}

	/**
	 * Singleton instance
	 *
	 * @since 1.0.7
	 *
	 * @return Exams
	 */
	public static function get_instance(): Exams {
		if ( ! self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Autoloader.
	 *
	 * @since 1.0.7
	 *
	 * @param string $class_name Class name to load.
	 */
	public function autoload( string $class_name ) {
		$prefix = 'FlexQuiz\\';

		// Skip non-plugin classes.
		$len = strlen( $prefix );
		if ( 0 !== strncmp( $prefix, $class_name, $len ) ) {
			return;
		}
		// Get the relative class name.
		$relative_class = substr( $class_name, $len );
		
		// Convert namespace separators to directory separators, convert underscores to hyphens in file name.
		$path = explode( '\\', $relative_class );
		$file = 'class-' . str_replace( '_', '-', array_pop( $path ) ) . '.php';
		$path = array_map(function($p) {
			return str_replace('_', '-', $p);
		}, $path);
		$path[] = $file;
		$file = trailingslashit( FLEX_QUIZ_INC_PATH ) . implode( '/', $path );

		$file = self::convert_class_filename( $file );

		if ( file_exists( $file ) ) {
			require $file;
		}
	}

	private static function convert_class_filename($filepath) {
    // Extract the directory and filename parts
    $path_parts = pathinfo($filepath);

    // Split the filename to separate the 'class-' prefix and the class name
    $filename_parts = explode('-', $path_parts['filename'], 2);

    // Check if the filename starts with 'class-'
    if (count($filename_parts) == 2 && $filename_parts[0] === 'class') {
        // Convert the class name part to lowercase and replace camel case with underscores
        $class_name = $filename_parts[1];
        $converted_class_name = strtolower(preg_replace('/([a-z])([A-Z])/', '$1_$2', $class_name));

        // Reconstruct the filename with the 'class-' prefix
        $new_filename = 'class-' . $converted_class_name . '.' . $path_parts['extension'];

        // Reconstruct the full path
        $new_filepath = $path_parts['dirname'] . DIRECTORY_SEPARATOR . $new_filename;

        return $new_filepath;
    }

    // If the filename doesn't start with 'class-', return the original filepath
    return $filepath;
	}

	public static function activation() {
		add_option( 'fxquiz_activated_flex_quiz', 'flex-quiz' );
		require FLEX_QUIZ_INC_PATH . '/class-flex_quiz_activator.php';
		$activator = new FlexQuizActivator();
		$activator->activate();
	}

	public static function devactivation() {
		delete_option( 'fxquiz_activated_flex_quiz');
		require FLEX_QUIZ_INC_PATH . '/class-flex_quiz_activator.php';
		$activator = new FlexQuizActivator();
		$activator->deactivate();
	}
}

add_action( 'plugins_loaded', array( 'FlexQuiz\\Exams', 'get_instance' ) );

/** Activation hooks */
register_activation_hook(__FILE__, array('FlexQuiz\Exams', 'activation'));

/** Deactivation hooks */
register_deactivation_hook(__FILE__, array('FlexQuiz\Exams', 'devactivation'));
