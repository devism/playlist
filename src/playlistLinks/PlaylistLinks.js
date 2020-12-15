import React, { useState, useEffect, useRef } from 'react';
import firebase from "firebase/app";
import storage from "firebase/storage";
import  firebaseConfig from "../dropzone/config";

// get list of directories that were made from the input field
// eventually will have to be per account 

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

 }else {
    firebase.app(); // if already initialized, use that one
 }

let fb_storage = firebase.storage();
let storageRef = fb_storage.ref();  

let rootRef = storageRef.root;
// console.log(rootRef.fullPath);
// console.log(rootRef.listAll());

rootRef.listAll().then(function(res) {
    res.prefixes.forEach(function(folderRef) {
       console.log(folderRef.name)
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach(function(itemRef) {
      // All the items under listRef.
      console.log(itemRef);
    });
  }).catch(function(error) {
    // Uh-oh, an error occurred!
  });


const PlayListLinks = () =>{
    return(
        <>
            <p>https://play.list/oxvac</p>
        </>
    )
}

export default PlayListLinks