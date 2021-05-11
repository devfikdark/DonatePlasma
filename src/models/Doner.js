import mongoose from 'mongoose';
const DonerSchema = new mongoose.Schema({
  age: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  bloodGroup: {
    type: String,
  },
  area: {
    type: String,
  },
  hospital: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
  },
});

// Query middleware
DonerSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v",
  });
  next();
});

if (!mongoose.models.Doner) {
  mongoose.model('Doner', DonerSchema);
}

export default mongoose.models.Doner;