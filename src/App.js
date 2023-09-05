import Login from './login';
import Signup from './signup';
import Home from './Home';
import Faq from './faq';
import Footer from './Navigation/Footer';
import Navigation from './Navigation/Navigation';
import WithdrawInvestments from './withdraw';
import Profile from './Profile';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
function App() {
  return (  
    <BrowserRouter> 
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/*" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/withdraw" element={<WithdrawInvestments />} />
          <Route path="/welcome" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
