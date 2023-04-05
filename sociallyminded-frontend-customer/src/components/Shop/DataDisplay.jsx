import styled from 'styled-components'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import React from 'react';

export const DataDisplay = ({data}) => {
    console.log(data)
    return (
        <StyledRow lg={5} md={4}>
            {data.displayData != null && data.displayData.map((d) => (
                <StyledCol md={3}>
                    
                <StyledLink id="styled-card-link" to={'/product_listing/'+ d.productId } state={{ d:d, allData: data }}>
                    
                    <StyledCard>
                    <StyledCardHeader>
                        {d.socialenterprise.enterpriseName}
                    </StyledCardHeader>
                        <StyledImg variant="top" src={require('./donut.png')} />
                        
                        <StyledCardBody>
                            <CardTitleContainer>
                                <StyledCardTitle>{d.name}</StyledCardTitle>
                            </CardTitleContainer>
                            <CardTitleContainer>
                                <StyledCardTitle>${d.price}</StyledCardTitle>
                            </CardTitleContainer>
                        </StyledCardBody>
                    </StyledCard>
                </StyledLink>
                </StyledCol>
            ))}
            {data.displayData != null && data.displayData.length == 0 && <StyledText>There are no products to display</StyledText>}
        </StyledRow>
    )
}

const LineBreak = styled.br`
    margin-top:0vh;
`

const StyledCardHeader = styled(Card.Header)`
    background-color:white;
    border-width:0px;
`

const CardTitleContainer = styled.div`
    max-width:100%;
`

const StyledCardTitle = styled(Card.Title)`
    font-size:1em;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`

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
    border: 1px solid #efefef;
  
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
    flex-direction: column;
`

const StyledText = styled.p`
    width:100%;
    font-size:1.5em;
    margin-top:2%;
`

const StyledImg = styled(Card.Img)`
  border-width:0px;
`