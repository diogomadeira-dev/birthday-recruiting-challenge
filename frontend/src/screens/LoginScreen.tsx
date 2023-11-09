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

  // redirect authenticated user to profile screen
//   useEffect(() => {
//     if (userInfo) {
//       navigate('/user-profile')
//     }
//   }, [navigate, userInfo])

  const submitForm = (data: { username: string; password: string }) => {
    // dispatch(userLogin(data))
    // console.log('data', data)
    dispatch(getUser(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* {error && <Error>{error}</Error>} */}
      <div className='form-group'>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          className='form-input'
          {...register('username')}
          defaultValue="user"
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
          {...register('password')}
          defaultValue="mosano"
          required
        />
      </div>
      <button type='submit' className='button' disabled={loading}>
        {loading ? <Spinner /> : 'Login'}
      </button>
    </form>
  )
}

export default LoginScreen