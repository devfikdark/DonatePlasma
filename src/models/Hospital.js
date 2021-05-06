import mongoose from 'mongoose';
const HospitalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  website: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});
if (!mongoose.models.Hospital) {
  mongoose.model('Hospital', HospitalSchema);
}

export default mongoose.models.Hospital;