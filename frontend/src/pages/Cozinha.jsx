import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import MesasLista from '..pages/MesasList'; 

export default function Cozinha() {
  return (
    <div>
      <Typography variant="h1">Tela da Cozinha</Typography>

      {/* Renderize várias instâncias de PedidosMesa para cada mesa */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <PedidosMesa mesaId={1} />
        <PedidosMesa mesaId={2} />
        <PedidosMesa mesaId={3} />
        {/* Adicione mais PedidosMesa conforme necessário */}
      </Box>
    </div>
  );
}

//console.log(mesaId)
//console.log(MesasLista)