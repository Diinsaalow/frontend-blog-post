import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { toast } from 'react-hot-toast'
import { useUser } from '../context/UserContext'

const SignIn = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isLoading } = useUser()

  const handleSignIn = async (data) => {
    try {
      await login(data)
      toast.success('Signed in successfully!')
      navigate(location.state?.from?.pathname || '/')
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='flex flex-col items-center'>
          <div className='w-full max-w-md'>
            <AuthForm
              type='signin'
              onSubmit={handleSignIn}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignIn
