import Login from './login';
import Signup from './signup';
import Home from './Home';
import Faq from './faq';
import Footer from './Navigation/Footer';
import Navigation from './Navigation/Navigation';
import WithdrawInvestments from './withdraw';
import Profile from './Profile';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import Payments from './Payments';
import Admin from './Admin';
import { Cookies } from 'react-cookie';
import BitcoinPriceWidget from './Price';
function App() {
  const cookies = new Cookies();
  const userToken = cookies.get('userToken');

if(userToken){
  return (  
    <BrowserRouter> 
        <Navigation style={{
          top:"0px",
          position:"fixed"
        }}/>
        <BitcoinPriceWidget />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/invest" exact element={<Home />} />
          <Route path="/rootadmin" exact element={<Admin />} />
          <Route path="/payments" exact element={<Payments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/withdraw" element={<WithdrawInvestments />} />
          <Route path="/welcome" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" exact element={<Login />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  );
  }else{
    return (  
<BrowserRouter>
<Routes>
          <Route path="/" exact element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Signup />} />
          <Route path="/*" exact element={<Login />} />
        </Routes>
        <Footer />
</BrowserRouter>
    );
  }

}

export default App;
