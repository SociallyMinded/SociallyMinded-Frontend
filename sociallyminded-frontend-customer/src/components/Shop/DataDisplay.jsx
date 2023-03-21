import styled from 'styled-components'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import React from 'react';

export const DataDisplay = ({data}) => {
    return (
        <StyledRow lg={5} md={4}>
            {data.displayData != null && data.displayData.map((d) => (
                <StyledCol md={3}>
                <StyledLink id="styled-card-link" to="/product_listing" state={{ d }}>
                    <StyledCard>
                        <Card.Img variant="top" src={require('./donut.png')} />
                        <StyledCardBody>
                            <Card.Title>{d.name}</Card.Title>
                            <Card.Title>${d.price}</Card.Title>
                        </StyledCardBody>
                    </StyledCard>
                </StyledLink>
                </StyledCol>
            ))}
            {data.displayData != null && data.displayData.length == 0 && <StyledText>There are no products to display</StyledText>}
        </StyledRow>
    )
}

const StyledRow = styled(Row)`
    max-height:70vh;
    overflow-y: scroll;
    z-index:1;
`

const StyledCol = styled(Col)`
    margin-top:2%;
    max-height:80vh;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;

    &:hover {
        text-decoration: none;
        color: black;
    }
`

const StyledCard = styled(Card)`
    display: block;
    top: 0px;
    position: relative;
    border-radius: 4px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
  
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
  }
`

const StyledCardBody = styled(Card.Body)`
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
`

const StyledText = styled.p`
    width:100%;
    font-size:1.5em;
    margin-top:2%;
`