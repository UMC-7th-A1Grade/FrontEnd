import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const backendUrl = 'http://localhost:8080/auth/google/callback'

    if (code) {
      fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => {
        if(data.isSuccess) {
          localStorage.setItem('accessToken', data.result.accessToken)
          localStorage.setItem('userEmail', data.result.email)
          localStorage.setItem('socialId', data.result.socialId)
          navigate('/nickname')
        } else {
          console.error(data.message)
          navigate('/')
        }
      })
      .catch(error => {
        console.error('Login failed:', error)
        navigate('/')
      })
    } else {
      navigate('/')
    }
  }, [navigate])

  return <div>로그인 처리 중...</div>
}

export default AuthCallback