import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (idProduto, nomeProduto, valorMin, valorMax, tipo) => {
    let sql = 'SELECT * FROM produto';
    const conditions = [];
    const values = [];

    if (idProduto) {
        conditions.push('idProduto = ?');
        values.push(idProduto);
    }

    if (nomeProduto) {
        conditions.push('LOWER(nomeProduto) LIKE ?');
        values.push(`%${nomeProduto.toLowerCase()}%`);
    }

    if (valorMin) {
        conditions.push('valor >= ?');
        values.push(valorMin);
    }

    if (valorMax) {
        conditions.push('valor <= ?');
        values.push(valorMax);''
    }

    if (tipo) {
        conditions.push('LOWER(tipo) LIKE ?');
        values.push(`%${tipo.toLowerCase()}%`);
    }
};

export const create = async (produtoData) => {
    await db.query('INSERT INTO produto SET ?', produtoData);
    return produtoData;
}

export const update = async (idProduto, produtoData) => {
    const [result] = await db.query('UPDATE produto SET ? WHERE idProduto = ?', [produtoData, idProduto]);
    return result.affectedRows > 0;
    
}

export const remove = async (idProduto) => {
  const [result] = await db.query('DELETE FROM produto WHERE idProduto = ?', [idProduto]);
  return result.affectedRows > 0;
};