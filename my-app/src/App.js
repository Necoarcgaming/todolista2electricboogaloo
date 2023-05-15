import React, { useState } from 'react';
import './App.css';
import myGif from './burunyuu.gif';

function App() {

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const [showEdit, setShowEdit] = useState(-1);
  const [updatedText, setUpdatedText] = useState("");
  const [checkedItems, setCheckedItems] = useState({});

  //const [newText, setNewText] = useState("");

  function addItem() {

    if (!newItem) {
      alert("Enter an item.")
      return;
    }
    
    const item ={
    id: Math.floor(Math.random() * 1000),
    value: newItem,
    isChecked: false
  };
  console.log("addItem:", item)
  setItems(oldList => [...oldList, item]);
  setNewItem("");
}

  function deleteItem(id) {
    const newArray = items.filter(item => item.id !== id);
    setItems(newArray);
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
  
    const newItems = [...items];
    newItems[index] = updatedItem;
    
    setItems(newItems);
    console.log("newItem:", newItems);
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