import logo from './logo.svg';
import './App.css';
import DropZone from "./dropzone/DropZone";




function App() {
  return (
    <div>
      <p className="title">React Drag and Drop Image Upload</p>
        <div className="content">
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