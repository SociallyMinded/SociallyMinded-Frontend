import React from "react";
import { LandingPageTemplate, PageTemplate } from "../common/styles";
import styled from "styled-components";
import Header from "../common/Header/Header";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { SIGNUP_PAGE_LINK } from "../../routes/routes";
import './styles.css'
import useLoginHooks from "../Login/loginHooks";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoggedInHeader from "../common/Header/LoggedInHeader";
import { Toast } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';

import { useContext } from "react";
import { LogoutToastContext } from "../../App";
import { useLocation } from "react-router-dom";
import Footer from "../common/Footer/Footer";

import { useState } from "react";


const ReviewComments = [
    {
        "comment": 'SociallyMinded is a great platform! It allowed me to find out more about the different products sold by social enterprises in Singapore. I am happy knowing that my money is spent on businesses championing social good',
        "image" : 'peep-46.png'
    },
    {
        "comment": 'I like that SociallyMinded is not just another platform selling commercial goods from big companies like Shopee or Lazada. I could discover handmade crafts created by Singaporean social enterprises and support a cause for social good',
        "image" : 'peep-63.png'
    },
    {
        "comment": 'Easy and efficient platform to use! I could find all my favourite products and buy it with just a few clicks!',
        "image" : 'peep-87.png'
    },
    {
        "comment": 'A wide variety of high quality handmade products. Good platform to use especially if you are into handmade artisan products',        
        "image" : 'peep-94.png'
    },
    {
        "comment": 'This platform allows me to make more conscious and sustainable shopping decisions. I feel happy knowing that my purchase helps social enterprises in their causes!',        
        "image" : 'peep-101.png'
    },
]


const Home = () => {
    const { user } = UserAuth()

    const { state, setState } = useLoginHooks()

    const { showLogoutToast, setShowLogoutToast } = useContext(LogoutToastContext);
    const closeLogoutToast = () => setShowLogoutToast(false)

    const location = useLocation();

    const [customerReview, setCustomerReview] = useState(0);

    console.log(ReviewComments[0])

    const handleShowCustomerReview = () => {
        const newReview = (customerReview+1) % 5
        setCustomerReview(newReview)
    }

    return (
        <LandingPageTemplate>
            <SlantedDiv></SlantedDiv>

            <PageTemplate>
                {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
                <HomePage>
                    <HomePageDescription>
                        <div id="container">
                            <div id="flip">
                                <div><div>Cultivating Changemakers</div></div>
                                <div><div>Empowering Entrepreneurs</div></div>
                                <div><div>Supporting Social Causes</div></div>
                            </div>
                        </div>
                        <HomePageTitle>SociallyMinded</HomePageTitle>
                        <HomePageSubtitle>Support your favourite social enterprises today!</HomePageSubtitle>
                        <HomePageLink to={SIGNUP_PAGE_LINK}>Get Started</HomePageLink>
                    </HomePageDescription>

                    <HomeImageContainer>
                        <HomeImage src={require('./shopping.png')}></HomeImage>
                    </HomeImageContainer>

                    {user == null && showLogoutToast && location.state != null && 
                        <StyledToast onClose={closeLogoutToast}>
                            <Toast.Header>
                                <strong className="me-auto">Log Out</strong>
                            </Toast.Header>
                            <Toast.Body>You have been logged out!</Toast.Body>
                        </StyledToast>
                    }
                </HomePage>
            </PageTemplate>

            <ProductContainer>
                <h3>Why SociallyMinded?</h3>
                <OfferingContainer>
                    <OfferingSection>
                        <CardImg src={require('./wide-variety.png')}></CardImg> 
                        <h6>Wide variety of selection</h6>
                    </OfferingSection>
                    <OfferingSection>
                        <CardImg src={require('./sustainable.png')}></CardImg> 
                        <h6>Sustainably produced products</h6>
                    </OfferingSection>
                    <OfferingSection>
                        <CardImg src={require('./local-enterprise.png')}></CardImg> 
                        <h6>Support local social enterprises</h6>
                    </OfferingSection>
                </OfferingContainer>
            </ProductContainer>

            <PlatformOfferingContainer>   
                <CardTitle>
                    <h3>Shop products on our platform</h3>
                </CardTitle>
                <CardSection>
                    <ShoppingImg src={require('./shopping-1.png')}></ShoppingImg>
                    <ProductListingDescSection>
                            Shop from over 100 different products created locally
                            by our home grown Singaporean social enterprises. Here,
                            you can find anything ranging from clothes, to food, to 
                            clay crafts. 
                            <ParagraphBreak></ParagraphBreak>
                            Enjoy a fuss free and seamless online shopping experience 
                            while contributing towards sustainable social and environmental 
                            causes! 
                    </ProductListingDescSection>
                </CardSection>
            </PlatformOfferingContainer>

            <CommentContainer>
                <h3>Hear what our customers say</h3>
                <CommentSection>
                    <CommentImg src={require(`./${ReviewComments[customerReview].image}`)}></CommentImg> 
                    <StyledMessage onClick={handleShowCustomerReview}>{ReviewComments[customerReview].comment}</StyledMessage>
                </CommentSection>

            </CommentContainer>

            <Footer></Footer>
        </LandingPageTemplate>
    )
}

const ParagraphBreak = styled.div`
    height:3vh;
`

const CommentContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:center;
    margin-bottom:10vh;
`

const CommentSection = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:5vh;
    align-items: center;
    justify-content:center;
`

const CommentImg = styled.img`
    width:13%;
    height:13%;
`

const StyledMessage = styled.div`
    margin-left:3vw;
    position: relative;
    background: #FBFBFB;
    border-radius: .4em;
    padding:1em;
    width:30%;
    max-width:30%;
    border:1px solid #dbdbdb;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 9px solid transparent;
        border-right-color: #dbdbdb;
        border-left: 0;
        border-bottom: 0;
        margin-top: -4.5px;
        margin-left: -9px;
    }
    
    &:hover {
        transition: all 0.2s ease-out;
        box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
        top: -4px;
    }

    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        border-radius: 32px;
        transform: scale(2);
        transform-origin: 50% 50%;
        transition: transform 0.15s ease-out;
    }

    &:hover:before {
        transform: scale(2.15);
    }
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


const Card = styled.div`
    display:flex;
    flex-direction:column;
    background-color:white;
    padding:1em;
    border-radius:10px;
    width:30%;
    height:40vh;
    margin-left:5%;
    margin-right:5%;
    text-align: center;
`

const ProductContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    margin-bottom:10vh;
`

const CardSection = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`

const PlatformOfferingContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    margin-bottom:10vh;
`

const CardTitle = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content:center;
`
const OfferingContainer = styled.div`
    display:flex;
    flex-direction:row;
`

const OfferingSection = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:center;
`

const CardImg = styled.img`
    width:50%;
    height:80%;
    margin-bottom:3vh;

    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-top: 5px;

    @keyframes floating {
        0% { transform: translate(0,  0px); }
        50%  { transform: translate(0, 15px); }
        100%   { transform: translate(0, -0px); }   
    }
`

const FooterContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content:center;
    width:100%;
    background-color:#e1f1f2;
    margin-top:5vh;
    height:6vh;
    padding-top:2vh;

`



const HomePage = styled.div`
    display:flex;
    flex-direction:row;
    height:100vh;
`

const HomePageTitle = styled.h1`
    font-size:3em;
`

const HomePageSubtitle = styled.h1`
    font-size:1.2em;
    margin-top:1em;
    margin-bottom:1.5em;
`

const HomePageDescription = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:10%;
    margin-left:10%;
`

const HomeImageContainer = styled.div`
    margin-top:5%;
`

const HomeImage = styled.img`
    position:relative;
    z-index:1;
    width:30em;
    height:30em;
    margin-left:25%;

    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-top: 5px;

    @keyframes floating {
        0% { transform: translate(0,  0px); }
        50%  { transform: translate(0, 15px); }
        100%   { transform: translate(0, -0px); }   
    }
`

const ShoppingImg = styled.img`
    position:relative;
    z-index:1;
    width:30em;
    height:30em;

    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-top: 5px;

    @keyframes floating {
        0% { transform: translate(0,  0px); }
        50%  { transform: translate(0, 15px); }
        100%   { transform: translate(0, -0px); }   
    }

`



const StyledToast = styled(Toast)`
    position:absolute;
    z-index:2;
    margin-left:73%;
    width:15%;
    margin-top:3%;
`

const HomePageLink = styled(Link)`
    text-decoration: none;
    background-image: linear-gradient(92.88deg, #455EB5 10.16%, #5643CC 42.89%, #673FD7 64.72%);
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    flex-shrink: 0;
    font-size: 16px;
    padding: 0.5em;
    width:6.5em;
    text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
    transition: all .5s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    &:hover {
        text-decoration: none;
        color:white;
        box-shadow: rgba(80, 63, 205, 0.5) 0 1px 30px;
        transition-duration: .1s;
    }
`

const ProductListingDescSection = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:30vw;
    height:50vh;
    margin-top:7vh;
    margin-left:3vw;
    border-radius:10px;
`


const Comment = styled.div`
	position: relative;
	background: #00aabb;
	border-radius: .4em;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        border: 0.625em solid transparent;
        border-top-color: #00aabb;
        border-bottom: 0;
        border-left: 0;
        margin-left: -0.312em;
        margin-bottom: -0.625em;
    }
`
export default Home
