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

let arrayOfPeople = [
	{name: "John", age: 82, favoriteFoods: ["rice", "vegetables"]},
	{name: "Paul", age: 80, favoriteFoods: ["fruits", "caviar"]},
	{name: "George", age: 79, favoriteFoods: ["pasta", "curry"]},
	{name: "Ringo", age: 81, favoriteFoods: ["steak", "omelette"]}];

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function(err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({favoriteFoods: food}, function(err, data) {
		if (err) return console.error(err);
		done(null, data);
	}); 
};

const findPersonById = (personId, done) => {
	Person.findById({_id: personId}, function(err, data) {
		if (err) return console.error(err);
		done(null, data);
	}); 
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
	Person.findById(personId, function(err, data) {
    if(err) return console.log(err); 
    data.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    data.save((err, updatedData) => {
      if(err) return console.log(err);
      done(null, updatedData)
    })
  })	
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
//findOneAndUpdate uses ( conditions , update , options , callback ) as arguments.
//In Mongoosejs, findOneAndUpdate returns the new document if the new property is set to true.
	Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new:true}, function(err, data){
  	if(err) return console.log(err); 
  	done(null , data);
	});
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId}, function(err, data){
  	if(err) return console.log(err);
		done(null, data);
	});
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
	Person.remove({name:nameToRemove}, function(err, data){
		if(err) return console.log(err);
  	done(null, data);
	});
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
	Person.find({favoriteFoods:foodToSearch})
				.sort(name)
				.limit(2)
				.select({name: 1,age:0,favoriteFoods:1})
				.exec(function(err, data){
		if(err) return console.log(err);
  	done(null, data);
	});
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
