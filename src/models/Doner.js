import mongoose from 'mongoose';
const DonerSchema = new mongoose.Schema({
  age: {
    type: Number,
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
    default: true,
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