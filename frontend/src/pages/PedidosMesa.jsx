import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { PrismaClient } from '@prisma/client'; 


const prisma = new PrismaClient();

export default function PedidosMesa({ mesaId }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function fetchPedidos() {
      const pedidosData = await prisma.pedido.findMany({
        where: { mesaId: mesaId },
      });
      setPedidos(pedidosData);
    }

    fetchPedidos();

    return () => {
      prisma.$disconnect();
    };
  }, [mesaId]);

  return (
    <div>
      <Typography variant="h5">Pedidos da Mesa</Typography>
      <Paper elevation={3} style={{ padding: '10px', marginTop: '10px' }}>
        {pedidos.map((pedido) => (
          <div key={pedido.id}>
            <Typography variant="subtitle1">
              Produto: {pedido.produtoNome}, Quantidade: {pedido.quantidade}, Valor: {pedido.valor}
            </Typography>
          </div>
        ))}
      </Paper>
    </div>
  );
}
