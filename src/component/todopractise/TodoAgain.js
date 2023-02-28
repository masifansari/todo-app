import React, { useEffect, useState } from "react";

const getLocalData=()=>{
    const lists=localStorage.getItem("mytodo");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const TodoAgain = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItems, setIsEditItems] = useState('')
  const [toggleButton, setToggleButton] = useState(false)

  const addItem = () => {
    if (!inputData) {
      alert("Plz fill tha data");
    } else if(inputData && toggleButton){
        setItems(
            items.map((curElem)=>{
                if(curElem.id===isEditItems){
                    return {...curElem,name:inputData}
                }
                return curElem;
            })
        )
        setInputData([])
        setIsEditItems(null)
        setToggleButton(false)

    }
     else {
      const newData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newData]);
      setInputData("");
    }
  };

const editItem=(index)=>{
    const editedItem=items.find((curElem)=>{
        return curElem.id===index;
    })
    setInputData(editedItem.name);
    setIsEditItems(index);
    setToggleButton(true);
}


  const deleteItem=(id)=>{
      const updatedItems=items.filter((curElem)=>{
          return curElem.id!==id;
      })
      setItems(updatedItems);
  }

  const removeAll=()=>{
      setItems([])
  }

  useEffect(() => {
      localStorage.setItem("mytodo", JSON.stringify(items))
    
  }, [items])
  
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Add item"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {
            toggleButton ? (<button type="submit" onClick={addItem}>
          Edit
        </button>):(<button type="submit" onClick={addItem}>
          Add
        </button>)
        }
        
      </div>
      <div>
        {items.map((curElem) => {
          return (
            <div key={curElem.id}>
              {curElem.name}
              <button onClick={()=>editItem(curElem.id)}>Edit</button>
              <button onClick={()=>deleteItem(curElem.id)}>Delete</button>
            </div>
          );
        })}
      </div>
      <div>
          <button onClick={removeAll}>Remove All</button>
      </div>
    </>
  );
};

export default TodoAgain;
