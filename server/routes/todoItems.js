const router = require('express').Router();
const todoItemsModel = require('../models/todoItems')

//add todo item
router.post('/api/item', async (req, res) => {
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        //Save in database
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    }
    catch(err){
        res.json(err);
    }
})

//get todo items
router.get('/api/items', async (req, res) => {
    try{
        const todoItems = await todoItemsModel.find({});
        res.status(200).json(todoItems);
    }
    catch(err){
        res.json(err);
    }
})

//update todo item
router.put('/api/item/:id', async (req, res) => {
    try{
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json("Item updated successfully!")
    }
    catch(err){
        res.json(err);
    }
})

//delete todo item
router.delete('/api/item/:id', async (req, res) => {
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Item deleted successfully!')
    }
    catch(err){
        res.json(err);
    }
})

//export router module
module.exports = router;

