import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import RawMaterial from './Pages/RawMaterial/RawMaterial';
import StockMaterial from './Pages/StockMaterial/StockMaterial';
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import Navbar from './Component/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import InRawProduct from './Component/InRawProduct/InRawProduct';
import { useContext } from 'react';
import { MesContext } from './Context/MesContextProvider';
import Sidebar from './Component/Sidebar/Sidebar';
import UpdatedRawMaterial from './Pages/StockMaterial/StockMaterial';
import StockMaterialUpdate from './Component/StockMaterialUpdate/StockMaterialUpdate';
import RawMaterialUpdate from './Component/RawMaterialUpdate/RawMaterialUpdate';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  const { loginSignup, setLoginSignup } = useContext(MesContext);
  return (
    <div className="App">
      {loginSignup && <LoginSignUp />}
      <Navbar />
      {/* <Sidebar /> */}
      <div className='app-route'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/raw-material' element={<RawMaterial />} />
          <Route path='/stock-material' element={<StockMaterial />} />
          <Route path='/stock-material-update' element={<StockMaterialUpdate />} />
          <Route path='/raw-material-update' element={<RawMaterialUpdate />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
