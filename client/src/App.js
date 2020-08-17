import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseLine';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Components
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <>
      <BrowserRouter>
      <CssBaseLine />
      <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
