const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    //if(req.body.isLogin === true) console.log('you are login');
    res.send('Thank you');
});

module.exports = router;