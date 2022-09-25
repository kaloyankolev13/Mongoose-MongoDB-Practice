const mongoose = require('mongoose');

async function main() {
  mongoose.connect('mongodb://localhost:27017/MovieApp');
  console.log('Connected to MongoDB');
}

main().catch((err) => console.log(err));
