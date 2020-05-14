const app = require('./app');
const config = require('./config');

app.listen(3000, () => {
  console.log(`App is running on http://localhost:${config.port}`);
});