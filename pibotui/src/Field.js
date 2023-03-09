import{ useRef, useState, useEffect } from "react";
import './field.css';
import {Tabulator} from 'tabulator-tables'


function openNav(){
    document.getElementById("sidebar").style.width = "150px";
    document.getElementById("container").style.marginLeft = "150px";
    document.getElementById("header").style.marginLeft = "150px";
}

function closeNav(){
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("container").style.marginLeft = "0";
    document.getElementById("header").style.marginLeft = "0";
}

const Field = () => {

var tabledata=[
    {id:1, name:"Nasal Cannula", size:"Adult", stock:1, reqStock:4},
    {id:2, name:"Nasal Cannula", size:"Pedi", stock:3, reqStock:4},
    {id:3, name:"Bandaids", size:4, stock:7, reqStock:12},
    {id:4, name:"Whole-Blood", size:"O-", stock:3, reqStock:9},
];
var table = new Tabulator("#example-table", {
    data:tabledata,
    autocolumns:true,
    columns:[
        {title:"Item", field:"item", width:150},
        {title:"Size", field:"size", width:50},
        {title:"Stock", field:"stock", width:50},
        {title:"reqStock", field:"reqStock", width:50},
    ],
})

return(
    <div>
        <div id="example-table"></div>
    <div id="header" class="header">
        <button class="button-1" onclick="openNav()">SB</button>
        <div class="button-2"></div>
        <div class="button-3"></div>
        <div class="button-4"></div>
    </div>
    <div id="sidebar" class="sidebar">
        <button class="sidebarButton" onclick="closeNav()">X</button>
        <a href="#">Placeholder</a>
    </div>
        
    <div id="container" class="container">
        
    </div>
    </div>
)


}



export default Field;