import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Chats from './ui/components/chat/Chats';
import Header from './ui/components/home/header/Header';
import { ChatContainer } from './ui/containers/chat/ChatContainer';
import { HomeContainer } from './ui/containers/home/HomeContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route path='/chat/:person'>
            <Header backButton='/chat' />
            <ChatContainer />
          </Route>

          <Route path='/chat'>
            <Header backButton='/' />
            <Chats />
          </Route>

          <Route path='/'>
            <HomeContainer />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
