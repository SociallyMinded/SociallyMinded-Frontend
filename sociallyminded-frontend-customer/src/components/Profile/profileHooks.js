import { useState, useMemo, useCallback } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { deleteOrderUrl, getOrdersByCustomer, updateOrderUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"

export const Actions = {
    UPDATE: 'Update',
    CANCEL: 'Cancel',
    PAYMENT: 'Payment'
}

export const ORDERSTATUS = {
    PENDING_APPROVAL: 'Pending Approval',
    AWAITING_PAYMENT: 'Payment Required',
    IN_DELIVERY: 'In Delivery'
}

const useProfileHooks = (user) => {
    const [data, setData] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const [refreshTable, setRefreshTable]= useState(false)

    const [orderSelected, setCurrentOrderSelected] = useState(null)

    // Edit
    const [showEditOrderModal, setShowEditOrderModal] = useState(false);
    const handleShowEditOrderModal = () => setShowEditOrderModal(true);
    const handleCloseEditOrderModal = () => setShowEditOrderModal(false);
    
    const [editOrderQty, setEditOrderQty] = useState(false);
    const handleEditOrderQty = (qty) => setEditOrderQty(qty);
    
    const [editOrderError, setEditOrderError] = useState(null)
    
    const [showEditSuccessToast, setShowEditSuccessToast] = useState(false)
    const handleShowEditSuccessToast = () => setShowEditSuccessToast(true)
    const handleCloseEditSuccessToast = () => setShowEditSuccessToast(false)

    // Cancel
    const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
    const handleShowCancelOrderModal = () => setShowCancelOrderModal(true);
    const handleCloseCancelOrderModal = () => setShowCancelOrderModal(false);
    
    const [cancelOrderError, setCancelOrderError] = useState(null)

    const [showCancelSuccessToast, setShowCancelSuccessToast] = useState(false)
    const handleShowCancelSuccessToast = () => setShowCancelSuccessToast(true)
    const handleCloseCancelSuccessToast = () => setShowCancelSuccessToast(false)


    const handleOrderSelected = (order, action) => {
        setCurrentOrderSelected(order)
        setEditOrderQty(order.quantity)
        if (action == Actions.UPDATE) {
            setShowEditOrderModal(true)
        } else if (action == Actions.CANCEL) {
            setShowCancelOrderModal(true)
        } else if (action == Actions.PAYMENT) {
            setShowPaymentOrderModal(true)
        }
    }


    const updateEditedOrder = async () => {
        setLoading(true)
        if (user != null) {
            const customerFirebaseUid = user.uid
            const updatedTotalPrice = editOrderQty * orderSelected.product.price
            console.log(orderSelected)
            const newOrder = {
                "productId" : orderSelected.product.productId,
                "custFirebaseUid": customerFirebaseUid,
                "record": {
                    "quantity": editOrderQty,
                    "totalPrice": updatedTotalPrice,
                    "orderTitle": `${orderSelected.orderTitle}`,
                    "orderRecordId": orderSelected.orderRecordId,
                    "dateOfOrder": orderSelected.dateOfOrder,
                    "orderStatus": orderSelected.orderStatus
                }
            }
           
            await axios.put(updateOrderUrl + orderSelected.orderRecordId, newOrder)
                .then(response => {
                    console.log(response)
                })
                .catch(error => setEditOrderError(error.response.data))
                .finally(res => {
                    setRefreshTable(true)

                    setShowEditOrderModal(false)
                    setShowEditSuccessToast(true)
                })
        } else {
            // setShowPurchaseModal(false)
            // setShowLoginPromptToast(true)
        }
    }

    const cancelOrder = async () => {
        setLoading(true)
        if (user != null) {
            const customerFirebaseUid = user.uid
            const updatedTotalPrice = editOrderQty * orderSelected.product.price

            const newOrder = {
                "productId" : orderSelected.product.productId,
                "custFirebaseUid": customerFirebaseUid,
                "record": {
                    "quantity": editOrderQty,
                    "totalPrice": updatedTotalPrice,
                    "orderTitle": `${orderSelected.orderTitle}`,
                    "orderRecordId": orderSelected.orderRecordId,
                    "dateOfOrder": orderSelected.dateOfOrder,
                    "orderStatus": orderSelected.orderStatus
                }
            }
          
            await axios.delete(deleteOrderUrl + orderSelected.orderRecordId)
                .then(response => {
                    console.log(response)
                })
                .catch(error => setEditOrderError(error.response.data))
                .finally(res => {
                    setRefreshTable(true)
                    setShowCancelOrderModal(false)
                    setShowCancelSuccessToast(true)
                })
        } else {
            // setShowPurchaseModal(false)
            // setShowLoginPromptToast(true)
        }
    }

    // Payment
    const [showPaymentOrderModal, setShowPaymentOrderModal] = useState(false);
    const handleShowPaymentOrderModal = () => setShowPaymentOrderModal(true);
    const handleClosePaymentOrderModal = () => setShowPaymentOrderModal(false);

    const [payment, setPayment] = useState("");
    const handlePayment = (e) => setPayment(e.target.value);
    
    const [creditCardNos, setCreditCardNos] = useState("");
    const handleCreditCardNos = (e) => setCreditCardNos(e.target.value);
    
    const[creditCardCVV, setCreditCardCVV] = useState("")
    const handleCreditCardCVV= (e) => setCreditCardCVV(e.target.value);

    const[creditCardExpiryDate, setCreditCardExpiryDate] = useState("")
    const handleCreditCardExiryDate= (e) => setCreditCardExpiryDate(e.target.value);


    const [cancelPaymentError, setCancelPaymentError] = useState(null)

    const [showPaymentSuccessToast, setShowPaymentSuccessToast] = useState(false)
    const handleShowPaymentSuccessToast = () => setShowPaymentSuccessToast(true)
    const handleClosePaymentSuccessToast = () => setShowPaymentSuccessToast(false)

    const makePayment = async () => {
        setLoading(true)
        if (user != null) {
            const customerFirebaseUid = user.uid
            if (payment == orderSelected.totalPrice) {
                const newOrder = {
                    "productId" : orderSelected.product.productId,
                    "custFirebaseUid": customerFirebaseUid,
                    "record": {
                        "quantity": orderSelected.quantity,
                        "totalPrice": orderSelected.totalPrice,
                        "orderTitle": `${orderSelected.orderTitle}`,
                        "orderRecordId": orderSelected.orderRecordId,
                        "dateOfOrder": orderSelected.dateOfOrder,
                        "orderStatus": ORDERSTATUS.IN_DELIVERY
                    }
                }

                await axios.put(updateOrderUrl + orderSelected.orderRecordId, newOrder)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    setCancelPaymentError(error)
                })
                .finally(res => {
                    setRefreshTable(true)

                    setShowPaymentOrderModal(false)
                    setShowPaymentSuccessToast(true)
                })
            } else {
                // setShowPurchaseModal(false)
                // setShowLoginPromptToast(true)
            }
        }
    }
    


    useEffect(() => {
        axios.get(getOrdersByCustomer + user.uid)
        .then(response => {
            setData(response.data)
        })  
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, [
        user, refreshTable, 
        showEditOrderModal, showEditSuccessToast, 
        showCancelOrderModal, showCancelSuccessToast,
        showPaymentOrderModal, showPaymentSuccessToast
    ]);

    return { 
        data, loading, error,
        editOrderQty,
        handleOrderSelected,
        orderSelected,

        updateEditedOrder,
        showEditOrderModal,
        handleShowEditOrderModal,
        handleCloseEditOrderModal,
        handleEditOrderQty,
        showEditSuccessToast,
        handleShowEditSuccessToast,
        handleCloseEditSuccessToast,
       
        cancelOrder,
        showCancelOrderModal,
        handleShowCancelOrderModal,
        handleCloseCancelOrderModal,
        showCancelSuccessToast,
        handleShowCancelSuccessToast,
        handleCloseCancelSuccessToast,

        payment,
        creditCardNos,
        creditCardCVV,
        creditCardExpiryDate,
        handleCreditCardNos,
        handleCreditCardCVV,
        handleCreditCardExiryDate,
        handlePayment,
        makePayment,
        showPaymentOrderModal,
        handleShowPaymentOrderModal,
        handleClosePaymentOrderModal,
        showPaymentSuccessToast,
        handleShowPaymentSuccessToast,
        handleClosePaymentSuccessToast,

    } 
}

export default useProfileHooks