require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
	let person = new Person({
		name: "Elvis",
		age: 90,
		favoriteFoods: ["Pizza", "Burger", "Ice Cream"]
	});
	person.save(function(err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	let arrayOfPeople = [{
		name: "John",
		age: 82,
		favoriteFoods: ["rice", "vegetables"]
	},{
		name: "Paul",
		age: 80,
		favoriteFoods: ["fruits", "caviar"]
	},{
		name: "George",
		age: 79,
		favoriteFoods: ["pasta", "curry"]
	},{
		name: "Ringo",
		age: 81,
		favoriteFoods: ["steak", "omelette"]
	}];
	Model.create(arrayOfPeople);
	done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
