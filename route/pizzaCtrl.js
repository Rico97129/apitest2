var models = require('../models');
var asyncLib = require ('async');


module.exports = {
    addPizza : (req,res) => {
        var Ingredients = req.body.Ingredients;
        var Prix = req.body.Prix;
        var Nom = req.body.Nom;

        asyncLib.waterfall([
            (done) =>{
                models.Pizza.findOne({
                    attributes:['Nom'], 
                    where: { Nom:Nom }
                })
                .then((pizzaFound) => {
                    done(null , pizzaFound);
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({'error': 'unable to verify pizza'
        });

                });
            },
            (pizzaFound,done) =>{
                if(!pizzaFound) {
                    done(null,pizzaFound);
                } else {
                    return res.status(409).json({'error': 'pizza already exists' });
            }
        },
        (pizzaFound, done)=>{
            var newPizza = models.Pizza.create({
                Nom : Nom,
                Ingredients : Ingredients,
                Prix: Prix,
            })
            .then((newPizza)=> {
                done(newPizza);
            })
            .catch((err)=> {
                console.log(err,'iciiiiiii')
                return res.status(500).json({'err':'cannot add Pizza'});
            });
        }
        ],(newPizza) => {
            if (newPizza){
                return res.status(201).json({
                    'id' :newPizza.id,
                    'message' : 'Pizza Successfully created',
                });
                } else {
                    console.log(err , 'laaaaaaaaaa')
                    return res.status(500).json({'error':'cannot add Pizza'});
        }
     });
    },

 updatePizza: function(req, res) {
  
    var Ingredients = req.body.Ingredients;
    var Prix = req.body.Prix;
    var Nom = req.body.Nom;

    asyncLib.waterfall([
      (done) => {
        models.Pizza.findOne({
          attributes: ['id','Nom', 'Ingredients','Prix'],
          where: { id: req.query.id }
        }).then((PizzaFound) => {
          done(null,  PizzaFound);
        })
        .catch((err) => {
          return res.status(500).json({ 'error': 'unable to verify Pizza' });
        });
      },
      (PizzaFound, done) => {
        if(PizzaFound) {
            PizzaFound.update({
            Nom: (Nom ? Nom: PizzaFound.Nom),
            Ingredients: (Ingredients ? Ingredients: PizzaFound.Ingredients),
            Prix: (Prix ? Prix: PizzaFound.Prix)
          }).then(() => {
            done( PizzaFound);
          }).catch((err) => {
            res.status(500).json({ 'error': 'cannot update Pizza' });
          });
        } else {
          res.status(404).json({ 'error': 'Pizza not found' });
        }
      },
    ],( PizzaFound) => {
      if ( PizzaFound) {
        return res.status(201).json(PizzaFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update Pizza 2' });
      }
    });
  },
  getAllPizza: (req, res) => {
  

        
    models.Pizza.findAll({
        attributes: ['Nom', 'Ingredients','Prix'],
      
    }).then(( getAllPizza) => {
        if ( getAllPizza) {
          res.status(201).json( getAllPizza);
        } else {
          res.status(404).json({ 'error':'pizzas not found' });
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).json({'error': 'cannot fetch Pizzas' });
    });
},
getPizza: (req, res) => {

  models.Pizza.findOne({
    attributes: ['Nom', 'Ingredients','Prix'],
    where :{ id: req.query.id}
  }).then((Pizza) => {
      if (Pizza) {
        res.status(201).json(Pizza);
      } else {
        res.status(404).json({ 'error': 'pizza not found' });
      }
  }).catch((err) => {
      console.log(err)
      res.status(500).json({ 'error': 'cannot fetch pizza' });
  });
},
deletePizza: (req, res) => {

 asyncLib.waterfall([
    (done) => {
    models.Pizza.findOne({
     where : {id: req.query.id} })
    
     .then((PizzaFound) => {
     done(null, PizzaFound);
     })
     .catch(function(err) {
    return res.status(500).json({ 'error' : 'unable to verify Pizza'});
    });
    },
 (PizzaFound, done) => {
    if(PizzaFound){
    PizzaFound.destroy({
 })
.then((PizzaFound) => {
done(null, PizzaFound);
 })
.catch((err) => {
 console.log(err)
return res.status(500).json({ 'error' : 'unable to destroy Pizza'});
  });
} else {
 res.status(404).json({ 'error' : 'Pizza not found'});
 }
}
],
(PizzaFound) => {
if(!PizzaFound){
return res.status(200).json({ 'message' : 'Pizza successfully deleted'});
 } else {
return res.status(500).json({ 'error' : 'cannot delete Pizza'});
 }
 });
}

}
