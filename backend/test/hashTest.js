const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');

async function run() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri);

  // Load User model after mongoose connect
  const User = require('../model/User');

  try {
    const plain = 'TestPass123!';
    const hashed = await bcrypt.hash(plain, 10);

    const user = new User({ username: 'testuser', email: 'test@example.com', password: hashed });
    await user.save();

    const fromDb = await User.findOne({ username: 'testuser' }).select('+password');

    if (!fromDb) {
      console.error('User not found in DB');
      process.exit(1);
    }

    if (fromDb.password === plain) {
      console.error('Password was stored in plaintext!');
      process.exit(1);
    }

    const match = await bcrypt.compare(plain, fromDb.password);
    if (!match) {
      console.error('Stored hash does not match the plaintext password');
      process.exit(1);
    }

    console.log('Hash verification succeeded: password stored as hash and verifies correctly.');

    // cleanup
    await mongoose.disconnect();
    await mongod.stop();
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    await mongoose.disconnect();
    await mongod.stop();
    process.exit(1);
  }
}

run();
