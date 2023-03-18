import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllProductsUrl, getAllReviewsByProductIdUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"

const useProductReviewHooks = (state) => {
    // const { state } = useLocation();

    const [data, setData] = useState(null)
    const [displayData, setDisplayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(getAllReviewsByProductIdUrl + state.d.productId)
        .then(response => {
            setData(response.data)
            setDisplayData(response.data)
            response.data.forEach((d) => {
                d["avatar"] = generateRandomNum()
            })
        })
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, []);

    const generateRandomNum = () => {
        const MAX_NUM = 18
        const MIN_NUM =  1
        const RANDOM_NUM = Math.floor(Math.random() * (MAX_NUM - MIN_NUM + 1) + MIN_NUM)
        return RANDOM_NUM;
    }

    return { 
        data, displayData, loading, error, generateRandomNum
    } 
}

export default useProductReviewHooks