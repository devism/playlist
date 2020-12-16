import logo from './logo.svg';
import './App.css';
import DropZone from "./dropzone/DropZone";
import PlayListLinks from "./playlistLinks/PlaylistLinks";




function App() {
  return (
    <div>
        <div className="content">
          {/* <PlayListLinks/> */}
          <DropZone/>
        </div>
    </div>
  );
}

export default App;

/*-===============

https://blog.logrocket.com/create-a-drag-and-drop-component-with-react-dropzone/


https://www.twilio.com/blog/react-choose-functional-components


==================*/