import React, { useState, useEffect } from 'react';
import './App.css';
import myGif from './burunyuu.gif';
import firebase from "firebase/compat/app";
import "firebase/compat/database";


const firebaseConfig = {
  //Your own firebase config
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();


function App() {

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");
  const [checkedItems, setCheckedItems] = useState({});

  //const [newText, setNewText] = useState("");

  useEffect(() => {
    const itemsRef = database.ref("items/");
  
    itemsRef.on("value", (snapshot) => {
      const itemsData = snapshot.val();
      const itemsArray = [];
  
      for (let key in itemsData) {
        itemsArray.push(itemsData[key]);
      }
  
      setItems(itemsArray);
    });
  }, []);

  function addItem() {
    if (!newItem) {
      alert("Enter an item.")
      return;
    }
      
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
      isChecked: false
    };
    
    database.ref("items/" + item.id).set(item);
  
    setNewItem("");
  }
  

function deleteItem(id) {
  database.ref("items/" + id).remove();
}


  function editItem(id, newText, isChecked) {
    const index = items.findIndex((item) => item.id === id);
  
    if (index === -1) {
      return;
    }
  
    const updatedItem = {
      ...items[index],
      value: newText,
      isChecked,
    };
  
    database.ref("items/" + id).update(updatedItem);
  
    setUpdatedText("");
    setShowEdit(-1);
  }
  

  function toggleChecked(id) {
    const newCheckedItems = { ...checkedItems };
    newCheckedItems[id] = !newCheckedItems[id];
    setCheckedItems(newCheckedItems);
  }
  

 return (
  <div className="App">
    <div>
    <img src={myGif} alt="my-gif" className='giffff1' />
    <img src={myGif} alt="my-gif" className='giffff2' />
    <img src={myGif} alt="my-gif" className='giffff3' />
    <img src={myGif} alt="my-gif" className='giffff4' />
    <img src={myGif} alt="my-gif" className='giffff5' />
    <img src={myGif} alt="my-gif" className='giffff6' />
    <img src={myGif} alt="my-gif" className='giffff7' />
    <img src={myGif} alt="my-gif" className='giffff8' />
    <img src={myGif} alt="my-gif" className='giffff9' />
    </div>

  <h1>Todo list</h1>

  <input
    type="text"
    placeholder='Add an item...'
    value={newItem}
    onChange={e => setNewItem(e.target.value)}
  />  

  <button onClick={() => addItem()} className="addbutton">Add</button>

  <ul>
    
    {items.map((item, index) => {
      return(
      <div key={index}> 
        <li style={item.isChecked ? {textDecoration: "line-through", wordWrap: "break-word"} : {wordWrap: "break-word"}}>
        <input
          type="checkbox"
          checked={item.isChecked}
          onChange={(e) => editItem(item.id, item.value, e.target.checked)}
        />
          {item.value}
          
          <button
          onClick={() => setShowEdit(item.id)} className="editbutton">
              🔰
            </button>
          <button
            className="deletebutton"
            onClick={() => deleteItem(item.id)}>
              😂
            </button>
          </li>
          {showEdit === item.id ? (
            <div>
              <input className="updatetextting"
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                />
                <button onClick={() => editItem(item.id, updatedText, item.isChecked)} className="updatebutton">
                  Update
                </button>
            </div>

          ) : null}
        </div>
      );
   })}     
  </ul>
  </div>
 );
}
export default App;
