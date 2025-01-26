export const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem('accessToken')
    
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    }
  
    try {
      const response = await fetch(url, { ...options, headers })
      const data = await response.json()
  
      if (data.code === 'AUTH401') {
        localStorage.removeItem('accessToken')
        window.location.href = '/'
        return null
      }
  
      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }