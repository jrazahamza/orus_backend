const express = require('express');
const router = express.Router();
const UserData = require('../models/userDataModels');


router.post('/users', async(req, res)=>{
    try{
        const user = new UserData(req.body);
        await UserData.save();
        res.status(201).json({Message:'Data successfully inserted'});
    } catch(error){
        res.status(400).sen({error: err.message})
    }
});

router.put('users/:id', async(req, res)=>{
    try{
        const user = await UserData.findByIdAndUpdate(req.params.id, req.body,{new: true});
        if(!user){
            return res.status(400).send({message:'user not found'})
        }
        res.status(200).send({message:'user Updated'})
    } catch(error){
        res.status(400).send({error: err.message})
    }
})

module.exports = router;