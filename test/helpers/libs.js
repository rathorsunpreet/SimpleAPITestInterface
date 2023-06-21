const request = require('supertest')('https://reqres.in');
const { expect } = require('chai');
const colors = require('ansi-colors');

module.exports = {
  request,
  expect,
  colors,
};
