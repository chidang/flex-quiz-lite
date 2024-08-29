<?php
// Participant Quiz Result Email Template
?>

<table border="0" width="100%" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td align="center" valign="top">
        <table style="background-color:#fdfdfd;border-radius:3px 3px 0 0!important;border:1px solid #dcdcdc;" border="0" width="600" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td align="center" valign="top">
                <table style="background-color:#0e2954;border-bottom:0;color:#ffffff;line-height:100%;vertical-align:middle;" border="0" width="600" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="padding:15px 48px;">
                        <h2 style="color:#ffffff;font-size:30px;font-weight:300;line-height:150%;margin:20px 0 20px 0;text-align:center;"><strong>Quiz Results</strong></h2>
                        <p style="color:#ffffff;font-size:20px;margin:0 0 20px 0;text-align:center;"><strong>@quiz_title</strong></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table style="background-color:#ffffff;border-bottom:0;color:#0e2954;line-height:100%;vertical-align:middle;" border="0" width="600" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="padding:36px 20px;">
                        <p style="color:#0e2954;font-size:16px;font-weight:300;line-height:150%;margin:20px 0 20px 0;"><strong>Dear @participant_fullname,</strong></p>
                        <p style="color:#0e2954;font-size:16px;font-weight:300;line-height:150%;margin:20px 0 20px 0;">Congratulations on completing your exam! Below are your quiz results and personal information for your records:</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table style="background-color:#0e2954;border-bottom:0;color:#ffffff;line-height:100%;vertical-align:middle;" border="0" width="600" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="padding:20px 48px;">
                        <h3 style="color:#ffffff;font-size:30px;font-weight:300;line-height:150%;margin:20px 0 20px 0;text-align:center;"><strong>Your points</strong></h3>
                        <h3 style="color:#ffffff;font-size:30px;font-weight:300;line-height:150%;margin:20px 0 20px 0;text-align:center;">@result_total_points</h3>
                        <h3 style="color:#ffffff;font-size:16px;font-weight:300;line-height:150%;margin:0 0 20px 0;text-align:center;"><strong>The exam average:</strong> @result_average</h3>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table border="0" width="600" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="background-color:#fdfdfd;" valign="top">
                        <table border="0" width="100%" cellspacing="0" cellpadding="20">
                          <tbody>
                            <tr>
                              <td style="padding:20px;" valign="top">
                                <div style="color:#737373;font-size:14px;line-height:150%;text-align:left;">
                                  <h1 style="color:#0e2954;font-size:18px;font-weight:normal;line-height:130%;margin:16px 0 8px;text-align:center;"><i>Personal Information</i></h1>
                                  <table style="border:1px solid #e4e4e4;color:#737373;width:100%;" border="1" cellspacing="0" cellpadding="6">
                                    <tbody>
                                      <tr>
                                        <th style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>Full name:</p>
                                        </th>
                                        <td style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>@participant_fullname</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>Email:</p>
                                        </th>
                                        <td style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>@participant_email</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>Date of birth:</p>
                                        </th>
                                        <td style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>@participant_date_of_birth</p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>Phone:</p>
                                        </th>
                                        <td style="border:1px solid #eee;color:#737373;padding:12px;text-align:left;vertical-align:middle;">
                                          <p>@participant_phone</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table style="background-color:#ffffff;border-bottom:0;color:#0e2954;line-height:100%;margin:0;vertical-align:middle;" border="0" width="600" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="padding:0 20px 0 20px;">
                        <p style="color:#0e2954;font-size:16px;font-weight:300;line-height:150%;margin:20px 0 20px 0;">Thank you for participating in the exam. If you have any questions or need further assistance, please feel free to contact us.</p>
                        <p style="color:#0e2954;font-size:16px;font-weight:300;line-height:150%;margin:20px 0 5px 0;">Best regards,</p>
                        <p style="padding:0px 0 40px 0;"><strong>Flex Quiz</strong></p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" valign="top">
                <table style="background-color:#0e2954;border-bottom:0;color:#ffffff;line-height:100%;vertical-align:middle;" border="0" width="600" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td style="padding:0px 48px;">
                        <p style="color:#ffffff;font-size:16px;font-weight:400;line-height:150%;margin:20px 0 20px 0;text-align:center;">Flexa</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>