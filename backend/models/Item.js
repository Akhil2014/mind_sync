import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Item', itemSchema);