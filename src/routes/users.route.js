'use strict';
const express = require('express');
const getUsersRouter=express.Router();
const {Users}=require('../models/index.model');
const bearer = require('../middleware/bearer');
const acl = require('../middleware/acl');


getUsersRouter.get('/users', bearer ,async(req,res,next)=>{
    const userRecords = await Users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  
});

getUsersRouter.delete('/users/:id', bearer, acl('delete'), async (req, res, next) => {
    const id = req.params.id;
    let theRecord = await Users.destroy({ where: { id:id }})
    res.status(200).json("Deleted successfully ");
  });

  getUsersRouter.put('/users/:id', bearer, acl('update'), async (req, res, next) => {
    const id = req.params.id;
    const obj = req.body;
    let theRecord = await Users.findOne({ where: { id:id }})
    let updated = await theRecord.update(obj);
    res.status(200).json(updated);
  });




module.exports= getUsersRouter;