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
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    </Router>
    </main>

  )
}

export default App;

