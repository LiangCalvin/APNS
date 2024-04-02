const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let todos = [];

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
  });

//Homepage
app.get('/', (req, res) => {
    res.send("Hello Homepage!");
});

//Read all
app.get('/todos', (req, res) => {
    try {
        res.status(200).json(todos);
      } catch (error) {
        console.error("Error fetching todo:", error);
        res.status(500).json({ message: "Internal server error" });
      }});

//Read by Id
app.get("/todos/:id", (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = todos.find(todo => todo.id == todoId);
        if (todo) {
        res.status(200).json(todo);
        } else {
        res.status(404).json({ message: "Todo not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
    });
      
//Create
app.post('/todos/add', (req, res) => {
    try {
    const todo = req.body;
    todo.id = todos.length + 1;
    todos.push(todo);
    res.status(201).json({
        message: "Todo created successfully",
        todo: todo,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    };
});

//Update
app.put('/todos/update/:id', (req, res) => {
    try {
        const id = req.params.id;
        const updatedTodo = req.body;
        const index = todos.findIndex(todo => todo.id == id);
        if (index !== -1) {
            todos[index] = updatedTodo;
            res.send('Todo updated successfully.');
        } else {
            res.status(404).send('Todo not found.');
        }
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Delete
app.delete('/todos/delete/:id', (req, res) => {
    try {
        const id = req.params.id;
        const index = todos.findIndex(todo => todo.id == id);
        if (index !== -1) {
            todos.splice(index, 1);
            res.send('Todo deleted successfully.');
        } else {
            res.status(404).send('Todo not found.');
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
