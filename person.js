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

const Person = mongoose.model('Person', personSchema);
