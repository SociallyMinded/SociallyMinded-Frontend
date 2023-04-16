import React from "react";
import styled from "styled-components";
import { PageTemplate } from "../common/styles";
import { useLocation } from 'react-router-dom';
import useProductListingHooks from "./productListingHooks";
import { UserAuth } from "../../context/AuthContext";
import Header from "../common/Header/Header";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import { ProductImg } from "./ProductImg";
import { ProductSuccessToast } from "./ProductSuccessToast";
import { ProductFailureToast } from "./ProductFailureToast";
import { ProductDescription } from "./ProductDescription";
import { Recommendations } from "./Recommendations";
import { ModalPageOne } from "./ModalPageOne";
import { ModalPageTwo } from "./ModalPageTwo";

const ProductListing = () => {

    const { user } = UserAuth()
    const { state } = useLocation();
    const { productState, action } = useProductListingHooks(state)

    return (
        <PageTemplate>
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            
            <ProductListingPage>    

                <ProductListingImgSection>
                    <ProductImg
                        imageLink={state.d.imageLink}
                    />
                </ProductListingImgSection>

                <ProductListingDescriptionSection> 
                    <ProductListingToastSection>
                        <ProductSuccessToast
                            showSuccessToast={productState.showSuccessToast}
                            handleCloseSuccessToast={action.handleCloseSuccessToast}
                            headerText={"Order Placed"}
                            bodyText={`Your order for ${state.d.name} is placed!`}
                        />
                        <ProductFailureToast
                            showFailureToast={productState.showLoginPromptToast}
                            handleCloseFailureToast={action.handleCloseLoginPromptToast}
                            headerText={"Notice"}
                            bodyText={"Please log in to your account to place an order"}
                        />
                        <ProductFailureToast
                            showFailureToast={productState.showAddressNotFoundError}
                            handleCloseFailureToast={action.handleCloseAddressNotFoundError}
                            headerText={"Notice"}
                            bodyText={"Your provided postal code does not exist. Please check if your postal code is correct"}
                        />
                    </ProductListingToastSection>

                    <ProductListingDescriptionContainer>
                        <ProductDescription
                            productName={state.d.name}
                            category={state.d.category}
                            price={state.d.price}
                            description={state.d.description}
                            socialenterpriseName={state.d.socialenterprise.enterpriseName}
                            handleShowPurchaseModal={action.handleShowPurchaseModal}
                            handleShowReviewsPage={action.handleShowReviewsPage}
                            state={state}
                        />
                    </ProductListingDescriptionContainer>
                </ProductListingDescriptionSection>

                <ProductRecommendationSectionContainer>
                    <Recommendations
                        data={productState.data}
                        getAllRecommendedProducts={action.getAllRecommendedProducts}
                    /> 
                </ProductRecommendationSectionContainer>
            
                <ModalPageOne
                    showPurchaseModal={productState.showPurchaseModal}
                    handleClosePurchaseModal={action.handleClosePurchaseModal}
                    productName={state.d.name}
                    validated={productState.validated}
                    handleSubmit={action.handleSubmit}
                    orderQty={productState.orderQty}
                    handleOrderQty={action.handleOrderQty}
                    unitNos={productState.unitNos}
                    handleUnitNos={action.handleUnitNos}
                    postalCode={productState.postalCode}
                    handlePostalCode={action.handlePostalCode}
                    message={productState.message}
                    handleSetMessage={action.handleSetMessage}
                    renderDisabledButton={action.renderDisabledButton}
                    geocodeAddress={action.geocodeAddress}
                />

                <ModalPageTwo
                    addressData={productState.addressData}
                    confirmOrder={productState.confirmOrder}
                    closeConfirmOrderPage={action.closeConfirmOrderPage}
                    productName={state.d.name}
                    orderQty={productState.orderQty}
                    price={state.d.price}
                    addressText={productState.addressText}
                    showAddressNotFoundError={productState.showAddressNotFoundError}
                    returnToPurchaseModalAfterConfirmModal={action.returnToPurchaseModalAfterConfirmModal}
                    setConfirmOrder={action.setConfirmOrder}
                    setShowSuccessToast={action.setShowSuccessToast}
                    createNewOrder={action.createNewOrder}
                />
            </ProductListingPage>
        </PageTemplate>
    )
}

const ProductRecommendationSectionContainer = styled.div`
    padding-bottom:10vh;
    width:90vw;
    max-width:80vw;
    margin-top:1vh;
`

const ProductListingPage = styled.div`
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    width:90vw;
    height:70vh;
    margin-top:5vh;
    padding-top:8vh;
    padding-left:5vw;
`

const ProductListingImgSection = styled.div`
    width:25vw;
    height:50vh;
    max-height:50vh;
    overflow:scroll;
    margin-right:5vw;
    display:flex;
    border-radius:10px;
`

const ProductListingDescriptionSection = styled.div`
    display:flex;
    flex-direction:column;
    width:50vw;
    max-height:100%;
    overflow:scroll;
    position:1;
    display:absolute;
`

const ProductListingDescriptionContainer = styled.div`
    height:70vh;
    max-height:70vh;
`

const ProductListingToastSection = styled.div`
    position:absolute;
    z-index:1;
    width:53%;
    padding-left:38%;
    top:17%;
`

export default ProductListing