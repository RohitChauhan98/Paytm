import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Dashboard from './Dashboard';
import SendMoney from './SendMoney';
import "./index.css"
import { Search } from './Search';
import { Header } from './components/Header';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState("");

  axios.post("https://paytmbackend.rohitchauhan.site/api/v1/user/me", {
    token: localStorage.getItem("token")
  }).then(response => {
    setName(response.data.name);
  })

  const isSignupOrSignin = () => {
    return location.pathname === '/signup' || location.pathname === '/signin';
  };

  return (
    <>
      <BrowserRouter>
        {/* <Header name={name} /> */}
        {!isSignupOrSignin() && <Header name={name} />}
        <AppContent />
      </BrowserRouter>
    </>
  );
}

const AppContent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      navigate('/dashboard')
    }
  }, [])
  return <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/sendmoney" element={<SendMoney />} />
    <Route path="/searchUser" element={<Search />} />
  </Routes>
}

export default App
