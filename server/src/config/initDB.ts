import { sequelize } from './database';

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    await sequelize.sync({ alter: true }); // or force: true
    console.log('✅ Models synced');
  } catch (err) {
    console.error('❌ Sequelize error:', err);
  }
};
