
import db from '../db/db.js';

export const findAll = async (idPedido, cpf, statusPedido) => {
  // 1. Define a consulta SQL base
  let sql = 'SELECT * FROM pedido';

  // 2. Cria os arrays para as condições e valores
  const conditions = [];
  const values = [];

  // 3. Adiciona os filtros dinamicamente
  if (idPedido) {
    conditions.push('idPedido = ?');
    values.push(idPedido);
  }

  if (cpf) {
    conditions.push('cpf = ?');
    values.push(cpf);
  }

  if (statusPedido) {
    conditions.push('statusPedido = ?');
    values.push(statusPedido);
  }

  // 4. Se houver condições, adiciona o WHERE
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // 5. Executa a consulta
  const [rows] = await db.query(sql, values);

  return rows;
};

export const create = async (pedidoData) => {
    await db.query('INSERT INTO pedido SET ?', pedidoData);
    return pedidoData;
}

export const update = async (idPedido, pedidoData) => {
    const [result] = await db.query('UPDATE pedido SET ? WHERE idPedido = ?', [pedidoData, idPedido]);
    return result.affectedRows > 0;
    
}

export const remove = async (idPedido) => {
  const [result] = await db.query('DELETE FROM pedido WHERE idPedido = ?', [idPedido]);
  return result.affectedRows > 0;
};