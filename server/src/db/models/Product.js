import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    unique: true,
    trim: true,
    minlength: [1, 'Product name cannot be empty'],
    maxlength: [100, 'Product name cannot exceed 100 characters']
  }
}, {
  timestamps: true,
  versionKey: false
});

productSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Product with this name already exists'));
  } else {
    next(error);
  }
});

productSchema.post('updateOne', function(passRawResult, error, res, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('Product with this name already exists'));
  } else {
    next(error);
  }
});

export const Product = mongoose.model('Product', productSchema);
