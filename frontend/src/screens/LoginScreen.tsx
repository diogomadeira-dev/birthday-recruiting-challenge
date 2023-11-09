import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { getUser } from '../redux/slices/authSlice'
// import Error from '../components/Error'

const LoginScreen = () => {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitForm = (data: { username: string; password: string }) => {
    // dispatch(userLogin(data))
    // console.log('data', data)
    dispatch(getUser(data))
  }

  return (
      // {/* {error && <Error>{error}</Error>} */}
      // {/* <div className='form-group'>
      //   <label htmlFor='username'>username</label>
      //   <input
      //     type='text'
      //     className='form-input'
      //     {...register('username')}
      //     defaultValue="user"
      //     required
      //   />
      // </div>
      // <div className='form-group'>
      //   <label htmlFor='password'>Password</label>
      //   <input
      //     type='password'
      //     className='form-input'
      //     {...register('password')}
      //     defaultValue="mosano"
      //     required
      //   />
      // </div>
      // <button type='submit' className='button' disabled={loading}>
      //   {loading ? <Spinner /> : 'Login'}
      // </button> */}
    <section className="bg-gray-50 dark:bg-gray-900 w-screen">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in 
                    </h1>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" {...register('username')} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="user" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password"  {...register('password')} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue="mosano" required />
                        </div>
                        
                        <button type="submit" disabled={loading} className="flex justify-center w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <Spinner /> : 'Login'}</button>

                </div>
            </div>
        </div>
      </form>
  </section>
  )
}

export default LoginScreen