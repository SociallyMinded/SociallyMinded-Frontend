import React from 'react';
import { PageTemplate } from '../common/styles';
import Header from '../common/Header/Header';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

export const ProductReviewPage = () => {
    return (
        <PageTemplate>
            <Header/>
            <ReviewHeaderContainer>
                <Title>Reviews</Title>
                <ReviewImg
                    src={require('./review-bg.png')}
                    alt="Second slide"
                />
            </ReviewHeaderContainer>
            <ReviewDetailsContainer>
                <p>Back</p>
                <h1>Product A</h1>
                <StyledReviewBody>
                    <ReviewContainer>
                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                        <ReviewDescription>
                            Review 1 description<br></br>
                  
                            Review 1 description<br></br>
                        </ReviewDescription>
                    </ReviewContainer>
                    <ReviewContainer>
                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                        <ReviewDescription>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                        </ReviewDescription>
                    </ReviewContainer>
                    <ReviewContainer>
                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                        <ReviewDescription>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                        </ReviewDescription>
                    </ReviewContainer>
                    <ReviewContainer>
                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                        <ReviewDescription>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                        </ReviewDescription>
                    </ReviewContainer>
                    <ReviewContainer>
                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                        <ReviewDescription>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                        </ReviewDescription>
                    </ReviewContainer>
                    <ReviewContainer>
                        <AvatarImg src={require('./peep-11.png')}></AvatarImg>
                        <ReviewDescription>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                            Review 1 description<br></br>
                        </ReviewDescription>
                    </ReviewContainer>
            </StyledReviewBody>
            </ReviewDetailsContainer>
    

        </PageTemplate>
    )

}

const ReviewHeaderContainer = styled.div`
    position: relative;
    margin-left:7vw;
    margin-right:7vw;
`

const Title = styled.h1`
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:1;
    font-size:4.5em;
    font-weight:semi-bold;
`

const ReviewImg = styled.img`
    width:100%;
    height:30vh;
    border-radius:10px;
    margin-top:7vh;
    opacity:0.8;
    z-index:0;
`

const ReviewDetailsContainer = styled.div`
    position: relative;
    margin-left:7vw;
    margin-right:7vw;
    margin-top:5vh;
`






const ReviewContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:5vh;
    align-items:center;
    justify-content:center;
`

const AvatarImg = styled.img`
    width:6vw;
    height:12vh;
    margin-right:2vw;
`

const StyledReviewBody = styled(Modal.Body)`
    margin-top:5vh;
`

const ReviewDescription = styled.div`
    position: relative;
    background: #f4f9fb;
    border-radius: .4em;
    padding:1em;
    width:100%;

    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        border: 9px solid transparent;
        border-right-color: #f4f9fb;
        border-left: 0;
        border-bottom: 0;
        margin-top: -4.5px;
        margin-left: -9px;
    }
`


