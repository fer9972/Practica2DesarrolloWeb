/**
 * Importamos el servicio de postgres, esto nos permitira
 * realizar acciones en la base de datos
 */

const ServicioPg = require("../services/url");
/**
 * Se valida si un registro puede ser guardado en la base de datos
 * @param {*} registro Json del registro
 */

let validarUrl = url => {
  if (!url) {
    throw { ok: false, mensaje: "la información del registro es obligatoria" };
  }else if (!url.nombre) {
    throw { ok: false, mensaje: "el nombre es obligatorio" };
  }else if (!url.url) {
    throw { ok: false, mensaje: "la url es obligatoria" };
  }
};
/**
 * Se inserta el registro en la base de datos
 * El metodo debe ser async, aqui el orden de ejecución es importante,
 * si no tuvieramos esto la respuesta del metodo seria undefined
 * @param {*} registro Json del registro
 */

let guardarUrl = async (url) => {
  let _servicio = new ServicioPg();
  let consultaSql = `INSERT INTO public.url(url,
        nombre, descripcion) VALUES (
            '${url.url}',
            '${url.nombre}',
            '${url.descripcion}');`;
  let respuesta = await _servicio.ejecutarSql(consultaSql);
  return respuesta;
};
/**
 * Se consultan todos los registros de la base de datos para mostrarlos
 */

let consultarUrl = async (url) => {
  let _servicio = new ServicioPg();
  let consultaSql = `SELECT (url,nombre,descripcion) FROM public.url where nombre like '%${url.nombre}%'`;
  let respuesta = await _servicio.ejecutarSql(consultaSql);
  return respuesta;
};
/**
 * Se exportan los metodos para poder usarse desde otros archivos,
 * se exportan usando destructuración para hacerlo mas facil
 */
module.exports = { validarUrl, guardarUrl,consultarUrl };