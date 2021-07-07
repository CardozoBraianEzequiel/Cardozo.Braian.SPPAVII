const cocinerosRouter = require('express').Router();
const Cocinero = require('../models/Cocinero');
const { verifyToken } = require('../utils/middlewares');

cocinerosRouter.use(verifyToken);

cocinerosRouter.get("/", (req, res, next) => 
{
    Cocinero.find({}).then(cocineros => {
            res.json(cocineros);
    })
    
    .catch (error => {

        next(error);
    })

});


cocinerosRouter.get("/:id", (req, res, next) => 
{
    const id = req.params.id;
    Cocinero.findById(id).then(cocinero => {
        if (cocinero){
            res.json(cocinero);
        }
        res.status(404).end();
    })
    .catch( error => {
        next(error);
    })
});

cocinerosRouter.delete("/:id", (req, res, next) => 
{
    const id = req.params.id;
    Cocinero.findByIdAndRemove(id)    
    .then(result => {

        if (result){
            res.status(204).end();
        }
        res.status(404).end();
    })
    .catch( error => {
        next(error);
    })
});

cocinerosRouter.post("/", (req, res, next) => {
    console.log("aca llega");
    const {nombre, edad, especialidad, favorito, cantidadDeCapitulos} = req.body;
        const nuevoCocinero = new Cocinero({
            nombre,
            edad,
            especialidad,
            favorito,
            cantidadDeCapitulos
        });

        nuevoCocinero.save()
        .then(cocinero => res.json(cocinero))
        .catch( (error) => {
            next (error);
        })

});

cocinerosRouter.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const { nombre, especialidad, edad, favorito, cantidadDeCapitulos } = req.body;

    if (!nombre || !edad || !especialidad || !favorito || !cantidadDeCapitulos) res.status(400).send({ error: "ERROR: Faltan campos del cocinero." }).end();

    const infoCocinero = { nombre, especialidad, edad, favorito, cantidadDeCapitulos }; 

    Cocinero.findByIdAndUpdate( 
            id, 
            infoCocinero, 
            { new:true })
            .then(cocinero => {

        if (nombre)
        {
            infoCocinero.nombre = nombre;
        }

        if (especialidad)
        {
            infoCocinero.especialidad = especialidad;
        }

        if (edad)
        {
            infoCocinero.edad = edad;
        }

        if (favorito)
        {
            infoCocinero.favorito = favorito;
        }
        if (cantidadDeCapitulos)
        {
            infoCocinero.cantidadDeCapitulos = cantidadDeCapitulos;
        }
        
        res.json(cocinero);
       
        res.status(400).end();
    })

    .catch( error => {

        next (error);
    }) 

});

module.exports = cocinerosRouter;