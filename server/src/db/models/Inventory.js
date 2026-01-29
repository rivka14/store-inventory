import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

export const Inventory = mongoose.model('Inventory', inventorySchema);
