import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom';

import { MainPage } from './pages/MainPage';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home">
          <MainPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
