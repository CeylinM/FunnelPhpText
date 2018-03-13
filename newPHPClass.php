<?php
namespace Stripe;
// Stripe library
require 'Stripe/Stripe.php';
//require_once('stripe-6.3/init.php');

include 'ChromePhp.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of newPHPClass
 *
 * @author ceylin
 */
class newPHPClass {

    private $customer_id;
    private $pubkey;

    public function chargeWithToken() {
        Stripe\Stripe::setApiKey("pk_test_vSKaHsvjamp8RQ1xsZzMG3BO");
        $pubkey = "pk_test_vSKaHsvjamp8RQ1xsZzMG3BO";


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

            ChromePhp::log('shippingEmail');
            ChromePhp::log($_POST['shippingEmail']);


            try {
 ChromePhp::log('inside try');
// Create a Customer
                $customer = \Stripe\Customer::create(array(
                            "email" => $_POST['shippingEmail'],
                            "source" => $_POST['stripeToken'],
                ));

                 ChromePhp::log($customer);
                setCustomerID($customer->id);
                ChromePhp::log('customerID');
                ChromePhp::log($customer->id);

// Charge Customer
                $charge = \Stripe\Charge::create(array(
                            "amount" => $amount_cents,
                            "currency" => "usd",
                            "customer" => $customer->id,
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
    }

    public function setCustomerID($customer_id) {
        $this->customer_id = $customer_id;
        ChromePhp::log('customer_id');
        ChromePhp::log($customer_id);
    }

    public function getCustomerID() {
        return $this->customer_id;
    }

}



?>


