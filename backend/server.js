const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/task-mean-project', {});

app.use('/api', apiRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
