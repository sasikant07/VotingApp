import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_URL);

import user from './models/user.js';
import poll from './models/polls.js';

const users = [
    {username: 'username', password: 'password'},
    {username: 'kevin', password: 'password'},
]

const polls = [
    {
        question: 'Which one is the best JavaScript framework ',
        options: ['Angular','React','VueJS']
    },
    {questions: "which is the best mutant", options: ['Wolverine', 'Deadpool']},
    {questions: "Truth or dare", options: ['Truth', 'Dare']},
    {questions: "Boolean?", options: ['True', 'False']},

];

const seed = async () => {
    try {
      await user.User.remove();
      console.log('DROP ALL USERS');
  
      await poll.Poll.remove();
      console.log('DROP ALL POLLS');
  
      await Promise.all(
        users.map(async user => {
          const data = await user.User.create(user);
          await data.save();
        }),
      );
      console.log('CREATED USERS', JSON.stringify(users));
  
      await Promise.all(
        polls.map(async poll => {
          poll.options = poll.options.map(option => ({ option, votes: 0 }));
          const data = await poll.Poll.create(poll);
          const user = await user.User.findOne({ username: 'username' });
          data.user = user;
          user.polls.push(data._id);
          await user.save();
          await data.save();
        }),
      );
      console.log('CREATED POLLS', JSON.stringify(polls));
    } catch (err) {
      console.error(err);
    }
  };
  
  seed();