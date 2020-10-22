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
})

// CREATE A TODO
app.post('/todos',async (req,res)=>{ //req.body
try{
const {description}=req.body;
const newTodo=await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *',[description]);
res.json(newTodo.rows[0])

}catch(err){
    console.error(err.message)
}
})


// GET A TODO
app.get('/todos/:id',async (req,res)=>{
try {
    const {id}=req.params;
    const todo=await pool.query('SELECT * FROM todo WHERE todo_id=$1',[id])
    console.log(req.params)
    res.json(todo.rows[0])
} catch (err) {
    console.error(err.message)
}
})


app.listen(5000,()=>{
    console.log('App is listening to PORT 5000')
});