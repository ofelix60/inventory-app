import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import DemoDashboard from './pages/DemoDashboard';
import Login from './pages/login';
import Register from './pages/register';
import { useSelector } from 'react-redux';
import Inventory from './components/Inventory';
import './App.css';

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>;
};
const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Login />} />
        <Route path='demo-dashboard' element={<DemoDashboard />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/inventory' element={<Inventory />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
