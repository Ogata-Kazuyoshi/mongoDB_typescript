import mongoose from 'mongoose';

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userShema);
//UserがMONGODBのテーブル名になる --> 「users」
//上記をTempとするとテーブル名が変わり新しいテーブルとして保存される --> 「temps」
