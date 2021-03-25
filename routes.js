"use strict";

// require the Express module
const express = require("express");
const axios = require("axios");
try {
  require('dotenv').config();
} catch (e) {
  console.log('dotenv not installed. This is expected');
}
// Creates an new router object
const router = express.Router();

const baseUrl = "https://ridb.recreation.gov/api/v1";
const apiKey = process.env.KEY


router.get("/facilities-by-state", (req, res) => {
  let state = req.query.state;
  let url = `${baseUrl}/facilities`;
  return axios.get(url, {
    params: {
      limit: '20',
      state: state,
      apikey: apiKey
    }
  }).then((data) => {
    res.json(data.data);
  });
})

router.get("/campsites-by-facility-id/:id", (req, res) => {
  let id = req.params.id;
  let url = `${baseUrl}/facilities/${id}/campsites`;
  return axios.get(url, {
    params: {
      apikey: apiKey
    }
  }).then((data) => {
    res.json(data.data);
  });
})

router.get("/campsite-by-campsite-id/:id", (req, res) => {
  let id = req.params.id;
  let url = `${baseUrl}/campsites/${id}`;
  return axios.get(url, {
    params: {
      apikey: apiKey
    }
  }).then((data) => {
    res.json(data.data);
  });
})

// export routes for use in server.js
module.exports = router;