import app from './app';
import db from './models';

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
