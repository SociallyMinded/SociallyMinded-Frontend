import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllProductsUrl, getAllReviewsByProductIdUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"
import { createNewOrderUrl } from "../../routes/routes"

const useProductListingHooks = (state) => {

    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [showReviewsPage, setShowReviewsPage] = useState(false);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleShowPurchaseModal = () => setShowPurchaseModal(true);
    const handleClosePurchaseModal = () => setShowPurchaseModal(false);

    const handleShowReviewsPage = () => setShowReviewsPage(true);
    const handleCloseReviewsPage = () => setShowReviewsPage(false);

    const handleShowToast= () => setShowToast(true);
    const handleCloseToast = () => setShowToast(false);

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
        const newOrder = {
            "productId" : "1",
            "customerId":1,
            "record": {
                "quantity": 3
            }
        }
        await axios.post(createNewOrderUrl, newOrder)
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => setError(error.response.data))
            .finally(res => {
                setShowPurchaseModal(false)
                setShowToast(true)
            })
    }
    

    return { 
        data, displayData, loading, error, createNewOrder, 
        handleShowPurchaseModal, handleShowReviewsPage, handleClosePurchaseModal, showPurchaseModal,
        showToast, handleShowToast, handleCloseToast
    } 
}

export default useProductListingHooks