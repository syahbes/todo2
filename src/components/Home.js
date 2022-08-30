import { Box, Button, TextField, 
  //Typography
 } from "@mui/material";
import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TodosList from "./TodosList";

const Home = ({ userId }) => {
  //of list items

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //of modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskText, setTaskText] = useState("");
  const [todos, setTodos] = useState([]);

  //get data subscribe to changes
  useEffect(() => {
    const q = query(collection(db, userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, [userId]);
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskText) {
      try {
        await addDoc(collection(db, userId), {
          taskText: taskText,
          checked: false,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    handleClose();
    setTaskText("");
  };
  return (
    <Box>
      {todos.length > 0 ? <TodosList items={todos} userId={userId} /> : "Add a new task"}

      {/* <p> the data: </p>
      <Typography sx={{ textDecoration: "line-through" }}>
        Finished task
      </Typography>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.taskText}</li>
        ))}
      </ul> */}

      <Fab
        onClick={handleOpen}
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: "30%" },
          right: { xs: "calc(50% - 26px)", md: "50%" },
        }}
      >
        <AddIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleAddTask}
        >
          <TextField
            id="add-task"
            label="Add new task"
            variant="standard"
            fullWidth
            autoFocus 
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          ></TextField>
          <Button
            variant="contained"
            sx={{ marginTop: "15px" }}
            type="submit"
            onClick={handleAddTask}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
