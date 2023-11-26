// import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth/login.css';

const Signup = () => {
  const navigate = useNavigate();
  const changePath = () => {
    navigate('/auth/login');
  };
  return (
    <div className="auth">
      <form className="auth__form">
        <div className="auth__form--content">
          <div className="auth__form--label">
            <label>ユーザー名</label>
          </div>
          <div className="auth__form--input">
            <input type="text" />
          </div>
        </div>
        <div className="auth__form--content">
          <div className="auth__form--label">
            <label>パスワード</label>
          </div>
          <div className="auth__form--input">
            <input type="password" />
          </div>
        </div>
        <div className="auth__form--content">
          <div className="auth__form--label">
            <label>パスワード(確認)</label>
          </div>
          <div className="auth__form--input">
            <input type="password" />
          </div>
        </div>
        <div className="auth__form--btn">
          <button>新規登録</button>
        </div>
        <div className="auth__form--changePath">
          <label onClick={changePath}>ログインはこちら</label>
        </div>
      </form>
    </div>
  );
};

export default Signup;
