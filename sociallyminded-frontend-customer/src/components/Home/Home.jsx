import React from "react";
import { LandingPageTemplate, PageTemplate } from "../common/styles";
import styled from "styled-components";
import Header from "../common/Header/Header";
import { UserAuth } from "../../context/AuthContext";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import { useLocation } from "react-router-dom";
import Footer from "../common/Footer/Footer";
import { reviewComments } from "./reviewComments";
import { useHomeHooks } from "./homeHooks";
import { SectionOne } from "./SectionOne";
import { SectionTwo } from "./SectionTwo";
import { SectionThree } from "./SectionThree";
import { SectionFour } from "./SectionFour";
import { LogoutToast } from "./LogoutToast";
import './styles.css'

export const Home = () => {
    const { user } = UserAuth()
    const location = useLocation();
    const { state , action } = useHomeHooks();

    return (
        <LandingPageTemplate>
            <SlantedDiv></SlantedDiv>
            
            <PageTemplate>
                {/* Header */}
                {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
                <HomePage>
                    {/* First Section : Overview about SociallyMinded */}
                    <SectionOne/>
                    {   
                        user == null && 
                        state.showLogoutToast && 
                        location.state != null && 
                        <LogoutToast
                            onCloseAction={action.closeLogoutToast}
                        />
                    }
                </HomePage>
            </PageTemplate>

            {/* Second Section : Why SociallyMinded */}
            <ProductContainer>
                <SectionTwo/>
            </ProductContainer>

            {/* Third Section : Shop products on our Platform */}
            <PlatformOfferingContainer> 
                <SectionThree/>  
            </PlatformOfferingContainer>

            {/* Fourth Section : Customer Testimonials */}
            <CommentContainer>
                <SectionFour
                    clickaction={action.handleShowCustomerReview}
                    image={reviewComments[state.customerReview].image}
                    comment={reviewComments[state.customerReview].comment}
                />
            </CommentContainer>

            <Footer></Footer>

        </LandingPageTemplate>
    )
}

const CommentContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:center;
    margin-bottom:10vh;
`

const SlantedDiv = styled.div`
    position: absolute;
    top: 0px;
    bottom: 100px;
    right: 0;
    left: 0;

    transform: skewY(-10deg);
    transform-origin: top left;
    background: linear-gradient(110.5deg, rgba(248, 196, 249, 0.66) 22.8%, rgba(253, 122, 4, 0.15) 64.6%);

    z-index:-100;
`
const ProductContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    margin-bottom:10vh;
`

const PlatformOfferingContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    margin-bottom:10vh;
`

const HomePage = styled.div`
    display:flex;
    flex-direction:row;
    height:100vh;
`