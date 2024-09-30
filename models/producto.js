const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

class Producto {
  constructor(nombre, precio, descripcion, urlImagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.urlImagen = urlImagen;
  }

  save() {
    const db = getDb();
    return db
      .collection('productos')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('productos')
      .find()
      .toArray()
      .then(productos => {
        console.log(productos);
        return productos;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(idProducto) {
    const db = getDb();
    return db
      .collection('productos')
      .find({ _id: mongodb.ObjectId.createFromHexString(idProducto)})
      .next()
      .then(producto => {
        console.log(producto);
        return producto;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Producto;

