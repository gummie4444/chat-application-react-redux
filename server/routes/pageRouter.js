import Express from 'express'
import qs from 'qs'
import configureStore from '../../common/store/configureStore'
import React from 'react'

import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import routes from '../../common/routes';

console.log(routes, "rout");
import { createMemoryHistory } from 'history';


//GERA BETUR
const PageRouter = (router) => {

  function handleRender(req, res) {

    const preloadedState = {};

    let history = createMemoryHistory();

    // Create a new Redux store instance
    // const location = history.createLocation({
    //   pathname: req.url
    // })

    //const location = history.createLocation(req.url).pathname;

    match({ history, routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {

      // Grab the initial state from our Redux store
      const store = configureStore(preloadedState)

      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search)
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps == null) {
        res.status(404).send('Not Found');

      } else if (renderProps) {
        // Send the rendered page back to the client
        // Render the component to a string
        const html = renderToString(
          <Provider className = "root" store = { store }> 
            <div>
              <RouterContext {...renderProps}/>
            </div>
        </Provider>
        )
        global.navigator = { userAgent: req.headers['user-agent'] };

        const finalState = store.getState();

        res.send(renderFullPage(html, finalState))
      } else {
        res.status(404).send('Not found');

      }
    });

    //})
  }

  function renderFullPage(html, preloadedState) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Chat application</title>
            <!-- Latest compiled and minified CSS -->
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
            <link rel="stylesheet" href="/css/style.css">
          </head>
          <body>
            <container id="app">${html}</container>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
            </script>
            <script src="/dist/bundle.js"></script>

          </body>
        </html>
        `
  }

  router.get('*', handleRender);
}

export default PageRouter;
