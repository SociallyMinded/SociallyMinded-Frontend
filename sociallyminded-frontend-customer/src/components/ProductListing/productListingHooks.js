import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllProductsUrl, getAllReviewsByProductIdUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"
import { createNewOrderUrl, obtainGeocodeUrl } from "../../routes/routes"
import { UserAuth } from "../../context/AuthContext"

export const ORDERSTATUS = {
    PENDING_APPROVAL: 'Pending Approval',
    AWAITING_PAYMENT: 'Payment Required',
    IN_DELIVERY: 'In Delivery'
}


const useProductListingHooks = (state) => {

    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [showReviewsPage, setShowReviewsPage] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showLoginPromptToast, setShowLoginPromptToast] = useState(false);


    const handleShowPurchaseModal = () => {
        if (user == null) {
            setShowPurchaseModal(false)
            setShowLoginPromptToast(true)
        } else {
            setShowPurchaseModal(true);
        }
    }

    const handleClosePurchaseModal = () => setShowPurchaseModal(false);

    const handleShowReviewsPage = () => setShowReviewsPage(true);
    const handleCloseReviewsPage = () => setShowReviewsPage(false);

    const handleShowSuccessToast = () => setShowSuccessToast(true);
    const handleCloseSuccessToast = () => setShowSuccessToast(false);

    const handleShowLoginPromptToast = () => setShowLoginPromptToast(true);
    const handleCloseLoginPromptToast = () => setShowLoginPromptToast(false);

    
    const [orderQty, setOrderQty] = useState("");
    const handleOrderQty = (e) => setOrderQty(e.target.value);

    const [creditCardNos, setCreditCardNos] = useState("");
    const handleCreditCardNos = (e) => setCreditCardNos(e.target.value);

    const [creditCardCVV, setCreditCardCVV] = useState("");
    const handleCreditCardCVV = (e) => setCreditCardCVV(e.target.value);

    const [postalCode, setPostalCode] = useState("")
    const handlePostalCode = (e) => setPostalCode(e.target.value);


    const [addressData, setAddressData] = useState("")

    const [confirmOrder, setConfirmOrder] = useState(false)
    const showConfirmOrderPage = (e) => setConfirmOrder(true)
    const closeConfirmOrderPage = (e) => setConfirmOrder(false)


    const returnToPurchaseModalAfterConfirmModal = () => {
        setConfirmOrder(false)
        setShowPurchaseModal(true)
    }

    const { user } = UserAuth()

    useEffect(() => {
        axios.get(getAllReviewsByProductIdUrl + state.d.productId)
        .then(response => {
            setData(response.data)
            setDisplayData(response.data)
        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, []);

    const geocodeAddress =  async () => {
        const url = obtainGeocodeUrl(postalCode)
        await axios.get(url)
        .then(response => {
            const addressData = response.data.results[0]
            console.log(addressData)
            setAddressData(addressData)
        })
        .catch((error) => {
            console.log(error)
        })
        .finally (() => {
            setLoading(false)
            setShowPurchaseModal(false)
            setConfirmOrder(true)

        })
    }

    const createNewOrder = async () => {
        setLoading(true)
        console.log(addressData.ADDRESS)
        if (user != null) {
            console.log("user id:"+user.uid)
            const customerFirebaseUid = user.uid
            const productId = state.d.productId
            const totalPrice = Math.round(state.d.price * orderQty,2)
            const newOrder = {
                "productId" : productId,
                "custFirebaseUid": customerFirebaseUid,
                "record": {
                    "quantity": orderQty,
                    "totalPrice":totalPrice,
                    "orderTitle": `${state.d.name} Order`,
                    "address": addressData != null ? addressData.ADDRESS : ""
                }
            }
           console.log(newOrder)
            await axios.post(createNewOrderUrl, newOrder)
                .then(response => {
                    console.log(response)
                })
                .catch(error => setError(error))
                .finally(res => {
                    setConfirmOrder(false)
                    setShowSuccessToast(true)
                })
        } else {
            setShowPurchaseModal(false)
            setShowLoginPromptToast(true)
        }
    }
    
    return { 
        data, displayData, loading, error, createNewOrder, 
        handleShowPurchaseModal, handleShowReviewsPage, handleClosePurchaseModal, showPurchaseModal,
        showSuccessToast, handleShowSuccessToast, handleCloseSuccessToast, orderQty, handleOrderQty,
        postalCode, handlePostalCode, creditCardCVV, handleCreditCardCVV, creditCardNos, handleCreditCardNos,
        showLoginPromptToast, handleShowLoginPromptToast, handleCloseLoginPromptToast, geocodeAddress,
        confirmOrder, showConfirmOrderPage,
        addressData, returnToPurchaseModalAfterConfirmModal, closeConfirmOrderPage
    } 
}

export default useProductListingHooks