import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Rooting from './Rooting';
import AuthLayout from './components/Auth/AuthLayout';
import Login from './components/Auth/Login';
import Navbar from './components/Personal/Navbar';
import PersonalMain from './components/Personal/PersonalMain';
import { useAppDispatch } from './features/hooks';
import { passIsAuth } from './features/Slice/UserSlice';
import { checkAuth } from './controllers/helperFunction';
import Record from './components/Personal/Record';
import Ranking from './components/Personal/Ranking';
import Setting from './components/Personal/Setting';

function App() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const initialize = async () => {
  //     const result = await checkAuth();
  //     if (result) {
  //       dispatch(passIsAuth());
  //     }
  //   };
  //   initialize();
  // });

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
