import mongoose from 'mongoose';
const NotificationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  area: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  doner: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});


if (!mongoose.models.Notification) {
  mongoose.model('Notification', NotificationSchema);
}

export default mongoose.models.Notification;
