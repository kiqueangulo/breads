const React = require('react');
const Default = require('./layouts/Default');

function Show ({bread}) {
    return (
      <Default>
        <h3>{bread.name}</h3>
        <p>
            and it 
            {
                bread.hasGluten
                ? <span> has </span>
                : <span> does NOT have </span>
            }
            gluten.
        </p>
        <img src={bread.image} alt={bread.name} />
        <li><a href="/breads">Go Home</a></li>
      </Default>
    )
};

module.exports = Show;