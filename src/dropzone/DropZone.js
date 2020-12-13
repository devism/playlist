import React, { useState, useEffect, useRef } from 'react';
import './DropZone.css';
import firebase from "firebase/app";
import storage from "firebase/storage";
import  firebaseConfig from "./config";




firebase.initializeApp(firebaseConfig);

let fb_storage = firebase.storage();
let storageRef = fb_storage.ref();  


const DropZone = () => {

const [validFiles, setValidFiles] = useState([]);    
const [selectedFiles, setSelectedFiles] = useState([]);
const [errorMessage, setErrorMessage] = useState(''); 
const [unsupportedFiles, setUnsupportedFiles] = useState([]);
const fileInputRef = useRef();

useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
        const x = file.find(item => item.name === current.name);
        if (!x) {
            return file.concat([current]);
        } else {
            return file;
        }
    }, []);
    setValidFiles([...filteredArray]);

}, [selectedFiles]);

const dragOver = (e) => {
    e.preventDefault();
    }
      
    const dragEnter = (e) => {
    e.preventDefault();
    }
      
    const dragLeave = (e) => {
    e.preventDefault();
    }
    
    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        console.log(files);
        if (files.length) {
            handleFiles(files);
        }
    }

 
      
    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                // add to an array so we can display the name of file
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                // add a new property called invalid
                files[i]['invalid'] = true;
                // add to the same array so we can display the name of the file
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                // set error message
                setErrorMessage('File type not permitted');

                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }
      
    const validateFile = (file) => {
        const validTypes = ['audio/mpeg', 'audio/wav', 'audio/aiff'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }
    
    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
        // find the index of the item
        // remove the item from array
        const validFileIndex = validFiles.findIndex(e => e.name === name);

        validFiles.splice(validFileIndex, 1);
        // update valid files array
        setValidFiles([...validFiles]);
        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);
        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);

        const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);

        if(unsupportedFileIndex !== -1){
            unsupportedFiles.splice(unsupportedFileIndex, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }

    }

  
   
    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    const uploadModalRef = useRef();
    const uploadRef = useRef();
    const progressRef = useRef();

    const closeUploadModal = () => {
        uploadModalRef.current.style.display = 'none';
    }

    const uploadFiles = () => {
        uploadModalRef.current.style.display = 'block';
        uploadRef.current.innerHTML = 'File(s) Uploading...';

       


        for (let i = 0; i < validFiles.length; i++) {
            
            var audioRef = storageRef.child(validFiles[i]['name']);

            let audioFile = validFiles[i];
            var uploadTask = audioRef.put(audioFile);

            
        }

        uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            document.querySelector('.progress-bar').style.width = progress + '%';
            console.log('Upload is ' + progress + '% done');
            
            }, function(error){
                alert('oops error uploading. try again');
            }, function(){
                // handle successful upload
                document.querySelector('.upload-modal').style.display = 'none';
            }

        )

       
    }


    return (
     <>   
    <div className="container">
        {unsupportedFiles.length === 0 && validFiles.length ? <button className="file-upload-btn" onClick={() => uploadFiles()}>Upload Files</button> : ''} 
{unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}
        <div className="drop-container" 
            onDragOver={dragOver}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDrop={fileDrop}
            onClick={fileInputClicked}
        >
        
        <div className="drop-message">
            <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            multiple
            onChange={filesSelected}
            />

            <div className="upload-icon"></div>
            Drag & Drop files here or click to upload
        </div>            
        </div>
        <div className="file-display-container">
            {
            validFiles.map((data, i) => 
                <div className="file-status-bar" key={i}>
                    <div>
                        <div className="file-type-logo">logo</div>
                        <div className="file-type">{fileType(data.name)}</div>
                        <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                        <span className="file-size">({fileSize(data.size)})</span> {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                    </div>
                    <div className="file-remove" onClick={() => removeFile(data.name)}>X</div>
                </div>
            )
            }
        </div>
        
    </div>

    <div className="upload-modal" ref={uploadModalRef}>
            <div className="overlay"></div>
            <div className="close" onClick={(() => closeUploadModal())}>X</div>
            <div className="progress-container">
            <span ref={uploadRef}></span>
            <div className="progress">
            <div className="progress-bar" ref={progressRef}></div>
            </div>
            </div>
        </div>
    </>
    )
}
export default DropZone;

// https://www.youtube.com/watch?v=8r1Pb6Ja90o