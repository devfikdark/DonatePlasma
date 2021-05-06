import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});
if (!mongoose.models.User) {
  mongoose.model('User', UserSchema);
}

export default mongoose.models.User;