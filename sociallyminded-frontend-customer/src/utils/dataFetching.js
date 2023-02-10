import { useState, useEffect } from "react";
import axios from "axios";

export const DataFetchingTemplate = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {

        const fetchData = async () => {
            axios.get(url)
            .then(response => {
                setData(response.data)
            })
            .catch ((error) => {
                setError(error)
            })
            .finally (
                setLoading(false)
            )
        }

        fetchData();

    }, [url]);

    return { data, error, loading };
};

