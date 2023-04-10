const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/users', userRoutes);


app.use(express.static(path.join(process.cwd(), 'public')));
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'booking.html'));
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
