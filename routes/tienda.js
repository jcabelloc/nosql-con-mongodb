const path = require('path');

const express = require('express');

const tiendaController = require('../controllers/tienda');


const router = express.Router();

// GET requiere una coincidencia exacta en la ruta
router.get('/', tiendaController.getIndex);

router.get('/productos', tiendaController.getProductos);

router.get('/productos/:idProducto', tiendaController.getProducto);


router.get('/carrito', tiendaController.getCarrito);

router.post('/carrito', tiendaController.postCarrito);

router.post('/eliminar-producto-carrito', tiendaController.postEliminarProductoCarrito);


router.get('/pedidos', tiendaController.getPedidos);

router.post('/crear-pedido', tiendaController.postPedido);

router.get('/checkout', tiendaController.getCheckout); 

module.exports = router;