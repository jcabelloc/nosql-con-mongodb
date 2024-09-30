const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;


class Usuario {
  constructor(nombre, email, carrito, id) {
    this.nombre = nombre;
    this.email = email;
    this.carrito = carrito; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('usuarios').insertOne(this);
  }
  
  agregarAlCarrito(producto) {
    if (!this.carrito) {
      this.carrito = {items: []};
    }
    const indiceEnCarrito = this.carrito.items.findIndex(cp => {
      return cp.idProducto.toString() === producto._id.toString();
    });
    let nuevaCantidad = 1;
    const itemsActualizados = [...this.carrito.items];

    if (indiceEnCarrito >= 0) {
      nuevaCantidad = this.carrito.items[indiceEnCarrito].cantidad + 1;
      itemsActualizados[indiceEnCarrito].cantidad = nuevaCantidad;
    } else {
      itemsActualizados.push({
        idProducto: producto._id,
        cantidad: nuevaCantidad
      });
    }
    const carritoActualizado = {
      items: itemsActualizados
    };
    const db = getDb();
    return db
      .collection('usuarios')
      .updateOne(
        { _id: this._id},
        { $set: { carrito: carritoActualizado } }
      );
  }

  getCarrito() {
    const db = getDb();
    const idsProductos = this.carrito.items.map(i => {
      return i.idProducto;
    });
    return db
      .collection('productos')
      .find({ _id: { $in: idsProductos } })
      .toArray()
      .then(productos => {
        return productos.map(p => {
          return {
            ...p,
            cantidad: this.carrito.items.find(i => {
              return i.idProducto.toString() === p._id.toString();
            }).cantidad
          };
        });
      });
  }


  deleteItemDelCarrito(idProducto) {
    const itemsActualizados = this.carrito.items.filter(item => {
      return item.idProducto.toString() !== idProducto.toString();
    });
    const db = getDb();
    return db
      .collection('usuarios')
      .updateOne(
        { _id: this._id},
        { $set: { carrito: {items: itemsActualizados} } }
      );
  }

  static findById(idUsuario) {
    const db = getDb();
    return db
      .collection('usuarios')
      .findOne({ _id: mongodb.ObjectId.createFromHexString(idUsuario) })
      .then(usuario => {
        console.log(usuario);
        return usuario;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Usuario;