import React, { useState, useEffect, useRef } from 'react';
import firebase from "firebase/app";
import storage from "firebase/storage";
import  firebaseConfig from "../dropzone/config";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    BrowserRouter,
    useParams
  } from "react-router-dom";
import { isElement } from 'react-dom/test-utils';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

}else {
    firebase.app(); // if already initialized, use that one
}

  // router is getting the current path name


const FolderPage = () => {

    let {folder} = useParams();

    let fb_storage = firebase.storage();
    let storageRef = fb_storage.ref();  
    
    let rootRef = storageRef.child(folder);

    
    
    
    // console.log(rootRef);

    const [files, setFiles] = useState([]); 
    const [urls, setUrls] = useState([]);
    const [audioInfo, setAudioInfo] = useState([]);    


    // Find all the prefixes and items.
   

        
    const fileNames =  () =>{
        let temp = [];
        rootRef.listAll().then( function(res) {
            
            let promises = res.items.map(item => item.getDownloadURL());

            Promise.all(promises).then((downloadURLs)=>{
                        
                    // console.log(downloadURLs)
                    // console.log(res.items)
                    // setFiles(res.items)
                    // setUrls(downloadURLs)
                    // setAudioInfo([
                    //     {
                    //         filename:res.items, 
                    //         url: downloadURLs 
                    //     }  
                    // ])


                    const files = []
                    res.items.map((item, i)=>{
                      files.push({url: downloadURLs[i], file: item.name })     
                    })
                    setAudioInfo(files)                    


                })
            //  console.log('dsds' + files[0]['name'])
            }).catch(function(error) {
            // Uh-oh, an error occurred!
        });
            
    
    }

    useEffect(()=>{
        fileNames();
    },[])


    console.log(audioInfo)
    

    return (
        <>
            <div>hello {folder}</div>
          

            <div>

                {/* {files.map((file, index) => {
                    console.log(file.name)
                    return <div key={index}> {file.name}</div>
                })} */}

                {/* {urls.map((url, index) => {

                   return(
                        <div>  
                            <audio controls key={index} src={url}> {url} </audio>
                        </div>
                   ) 
                })} */}

                {/* {audioInfo.map((item, index) => {
                    // console.log(i)
                   return ( <div key={index}>

                        
                            <div>{item.filename[0].name}</div>
                            
                            {

                            item.url.map((u,i)=>(
                               <div key={i}>
                                
                                <audio controls src={u}> </audio>
                               </div>
                            ))
                            }

                           
                    </div> )
                    })} */}

                    {audioInfo.map((item, index) => {                   
                        return ( <div key={index}>                           
                            <span>{item.file}</span>   
                            <audio controls src={item.url}> </audio>                                                        
                            </div> )
                        })}                      
                
            </div>

        </>
    )
}

export default FolderPage