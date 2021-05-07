import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});

UserSchema.methods.hashPassword = async function(password) {
  return await bcrypt.hash(password, 12);
};

UserSchema.methods.verifyPassword = async function(
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

if (!mongoose.models.User) {
  mongoose.model('User', UserSchema);
}

export default mongoose.models.User;
