import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

const useFetch = (URI) => {
  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const fetchData = async (url) => {
    try {
      setIsLoading(prev => !prev);
      const response = await axios.get(url);
      const result = await response.data;
      if(result){
        setData(result.data);
        setIsLoading(prev => !prev);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    fetchData(URI)
  }, [URI]);

  return {
    data,
    isLoading,
    errorMessage
  }

};

export default useFetch;