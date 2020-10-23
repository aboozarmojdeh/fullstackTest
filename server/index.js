const express=require('express');
const pg=require('pg');
const cors=require('cors');
const pool=require('./db');
const app=express();

app.use(cors());
app.use(express.json());



// ROUTES

//GET ALL TODOS
app.get('/todos',async (req,res)=>{
try {
    const allTodos=await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows)
} catch (err) {
    console.error(err)
}
});

// CREATE A TODO
app.post('/todos',async (req,res)=>{ //need req.body
try{
const {first_name,last_name,password,description}=req.body;
const newTodo=await pool.query('INSERT INTO todo (first_name,last_name,password,description) VALUES($1,$2,$3,$4) RETURNING *',[first_name,last_name,password,description]);
res.json(newTodo.rows[0])

}catch(err){
    console.error(err.message)
}
});


// GET A TODO
app.get('/todos/:id',async (req,res)=>{ // need req.params
try {
    const {id}=req.params;
    const todo=await pool.query('SELECT * FROM todo WHERE todo_id=$1',[id])
    // console.log(req.params)
    res.json(todo.rows[0])
} catch (err) {
    console.error(err.message)
}
});

// UPDATE A TODO
app.put('/todos/:id',async (req,res)=>{ // need req.params and req.body
try {
    const {id}=req.params;
    const {first_name,last_name,password,description}=req.body;
    const updatedDate=new Date();
    const updateTodo=await pool.query("UPDATE todo SET first_name=$1,last_name=$2,password=$3,description=$4, updated_at=$5 WHERE todo_id=$6 RETURNING *",[first_name,last_name,password,description,updatedDate,id]);
    res.json(updateTodo.rows[0]);
} catch (err) {
    console.error(err.message)
}
});

// DELETE A TODO

app.delete('/todos/:id',async (req,res)=>{ // need req.params 
try {
    const {id}=req.params;
    const deleteTodo=await pool.query('DELETE FROM todo WHERE todo_id=$1',[id]);
    res.json('Deleted')
} catch (err) {
    console.error(err.message)
}
});





app.listen(5000,()=>{
    console.log('App is listening to PORT 5000')
});