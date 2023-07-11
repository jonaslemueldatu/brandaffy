import './App.css';
import { Route, Routes } from "react-router-dom";
import Affiliatelandingpage from "./pages/Affiliatelandingpage"
import Affiliateregistrationpage from "./pages/Affiliateregistrationpage"
import Brandlandingpage from "./pages/Brandlandingpage"
import Brandloginpage from "./pages/Brandloginpage"
import Brandregistrationpage from "./pages/Brandregistrationpage"
import Affiliateloginpage from './pages/Affiliateloginpage';
import Dashboardbrandprofile from './pages/Dashboardbrandprofile'
import Dashboardbrandinfluencerhub from './pages/Dashboardbrandinfluencerhub';
import Dashboardbrandinfluencerbox from './pages/Dashboardbrandinfluencerbox';
import Dashboardaffiliateprofile from './pages/Dashboardaffiliateprofile';
import Dashboardaffiliateinfluencerhub from './pages/Dashboardaffiliateinfluencerhub';
import Dashboardaffiliatesettings from './pages/Dashboardaffiliatesettings';
import { RequireAuth } from 'react-auth-kit';



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Brandlandingpage />} />
        <Route path="/affiliate" element={<Affiliatelandingpage />} />
        <Route path="/brand/login" element={<Brandloginpage />} />
        <Route path="/brand/register" element={<Brandregistrationpage />} />
        <Route path="/affiliate/register" element={<Affiliateregistrationpage />} />
        <Route path="/affiliate/login" element={<Affiliateloginpage />} />
        <Route path="/dashboard/brand/profile" element={<RequireAuth loginPath='/brand/login'><Dashboardbrandprofile /></RequireAuth>} />
        <Route path="/dashboard/brand/influencerhub" element={<RequireAuth loginPath='/brand/login'><Dashboardbrandinfluencerhub /></RequireAuth>} />
        <Route path="/dashboard/brand/influencerbox" element={<RequireAuth loginPath='/brand/login'><Dashboardbrandinfluencerbox /></RequireAuth>} />
        <Route path="/dashboard/affiliate/profile" element={<RequireAuth loginPath='/affiliate/login'><Dashboardaffiliateprofile /></RequireAuth>} />
        <Route path="/dashboard/affiliate/profile/:id" element={<RequireAuth loginPath='/affiliate/login'><Dashboardaffiliateprofile /></RequireAuth>} />
        <Route path="/dashboard/affiliate/influencerhub" element={<RequireAuth loginPath='/affiliate/login'><Dashboardaffiliateinfluencerhub /></RequireAuth>} />
        <Route path="/dashboard/affiliate/settings/:subsection" element={<RequireAuth loginPath='/affiliate/login'><Dashboardaffiliatesettings /></RequireAuth>} />
      </Routes>
    </div >
  );
}

export default App;
