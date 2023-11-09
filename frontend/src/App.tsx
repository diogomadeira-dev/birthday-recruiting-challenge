import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

function App() {

  return (
    <main className='w-screen container mx-auto'>

      <Router>
        <Routes>
          {/* <Route path='/' element={<HomeScreen />} /> */}
          <Route path='/login' element={<LoginScreen />} />
          {/* <Route path='/register' element={<RegisterScreen />} /> */}
          {/* <Route element={<ProtectedRoute />}> */}
            {/* <Route path='/user-profile' element={<ProfileScreen />} /> */}
            <Route path='/' element={<HomeScreen />} />
          {/* </Route> */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </Router>
    </main>

  )
}

export default App;

