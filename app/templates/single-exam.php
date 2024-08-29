<?php
/**
 * Single exam template.
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

get_header();
require FLEX_QUIZ_DIR_PATH . '/app/templates/style.php';

?>

<main class="exam-practice">
	<?php
	if ( get_option( 'fxq_exams_show_banner', false ) ) :
		$banner_id  = get_option( 'fxq_exams_exam_banner', '' );
		$banner_url = wp_get_attachment_url( $banner_id );
		$style      = '';
		$banner_url = ! empty( $banner_url ) ? $banner_url : FLEX_QUIZ_DIR_URL . 'app/assets/images/exam-banner.jpg';
		$style      = 'background-image: url(' . esc_url( $banner_url ) . ');';
		?>
	<section class="exam-practice-banner">
		<div class="banner" style="<?php echo esc_html( $style ); ?>">
			<div class="container">
				<div class="text-box">
					<div class="text-box-content fxq-text-white">
						<h1>
							<?php
							printf( /* translators: %s - event name */
								esc_html( get_the_title() )
							)
							?>
						</h1>
					</div>
				</div>
			</div>
			<div class="overlay" style="background-color: rgba(0, 0, 0, 0.4);"></div>
		</div>
	</section>
	<?php endif; ?>
	<section class="entry-main">
		<div class="container">
			<div class="exam-content">
				<input id="flex-quiz-id" type="hidden" value="<?php echo esc_html( get_the_ID() ); ?>" />
				<div id="flex-quiz-app">
					<style>
						.loading {
							font-size: 18px;
							letter-spacing: 0.1em;
							position: absolute;
							top: 50%;
							left: 50%;
							display: inline;
							transform: translateX(-40px);
						}

						.loading::after {
						content: ' ';
						animation: dots 1.5s steps(5, end) infinite;
						}

						@keyframes dots {
						0%, 20% {
							content: ' ';
						}
						40% {
							content: '.';
						}
						60% {
							content: '..';
						}
						80%, 100% {
							content: '...';
						}
						}
					</style>
					<div style="position: relative; height: 300px">
						<p class="loading"><?php esc_html_e( 'Loading', 'flex-quiz' ); ?></p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<?php
get_footer();
