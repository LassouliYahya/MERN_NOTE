import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Home from "./components/Home"
import NavbarComponent from "./components/Navbar"
import ReadAllNotes from "./components/ReadAllNotes"
import ReadOneNote from "./components/ReadOneNote"
import CreateNote from "./components/CreateNote"
import UpdateNote from "./components/UpdateNote"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <div className="container-fluid">
          <Switch>  {/* path="/notes/:id" && path="/notes/add" => db yw93 deboguage f link */}
            <Route exact path="/" component={Home} />
            <Route exact path="/notes" component={ReadAllNotes} />
            <Route exact path="/notes/:id" component={ReadOneNote} />
            <Route exact path="/note/add" component={CreateNote} />
            <Route exact path="/note/update/:id" component={UpdateNote} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
