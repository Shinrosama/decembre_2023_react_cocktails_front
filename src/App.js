
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/guest/HomePage';
import CoworkingsPage from './pages/guest/CoworkingsPage';
import DashboardPage from './pages/admin/DashboardPage';
import CoworkingsDetailPage from './pages/guest/CoworkingDetailPage';
import LoginPage from './pages/guest/LoginPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element= {<HomePage />} />
          <Route path="/coworking" element= {<CoworkingsPage/>} />
          <Route path='/coworking/detail/:id' element= {<CoworkingsDetailPage/>} />
          <Route path="/admin" element= {<DashboardPage/>} />
          <Route path='/login' element= {<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
