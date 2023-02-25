import useCustomerHooks from "./customerHooks";
import styled from 'styled-components'
import { SubmitButton } from "../common/Button/SubmitButton";
import { DeleteButton } from "../common/Button/DeleteButton";
import { EditButton } from "../common/Button/EditButton";
import { PageTemplate } from "../common/styles";
import { UserAuth } from '../../context/AuthContext'
import LoggedInHeader from "../common/Header/LoggedInHeader"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';

export const Customer = () => {
    const { data, error, loading, 
        showCustomers, toggleShowCustomers, 
        input, handleInput,
        response, handlers 
    } = useCustomerHooks();

    const {user} = UserAuth()



    return (
        <PageTemplate>   
            <LoggedInHeader></LoggedInHeader> 
            <ProductsContainer>

                <StyledRow lg={"4"} md={"4"} margin-bottom="500px">
                    <InputGroup className="mb-3">
                        <StyledFormControl
                        placeholder="Search Product"
                        aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup> 

                    {Array.from({ length: 16 }).map((_, idx) => (
                        <StyledCol>
                        <StyledCard>
                            <Card.Img variant="top" src={require('./donut.png')} />
                            <Card.Body>
                                <Card.Title>Product Name</Card.Title>
                                <Card.Subtitle>$10.00</Card.Subtitle>
                            </Card.Body>
                        </StyledCard>
                        </StyledCol>
                    ))}
                </StyledRow>
            </ProductsContainer>

            <StyledPagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </StyledPagination>

        </PageTemplate>
    )

}

const StyledPagination = styled(Pagination)`
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top:3%;
    margin-bottom:5%;
`
const StyledCol = styled(Col)`
    margin-top:2.5%;
`

const ProductsContainer = styled.div`
`
const StyledRow = styled(Row)`
    margin-top:5%;
`

const StyledFormControl = styled(Form.Control)`
    width:80%;
  
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