import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Rooting from './Rooting';
import AuthLayout from './components/Auth/AuthLayout';
import Login from './components/Auth/Login';
import Navbar from './components/Personal/Navbar';
import PersonalMain from './components/Personal/PersonalMain';
import Record from './components/Personal/Record';
import Ranking from './components/Personal/Ranking';
import Setting from './components/Personal/Setting';
import Game from './components/Game/Game';
import SettingTop from './components/Game/Setting/SettingTop';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rooting />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            {/* <Route path="/auth/signup" element={<Signup />} /> */}
          </Route>
          <Route path="/personal" element={<Navbar />}>
            <Route path="/personal/main" element={<PersonalMain />} />
            <Route path="/personal/record" element={<Record />} />
            <Route path="/personal/ranking" element={<Ranking />} />
            <Route path="/personal/setting" element={<Setting />} />
          </Route>
          <Route path="/game" element={<Game />}>
            <Route path="/game/setting" element={<SettingTop />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
