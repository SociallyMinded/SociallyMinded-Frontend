import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getOrdersByCustomer, getAllCustomersUrl } from "../../routes/routes"
import axios from 'axios'
import { useEffect } from "react"
import { ProductCategories } from "../../enum"
import { useLocation } from "react-router"

const useProfileHooks = (user) => {
    const [data, setData] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log("here")
    console.log(data)
 
    useEffect(() => {
        axios.get(getOrdersByCustomer + user.uid)
        .then(response => {
            setData(response.data)
        })  
        .catch ((error) => {
            setError(error)
        })
        .finally (
            setLoading(false)
        )
    }, [user]);

    return { 
        data, loading, error
    } 
}

export default useProfileHooks