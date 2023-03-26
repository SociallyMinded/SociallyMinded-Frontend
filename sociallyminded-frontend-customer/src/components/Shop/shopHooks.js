import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllProductsUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"

const useShopHooks = () => {
    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        axios.get(getAllProductsUrl)
        .then(response => {
            setData(response.data)
            setDisplayData(response.data)
        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, []);

    const [craftFilterClicked, setCraftFilterClicked] = useState(true)
    const [clothingFilterClicked, setClothingFilterClicked] = useState(true)
    const [foodFilterClicked, setFoodFilterClicked] = useState(true)
    const [othersFilterClicked, setOthersFilterClicked] = useState(true)

    // Filter categories
    const categoriesMap = new Map()
    categoriesMap.set(ProductCategories.CRAFTS,0)
    categoriesMap.set(ProductCategories.CLOTHING,0)
    categoriesMap.set(ProductCategories.FOOD,0)
    categoriesMap.set(ProductCategories.OTHERS,0)

    const [categories, setCategories] = useState(categoriesMap)
    const filterProductByCategory = (e) => {
        var category = e.target.value

        switch(category) {
            case category == ProductCategories.CRAFTS:
                setCraftFilterClicked(!craftFilterClicked)
                break
            case category == ProductCategories.CLOTHING:
                setClothingFilterClicked(!clothingFilterClicked)
                break
            case category == ProductCategories.FOOD:
                setFoodFilterClicked(!foodFilterClicked)
                break
            case category == ProductCategories.OTHERS:
                setOthersFilterClicked(!othersFilterClicked)
                break
            default:
                setCraftFilterClicked(true)
                setClothingFilterClicked(true)
                setFoodFilterClicked(true)
                setOthersFilterClicked(true)
        }

        if (!categories.has(category)) {
            categories.set(category, 1)
        } else {
            categories.set(category, categories.get(category)+1)
        }
        setCategories(categories)
    }

    // Handle search input
    const [searchQuery, setSearchQuery] = useState("") 
    const [searchPrompts, setSearchPrompts] = useState("")
    const [showSearchPrompts, setShowSearchPrompts] = useState(true)

    const searchByProductName = (e) => {
        setShowSearchPrompts(true)

        var query = e.target.value
        setSearchQuery(query)
        var queryNormalized = e.target.value.toLowerCase()
        var queryLen = queryNormalized.length

        var displaySearchData = data.filter(d => d.name.toLowerCase().substring(0,queryLen) == queryNormalized)
        var displaySearchDataNames = displaySearchData.map(data => data.name)

        if (queryNormalized != "") {
            setSearchPrompts(displaySearchDataNames)
        } else {
            setSearchPrompts("")
        }
    }

    const handleSearchQuery = (e) => {
        setSearchQuery(e)
        setShowSearchPrompts(false)
    }
   
    const performSearch = () => {
        setShowSearchPrompts(false)

        var queryNormalized = searchQuery.toLowerCase()
        var queryLen = queryNormalized.length
        
        var displaySearchData = data.filter(data => data.name.toLowerCase().substring(0,queryLen) == queryNormalized)

        // Get all categories of interest
        var filteredCategories = []
        for (const [key, value] of categories.entries()) {
            if (value % 2 == 0 && key != undefined) {
                filteredCategories.push(key)
            }
        }

        // Filter data by search input string -> category 
        var filteredDisplayData = []
        for (const d of displaySearchData) {
            if (filteredCategories.includes(d.category)) {
                filteredDisplayData.push(d)
            }
        }

        setDisplayData(filteredDisplayData)
    }

    return { 
        searchQuery,
        data, loading,
        searchByProductName, displayData,
        searchPrompts, handleSearchQuery, showSearchPrompts, performSearch,
        filterProductByCategory, craftFilterClicked, clothingFilterClicked, foodFilterClicked, othersFilterClicked
    } 
}

export default useShopHooks