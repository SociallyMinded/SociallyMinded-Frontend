import { useState, useMemo, useCallback } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { deleteOrderUrl, getOrdersByCustomer, updateOrderUrl, obtainGeocodeUrl } from "../../routes/routes"
import axios from 'axios'
import { Toast } from "react-bootstrap";
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"
import { 
    orderTitleComparator, 
    qtyComparator, 
    priceComparator,
    orderAddressComparator, 
    orderDateComparator,
    orderStatusComparator 
} from "./comparator"

export const Actions = {
    UPDATE: 'Update',
    CANCEL: 'Cancel',
    PAYMENT: 'Payment'
}

export const ORDERSTATUS = {
    PENDING_APPROVAL: 'Pending Approval',
    AWAITING_PAYMENT: 'Payment Required',
    IN_DELIVERY: 'In Delivery',
    COMPLETED: 'Completed'
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
    
    const [editOrderQty, setEditOrderQty] = useState("");
    const handleEditOrderQty = (qty) => setEditOrderQty(qty);
    const [editOrderError, setEditOrderError] = useState(null)

    const [editOrderAddress, setEditOrderAddress] = useState("");
    const handleEditOrderAddress = (address) => setEditOrderAddress(address);
    const [editOrderAddressError, setEditOrderAddressError] = useState(null)

    const [addressData, setAddressData] = useState("")

    const [showConfirmEditModalPage, setShowConfirmEditOrderModal] = useState(false)
    const showConfirmEditOrderPage = () => setShowConfirmEditOrderModal(true)
    const closeConfirmEditOrderPage = () => setShowConfirmEditOrderModal(false)

    //toast after the review is completed
    const location = useLocation();
    const [showReviewCompleteToast, setShowReviewCompleteToast] = useState(location.search.includes('showReviewCompleteToast'));
    const handleShowReviewCompleteToast = () => setShowReviewCompleteToast(true);
    const handleCloseReviewCompleteToast = () => setShowReviewCompleteToast(false);

    const returnToPurchaseModalAfterConfirmModal = () => {
        setShowConfirmEditOrderModal(false)
        setShowEditOrderModal(true)
    }

    
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
        setEditOrderAddress(order.address)
        if (action == Actions.UPDATE) {
            setShowEditOrderModal(true)
        } else if (action == Actions.CANCEL) {
            setShowCancelOrderModal(true)
        } else if (action == Actions.PAYMENT) {
            setShowPaymentOrderModal(true)
        }
    }


    const geocodeAddress =  async () => {
        const url = obtainGeocodeUrl(editOrderAddress)
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
            setShowEditOrderModal(false)
            setShowConfirmEditOrderModal(true)
        })
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
                    "orderStatus": orderSelected.orderStatus,
                    "address": addressData.ADDRESS
                }
            }
           
            await axios.put(updateOrderUrl + orderSelected.orderRecordId, newOrder)
                .then(response => {
                    console.log(response)
                })
                .catch(error => setEditOrderError(error.response.data))
                .finally(res => {
                    setRefreshTable(true)

                    setShowConfirmEditOrderModal(false)
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
                    "orderStatus": orderSelected.orderStatus,
                    "address": addressData.ADDRESS
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
        setCreditCardNos("")
        setCreditCardCVV("")
        setCreditCardExpiryDate("")
        setPayment("")
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
                        "orderStatus": ORDERSTATUS.IN_DELIVERY,
                        "address": orderSelected.address
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
    

   
    const [sortAscendingOrderTitle, setSortAscendingOrderTitle] = useState(true)
    const sortByOrderTitle = (e) => {
        setSortAscendingOrderTitle(!sortAscendingOrderTitle)

        if (sortAscendingOrderTitle == true) {
            const sortedData = data.sort(orderTitleComparator)
            setData(sortedData)
        } else {
            const sortedData = data.sort(orderTitleComparator).reverse()
            setData(sortedData)
        }
    }

    const [sortAscendingOrderQty, setSortAscendingOrderQty] = useState(true)
    const sortByOrderQty = (e) => {
        setSortAscendingOrderQty(!sortAscendingOrderQty)

        if (sortAscendingOrderQty == true) {
            const sortedData = data.sort(qtyComparator)
            setData(sortedData)
        } else {
            const sortedData = data.sort(qtyComparator).reverse()
            setData(sortedData)
        }
    }

    const [sortAscendingOrderTotalPrice, setSortAscendingOrderTotalPrice] = useState(true)
    const sortByOrderTotalPrice = (e) => {
        setSortAscendingOrderTotalPrice(!sortAscendingOrderTotalPrice)

        if (sortAscendingOrderTotalPrice == true) {
            const sortedData = data.sort(priceComparator)
            setData(sortedData)
        } else {
            const sortedData = data.sort(priceComparator).reverse()
            setData(sortedData)
        }
    }

    const [sortAscendingOrderAddress, setSortAscendingOrderAddress] = useState(true)
    const sortByOrderAddress = (e) => {
        setSortAscendingOrderAddress(!sortAscendingOrderAddress)

        if (sortAscendingOrderAddress == true) {
            const sortedData = data.sort(orderAddressComparator)
            setData(sortedData)
        } else {
            const sortedData = data.sort(orderAddressComparator).reverse()
            setData(sortedData)
        }
    }

    const [sortAscendingOrderDate, setSortAscendingOrderDate] = useState(true)
    const sortByOrderDate = (e) => {
        setSortAscendingOrderDate(!sortAscendingOrderDate)

        if (sortAscendingOrderDate == true) {
            const sortedData = data.sort(orderDateComparator)
            setData(sortedData)
        } else {
            const sortedData = data.sort(orderDateComparator).reverse()
            setData(sortedData)
        }
    }

    const [sortAscendingOrderStatus, setSortAscendingOrderStatus] = useState(true)
    const sortByOrderStatus = (e) => {
        setSortAscendingOrderStatus(!sortAscendingOrderStatus)

        if (sortAscendingOrderStatus == true) {
            const sortedData = data.sort(orderStatusComparator)
            setData(sortedData)
        } else {
            const sortedData = data.sort(orderStatusComparator).reverse()
            setData(sortedData)
        }
    }

 

 

    const [dataExport, setDataExport] = useState([])
    const [showExportData, setShowExportData] = useState(true)
    const handleShowExportData = () => setShowExportData(true)
    const handleCloseExportDate = () => setShowExportData(false)

    const [showDownloadData, setShowDownloadData] = useState(false)
    //it save according to the filtered data.
    const prepareDataForExport = () => {
        var dataPrep = []
        if (filteredOrders != null) {
            for (let i = 0; i < filteredOrders.length; i++) {
                const dataModel = {
                    "orderTitle": filteredOrders[i].orderTitle,
                    "address": filteredOrders[i].address,
                    "quantity": filteredOrders[i].quantity,
                    "totalPrice": filteredOrders[i].totalPrice,
                    "dateOfOrder": filteredOrders[i].dateOfOrder,
                    "orderStatus": filteredOrders[i].orderStatus
                }
                dataPrep.push(dataModel)
            }
        } 
        setDataExport(dataPrep)
        setShowDownloadData(true)
        setShowExportData(false)
    }
    
    const handleDownloadData = () => {
        setShowDownloadData(false)
        setShowExportData(true)
    }
    const [orderStatus, setOrderStatus] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get(getOrdersByCustomer + user.uid)
        .then(response => {
            setData(response.data)
        })  
        .catch ((error) => {
            setError(error)
        })
        .finally (() => {
            setLoading(false)
        })
    }, [
        user, refreshTable, 
        showEditOrderModal, showEditSuccessToast, 
        showCancelOrderModal, showCancelSuccessToast,
        showPaymentOrderModal, showPaymentSuccessToast,
        showConfirmEditModalPage,searchQuery, orderStatus        
    ]);

      //filter
const filteredOrders = (data ?? []).filter((d) => {
    console.log("enter, data : " + data);
    if (searchQuery === '' && orderStatus === 'All') {
    return true; // show all orders
    } else if (searchQuery === '' && d.orderStatus === orderStatus) {
    return true; // show orders with selected status
    } else {
       return d.orderTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
       (orderStatus === 'All' || d.orderStatus === orderStatus);
    }
    });

    return { 
        data, setData, loading, error,
        editOrderQty,
        editOrderAddress,
        handleOrderSelected,
        handleEditOrderAddress,
        orderSelected,
        geocodeAddress,

        updateEditedOrder,
        showEditOrderModal,
        handleShowEditOrderModal,
        handleCloseEditOrderModal,
        handleEditOrderQty,
        showEditSuccessToast,
        handleShowEditSuccessToast,
        handleCloseEditSuccessToast,
        showConfirmEditModalPage,
        showConfirmEditOrderPage,
        closeConfirmEditOrderPage,
       
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


        addressData,
        showConfirmEditOrderPage,
        closeConfirmEditOrderPage,
        setShowConfirmEditOrderModal,
        returnToPurchaseModalAfterConfirmModal,

        sortByOrderTitle,
        sortAscendingOrderTitle,
        sortByOrderAddress,
        sortAscendingOrderAddress,
        sortByOrderDate,
        sortAscendingOrderDate,
        sortByOrderQty,
        sortAscendingOrderQty,
        sortByOrderTotalPrice,
        sortAscendingOrderTotalPrice,
        sortByOrderStatus,
        sortAscendingOrderStatus,

        dataExport,
        prepareDataForExport,
        showDownloadData,
        showExportData,
        handleDownloadData,

        showReviewCompleteToast,
        handleShowReviewCompleteToast,
        handleCloseReviewCompleteToast,

        filteredOrders,
        orderStatus,
        setOrderStatus,
        searchQuery,
        setSearchQuery
    } 
}

export default useProfileHooks