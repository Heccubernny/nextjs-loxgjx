const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
const URI = process.env.MONGODB_URI;

mongoose.connect(URI);

const db = require('./server/models');

const users = [
  { username: 'Johnweak', email: 'johnweak@gmail.com', password: 'admin1' },
  { username: 'Johnweek', email: 'johnweek@gmail.com', password: 'admin1' },
];

const choices = [
  { question: 'Johnweak do you kill?', options: ['Yes', 'No', 'Maybe'] },
  { question: 'Johnweek do you use weapon?', options: ['Yes', 'No', 'Maybe'] },
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log('Drop All Users');

    await db.Choice.remove();
    console.log('Remove Choice option');

    await Promise.all(
      users.map(async (user) => {
        const data = await db.User.create(user);
        await data.save();
      })
    );

    console.log('Users created: ', JSON.stringify(users));

    await Promise.all(
      choices
        .map(async (choice) => {
          // the fake data choice
          choice.options = choice.options.map((option) => ({
            option,
            selected: 0,
          }));

          const data = await db.Choice.create(choice);
          const user = await db.User.findOne({ username: 'username' });
          data.user = user;
          user.choices.push(data._id);
          await user.save();
          await data.save();
        })
        .then(console.log('Saving'))
    );
    console.log('Created User Choice', JSON.stringify(choices));
  } catch (err) {
    console.error(err);
  }
};

seed();
