import React from "react";
import GooglePayButton from '@google-pay/button-react';

const allowedPaymentMethods = [
    {
        type: 'CARD',
        parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
        },
        },
    },
]

const merchantInfo = {
    merchantId: '12345678901234567890',
    merchantName: 'Demo Merchant',
}

const transactionInfo = {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice: '100.00',
    currencyCode: 'USD',
    countryCode: 'US',
}

export const GooglePay = ({
    setConfirmOrder,
    setShowSuccessToast,
    createNewOrder
}) => {
    return (
        <GooglePayButton
            environment="TEST"
            buttonColor={"blue"}
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: allowedPaymentMethods,
                merchantInfo: merchantInfo,
                transactionInfo: transactionInfo,
            }}
            onLoadPaymentData={paymentRequest => {
                setConfirmOrder(false)
                setShowSuccessToast(true)
            }}
            onClick={createNewOrder}
        />
    )
}