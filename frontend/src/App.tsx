import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'

function App() {

  return (
    <Router>
    <main className='container content'>
      <Routes>
        {/* <Route path='/' element={<HomeScreen />} /> */}
        <Route path='/login' element={<LoginScreen />} />
        {/* <Route path='/register' element={<RegisterScreen />} /> */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path='/user-profile' element={<ProfileScreen />} /> */}
          <Route path='/' element={<HomeScreen />} />
        </Route>
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </main>
  </Router>
  )
}

export default App
