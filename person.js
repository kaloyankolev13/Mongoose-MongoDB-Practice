const mongoose = require('mongoose');

async function main() {
  mongoose.connect('mongodb://localhost:27017/shopApp');
  console.log('Connected to MongoDB');
}

main().catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual('fullName').get(function () {
  return `${this.first} ${this.last}`;
});

personSchema.pre('save', async function () {
  console.log('ABOUT TO SAVE!!!');
});
personSchema.post('save', async function () {
  console.log('just SAVED!!!');
});

const Person = mongoose.model('Person', personSchema);
