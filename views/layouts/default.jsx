const React = require('react');

function Defualt(html) {
    return (
        <html>
            <head>
                <title>{html.title || 'Default'}</title>
            </head>
            <body>
                <h1>HTML Rendered!</h1>
                <div className="container">
                    {html.children}
                </div>
            </body>
        </html>
    )
};

module.exports = Defualt;