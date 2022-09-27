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
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);
const bike = new Product({
  name: 'Mountain Bike',
  price: 999,
  color: 'red',
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
