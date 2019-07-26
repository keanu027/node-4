const express = require('express');
const massive = require('massive');
const jwt = require('jsonwebtoken');
const signup = require('../controller/signup.js');
const secret = require('../secret.js');

massive({
    host: 'localhost',
    port: 5432,
    database: 'node4db',
    user: 'postgres',
    password: 'node4db',
}).then(db =>{
    const app = express();

    app.set('db', db);
  
    app.use(express.json());

//create signup & login
app.post('/api/register', signup.create);
app.post('/api/login', signup.login);

app.get('/api/protected/data',function(req, res){
    if (!req.headers.authorization) {
        return res.status(401).end();
      }
     
      try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret); 
        res.status(200).json({ data: 'here is the protected data' });
      } catch (err) {
        console.error(err);
        res.status(401).end();
      }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

});