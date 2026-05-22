const mongoose = require('./config/mockMongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Seed Admin
    const adminExists = await User.findOne({ email: 'admin@careone.com' });
    if (!adminExists) {
      await User.create({
        name: 'CareOne Admin',
        email: 'admin@careone.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@careone.com');
      console.log('Password: adminpassword123');
    } else {
      console.log('Admin user already exists with email: admin@careone.com');
      adminExists.password = 'adminpassword123';
      await adminExists.save();
      console.log('Admin password reset to: adminpassword123');
    }

    // Seed Patient
    const patientExists = await User.findOne({ email: 'patient@careone.com' });
    if (!patientExists) {
      await User.create({
        name: 'John Doe',
        email: 'patient@careone.com',
        password: 'patientpassword123',
        role: 'patient',
        phone: '123-456-7890'
      });
      console.log('✅ Test patient user created successfully!');
      console.log('Email: patient@careone.com');
      console.log('Password: patientpassword123');
    } else {
      console.log('Patient user already exists with email: patient@careone.com');
      patientExists.password = 'patientpassword123';
      await patientExists.save();
      console.log('Patient password reset to: patientpassword123');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAdmin();
