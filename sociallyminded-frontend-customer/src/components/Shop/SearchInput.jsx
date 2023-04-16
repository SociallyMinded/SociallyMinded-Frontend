import React from 'react';
import styled from 'styled-components'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { DropdownButton } from "react-bootstrap";
import { ProductCategories, ProductCategoryLabels } from '../../enum';

const SearchInputCategory = ({data}) => {
    return (
        <Form>
            <StyledFormCheck 
                type={'checkbox'}
                label={ProductCategoryLabels.CRAFTS}
                value={ProductCategories.CRAFTS}
                onClick={data.filterProductByCategory}
                defaultChecked={data.craftFilterClicked}
            />
            <StyledFormCheck
                type={'checkbox'}
                label={ProductCategoryLabels.CLOTHING}
                value={ProductCategories.CLOTHING}
                onClick={data.filterProductByCategory}
                defaultChecked={data.clothingFilterClicked}
            
            />
            <StyledFormCheck
                type={'checkbox'}
                label={ProductCategoryLabels.FOOD}
                value={ProductCategories.FOOD}
                onClick={data.filterProductByCategory}
                defaultChecked={data.foodFilterClicked}
        
            />
            <StyledFormCheck
                type={'checkbox'}
                label={ProductCategoryLabels.OTHERS}
                value={ProductCategories.OTHERS}
                onClick={data.filterProductByCategory}
                defaultChecked={data.othersFilterClicked}
            />
        </Form>
    )
}

export const SearchInput = ({data}) => {
    return (
        <StyledInputGroup className="mb-3">
            <StyledFormControl
                placeholder="Search Product"
                aria-describedby="basic-addon2"
                onChange={data.searchByProductName}
                value={data.searchQuery}
            />
            <DropdownButton id="dropdown-basic-button" title="Search By Category">
                <SearchInputCategory data = {data}/>
            </DropdownButton>
            <Button variant="outline-secondary" id="button-addon2" onClick={data.performSearch}>
                Search
            </Button>
        </StyledInputGroup>
    )
}

const StyledInputGroup = styled(InputGroup)`
    margin-top:7vh;
`

const StyledFormControl = styled(Form.Control)`
    width:80%;
`
const StyledFormCheck = styled(Form.Check)`
    padding-left:3vw;
`