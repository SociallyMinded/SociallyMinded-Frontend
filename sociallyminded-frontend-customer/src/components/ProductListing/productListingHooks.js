import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllProductsUrl, getAllReviewsByProductIdUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"
import { createNewOrderUrl } from "../../routes/routes"
import { UserAuth } from "../../context/AuthContext"

const useProductListingHooks = (state) => {

    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [showReviewsPage, setShowReviewsPage] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showLoginPromptToast, setShowLoginPromptToast] = useState(false);


    const handleShowPurchaseModal = () => setShowPurchaseModal(true);
    const handleClosePurchaseModal = () => setShowPurchaseModal(false);

    const handleShowReviewsPage = () => setShowReviewsPage(true);
    const handleCloseReviewsPage = () => setShowReviewsPage(false);

    const handleShowSuccessToast = () => setShowSuccessToast(true);
    const handleCloseSuccessToast = () => setShowSuccessToast(false);

    const handleShowLoginPromptToast = () => setShowLoginPromptToast(true);
    const handleCloseLoginPromptToast = () => setShowLoginPromptToast(false);

    
    const [orderQty, setOrderQty] = useState(false);

    const handleOrderQty = (e) => setOrderQty(e.target.value);

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

    const createNewOrder = async () => {
        setLoading(true)
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
                    "orderTitle": `${state.d.name} Order`
                }
            }
           console.log(newOrder)
            await axios.post(createNewOrderUrl, newOrder)
                .then(response => {
                    console.log(response.data)
                    setData(response.data)
                })
                .catch(error => setError(error.response.data))
                .finally(res => {
                    setShowPurchaseModal(false)
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
        showLoginPromptToast, handleShowLoginPromptToast, handleCloseLoginPromptToast
    } 
}

export default useProductListingHooks