import authApi from '../api/auth';

export const checkAuth = async () => {
  try {
    const res = await authApi.checkAuth();
    console.log('res : ', res);
    if (res.data.authenticated) {
      console.log('cookieあるよ！');
      return res.data.user;
    } else {
      console.log('cookieないよ!!');
      return false;
    }
  } catch (err) {
    console.log(`Error : ${err}`);
  }
};
