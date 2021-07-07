import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {




  return (
    <div>

          <Router>
              <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route path="*" component={Error404}/>           
            </Switch>
          </Router>
  
    </div>
  );
}

export default App;
