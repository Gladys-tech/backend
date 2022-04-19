import express from "express";
import { query } from "express";
const router = express.Router();
import {ItemModel} from '../models/schemas/item.js';
import UserModel from '../models/schemas/RegistrationSchema.js';
import auth from '../utilities/auth.js';

// router.get('/',(req, res) =>{
//     res.json({mess:"hi"})
    

// });

// router.get('/',(req, res)=>{
//     ItemModel.find()
//   //.sort({date:-1})
//   .then(items => res.json(items));
//   // .catch({err} => {
//   //   res.status(500).json({
//   //     message:`server error $ {err}`})
//   // });
//   });

  router.get('/',(req, res)=>{
    ItemModel.find()
  .sort({date:-1})
  .then(items => res.json(items));
  });

  router.post('/',(req,res)=>{
    const newItem = new ItemModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
    });
    newItem
    .save()
    .then(item => res.json(item))
   .catch(err=> res.status(404).json({ Success:false}));
     });


     //posting using params

     router.post('/name:name/description:description/price:price',(req, res) =>{
      const newItem = new ItemModel({
        name: req.params.name,
        description:req.params.description,
        price: req.params.price,
      });
      newItem
      .save()
      .then(item => res.json(item))
     .catch(err=> res.status(404).json({ Success:false}));
     })


     //using query

     router.post('/item', (req,res)=>{
      const newItem = new ItemModel({
          name: req.query.name,
          description:req.query.description,
          price: req.query.price,
      });
      newItem
      .save()
      .then(item => res.json(item))
     .catch(err=> res.status(404).json({ Success:false}));
       });


      //  router.put("/:id", (req, res) => {
      //   const id = req.params.id;
      //   ItemModel.findOne({_id: id })
      //    .then(itemId =>{
      //      if (!itemId) {
      //     return res.status(404).json(`no such id ${id}`);
      //   }})
  
      //   ItemModel.updateOne({ _id: id }, {
      //     name: req.body.name,
      //     description:req.body.description,
      //     price:req.body.price,
      //     })
      //     .then((itemId) => {
      //       if (!itemId) {
      //         return res.status(404).json(`no such id ${id}`);
      //       }
      //     })
      //   .then(() => {
      //    ItemModel.findOne({_id: id })
      //    .then(result =>{res.status(200).json(result)})
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     res.status(500).json({
      //       error: err,
      //       message:`Id is wrong`
      //     });
      //   });
      // });


      router.delete('/:id',(req,res)=>{
        ItemModel.findById(req.params.id)
         .then(item =>item.remove()
         .then(()=> res.json({Success:true})))
         .catch(err=> res.status(404).json({ Success:false}));
          });
          

export default router     