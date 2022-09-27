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
    min: [0, 'Price must be positive ya dumbo!'],
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
  size: {
    type: String,
    enum: ['S', 'M', 'L'],
  },
});

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model('Product', productSchema);

const findProdict = async () => {
  const foundProduct = await Product.findOne({ name: 'Bike Helmet' });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory('Outdoors');
  console.log(foundProduct);
};

Product.fireSale().then((res) => console.log(res));

findProdict();

// const bike = new Product({
//   name: 'Tire Pump',
//   price: 15.99,
//   categories: ['Cycling'],
// });
// bike
//   .save()
//   .then((data) => {
//     console.log('It worked!');
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Oh no, error!');
//     console.log(err);
//   });

// Product.findOneAndUpdate(
//   { name: 'Tire Pump' },
//   { price: -19.99 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log('It worked!');
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Oh no, error!');
//     console.log(err);
//   });
