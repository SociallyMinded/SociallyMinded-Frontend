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


export const ProfilePage = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const { user } = UserAuth()
    const { data, loading, error } = useProfileHooks(user)

    console.log(user.uid)
    
    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <TableContainer>
            <StyledHeader>{user.displayName}'s Order Records</StyledHeader>
            {data != null && data.length == 0 && <h5>You have no orders currently</h5>}
            {data != null && data.length != 0 && <Table hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Order Title</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th></th>
                    </tr>
                </thead>
       
                <tbody>
                {data != null && data.map((d) => (
                    <tr>
                        <StyledTd>{d.orderRecordId}</StyledTd>
                        <StyledTd>{d.orderTitle}</StyledTd>
                        <StyledTd>{d.quantity}</StyledTd>
                        <StyledTd>{d.totalPrice}</StyledTd>
                        <StyledTd>{d.dateOfOrder != null && d.dateOfOrder.split("T")[0]}</StyledTd>
                        <StyledTd>{d.orderStatus}</StyledTd> 
                        <StyledTd>
                            <StyledNavbar>
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav >
                                        <NavDropdown title="More" id="basic-nav-dropdown" class="navbar-toggler-icon">
                                        <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Edit Order
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">
                                            Cancel Order
                                        </NavDropdown.Item>
                                       {/* <StyledLink id="styled-card-link" to="/product_listing" state={{ d }}> */}
                                        <NavDropdown.Item href={`/addReview?productId=${d.product.productId}`}>
                                        {/* <NavDropdown.Item> */}
                                            {/* <Link to="/addReview" state={{d.product.productId}}> */}
                                            Submit a Review
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
                </Table>}

            </TableContainer>
        </PageTemplate>
    )
}

const StyledNavbar = styled(Navbar)`
    width:50%;
    height:5vh;
`

const TableContainer = styled(Table)`
    margin-top:5vh;
    width:95%;
    margin-left:5%;
    height:100vh;
    max-height:100vh;
    overflow: scroll;
`

const StyledTable = styled(Table)`
    height:50vh;
    padding-top:0px!important;
`

const StyledHeader = styled.h3`
    margin-bottom:5vh;
`

const StyledThead = styled.thead`
`
const StyledTd = styled.td`
    vertical-align: middle;
`