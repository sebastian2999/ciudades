const {Router} = require('express');
const router = Router();
const db = require('../db.js');

var temperatura; // se pueden declarar variables globales para ser usadas en el get y en el post

router.get('/prueba', (req,res) =>{

    res.send("Sirve");
    
});

router.post('/add', (req,res) => {

    var {fecha,hora,sensacion,humedad,temperatura,radiacion,nodo} = req.body;

    let uv_id = getUVI(radiacion);

    var sql = "INSERT INTO datos VALUES ?";
    var values = [
      [0, nodo, temperatura, humedad, sensacion, radiacion, uv_id , hora , fecha]
    ];

    db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });

    res.send("OK");

});

router.get('/show', async (req,res) =>{


    var datos;
    var sql = "SELECT d.*, r.uvi AS 'indice', r.coloruvi AS 'color', r.descuvi AS 'descripcion' FROM datos d ";
    sql = sql + "INNER JOIN radiacion r ON r.id = d.id_uv";
    db.query(sql , function (err, result) {
        if (err) throw err;

        datos = result;
        console.log(datos);
        res.send(datos);
    });


});

async function getdatos(){



}

//FUNCION GET UVI
function getUVI(radiacion){
    let id = 0;

    if(radiacion >= 0 && radiacion <= 199){
        id = 1;
    }
    if(radiacion >= 200 && radiacion <= 499){
        id = 2;
    }
    if(radiacion >= 500 && radiacion <= 699){
        id = 3;
    }
    if(radiacion >= 700 && radiacion <= 999){
        id = 4;
    }
    if(radiacion >= 1000 && radiacion <= 1500){
        id = 5;
    }

    let salida = id;

    return salida;

}

module.exports = router