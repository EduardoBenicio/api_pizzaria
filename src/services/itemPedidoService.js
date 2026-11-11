import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (idItem, qtdeItens, valorParcial, idProduto, idPedido) => {
    let sql = 'SELECT * FROM itempedido';
    const conditions = [];
    const values = [];

    if (idItem) {
        conditions.push('idItem = ?');
        values.push(idItem);
    }

    if (qtdeItens) {
        conditions.push('qtdeItens = ?');
        values.push(qtdeItens);
    }

    if (valorParcial) {
        conditions.push('valorParcial >= ?');
        values.push(valorParcial);
    }

    if (idProduto) {
        conditions.push('idProduto = ?');
        values.push(idProduto);''
    }

    if (idPedido) {
        conditions.push('idPedido = ?');
        values.push(idPedido);''
    }


  const [rows] = await db.query(sql, values);
  return rows;
};

export const create = async (itemPedidoData) => {
    await db.query('INSERT INTO itempedido SET ?', itemPedidoData);
    return itemPedidoData;
}

export const update = async (idItem, itemPedidoData) => {
    const [result] = await db.query('UPDATE itempedido SET ? WHERE idItem = ?', [itemPedidoData, idItem]);
    return result.affectedRows > 0;
    
}

export const remove = async (idItem) => {
  const [result] = await db.query('DELETE FROM itempedido WHERE idItem = ?', [idItem]);
  return result.affectedRows > 0;
};