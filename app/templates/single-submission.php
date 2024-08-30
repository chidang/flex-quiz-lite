<?php

/**
 * Single exam template.
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

get_header();

use Flex\Helpers\Common;

$exam_id             = get_post_meta( get_the_ID(), 'exam_id', true );
$exam_title          = get_the_title( $exam_id );
$full_name           = get_post_meta( get_the_ID(), 'full_name', true );
$phone               = get_post_meta( get_the_ID(), 'phone', true );
$email               = get_post_meta( get_the_ID(), 'email', true );
$birth_date          = Common::participant_birth_date( get_the_ID() );
$address             = get_post_meta( get_the_ID(), 'address', true );
$answers             = maybe_unserialize( get_post_meta( get_the_ID(), 'answers', true ) );
$post_date           = get_post_time( 'd-m-Y h:i:s A', true, get_the_ID() );
$achieved_score      = get_post_meta( get_the_ID(), 'achieved_score', true );
$max_points          = get_post_meta( get_the_ID(), 'max_points', true );
$average             = round( 100 * $achieved_score / $max_points );
$subsribe_newsletter = get_post_meta( get_the_ID(), 'subscribe_newsletter', true );
$participant_id      = get_post_meta( get_the_ID(), 'participant_id', true );
$participant_url     = get_permalink( $participant_id );
?>
<main id="flex-quiz-wrap" class="main-content exam-practice">
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
				<div class="text-box-content text dark">
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
	<section>
	<div class="container">
		<div class="fxq-p-5">
		<div class="fxq-mt-4 fxq-bg-primary-box fxq-rounded-lg fxq-p-6 fxq-mx-auto">
			<div class='fxq-border-b-2 fxq-border-light-gray lg:fxq-px-6 fxq-mb-10 fxq-pb-4'>
				<h3 class="fxq-text-3xl fxq-mb-4 fxq-text-primary"><?php esc_html_e( 'Personal Information', 'flex-quiz' ); ?></h3>
			</div>
			<div class="fxq-grid fxq-gap-4 fxq-grid-cols-1 sm:fxq-grid-cols-2 lg:fxq-px-6 ">
			<div class="fxq-flex fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
				<div class="fxq-flex fxq-items-center fxq-text-blue-950 fxq-text-[0.875rem] fxq-h-full fxq-font-bold fxq-whitespace-nowrap fxq-px-2 fxq-py-0 fxq-leading-8 fxq-mb-0">
				<?php esc_html_e( 'Full name', 'flex-quiz' ); ?>:
				</div>
				<div class="fxq-mb-0 fxq-p-2 !fxq-border-none !fxq-shadow-none fxq-py-0 fxq-outline-none">
				<a href="<?php echo esc_html( $participant_url ); ?>"><?php echo esc_html( $full_name ); ?></a>
				</div>
			</div>
			<div class="fxq-flex fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
				<div class="fxq-flex fxq-items-center fxq-text-blue-950 fxq-text-[0.875rem] fxq-h-full fxq-font-bold fxq-whitespace-nowrap fxq-px-2 fxq-py-0 fxq-leading-8 fxq-mb-0">
				<?php esc_html_e( 'Date of birth', 'flex-quiz' ); ?>:
				</div>
				<div class="fxq-mb-0 fxq-p-2 !fxq-border-none !fxq-shadow-none fxq-py-0 fxq-outline-none">
				<?php echo esc_html( $birth_date ); ?>
				</div>
			</div>
			<div class="fxq-flex fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
				<div class="fxq-flex fxq-items-center fxq-text-blue-950 fxq-text-[0.875rem] fxq-h-full fxq-font-bold fxq-whitespace-nowrap fxq-px-2 fxq-py-0 fxq-leading-8 fxq-mb-0">
				<?php esc_html_e( 'Email', 'flex-quiz' ); ?>:
				</div>
				<div class="fxq-mb-0 fxq-p-2 !fxq-border-none !fxq-shadow-none fxq-py-0 fxq-outline-none">
				<?php echo esc_html( $email ); ?>
				</div>
			</div>
			<div class="fxq-flex fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
				<div class="fxq-flex fxq-items-center fxq-text-blue-950 fxq-text-[0.875rem] fxq-h-full fxq-font-bold fxq-whitespace-nowrap fxq-px-2 fxq-py-0 fxq-leading-8 fxq-mb-0">
				<?php esc_html_e( 'Phone', 'flex-quiz' ); ?>:
				</div>
				<div class="fxq-mb-0 fxq-p-2 !fxq-border-none !fxq-shadow-none fxq-py-0 fxq-outline-none">
				<?php echo esc_html( $phone ); ?>
				</div>
			</div>
			<div class="fxq-flex fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
				<div class="fxq-flex fxq-items-center fxq-text-blue-950 fxq-text-[0.875rem] fxq-h-full fxq-font-bold fxq-whitespace-nowrap fxq-px-2 fxq-py-0 fxq-leading-8 fxq-mb-0">
					<?php esc_html_e( 'Submission at', 'flex-quiz' ); ?>:
				</div>
				<div class="fxq-mb-0 fxq-p-2 !fxq-border-none !fxq-shadow-none fxq-py-0 fxq-outline-none">
					<?php echo esc_html( $post_date ); ?>
				</div>
			</div>
			<div class="fxq-flex fxq-rounded-[4px] fxq-items-center fxq-col-span-2 sm:fxq-col-span-1">
				<div class="fxq-flex fxq-items-center fxq-text-blue-950 fxq-text-[0.875rem] fxq-h-full fxq-font-bold fxq-whitespace-nowrap fxq-px-2 fxq-py-0 fxq-leading-8 fxq-mb-0">
				<?php esc_html_e( 'Address', 'flex-quiz' ); ?>:
				</div>
				<div class="fxq-mb-0 fxq-p-2 !fxq-border-none !fxq-shadow-none fxq-py-0 fxq-outline-none">
				<?php echo esc_html( $address ); ?>
				</div>
			</div>
			<div class='fxq-mt-3 fxq-ml-2'>
				<label class="fxq-inline-flex fxq-items-center fxq-text-primary">
					<input
						type="checkbox"
						class="fxq-form-checkbox fxq-h-4 fxq-w-4"
						<?php echo $subsribe_newsletter ? 'checked' : ''; ?>
						disabled
					/>
					<span class="fxq-ml-2"><?php esc_html_e( 'Subscribe for newsletter', 'flex-quiz' ); ?></span>
				</label>
			</div>
			</div>
		</div>
		</div>
	</div>
	</section>
	<section>
	<div class="container">
		<div class="fxq-p-5">
		<div class="fxq-bg-secondary-box fxq-rounded-lg fxq-py-14 fxq-px-12 fxq-mx-auto fxq-my-4">
			<div class="fxq-px-6 fxq-flex fxq-flex-col fxq-items-center fxq-text-secondary fxq-max-w-md fxq-mx-auto">
			<h2 class="fxq-text-3xl fxq-font-bold fxq-mb-4 fxq-text-center fxq-text-secondary"><?php esc_html_e( 'Points', 'flex-quiz' ); ?></h2>
			<p class="fxq-text-3xl fxq-mb-4"><?php echo esc_html( $achieved_score ) . '/' . esc_html( $max_points ); ?></p>
			<p class="fxq-text-base fxq-mb-6"><?php esc_html_e( 'The exam average is', 'flex-quiz' ); ?> <?php echo esc_html( $average ); ?>%</p>
			<div class="fxq-w-[295px] fxq-border fxq-border-white fxq-h-3 fxq-overflow-hidden">
				<div class="fxq-bg-white fxq-h-full" style="width: <?php echo esc_html( $average ); ?>%;"></div>
			</div>
			<a href="<?php echo esc_html( get_permalink( $exam_id ) ); ?>"
				class="fxq-bg-tertiary fxq-text-secondary fxq-text-center fxq-px-4 fxq-py-2 fxq-rounded fxq-capitalize fxq-mr-0 fxq-w-72 fxq-mt-8 hover:fxq-shadow-custom-inset-hover">
				<?php esc_html_e( 'Go to the exam page', 'flex-quiz' ); ?>
			</a>
			</div>
			<div class="fxq-mt-5 fxq-border-t fxq-border-dark-grey fxq-py-6 fxq-text-secondary">
			<p class="fxq-text-base"><?php esc_html_e( 'Answers breakdown', 'flex-quiz' ); ?>:</p>
			<?php
			// Fetch exam data to display questions and answers
			$exam_id = get_post_meta( get_the_ID(), 'exam_id', true );
			if ( $exam_id ) {
				$exam_steps = get_post_meta( $exam_id, 'exam_steps', true );
				?>
				<ol class="fxq-ml-5 fxq-marker-text-lg">
				<?php
				if ( $exam_steps ) {
					foreach ( $exam_steps as $step_index => $step ) {
						foreach ( $step['questions'] as $question_index => $question ) {
							$question_key = "{$step_index}-{$question_index}";
							$user_answer  = ! empty( $answers ) && isset( $answers[ $question_key ] ) ? $answers[ $question_key ] : null;
							?>
						<li class="fxq-my-6 fxq-px-2">
							<h4 class="fxq-text-lg fxq-mb-8 fxq-text-secondary fxq-font-bold"><?php echo esc_html( $question['text'] ); ?></h4>
							<div class="fxq-grid fxq-grid-cols-2 lg:fxq-grid-cols-4 gap-2">
							<?php
							foreach ( $question['answers'] as $answer_index => $answer ) {
								$isCorrect  = in_array( $answer_index, $question['correctAnswers'] );
								$isSelected = is_array( $user_answer ) ? in_array( $answer_index, $user_answer ) : $user_answer === $answer_index;

								$icon = '';
								if ( $isSelected && $isCorrect ) {
									$icon = FLEX_QUIZ_DIR_URL . '/app/assets/images/checked.svg'; // green check mark
								} elseif ( $isSelected && ! $isCorrect ) {
									$icon = FLEX_QUIZ_DIR_URL . '/app/assets/images/decline.svg'; // red cross mark
								} else {
									$icon = FLEX_QUIZ_DIR_URL . '/app/assets/images/circle.svg';
								}
								echo '<p class="fxq-flex fxq-items-center fxq-mb-1"><span class="fxq-flex fxq-items-center fxq-text-xl fxq-mr-1">' . '<img src="' . esc_html( $icon ) . '"' . '</span><span class="fxq-ml-2">' . esc_html( $answer ) . '</span></p>';
							}
							?>
							</div>
						</li>
							<?php
						}
					}
					?>
				</ol>
					<?php
				} else {
					echo '<p>' . esc_html__( 'No answers submitted.', 'flex-quiz' ) . '</p>';
				}
			} else {
				echo '<p>' . esc_html__( 'Exam data not found.', 'flex-quiz' ) . '</p>';
			}
			?>
			</div>
		</div>
		</div>
	</div>
	</section>
</main>

<?php
get_footer();
