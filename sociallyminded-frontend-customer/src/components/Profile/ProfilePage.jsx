import React from "react";
import { PageTemplate } from "../common/styles";
import styled from "styled-components";
import Header from "../common/Header/Header";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { UserAuth } from "../../context/AuthContext";
import useProfileHooks from "./profileHooks.js"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import ModalDialog from "react-bootstrap";
import ModalHeader from "react-bootstrap";
import { Toast } from "react-bootstrap";
import { Actions, ORDERSTATUS } from "./profileHooks.js";

import { Pagination } from 'react-bootstrap';

import { Map, Marker } from "react-map-gl";
import PointMarker from "../Map/PointMarker";
import InputGroup from 'react-bootstrap/InputGroup';
import { faHome,  faArrowDownWideShort, faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CSVLink, CSVDownload } from "react-csv";

const exportHeaders = [
    { label: "Order Title", key: "orderTitle" },
    { label: "Address", key: "address" },
    { label: "Quantity", key: "quantity" },
    { label: "Total Price", key: "totalPrice" },
    { label: "Date of Order", key: "dateOfOrder" },
    { label: "Order Status", key: "orderStatus" }
];


export const ProfilePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const { user } = UserAuth()
    const { 
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
        setSearchQuery,

        showUpdateErrorActionToast,
        handleCloseUpdateErrorActionToast,
        showCancelErrorActionToast,
        handleCloseCancelErrorActionToast,
        showPaymentErrorActionToast,
        handleClosePaymentErrorActionToast,
        showReviewErrorActionToast,
        handleCloseReviewErrorActionToast

    } = useProfileHooks(user)

    const [page, setPage] = useState(1)
    console.log(data != null ? data : 1)

    const [viewState, setViewState] = useState({
        longitude: addressData == null ? 103.77655039734071 : addressData.LONGITUDE,
        latitude: addressData == null ? 1.3555175316779877 : addressData.LATITUDE,
        zoom: 16
      });


    const determineTotalNosOfPages = () => {
        const numDataEntry = data != null ? data.length : 0
        const numEntriesPerPage = 5
        if (numDataEntry % numEntriesPerPage == 0) {
            return numDataEntry / numEntriesPerPage
        } else {
            const numPages = Math.floor(numDataEntry/numEntriesPerPage) + 1
            return numPages
        }
    }


    const [currentPage, setCurrentPage] = useState(1)
    const goToNextPage = () => {
        const numPages = determineTotalNosOfPages()
        if (currentPage < numPages) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(numPages)
        }
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        } else {
            setCurrentPage(1)
        }
    }

    const goToFirstPage = () => {
        setCurrentPage(1)
    }

    const goToLastPage = () => {
        const numPages = determineTotalNosOfPages()
        setCurrentPage(numPages)
    }


  
    return (
        <PageTemplate>
            
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
     
            {showEditSuccessToast &&  
                <StyledToast onClose={handleCloseEditSuccessToast}>
                    <Toast.Header>
                        <strong className="me-auto">Order Updated</strong>
                    </Toast.Header>
                    <Toast.Body> {orderSelected.orderTitle} is updated!</Toast.Body>
                </StyledToast>
                }
            {showCancelSuccessToast &&  
                <StyledToast onClose={handleCloseCancelSuccessToast}>
                <Toast.Header>
                        <strong className="me-auto">Order Cancelled</strong>
                    </Toast.Header>
                    <Toast.Body>{orderSelected.orderTitle} is cancelled!</Toast.Body>
                </StyledToast>
                }

                {showReviewCompleteToast && 
                    <StyledToast onClose={handleCloseReviewCompleteToast}>
                        <Toast.Header>
                            <strong className="me-auto">Reviewed Sucess</strong>
                        </Toast.Header>
                        <Toast.Body>Your review is submitted!</Toast.Body>
                    </StyledToast>
                }
                {showUpdateErrorActionToast &&
                    <StyledErrorToast onClose={handleCloseUpdateErrorActionToast}>
                        <Toast.Header>
                            <strong className="me-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>You can only update an order if it is still in pending approval stage</Toast.Body>
                    </StyledErrorToast>
                }
                {showCancelErrorActionToast &&
                    <StyledErrorToast onClose={handleCloseCancelErrorActionToast}>
                        <Toast.Header>
                            <strong className="me-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>You can only cancel an order if it is still in pending approval stage</Toast.Body>
                    </StyledErrorToast>
                }
   

                {showReviewErrorActionToast &&
                    <StyledErrorToast onClose={handleCloseReviewErrorActionToast}>
                        <Toast.Header>
                            <strong className="me-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>You can only mark an order as received after it has been sent for delivery and you have received it</Toast.Body>
                    </StyledErrorToast>
                }





       
            <TableContainer>

            <StyledHeader>{user.displayName}'s Order Records</StyledHeader>
        <TableInputContainer>
                <OrderInputGroup>
                 <SearchOrderInput
                    type="text"
                    // placeholder="Search Order"
                    aria-describedby="basic-addon2"
                    value = {searchQuery != null && searchQuery}
                    disabled={false}
                    onChange={(e) => setSearchQuery(e.target.value) }
                   
                />
                </OrderInputGroup>
               
            {/* </StyledInputGroup> */}
            <div>
                {showExportData && <StyledButton onClick={prepareDataForExport}>Export Data</StyledButton>}
                {showDownloadData && <StyledButton onClick={handleDownloadData}>
                    <StyledCSVLink 
                        data={dataExport != null && dataExport} 
                        headers={exportHeaders}
                        filename={`${user.displayName}_${new Date()}`}
                        extension=".csv"
                    >                
                        Download Records
                    </StyledCSVLink>
                </StyledButton>}

            </div>
        </TableInputContainer>
        <FilterOrderStatusGroup>
            <OrderStatusLabel>
                <input
                type="radio"
                name="statusFilter"
                value="All"
                checked={orderStatus === 'All'}
                onChange={() => setOrderStatus('All')}
            />
            All
            </OrderStatusLabel>
            
            <OrderStatusLabel>
            <input
                type="radio"
                name="statusFilter"
                value="Pending Approval"
                checked={orderStatus === 'Pending Approval'}
                onChange={() => setOrderStatus('Pending Approval')}
            />
            Pending Approval
            </OrderStatusLabel>
            <OrderStatusLabel>
            <input
                type="radio"
                name="statusFilter"
                value="Payment Required"
                checked={orderStatus === 'Payment Required'}
                onChange={() => setOrderStatus('Payment Required')}
            />
            Payment Required
            </OrderStatusLabel>
            <OrderStatusLabel>
            <input
                type="radio"
                name="statusFilter"
                value="In Delivery"
                checked={orderStatus === 'In Delivery'}
                onChange={() => setOrderStatus('In Delivery')}
            />
            In Delivery
            </OrderStatusLabel>
            <OrderStatusLabel>
            <input
                type="radio"
                name="statusFilter"
                value="Completed"
                checked={orderStatus === 'Completed'}
                onChange={() => setOrderStatus('Completed')}
            />
            Completed
            </OrderStatusLabel>
        </FilterOrderStatusGroup>
            {data != null && data.length == 0 && <h5>You have no orders currently</h5>}
            {data != null && data.length != 0 && 
            <StyledTableContainer>
            <StyledTable hover>
                <thead>
                    <tr>
                    <th>Order Id</th>
                    <th>
                        Order Title 
                        <StyledFontAwesomeIconSort 
                            icon={sortAscendingOrderTitle == true ? faArrowDownWideShort : faArrowUpShortWide} 
                            onClick={sortByOrderTitle}
                        />
                    </th>
                    <th>
                        Qty 
                        <StyledFontAwesomeIconSort 
                            icon={sortAscendingOrderQty == true ? faArrowDownWideShort : faArrowUpShortWide} 
                            onClick={sortByOrderQty}
                        />
                    </th>
                    <th>
                        Price 
                        <StyledFontAwesomeIconSort 
                            icon={sortAscendingOrderTotalPrice == true ? faArrowDownWideShort : faArrowUpShortWide} 
                            onClick={sortByOrderTotalPrice}
                        />
                    </th>
                    <th>
                        Order Date 
                        <StyledFontAwesomeIconSort 
                            icon={sortAscendingOrderDate == true ? faArrowDownWideShort : faArrowUpShortWide} 
                            onClick={sortByOrderDate}
                        />
                    </th>
                    <th>
                        Order Address 
                        <StyledFontAwesomeIconSort 
                            icon={sortAscendingOrderAddress == true ? faArrowDownWideShort : faArrowUpShortWide} 
                            onClick={sortByOrderAddress}
                        />
                    </th>
                    <th>
                        Status 
                        <StyledFontAwesomeIconSort 
                            icon={sortAscendingOrderStatus == true ? faArrowDownWideShort : faArrowUpShortWide} 
                            onClick={sortByOrderStatus}
                        />
                    </th>
                    <th></th>
                    </tr>  
                </thead>             
                
                <tbody>
                {filteredOrders != null && filteredOrders.slice((currentPage-1)*5,(((currentPage-1)*5)+5)).map((d) => (
                    <tr>
                        <StyledTd>{d.orderRecordId}</StyledTd>
                        <StyledTd>{d.orderTitle}</StyledTd>
                        <StyledTd>{d.quantity}</StyledTd>
                        <StyledTd>{d.totalPrice}</StyledTd>
                        <StyledTd>{d.dateOfOrder != null && d.dateOfOrder.split("T")[0]}</StyledTd>
                        <StyledTd>{d.address}</StyledTd>
                        <StyledTd>{d.orderStatus}</StyledTd>
                        <StyledTd>
                            <StyledNavbar>
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav >
                                        <NavDropdown title="More" id="basic-nav-dropdown" class="navbar-toggler-icon">
                                        <NavDropdown.Item onClick={() => handleOrderSelected(d, Actions.UPDATE)}>
                                            Update Order
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleOrderSelected(d, Actions.CANCEL)}>
                                            Cancel Order
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleOrderSelected(d, Actions.COMPLETE_ORDER)}>
                                            Mark as Received
                                            {/* </Link> */}
                                        </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    </Navbar.Collapse>
                            </Container>
                        </StyledNavbar>
                        </StyledTd>
                    </tr>
                ))}
                                                           
                </tbody>
                </StyledTable>
               </StyledTableContainer>
                }
                
                <Modal show={showEditOrderModal} centered>
                    <Modal.Header closeButton onClick={handleCloseEditOrderModal}>
                    <Modal.Title>{orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={orderSelected != null && orderSelected.quantity}
                            autoFocus
                            value={orderSelected != null && editOrderQty}
                            onChange={(e) => handleEditOrderQty(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={orderSelected != null && orderSelected.address}
                            autoFocus
                            value={orderSelected != null && editOrderAddress}
                            onChange={(e) => handleEditOrderAddress(e.target.value)}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={geocodeAddress}>  
                        Confirm Update
                    </Button>
                    </Modal.Footer>
                </Modal> 

                {addressData != null  && <Modal show={showConfirmEditModalPage} onHide={closeConfirmEditOrderPage} centered>
                    <Modal.Header closeButton onClick={closeConfirmEditOrderPage}>
                    <Modal.Title>Confirm Edits : {orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                            type="number"
                            autoFocus
                            value={editOrderQty}
                            disabled
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                                type="number"
                                placeholder="1"
                                autoFocus
                                value={orderSelected != null && (orderSelected.totalPrice/orderSelected.quantity) * editOrderQty}
                                disabled
                            />                    
                        </Form.Group>
                    </Form>
                    <Form>
  
                    </Form>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Address : {addressData.ADDRESS}</Form.Label>
                        </Form.Group>
                    </Form>
                    <Form>
                             
                    <Map
                        mapboxAccessToken={'pk.eyJ1Ijoib25neW9uZ2VuMjAwMCIsImEiOiJjbDZseXN2ejQwZ25pM2JxcTNwbGY2Mm01In0.6_e_3aUVc5M9RUMI9S2sfw'}
                        {...viewState}
                        onMove={evt => setViewState(evt.viewState)}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        style={{width:"100%", height:"40vh"}}
                        latitude={addressData.LATITUDE}
                        longitude={addressData.LONGITUDE}
                    >
                        <PointMarker
                            longitude={addressData.LONGITUDE}
                            latitude={addressData.LATITUDE}
                        />
                    </Map>

                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={returnToPurchaseModalAfterConfirmModal}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={updateEditedOrder}>
                        Apply Updates
                    </Button>
                    </Modal.Footer>
                </Modal> 
                }


          
                <Modal show={showCancelOrderModal} centered>
                    <Modal.Header closeButton onClick={handleCloseCancelOrderModal}>
                    <Modal.Title>{orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Are you sure you want to cancel this order?</Form.Label>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={cancelOrder}>  
                        Cancel Order
                    </Button>
                    </Modal.Footer>
                </Modal> 
                
                <Modal show={showPaymentOrderModal} centered>
                    <Modal.Header closeButton onClick={handleClosePaymentOrderModal}>
                    <Modal.Title>{orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Credit Card Number"}
                            autoFocus
                            value={creditCardNos}
                            onChange={handleCreditCardNos}
                        />
                        <Form.Label>Credit Card CVV</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={"Credit Card CVV"}
                            autoFocus
                            value={creditCardCVV}
                            onChange={handleCreditCardCVV}
                        />
                        <Form.Label>Credit Card Expiry Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder={"Credit Card Expiry Date"}
                            autoFocus
                            value={creditCardExpiryDate}
                            onChange={handleCreditCardExiryDate}
                        />
                        <Form.Label>Payment</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder={orderSelected != null && orderSelected.totalPrice}
                            autoFocus
                            value={payment}
                            onChange={handlePayment}
                        />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={makePayment}>  
                        Make Payment
                    </Button> 
                    </Modal.Footer>
                </Modal> 
                {data != null && data.length != 0 && <PaginationContainer>
                <Pagination.First onClick={goToFirstPage}/>

                {currentPage > 1 && <Pagination.Prev onClick={goToPreviousPage}/>}
                {currentPage <= 1 && <Pagination.Prev disabled/>}

                <Pagination.Item>{currentPage}</Pagination.Item>
                {currentPage != determineTotalNosOfPages() && <Pagination.Next onClick={goToNextPage}/>}
                {currentPage == determineTotalNosOfPages() && <Pagination.Next disabled/>}

                <Pagination.Last onClick={goToLastPage}/>

                </PaginationContainer>} 
                <p>Number of Pages : {determineTotalNosOfPages()} </p>
                
   
                

             
            </TableContainer>
        </PageTemplate>
    )
}

const StyledNavbar = styled(Navbar)`
    width:50%;
    height:5vh;
`

const TableContainer = styled(Table)`
    margin-top:6vh;
    width:95%;
    margin-left:5%;
`


const StyledTable = styled(Table)`
    padding-top:0px!important;
    width:97%;
`

const StyledTableContainer = styled.div`
`

const StyledHeader = styled.h4`
    margin-bottom:5vh;
`

const StyledThead = styled.thead`
`
const StyledTd = styled.td`
    vertical-align: middle;
    max-width:10vw;
`

const StyledToast = styled(Toast)`
    margin-left:70%;
    margin-top:3%;
    position:absolute;
    z-index:1;
    width:20vw;
    background-color: rgba(219, 242, 206, 0.97);
`

const StyledErrorToast = styled(Toast)`
    margin-left:70%;
    margin-top:3%;
    position:absolute;
    z-index:1;
    width:20vw;
    background-color:rgba(255, 204, 204, 0.97);
`


const PaginationContainer = styled(Pagination)`
    margin-top:3vh;
`

const StyledFontAwesomeIconSort = styled(FontAwesomeIcon)`
    color:#a3a3a3;
    margin-left:1%;
`

const StyledButton = styled(Button)`
    text-decoration: none !important;
    background-color:#0275d8!important;
    &:hover {
        text-decoration: none !important;
        color:white;
    }
    &:after {
        text-decoration: none !important;
        color:white;
    }
    &:before {
        text-decoration: none !important;
        color:white;
    }
`

const StyledCSVLink = styled(CSVLink)`
    text-decoration: none !important;
    color:white;
    &:hover {
        text-decoration: none !important;
        color:white;
    }
    &:after {
        text-decoration: none !important;
        color:white;
    }
    &:before {
        text-decoration: none !important;
        color:white;
    }
`

const StyledInputGroup = styled(InputGroup)`
    width:80%;
    margin-right: 2%;
    z-index:-1;
`

const OrderInputGroup = styled(InputGroup)`
    width:80%;
    margin-right: 2%;
`
const TableInputContainer = styled.div`
    display:flex;
    flex-direction:row;
`
const FilterOrderStatusGroup = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 16px;
`
const OrderStatusLabel = styled.label`
margin-right: 16px;
`

const SearchOrderInput = styled(Form.Control)`
`
