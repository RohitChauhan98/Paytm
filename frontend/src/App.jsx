import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Dashboard from './Dashboard';
import SendMoney from './SendMoney';
import "./index.css"
import { Search } from './Search';
import { Header } from './components/Header';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [name, setName] = useState("");

  axios.post("http://localhost:3000/api/v1/user/me", {
    token: localStorage.getItem("token")
  }).then( response => {
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
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendmoney" element={<SendMoney />} />
        <Route path="/searchUser" element={<Search />} />
      </Routes>
    </BrowserRouter>
  </>
);
}

export default App
