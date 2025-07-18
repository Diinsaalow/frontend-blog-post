import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import { toast } from 'react-hot-toast'
import { useUser } from '../context/UserContext'

const SignUp = () => {
  const navigate = useNavigate()
  const { register, isLoading } = useUser()

  const handleSignUp = async (data) => {
    try {
      await register(data)
      toast.success('Signed up successfully!')
      navigate('/')
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
              type='signup'
              onSubmit={handleSignUp}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignUp
