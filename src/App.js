import './App.css';
import { Route, Routes } from "react-router-dom";
import Affiliatelandingpage from "./pages/Affiliatelandingpage"
import Affiliateregistrationpage from "./pages/Affiliateregistrationpage"
import Brandlandingpage from "./pages/Brandlandingpage"
import Brandregistrationpage from "./pages/Brandregistrationpage"
import Affiliateloginpage from './pages/Affiliateloginpage';
import Dashboardaffiliateprofile from './pages/Dashboardaffiliateprofile';
import { RequireAuth } from 'react-auth-kit';



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Brandlandingpage />} />
        <Route path="/affiliate" element={<Affiliatelandingpage />} />
        <Route path="/register" element={<Brandregistrationpage />} />
        <Route path="/affiliate/register" element={<Affiliateregistrationpage />} />
        <Route path="/affiliate/login" element={<Affiliateloginpage />} />
        <Route path="/dashboard/affiliate/profile" element={<RequireAuth loginPath='/affiliate/login'><Dashboardaffiliateprofile /></RequireAuth>}/>
      </Routes>
    </div >
  );
}

export default App;
