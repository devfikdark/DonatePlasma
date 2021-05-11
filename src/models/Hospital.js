import mongoose from 'mongoose';
const HospitalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  website: {
    type: String,
  },
  documents: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  isCancel: {
    type: Boolean,
    default: false,
  },
  donerList: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Doner',
    }
  ],
  createAt: {
    type: Date,
  },
});

// Query middleware
HospitalSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v",
  });
  next();
});

if (!mongoose.models.Hospital) {
  mongoose.model('Hospital', HospitalSchema);
}

export default mongoose.models.Hospital;