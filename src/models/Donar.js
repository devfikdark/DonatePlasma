import mongoose from 'mongoose';
const DonarSchema = new mongoose.Schema({
  age: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  dispatchDate: {
    type: Date,
  },
  bloodGroup: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});
if (!mongoose.models.Donar) {
  mongoose.model('Donar', DonarSchema);
}

export default mongoose.models.Donar;