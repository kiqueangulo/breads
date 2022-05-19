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
      <ul>
        {
          // This works when first loads but not when redirect
          // bread.ingredients.map(ingredient => {
          //   return <li>{ingredient}</li>
          // })
        }
      </ul>
      <img src={bread.image} alt={bread.name} />
      <p>Baked by {bread.baker}</p>
      <form action={`/breads/${bread.id}?_method=DELETE`} method='POST'>
        <input type="submit" value='DELETE' />
      </form>
      <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
      <li><a href="/breads">Go Home</a></li>
    </Default>
  )
};

module.exports = Show;