import { useState, useMemo } from "react"
import { DataCreationTemplate, DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllCustomersUrl } from "../../routes/routes"
import axios from 'axios'

const useCustomerHooks = () => {
    const { data, error, loading } = DataFetchingTemplate(getAllCustomersUrl);

    const [showCustomers, setShowCustomers] = useState(false);
    const toggleShowCustomers = () => {
        setShowCustomers(!showCustomers)
    }

    const [input, setInput] = useState(null)
    const handleInput = (e) => {
        setInput(() => e.target.value)
    }

    const [response, setResponse] = useState(null)
    const handlers = useMemo(
        () => ({
            createCustomer: async (e) => {
                // reset state (trigger refresh)
                // setLoading(true)
                // setSuccess(false)
                // setError(null)
                e.preventDefault()
                const newCustomerRecord = {
                    "username" : input,
                }
                await axios.post(getAllCustomersUrl, newCustomerRecord)
                .then(response => {
                    console.log(response)
                    setResponse(response)
                    // setSuccess(true)
                    setInput("")
                })
                .catch(error => console.log(error))
            },
        }),
        [input]
    )

    return { data, error, loading, 
        showCustomers, toggleShowCustomers, 
        input, handleInput, 
        response, handlers
    } 
}

export default useCustomerHooks