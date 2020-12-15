import React, { useState, useEffect, useRef } from 'react';
import firebase from "firebase/app";
import storage from "firebase/storage";
import  firebaseConfig from "../dropzone/config";



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

 }else {
    firebase.app(); // if already initialized, use that one
 }

let fb_storage = firebase.storage();
let storageRef = fb_storage.ref();  

let rootRef = storageRef.root;

let folders = [];

   

const PlayListLinks = () =>{

const [folders, setFolders] = useState([]);    

useEffect(() => {
    rootRef.listAll().then(function(res) {
        let temp = [];
        res.prefixes.forEach(function(folderRef) {
            // console.log(folderRef.name)
            temp.push(folderRef.name)
            
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        setFolders(temp);
        res.items.forEach(function(itemRef) {
            // All the items under listRef.
            // console.log(itemRef.name);
        });
        }).catch(function(error) {
        // Uh-oh, an error occurred!
        }); 
},[])
   
console.log(folders);

    return(
        <>
            <ul>
                {folders.map((folder, index) => {
                    return <li key={index}> {folder}</li>
                })}
            </ul>
        </>
    )
}

export default PlayListLinks