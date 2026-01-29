import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
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
}, { _id: false });

const inventorySchema = new mongoose.Schema({
  items: {
    type: [inventoryItemSchema],
    default: []
  }
}, {
  timestamps: true,
  versionKey: false
});

inventorySchema.index({ 'items.name': 1 });

export const Inventory = mongoose.model('Inventory', inventorySchema);
