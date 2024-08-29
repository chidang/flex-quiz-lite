<?php

/**
 * Single participant template.
 *
 * @since 1.0.0
 * @package Flex\Quiz
 */

get_header();
use Flex\Helpers\Common;

$full_name   = get_the_title();
$email       = get_post_meta( get_the_ID(), 'email', true );
$phone       = get_post_meta( get_the_ID(), 'phone', true );
$address     = get_post_meta( get_the_ID(), 'address', true );
$birth_date  = Common::participant_birth_date( get_the_ID() );
$submissions = get_post_meta( get_the_ID(), 'submissions', true );

$banner_id  = get_option( 'fxq_exams_exam_banner', '' );
$banner_url = wp_get_attachment_url( $banner_id );
$style      = '';
$banner_url = ! empty( $banner_url ) ? $banner_url : FLEX_QUIZ_DIR_URL . 'app/assets/images/exam-banner.jpg';
$style      = 'background-image: url(' . esc_url( $banner_url ) . ');';
?>
<main id="flex-quiz-wrap" class="main-content exam-practice">
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
		<div class="overlay" style="background-color: rgba(0, 0, 0, 0.3);"></div>
	</div>
	</section>
	<section>
	<div class="container">
		<div class="fxq-participant-info fxq-py-2 fxq-px-3">
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
					<?php echo esc_html( $full_name ); ?>
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
					<?php esc_html_e( 'Address', 'flex-quiz' ); ?>:
					</div>
					<div class="fxq-mb-0 fxq-p-2 !fxq-border-none !fxq-shadow-none fxq-py-0 fxq-outline-none">
					<?php echo esc_html( $address ); ?>
					</div>
				</div>
				</div>
			</div>
		</div>
		<div class="fxq-participant-submissions fxq-py-2 fxq-px-3">
			<div class="fxq-mt-4 fxq-bg-primary-box fxq-rounded-lg fxq-p-6 fxq-mx-auto">
				<div class='fxq-border-b-2 fxq-border-light-gray lg:fxq-px-6 fxq-mb-10 fxq-pb-4'>
				<h3 class="fxq-text-3xl fxq-mb-4 fxq-text-primary"><?php esc_html_e( 'List Quiz Submissions', 'flex-quiz' ); ?></h3>
				</div>
				<div class="fxq-grid fxq-gap-4 fxq-grid-cols-1 sm:fxq-grid-cols-2 lg:fxq-px-6 ">
					<div class="fxq-rounded-[4px] fxq-col-span-2 sm:fxq-col-span-1">
						<?php if ( $submissions && count( $submissions ) > 0 ) : ?>
						<ol>
							<?php
							foreach ( $submissions as $index => $submission_id ) :
								$submission_title = get_the_title( $submission_id );
								$submission_link  = get_permalink( $submission_id );
								?>
														<li class="fxq-flex fxq-items-center fxq-text-blue-950 fxq-text-[0.875rem] fxq-font-bold fxq-whitespace-nowrap fxq-px-2 fxq-py-0 fxq-leading-8 fxq-mb-0">
								<span><?php echo esc_html( $index ) + 1; ?>.</span><a class="fxq-ml-2" href="<?php echo esc_html( $submission_link ); ?>"><?php echo esc_html( $submission_title ); ?></a>
							</li>
							<?php endforeach; ?>
						</ol>
						<?php else : ?>
							<p><?php esc_html_e( 'No submissions found.', 'flex-quiz' ); ?></p>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>
		<div class="fxq-p-5"></div>
	</div>
	</section>
</main>

<?php
get_footer();
