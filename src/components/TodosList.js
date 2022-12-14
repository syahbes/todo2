import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase"

const TodosList = ({ items, userId }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value, taskId) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      //console.log("set item : " + taskId + "to True")
      updateDoc(doc(db, userId,taskId), { checked: true });

    } else {
      newChecked.splice(currentIndex, 1);
      //console.log("set item : " + taskId + "to False")
      updateDoc(doc(db, userId,taskId), { checked: false });
    }
    setChecked(newChecked);
  };

  const handleDel = async (id) => {
    //console.log("del :" + id + "userId: " + userId);
    await deleteDoc(doc(db, userId, id));
  }

  
  useEffect(() => {
    const iniChk = []
    items.forEach((item,i) => { 
      if (item.checked) { iniChk.push(i) }
     })
     setChecked(iniChk)
  }, [items])
  
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 420, bgcolor: "background.paper", borderRadius: "15px", boxShadow: "3" }}>
        
        {
        items.map((item, value) => {
          const labelId = `checkbox-list-label-${value}`;
          // if (item.checked) { 
          //   //console.log("item is checked: " + value); 
          //   iniChk.push(value); 
          //          }
          return (
            <ListItem
              key={value}
              secondaryAction={
                
                <IconButton edge="end" aria-label="delete" onClick={() => handleDel(item.id) }>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value, item.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
//                <ListItemText id={labelId} primary={item.taskText} />
                <ListItemText id={labelId} primary={item.taskText} sx={{ textDecoration: (checked.indexOf(value) !== -1) ? "line-through" : "none" , textDecorationColor: "#a404b2", textDecorationThickness: "0.2rem"}} />

              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default TodosList;
