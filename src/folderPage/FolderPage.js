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


const FolderPage = () => {
    let {folder} = useParams();
    return (
        <>
            <div>hello {folder}</div>
        </>
    )
}

export default FolderPage