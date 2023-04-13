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

import DropdownButton from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

import { CSVLink, CSVDownload } from "react-csv";
import Offcanvas from 'react-bootstrap/Offcanvas';

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
        editOrderDetails, handleEditOrderDetails,

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
        handleCloseReviewErrorActionToast,
        showAlreadyCompletedErrorActionToast,
        handleCloseAlreadyCompletedErrorActionToast,

        
        sortedDataMemo,
        sortOrderAscending,
        handleSortOrders,
        sortCriteriaText,

        showCompleteOrderModal,
        handleShowCompleteOrderModal,
        handleCloseCompleteOrderModal,
        updateOrderAsReceived,
        updateOrderAsReceivedAndLeaveAReview,


        showOrderCompleteToast,
        handleShowOrderCompleteToast,
        handleCloseOrderCompleteToast

    } = useProfileHooks(user)

    const handleClose = () => {
        setShow(false);
        sortCriteriaText("Sort Ascending Order Id")
    }

    const handleShow = () => setShow(true);


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


    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        event.preventDefault()
        setValidated(true)
    }

    const showDisabledUpdateButton = () => {
        if (editOrderQty == "" || editOrderAddress == "") {
            return true
        } else {
            return false
        }
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
                            <strong className="me-auto">Review is created</strong>
                        </Toast.Header>
                        <Toast.Body>Your review is submitted! Thank you for shopping with SociallyMinded!</Toast.Body>
                    </StyledToast>
                }

                {showOrderCompleteToast && 
                    <StyledToast onClose={handleCloseOrderCompleteToast}>
                        <Toast.Header>
                            <strong className="me-auto">Order is marked as complete</strong>
                        </Toast.Header>
                        <Toast.Body>Thank you for shopping with SociallyMinded!</Toast.Body>
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

                {showAlreadyCompletedErrorActionToast &&
                    <StyledErrorToast onClose={handleCloseAlreadyCompletedErrorActionToast}>
                        <Toast.Header>
                            <strong className="me-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>You have already marked this order as received</Toast.Body>
                    </StyledErrorToast>
                }
            <TableContainer>

            <StyledHeader>Order Records</StyledHeader>
            <TableInputContainer>
                <OrderInputGroup>
                 <SearchOrderInput
                    type="text"
                    placeholder="Search order record by order title"
                    aria-describedby="basic-addon2"
                    value = {searchQuery != null && searchQuery}
                    disabled={false}
                    onChange={(e) => setSearchQuery(e.target.value) }
                   
                />
                </OrderInputGroup>
            
                <>
                    <Button variant="primary" onClick={handleShow} className="me-2">
                        Filter & Sort 
                    </Button>
                </>
               
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
       
            {data != null && data.length == 0 && <h5>You have no orders currently</h5>}
            {data != null && data.length != 0 && 
            <StyledTableContainer>
            <StyledTable hover>
                <thead>
                    <tr>
                    <th>Order Id</th>
                    <th>Order Title</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Order Date</th>
                    <th>Order Address</th>
                    <th>Status</th>
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
                                    {d.orderStatus != "Order Received" &&
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
                                              <a href={`/addReview?productId=${d.product.productId}&orderId=${d.orderRecordId}&orderTitle=${d.orderTitle}&dateOfOrder=${d.dateOfOrder}`}/>
               
                                        </NavDropdown.Item >
                                       
                                        
                                        </NavDropdown>
                                         }
                                        
                                      
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
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                           
                            {/* Edit Order Address */}
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    as="textarea"
                                    placeholder={orderSelected != null && orderSelected.address}
                                    autoFocus
                                    value={orderSelected != null && editOrderAddress}
                                    onChange={(e) => handleEditOrderAddress(e.target.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide your address
                                </Form.Control.Feedback>
                            </Form.Group>

                                {/* Edit Order Details */}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Order Details</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    as="textarea"
                                    placeholder={orderSelected != null && orderSelected.orderDetails}
                                    autoFocus
                                    value={orderSelected != null && editOrderDetails}
                                    onChange={(e) => handleEditOrderDetails(e.target.value)}
                                />
                            </Form.Group>

                            {/* Confirm Update */}
                            <ModalButtonContainer>
                                {showDisabledUpdateButton() == false && <Button type="submit" variant="primary" onClick={updateEditedOrder}>  
                                    Confirm Update
                                </Button>
                                }
                                {showDisabledUpdateButton() == true && <Button disabled type="submit" variant="primary" onClick={updateEditedOrder}>  
                                    Confirm Update
                                </Button>
                                }
                            </ModalButtonContainer>
                        </Form>
                    </Modal.Body>
                </Modal> 
          
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

                <Modal show={showCompleteOrderModal} centered>
                    <Modal.Header>
                    <Modal.Title>{orderSelected != null && orderSelected.orderTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Label>Thank you for shopping with us! We would appreciate if you could leave a review for your purchased items</Form.Label>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={updateOrderAsReceived}>  
                        Close
                    </Button> 
                    <Button variant="primary" onClick={updateOrderAsReceivedAndLeaveAReview}>  
                        Leave a Review
                    </Button> 
                    </Modal.Footer>
                </Modal> 

                {sortedDataMemo != null && sortedDataMemo.length != 0 && <PaginationContainer>
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
            <Offcanvas show={show} onHide={handleClose} placement={"end"} name={"end"}>
                <Offcanvas.Header closeButton>
                    <StyledOffcanvasTitle></StyledOffcanvasTitle>
                </Offcanvas.Header>
                <StyledOffcanvasBody>
                <>
                    <StyledOffcanvasMainTitle>Filter & Sort Order Records</StyledOffcanvasMainTitle>
                   
                    <StyledOffcanvasTitle>Filter Order Records</StyledOffcanvasTitle>
                    <FilterOrderStatusGroup>
                    <OrderStatusLabel>
                        <input
                        type="radio"
                        name="statusFilter"
                        value="All"
                        checked={orderStatus === 'All'}
                        onChange={() => setOrderStatus('All')}
                    />
                    <OrderStatusText>All</OrderStatusText>
                    </OrderStatusLabel>
                    <OrderStatusLabel>
                        <input
                            type="radio"
                            name="statusFilter"
                            value="Pending Approval"
                            checked={orderStatus === 'Pending Approval'}
                            onChange={() => setOrderStatus('Pending Approval')}
                        />
                    <OrderStatusText>Pending Approval</OrderStatusText>
                    </OrderStatusLabel>
                    <OrderStatusLabel>
                    <input
                        type="radio"
                        name="statusFilter"
                        value="In Delivery"
                        checked={orderStatus === 'In Delivery'}
                        onChange={() => setOrderStatus('In Delivery')}
                    />
                    <OrderStatusText>In Delivery</OrderStatusText>
                    </OrderStatusLabel>
                    <OrderStatusLabel>
                    <input
                        type="radio"
                        name="statusFilter"
                        value="Order Received"
                        checked={orderStatus === 'Order Received'}
                        onChange={() => setOrderStatus('Order Received')}
                    />
                    <OrderStatusText>Order Recieved</OrderStatusText>
                    </OrderStatusLabel>
                </FilterOrderStatusGroup>
                </>

                {data != null && <StyledDropdown className="d-inline mx-2">
                        <StyledOffcanvasTitle>Sort Order Records</StyledOffcanvasTitle>
                        <StyledDropdownToggle id="dropdown-autoclose-true">
                            {sortCriteriaText}
                        </StyledDropdownToggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_ID", true)}>Sort Ascending Order Id</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_ID", false)}>Sort Descending Order Id</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_TITLE", true)}>Sort Ascending Order Title</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_TITLE", false)}>Sort Descending Order Title</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_QTY", true)}>Sort Ascending Order Quantity</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_QTY", false)}>Sort Descending Order Quantity</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_TOTAL_PRICE", true)}>Sort Ascending Order Price</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_TOTAL_PRICE", false)}>Sort Descending Order Price</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_DATE", true)}>Sort Ascending Order Date</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_DATE", false)}>Sort Descending Order Date</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_ADDRESS", true)}>Sort Ascending Order Address</Dropdown.Item>
                            <Dropdown.Item onClick={(e) => handleSortOrders("ORDER_ADDRESS", false)}>Sort Descending Order Address</Dropdown.Item>
                        </Dropdown.Menu>
                    </StyledDropdown>}

            </StyledOffcanvasBody>
            </Offcanvas>
        </PageTemplate>
    )
}

const StyledDropdownToggle = styled(Dropdown.Toggle)`
    margin-bottom:5vh;
`

const StyledOffcanvasBody = styled(Offcanvas.Body)`
    padding-left:5vh;
`

const StyledOffcanvasMainTitle = styled(Offcanvas.Title)`
    font-family: 'Josefin Sans', sans-serif;
    margin-bottom:7vh;
    font-size:1.5em;
`

const StyledOffcanvasTitle = styled(Offcanvas.Title)`
    font-family: 'Josefin Sans', sans-serif;
    margin-bottom:2vh;
    font-size:1.1em;
`

const StyledDropdown = styled(Dropdown)`
    font-family: 'Josefin Sans', sans-serif;
`

const ModalButtonContainer = styled.div`
    width:100%;
    margin-top:3vh;
    margin-bottom:1vh;
`

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
    margin-top:5vh;
`

const StyledHeader = styled.h4`
    margin-bottom:5vh;
`

const StyledThead = styled.thead`
`
const StyledTd = styled.td`
    vertical-align: middle;
    max-width:20vw;
    text-overflow: ellipsis;
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
    background-color:#0D6EFD!important;
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
    width:70%;
    margin-right: 2%;
`
const TableInputContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:3vh;
`
const FilterOrderStatusGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:-3vh;
`
const OrderStatusText = styled.p`
    margin-left:0.7vw;
    margin-top:2.5vh;
    font-family: 'Josefin Sans', sans-serif;
`

const OrderStatusLabel = styled.label`
    margin-right: 2vw;
    display:flex;
    flex-direction:row;
`

const SearchOrderInput = styled(Form.Control)`

`
