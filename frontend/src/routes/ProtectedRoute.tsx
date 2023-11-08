import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <div className='flex flex-col items-center justify-center w-screen h-screen bg-neutral-100'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Unauthorized</h1>
        <Link to="/login"><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Go to login</button></Link>
      </div>
    )
  }

  return <Outlet />
}

export default ProtectedRoute