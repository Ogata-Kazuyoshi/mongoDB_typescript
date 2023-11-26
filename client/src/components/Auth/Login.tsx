import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import '../../styles/Auth/login.css';
import authApi from '../../api/auth';
import { useAppSelector, useAppDispatch } from '../../features/hooks';
import { decrement, increment } from '../../features/Slice/CounterSlice';
import { checkAuth } from '../../controllers/helperFunction';
import { passIsAuth, setUsernameGlobal } from '../../features/Slice/UserSlice';
import { setChoosenVehicle } from '../../features/Slice/SelectVehicleSlice';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from '../../interface/global';

const Login = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const navigate = useNavigate();

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('loginのここ通るのよ！');
    const initialize = async () => {
      console.log('ここは通るの！！！');
      const result: UserInfo | false = await checkAuth();
      console.log('result : ', result);
      if (result) {
        const user: string = result.username;
        console.log('result : ', result);
        dispatch(setUsernameGlobal(user));
        if (result.vehicle) {
          dispatch(setChoosenVehicle(result.vehicle));
        }
        navigate('/personal/main');
      }
    };
    initialize();
  }, []);

  const changePath = () => {
    setIsLogin(!isLogin);
  };
  const userChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const confirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      if (username === '' || password === '') {
        window.alert(`ユーザー名とパスワードを入力してください`);
        return;
      }
      try {
        const res = await authApi.login({ username, password });
        console.log('res : ', res);
        if (res.data.message) {
          console.log('認証OK');
          dispatch(passIsAuth());
          const result: UserInfo | false = await checkAuth();
          if (result) {
            const user: string = result.username;
            console.log('result : ', result);
            dispatch(setUsernameGlobal(user));
            if (result.vehicle) {
              dispatch(setChoosenVehicle(result.vehicle));
            }
            navigate('/personal/main');
          }
        }
      } catch (err) {
        window.alert(`ユーザー名またはPWに誤りがあります。`);
      }
    } else {
      if (username === '' || password === '' || confirmPassword === '') {
        window.alert(
          `ユーザー名とパスワードと確認パスワードを入力してください`
        );
        return;
      }
      if (password !== confirmPassword) {
        window.alert(`パスワードと確認パスワードが一致しません`);
        return;
      }
      try {
        const res = await authApi.signup({ username, password });
        if (res.data.message) {
          console.log('サインUP完了！');
          dispatch(passIsAuth());
          const result: UserInfo | false = await checkAuth();
          if (result) {
            const user: string = result.username;
            console.log('result : ', result);
            dispatch(setUsernameGlobal(user));
            navigate('/personal/main');
          }
        }
      } catch (err) {
        window.alert(`すでに存在しているユーザー名です。`);
      }
    }
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__form--content">
          <div className="auth__form--label">
            <label>ユーザー名</label>
          </div>
          <div className="auth__form--input">
            <input type="text" value={username} onChange={userChange} />
          </div>
        </div>
        <div className="auth__form--content">
          <div className="auth__form--label">
            <label>パスワード</label>
          </div>
          <div className="auth__form--input">
            <input type="password" value={password} onChange={passwordChange} />
          </div>
        </div>
        <div
          className="auth__form--content"
          style={{ visibility: isLogin ? 'hidden' : 'visible' }}
        >
          <div className="auth__form--label">
            <label>パスワード(確認)</label>
          </div>
          <div className="auth__form--input">
            <input
              type="password"
              value={confirmPassword}
              onChange={confirmPasswordChange}
            />
          </div>
        </div>
        <div className="auth__form--btn">
          <button>{isLogin ? 'ログイン' : '新規登録'}</button>
        </div>
        <div className="auth__form--changePath">
          <label onClick={changePath}>
            {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
          </label>
        </div>
      </form>
      <br />
      <br />
      <button onClick={() => dispatch(increment())}>+</button>
      <label htmlFor="">count : {count} </label>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};

export default Login;
