import { useState } from "react"
import { deleteOrderUrl, getOrdersByCustomer, updateOrderUrl, obtainGeocodeUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { useLocation , useNavigate} from "react-router"
import { 
    orderTitleComparator, 
    qtyComparator, 
    priceComparator,
    orderAddressComparator, 
    orderDateComparator,
    orderStatusComparator, 
    orderIdComparator
} from "./comparator"


export const Actions = {
    UPDATE: 'Update',
    CANCEL: 'Cancel',
    COMPLETE_ORDER: 'Order Received'
}

export const ORDERSTATUS = {
    PENDING_APPROVAL: 'Pending Approval',
    IN_DELIVERY: 'In Delivery',
    COMPLETED: 'Completed'
}

const useProfileHooks = (user) => {
    const navigate = useNavigate();

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

    const [editOrderDetails, setEditOrderDetails] = useState("");
    const handleEditOrderDetails = (details) => setEditOrderDetails(details);


    const [addressData, setAddressData] = useState("")

    const [showConfirmEditModalPage, setShowConfirmEditOrderModal] = useState(false)
    const showConfirmEditOrderPage = () => setShowConfirmEditOrderModal(true)
    const closeConfirmEditOrderPage = () => setShowConfirmEditOrderModal(false)

    const [showUpdateErrorActionToast, setShowUpdateErrorActionToast] = useState(false)
    const handleShowUpdateErrorActionToast = () => setShowUpdateErrorActionToast(true)
    const handleCloseUpdateErrorActionToast = () => setShowUpdateErrorActionToast(false)

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

    const [showCancelErrorActionToast, setShowCancelErrorActionToast] = useState(false)
    const handleShowCancelErrorActionToast = () => setShowCancelErrorActionToast(true)
    const handleCloseCancelErrorActionToast = () => setShowCancelErrorActionToast(false)

    const [showReviewErrorActionToast, setShowReviewErrorActionToast] = useState(false)
    const handleShowReviewErrorActionToast = () => setShowReviewErrorActionToast(true)
    const handleCloseReviewErrorActionToast = () => setShowReviewErrorActionToast(false)

    const handleOrderSelected = (order, action) => {
        setCurrentOrderSelected(order)
        setEditOrderQty(order.quantity)
        setEditOrderAddress(order.address)
        setEditOrderDetails(order.orderDetails)

        setShowEditSuccessToast(false)
        setShowCancelSuccessToast(false)
        setShowReviewCompleteToast(false)

        setShowUpdateErrorActionToast(false)
        setShowCancelErrorActionToast(false)
        setShowReviewErrorActionToast(false)

        if (action == Actions.UPDATE) {
            if (order.orderStatus == ORDERSTATUS.PENDING_APPROVAL) {
                setShowEditOrderModal(true)
            } else {
                setShowUpdateErrorActionToast(true)
            }
        } else if (action == Actions.CANCEL) {
            if (order.orderStatus == ORDERSTATUS.PENDING_APPROVAL) {
                setShowCancelOrderModal(true)
            } else {
                setShowCancelErrorActionToast(true)
            }
        } else if (action == Actions.COMPLETE_ORDER) {
            if (order.orderStatus == ORDERSTATUS.IN_DELIVERY) {
                navigate(`/addReview?productId=${order.product.productId}&orderId=${order.orderRecordId}&orderTitle=${order.orderTitle}&dateOfOrder=${order.dateOfOrder}`)
            } else {
                setShowReviewErrorActionToast(true)
            }
        }
    }


    const geocodeAddress =  async () => {
        const url = obtainGeocodeUrl(editOrderAddress)
        await axios.get(url)
        .then(response => {
            if (editOrderQty != "") {
                const addressData = response.data.results[0]
                console.log(addressData)
                setAddressData(addressData)

                setShowEditOrderModal(false)
                setShowConfirmEditOrderModal(true)
            } else {
                setShowConfirmEditOrderModal(false)
            }
          
        })
        .catch((error) => {
            console.log(error)
        })
        .finally (() => {
            setLoading(false)
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
                    "address": editOrderAddress,
                    "orderDetails": editOrderDetails
                }
            }

            if (editOrderQty == "" || editOrderAddress == "") {
                setRefreshTable(false)
                setShowEditOrderModal(true)
                setShowEditSuccessToast(false)
            } else {
                await axios.put(updateOrderUrl + orderSelected.orderRecordId, newOrder)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => setEditOrderError(error.response.data))
                    .finally(res => {
                        console.log(res)
                        setRefreshTable(true)
                        setShowEditOrderModal(false)
                        setShowEditSuccessToast(true)  
                    })
            }
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

    const [showPaymentErrorActionToast, setShowPaymentErrorActionToast] = useState(false)
    const handleShowPaymentErrorActionToast = () => setShowPaymentErrorActionToast(true)
    const handleClosePaymentErrorActionToast = () => setShowPaymentErrorActionToast(false)


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
    
    const [sortCriteria, setSortCriteria] = useState("Sort");
    
    const sortByOrderId = (e, sortAscending) => {
        if (sortAscending == true) {
            const sortedData = data.sort(orderIdComparator)
            setData(sortedData)
            setSortCriteria("Sort Ascending Order Id")
        } else {
            const sortedData = data.sort(orderIdComparator).reverse()
            setData(sortedData)
            setSortCriteria("Sort Descending Order Id")
        }
    }
   
    const [sortAscendingOrderTitle, setSortAscendingOrderTitle] = useState(true)
    const sortByOrderTitle = (e, sortAscending) => {
        if (sortAscending == true) {
            const sortedData = data.sort(orderTitleComparator)
            setData(sortedData)
            setSortCriteria("Sort Ascending Order Title")
        } else {
            const sortedData = data.sort(orderTitleComparator).reverse()
            setData(sortedData)
            setSortCriteria("Sort Descending Order Title")
        }
    }

    const [sortAscendingOrderQty, setSortAscendingOrderQty] = useState(true)
    const sortByOrderQty = (e, sortAscending) => {
        if (sortAscending == true) {
            const sortedData = data.sort(qtyComparator)
            setData(sortedData)
            setSortCriteria("Sort Ascending Order Quantity")
        } else {
            const sortedData = data.sort(qtyComparator).reverse()
            setData(sortedData)
            setSortCriteria("Sort Descending Order Quantity")
        }
    }

    const [sortAscendingOrderTotalPrice, setSortAscendingOrderTotalPrice] = useState(true)
    const sortByOrderTotalPrice = (e, sortAscending) => {
        if (sortAscending == true) {
            const sortedData = data.sort(priceComparator)
            setData(sortedData)
            setSortCriteria("Sort Ascending Order Price")
        } else {
            const sortedData = data.sort(priceComparator).reverse()
            setData(sortedData)
            setSortCriteria("Sort Descending Order Price")
        }
    }

    const [sortAscendingOrderAddress, setSortAscendingOrderAddress] = useState(true)
    const sortByOrderAddress = (e, sortAscending) => {
        if (sortAscending == true) {
            const sortedData = data.sort(orderAddressComparator)
            setData(sortedData)
            setSortCriteria("Sort Ascending Order Address")
        } else {
            const sortedData = data.sort(orderAddressComparator).reverse()
            setData(sortedData)
            setSortCriteria("Sort Descending Order Address")
        }
    }

    const [sortAscendingOrderDate, setSortAscendingOrderDate] = useState(true)
    const sortByOrderDate = (e, sortAscending) => {
        if (sortAscending == true) {
            const sortedData = data.sort(orderDateComparator)
            setData(sortedData)
            setSortCriteria("Sort Ascending Order Date")
        } else {
            const sortedData = data.sort(orderDateComparator).reverse()
            setData(sortedData)
            setSortCriteria("Sort Descending Order Date")
        }
    }

    const [sortAscendingOrderStatus, setSortAscendingOrderStatus] = useState(true)
    const sortByOrderStatus = (e, sortAscending) => {
        if (sortAscending == true) {
            const sortedData = data.sort(orderStatusComparator)
            setData(sortedData)
            setSortCriteria("Sort Ascending Order Date")
        } else {
            const sortedData = data.sort(orderStatusComparator).reverse()
            setData(sortedData)
            setSortCriteria("Sort Descending Order Date")
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
        showConfirmEditModalPage, searchQuery, orderStatus,        
        showConfirmEditModalPage, 
        showUpdateErrorActionToast,
        showCancelErrorActionToast,  
        showPaymentErrorActionToast,
        showReviewErrorActionToast

    ]);

    //filter
    const filteredOrders = (data ?? []).filter((d) => {
        console.log("enter, data : " + data);
        console.log("searchqury : " + searchQuery);
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
        editOrderDetails, handleEditOrderDetails,

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

        sortByOrderId,
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
        sortCriteria,
        setSortCriteria,

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
        setSearchQuery,
        
        showUpdateErrorActionToast,
        handleCloseUpdateErrorActionToast,
        showCancelErrorActionToast,
        handleCloseCancelErrorActionToast,
        showPaymentErrorActionToast,
        handleClosePaymentErrorActionToast,
        showReviewErrorActionToast,
        handleCloseReviewErrorActionToast

    } 
}

export default useProfileHooks