import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser()
  const location = useLocation()

  console.log('isAuthenticated', isAuthenticated)
  console.log('isLoading', isLoading)

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto'></div>
          <p className='mt-2 text-muted-foreground'>Loading...</p>
        </div>
      </div>
    )
  }

  // Only redirect if not authenticated and not loading
  if (!isAuthenticated) {
    return <Navigate to='/signin' state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
