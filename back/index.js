const express = require('express')
const cors = require('cors')

const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, './.env') })

// setup express

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });


// routers 
app.use('/user', require('./routers/user'))
app.use('/admin', require('./routers/admin'))
