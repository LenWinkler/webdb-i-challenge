const express = require('express');

const knex = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    knex
      .select('*')
      .from('accounts')
      .then(accounts => {
          res.status(200).json(accounts)
      })
      .catch(err => {
          console.log('get accounts error', err);
          res.status(500).json({ error: "Error getting accounts" })
      })
});

router.get('/:id', (req, res) => {
    knex
      .select('*')
      .from('accounts')
      .where('id', '=', req.params.id)
      .first()
      .then(account => {
          res.status(200).json(account)
      })
      .catch(err => {
          console.log('get account error', err)
      })
});

module.exports = router;