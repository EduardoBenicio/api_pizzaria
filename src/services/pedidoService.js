
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
  // 1. Separa os itens dos dados do pedido
  const { itens, ...dadosPedido } = pedidoData;

  // 2. Insere o pedido no banco
  const [result] = await db.query(
    'INSERT INTO pedido SET ?',
    dadosPedido
  );

  // 3. Obtém o ID do pedido criado
  const idPedido = result.insertId;

  // 4. Insere os produtos na tabela itempedido
  for (const item of itens) {
    const [produto] = await db.query(
      'SELECT valor FROM produto WHERE idProduto = ?',
      [item.idProduto]
    );

    if (produto.length === 0) {
      throw new Error(`Produto ${item.idProduto} não encontrado.`);
    }

    const valorParcial = produto[0].valor * item.qtdeItens;

    await db.query(
      'INSERT INTO itempedido SET ?',
      {
        qtdeItens: item.qtdeItens,
        valorParcial: valorParcial,
        idProduto: item.idProduto,
        idPedido: idPedido
      }
    );
  }

  return {
    idPedido,
    ...dadosPedido
  };
};


export const update = async (idPedido, pedidoData) => {
  // 1. Separa os itens dos dados do pedido
  const { itens, ...dadosPedido } = pedidoData;

  // 2. Atualiza os dados do pedido
  const [result] = await db.query(
    'UPDATE pedido SET ? WHERE idPedido = ?',
    [dadosPedido, idPedido]
  );

  // 3. Se houver itens, atualiza os produtos do pedido
  if (itens) {
    // Remove os itens antigos
    await db.query(
      'DELETE FROM itempedido WHERE idPedido = ?',
      [idPedido]
    );

    // Insere os novos itens
    let valorTotal = 0;

    for (const item of itens) {
      const [produto] = await db.query(
        'SELECT valor FROM produto WHERE idProduto = ?',
        [item.idProduto]
      );

      if (produto.length === 0) {
        throw new Error(`Produto ${item.idProduto} não encontrado.`);
      }

      const valorParcial = produto[0].valor * item.qtdeItens;
      valorTotal += valorParcial;

      await db.query(
        'INSERT INTO itempedido SET ?',
        {
          qtdeItens: item.qtdeItens,
          valorParcial: valorParcial,
          idProduto: item.idProduto,
          idPedido: idPedido
        }
      );
    }

    // Atualiza o valor total do pedido
    await db.query(
      'UPDATE pedido SET valorTotal = ? WHERE idPedido = ?',
      [valorTotal, idPedido]
    );
  }

  return result.affectedRows > 0;
};


export const remove = async (idPedido) => {
  // 1. Remove os itens relacionados ao pedido
  await db.query(
    'DELETE FROM itempedido WHERE idPedido = ?',
    [idPedido]
  );

  // 2. Remove o pedido
  const [result] = await db.query(
    'DELETE FROM pedido WHERE idPedido = ?',
    [idPedido]
  );

  return result.affectedRows > 0;
};
