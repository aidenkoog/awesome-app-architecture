import './App.css';
import Home from './presentation/home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from './presentation/search/SearchPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>

          {/* search route. */}
          <Route path="/search">
            <SearchPage />
          </Route>

          {/* home-search-result route. */}
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
