import logo from './logo.svg';
import './App.css';
import DropZone from "./dropzone/DropZone";
import FolderPage from "./folderPage/FolderPage";
import PlayListLinks from "./playlistLinks/PlaylistLinks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  BrowserRouter
} from "react-router-dom";



function App() {
  return (
    <div>
       <Router>
        <div className="content">
         
            <Switch>
              
              <Route exact path="/">
                <DropZone/>
              </Route>

              <Route path="/user/:folder">
                <FolderPage/>
              </Route>
              
            </Switch>
            {/* <Route excact path="/" component={DropZone}/>
            <Route  path="user/:folder" component={FolderPage}/> */}
          
              {/* <DropZone/> */}
        </div>
        </Router>
    </div>
  );
}

export default App;

/*-===============

https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/


https://www.twilio.com/blog/react-choose-functional-components


==================*/