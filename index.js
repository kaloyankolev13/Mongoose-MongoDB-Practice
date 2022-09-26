const mongoose = require('mongoose');

async function main() {
  mongoose.connect('mongodb://localhost:27017/movieApp');
  console.log('Connected to MongoDB');
}

main().catch((err) => console.log(err));

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model('Movie', movieSchema);
const amadeus = new Movie({
  title: 'Amadeus',
  year: 1986,
  score: 9.2,
  rating: 'R',
});
