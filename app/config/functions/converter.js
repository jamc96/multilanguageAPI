'use strict';

const showdown = require('showdown');
const converter = new showdown.Converter();

module.exports = (text) => {
    return converter.makeHtml(text);
};