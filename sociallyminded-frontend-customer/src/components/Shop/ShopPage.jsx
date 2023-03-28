import { PageTemplate } from "../common/styles";
import LoggedInHeader from "../common/Header/LoggedInHeader"
import useShopHooks from "./shopHooks";
import { SearchInput } from "./SearchInput";
import { DataDisplay } from "./DataDisplay";
import { PromptResults } from "./PromptResults";
import React from 'react';
import useLoginHooks from "../Login/loginHooks";
import Header from "../common/Header/Header"; 
import { UserAuth } from "../../context/AuthContext";

export const ShopPage = () => {
    const {         
        searchQuery, data, loading,
        searchByProductName, searchPrompts, handleSearchQuery, 
        displayData, showSearchPrompts, performSearch,
        filterProductByCategory, craftFilterClicked, clothingFilterClicked, 
        foodFilterClicked, othersFilterClicked
    } = useShopHooks();

    const { user } = UserAuth()

    return (
        <PageTemplate>   
            {user == null ? <Header></Header> : <LoggedInHeader></LoggedInHeader>}
            <div>
                <SearchInput 
                    data={{
                        searchByProductName: searchByProductName,
                        searchQuery: searchQuery,
                        filterProductByCategory: filterProductByCategory,
                        filterProductByCategory: filterProductByCategory,
                        craftFilterClicked: craftFilterClicked,
                        clothingFilterClicked: clothingFilterClicked,
                        foodFilterClicked: foodFilterClicked,
                        othersFilterClicked: othersFilterClicked,
                        performSearch: performSearch
                    }}
                />

                <PromptResults
                    data={{
                        showSearchPrompts: showSearchPrompts,
                        searchPrompts: searchPrompts,
                        handleSearchQuery: handleSearchQuery
                    }}
                />

                <DataDisplay 
                    data={{ displayData: displayData }}
                />

            </div>
        </PageTemplate>
    )
}