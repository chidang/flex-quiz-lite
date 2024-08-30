<?php
namespace FlexQuiz\Helpers;

defined( 'ABSPATH' ) || exit;

final class Common {
	const API_SLUG = 'flex-quiz/v1';

	public static function participant_birth_date( $post_id ) {
		$birth_date_str = get_post_meta( $post_id, 'birth_date', true );

		if ( ! empty( $birth_date_str ) ) {
			$birth_date = ( new \DateTime( $birth_date_str ) )->format( 'd-m-Y' );
		} else {
			$birth_date = '';
		}

		return $birth_date;
	}
}
