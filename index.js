const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || config.get('port');
const mongoURI = config.get('mongoURI');

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));

function startServer() {
  try {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

startServer();
