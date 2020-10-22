const express=require('express');
const pg=require('pg');
const cors=require('cors');
const pool=require('./db');
const app=express();

app.use(cors());
app.use(express.json());



// ROUTES

//GET
app.get('/',(req,res)=>{
try {
    
} catch (err) {
    console.error(err)
}
})

// POST
app.post('/todos',async (req,res)=>{ //req.body
try{
const {description}=req.body;
const newTodo=await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *',[description]);
res.json(newTodo.rows[0])

}catch(err){
    console.error(err.message)
}
})



app.listen(5000,()=>{
    console.log('App is listening to PORT 5000')
});