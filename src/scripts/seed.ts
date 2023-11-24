import mongoose from 'mongoose';
import { CONFIG } from '../constants/config';
import { User } from '../models';
import { users } from '../constants/seed';

mongoose.connect(CONFIG.MONGODB_URL).then(async () => {
  console.log('Connected to MongoDB');

  for (const userData of users) {
    const user = new User(userData);

    await user.save();
  }

  console.log('Database seed finished');
  await mongoose.disconnect();
});
