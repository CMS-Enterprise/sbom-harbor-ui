/**
 * @module sbom-harbor-ui/hooks/useFetch
 */
import { useEffect, useState } from 'react'

/**
 * Custom hook to fetch data from an API.
 * @param {string} url - URL to fetch
 * @returns {object} - An object containing the data, error, and loading state
 */
const useFetch = (
  url: string
): {
  loading: boolean
  error: Error | null
  data: unknown
} => {
  const [data, setData] = useState(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { data, error, loading }
}

export default useFetch
