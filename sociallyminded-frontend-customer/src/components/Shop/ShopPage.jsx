import React from 'react';
import { PageTemplate } from "../common/styles";
import LoggedInHeader from "../common/Header/LoggedInHeader"
import { useShopHooks } from "./shopHooks";
import { SearchInput } from "./SearchInput";
import { DataDisplay } from "./DataDisplay";
import { PromptResults } from "./PromptResults";
import Header from "../common/Header/Header"; 
import { UserAuth } from "../../context/AuthContext";
import Spinner from 'react-bootstrap/Spinner';
import styled from "styled-components";

export const ShopPage = () => {
    
    const { state, action } = useShopHooks();
    const { user } = UserAuth()

    return (
        <PageTemplate>   
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <div>
                <SearchInput 
                    data={{
                        searchQuery: state.searchQuery,
                        foodFilterClicked: state.foodFilterClicked,
                        othersFilterClicked: state.othersFilterClicked,
                        craftFilterClicked: state.craftFilterClicked,
                        clothingFilterClicked: state.clothingFilterClicked,
                        searchByProductName: action.searchByProductName,
                        filterProductByCategory: action.filterProductByCategory,
                        performSearch: action.performSearch
                    }}
                />

                <PromptResults
                    data={{
                        searchPrompts: state.searchPrompts,
                        showSearchPrompts: state.showSearchPrompts,
                        handleSearchQuery: action.handleSearchQuery
                    }}
                />

                {state.displayData == null && 
                    <LoadingContainer>
                        <Spinner animation="grow" />
                        <SpinnerText>Loading</SpinnerText>
                    </LoadingContainer>
                }
                
                <DataDisplay 
                    data={{ displayData: state.displayData }}
                />
            </div>
        </PageTemplate>
    )
}

const SpinnerText = styled.h5`
    margin-left:1vw;
    margin-top:1vh;
`

const LoadingContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
    height:50vh;
`