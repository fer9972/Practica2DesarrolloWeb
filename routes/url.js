//Importamos la libreria express
const express = require("express");
/**
 * Creamos una función de tipo middleware
 * Esta función ya viene por defecto con express
 */

const router = express.Router();
//Se importa el controlador que permite hacer todas las acciones de los registros

const _controlador = require("../controllers/url");
/**
 * Metodo get para la ruta de registros,este se encarga
 * de mostrar el resultado del select en la base de datos
 */

router.get("/url",async (req, res) => {
  let info_url = await req.body;
  _controlador
    .consultarUrl(info_url)
    .then((respuestaBaseDatos) => {
      let url = respuestaBaseDatos.rows;
      res.send({ ok: true, info: url, mensaje: "Urls consultadas" });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Guardamos la nueva url
 */
router.post("/url", async (req, res) => {
  try {
    //Capturamos el body de la solicitud
    let info_url = await req.body;

    //Valida la información, si hay un error se envia al catch
    _controlador.validarUrl(info_url);

    //Guardamos la url en la base de datos
    _controlador
      .guardarUrl(info_url)
      .then((respuestaBaseDatos) => {
        res.send({ ok: true, mensaje: "Url guardada", info: info_url });
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    res.send(error);
  }
});
// Se exporta el router para poder usarlo 
module.exports = router;