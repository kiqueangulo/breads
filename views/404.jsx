const React = require('react');
const Default = require('./layouts/Default');

function notFound() {
    return (
        <Default>
            <h1>We don't have that information</h1>
            <p>You can go back <a href="/breads">Home</a>.</p>
        </Default>
    )
};

module.exports = notFound;