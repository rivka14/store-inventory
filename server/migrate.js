import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/store-inventory';

const oldInventorySchema = new mongoose.Schema({
  items: [{
    name: String,
    quantity: Number
  }]
});

const OldInventory = mongoose.model('OldInventory', oldInventorySchema, 'inventories');

const newInventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true,
  versionKey: false
});

newInventorySchema.index({ productName: 1 }, { unique: true });

const NewInventory = mongoose.model('NewInventory', newInventorySchema, 'inventories_new');

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully');

    console.log('\nStep 1: Reading existing inventory data...');
    const oldDoc = await OldInventory.findOne().lean();

    if (!oldDoc || !oldDoc.items || oldDoc.items.length === 0) {
      console.log('No existing inventory data found. Migration complete.');
      await mongoose.connection.close();
      return;
    }

    console.log(`Found ${oldDoc.items.length} inventory items`);

    console.log('\nStep 2: Preparing new documents...');
    const newDocs = oldDoc.items.map(item => ({
      productName: item.name,
      quantity: item.quantity
    }));
    console.log(`Prepared ${newDocs.length} documents`);

    console.log('\nStep 3: Dropping old collection...');
    await mongoose.connection.db.collection('inventories').drop();
    console.log('Old collection dropped');

    console.log('\nStep 4: Creating new documents...');
    await NewInventory.insertMany(newDocs);
    console.log(`Inserted ${newDocs.length} documents`);

    console.log('\nStep 5: Creating unique index on productName...');
    await mongoose.connection.db.collection('inventories').createIndex(
      { productName: 1 },
      { unique: true }
    );
    console.log('Index created successfully');

    console.log('\nMigration completed successfully!');
    console.log('\nVerification:');
    const count = await mongoose.connection.db.collection('inventories').countDocuments();
    console.log(`Total documents in new collection: ${count}`);

  } catch (error) {
    console.error('\nMigration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

migrate();
