const express = require('express');

const router = express.Router();

// Import the model (burger.js) to use its database functions
const burger = require('../models/burger.js');

// Create routes and set up logic if necessary
router.get('/', function(req, res) {
  burger.selectAll(function(data) {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    // render response to index.handlebars file
    res.render('index', hbsObject);
  });
});

router.post('/api/burgers', function(req, res) {
  burger.insertOne([
    'burger_name', 'devoured',
  ], [
    req.body.burger_name, req.body.devoured,
  ], function(result) {
    res.json({ id: result.insertId }); // ??????
  });
});

router.put('/api/burgers/:id', function(req, res) {
  const condition = `id = ${req.params.id}`;

  console.log(condition);

  burger.updateOne({
    devoured: 1,
  }, condition, function(result) {
    if (result.changedRows > 0) {
      return res.status(200).end();
    } else {
      return res.status(404).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
