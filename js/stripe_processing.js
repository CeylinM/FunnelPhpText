/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Stripe.setPublishableKey('pk_test_vSKaHsvjamp8RQ1xsZzMG3BO');



jQuery(document).ready(function ($) {
    $("#cfAR").submit(function (event) {
        // disable the submit button to prevent repeated clicks
        $('#SubmitOrderForm').attr("disabled", "disabled");

        // send the card details to Stripe
        Stripe.createToken({
            number: $('#CardNumber').val(),
            cvc: $('#CVC').val(),
            exp_month: $('#EXPMonth').val(),
            exp_year: $('#Year').val()
        }, stripeResponseHandler);

        // prevent the form from submitting with the default action
        return false;
    });
});



function stripeResponseHandler(status, response) {
    if (response.error) {
        // show errors returned by Stripe
        jQuery(".payment-errors").html(response.error.message);
        // re-enable the submit button
        jQuery('#SubmitOrderForm').attr("disabled", false);
    } else {
        var form$ = jQuery("#cfAR");
        // token contains id, last4, and card type
        var token = response['id'];
        // insert the token into the form so it gets submitted to the server
        form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
        // and submit
        form$.get(0).submit();
    }
}
