import { useState } from "react"
import { DataFetchingTemplate } from "../../utils/dataFetching"
import { getAllCustomersUrl } from "../../routes/routes"

const useCustomerHooks = () => {
    const { data, error, loading } = DataFetchingTemplate(getAllCustomersUrl);

    const [showCustomers, setShowCustomers] = useState(false);
    const toggleShowCustomers = () => {
        setShowCustomers(!showCustomers)
    }

    return { data, error, loading, showCustomers, toggleShowCustomers} 
}

export default useCustomerHooks