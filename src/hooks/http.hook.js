import { useCallback, useState } from "react"


const useHttp = () => {

  const [process, setProcess] = useState('waiting')

  const request = useCallback( async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {


    setProcess('loading');

    try{ 
      const response = await fetch(url, {method, body, headers})
      
      if(!response.ok){
        throw new Error(`Could not to fetch ${url}, status: ${response.status}`)
      }

      return response.json()
      
    }catch(e){
      setProcess('error')
    }

  }, [])

  const clearError = useCallback(() => {

    setProcess('loading')
  }, [])

  return {request, clearError, process, setProcess}
}

export default useHttp