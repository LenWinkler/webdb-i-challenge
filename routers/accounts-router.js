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
          res.status(500).json({ error: "Error getting account info" })
      })
});

router.post('/', (req, res) => {
    knex
      .insert(req.body, 'id')
      .into('accounts')
      .then(ids => {
          res.status(201).json(ids)
      })
      .catch(err => {
          console.log('post error', err);
          res.status(500).json({ error: "Error adding account" })
      })
}),

router.put('/:id', (req, res) => {
    const changes = req.body;

    knex('accounts')
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
          res.status(200).json(count)
      })
      .catch(err => {
          console.log('update error', err);
          res.status(500).json({ error: "Unable to update account" })
      })
})

module.exports = router;