import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
//import MesasList from './pages/MesasList'



export default function Cozinha({ mesas }) {
  return (
    <>
      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cozinha
      </Typography>

      <hr />

      {/* Lista de mesas e pedidos */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {mesas.map((mesa, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: 'white', // Cor de fundo para a mesa
              width: 'calc(20% - 15px)', // 20% width com margem
              boxSizing: 'border-box',
              textAlign: 'center', // Centraliza o texto
            }}
          >
            <Typography variant="h6">Mesa {index + 1}</Typography>

            {/* Lista de pedidos */}
            <ul>
              {mesa.pedidos.map((pedido, pedidoIndex) => (
                <li key={pedidoIndex}>
                  {pedido.produto}: {pedido.quantidade}x
                </li>
              ))}
            </ul>

            {/* Botão para marcar pedido como entregue */}
            <IconButton aria-label="Remover" onClick={() => marcarPedidoEntregue(index)}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Paper>
        ))}
      </Box>
    </>
  );
  
}


