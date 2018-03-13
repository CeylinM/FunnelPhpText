<?php

/**
 * Stripe - Payment Gateway integration example
 * ==============================================================================
 * 
 * @version v1.0: stripe_pay_demo.php 2016/09/29
 * @copyright Copyright (c) 2016, http://www.ilovephp.net
 * @author Sagar Deshmukh <sagarsdeshmukh91@gmail.com>
 * You are free to use, distribute, and modify this software
 * ==============================================================================
 *
 */
// Stripe library
require 'stripe/Stripe.php';
include 'ChromePhp.php';

$params = array(
    "testmode" => "on",
    "private_live_key" => "sk_live_xxxxxxxxxxxxxxxxxxxxx",
    "public_live_key" => "pk_live_xxxxxxxxxxxxxxxxxxxxx",
    "private_test_key" => "sk_test_oe7pn0YiqArua44rD5aZVdau",
    "public_test_key" => "pk_test_vSKaHsvjamp8RQ1xsZzMG3BO"
);



if ($params['testmode'] == "on") {
    Stripe::setApiKey($params['private_test_key']);
    $pubkey = $params['public_test_key'];
} else {
    Stripe::setApiKey($params['private_live_key']);
    $pubkey = $params['public_live_key'];
}

if (isset($_POST['stripeToken'])) {

    ChromePhp::log('stripeToken');
    ChromePhp::log($_POST['stripeToken']);

    $amount_cents = str_replace(".", "", $_POST['total-value']);

    // Add email address to metadata to make it searchable in the dashboard
    $metadata = array(
        "email" => $_POST['shippingEmail']
    );

    $metadata = array(
        "first_name" => $_POST['shippingFirstName'],
        "last_name" => $_POST['shippingLastName'],
        "email" => $_POST['shippingEmail'],
        "phone" => $_POST['shippingPhone'],
        "shipping_address" => $_POST['shippingAddress'],
        "shipping_city" => $_POST['shippingCity'],
        "shipping_state" => $_POST['shippingState'],
        "shipping_zippostal" => $_POST['shippingZipPostal'],
        "shippingCountry" => $_POST['shippingCountry']
    );
    try {

        $charge = Stripe_Charge::create(array(
                    "amount" => $amount_cents,
                    "currency" => "usd",
                    "source" => $_POST['stripeToken'],
                    "metadata" => $metadata,
                    "description" => $_POST['stripeDescription'])
        );

        if ($charge->card->address_zip_check == "fail") {
            throw new Exception("zip_check_invalid");
        } else if ($charge->card->cvc_check == "fail") {
            throw new Exception("cvc_check_invalid");
        }
        // Payment has succeeded, no exceptions were thrown or otherwise caught				

        $result = "success";
    } catch (Stripe_CardError $e) {

        $error = $e->getMessage();
        $result = "declined";
    } catch (Stripe_InvalidRequestError $e) {
        $result = "declined";
    } catch (Stripe_AuthenticationError $e) {
        $result = "declined";
    } catch (Stripe_ApiConnectionError $e) {
        $result = "declined";
    } catch (Stripe_Error $e) {
        $result = "declined";
    } catch (Exception $e) {

        if ($e->getMessage() == "zip_check_invalid") {
            $result = "declined";
        } else if ($e->getMessage() == "address_check_invalid") {
            $result = "declined";
        } else if ($e->getMessage() == "cvc_check_invalid") {
            $result = "declined";
        } else {
            $result = "declined";
        }
    }

    echo "<BR>Stripe Payment Status : " . $result;

    echo "<BR>Stripe Response : ";

    print_r($charge);
    exit;
}
?>