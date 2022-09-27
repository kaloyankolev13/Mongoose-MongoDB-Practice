const mongoose = require('mongoose');

async function main() {
  mongoose.connect('mongodb://localhost:27017/shopApp');
  console.log('Connected to MongoDB');
}

main().catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

const Product = mongoose.model('Product', productSchema);
const bike = new Product({
  name: 'Bike Helmet',
  price: 19.5,
  categories: ['Cycling', 'Safety'],
});
bike
  .save()
  .then((data) => {
    console.log('It worked!');
    console.log(data);
  })
  .catch((err) => {
    console.log('Oh no, error!');
    console.log(err);
  });
