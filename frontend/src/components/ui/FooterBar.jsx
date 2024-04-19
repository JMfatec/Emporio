//import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CoffeeIcon from '@mui/icons-material/Coffee';

export default function FooterBar() {
  return (
    <>
        <Toolbar 
        variant="dense" 
        element="footer"
        sx={{backgroundColor: 'action.disableBackground',
              justifyContent: 'center',
              position: 'fixed',
              bottom: 0,
              width: '100vw',
              '& a': {
                color: 'secondary.light'
              }
        }}
        >
          <Typography variant="caption" sx={{color: 'text.secondary'}}>
             Desenvolvido com <CoffeeIcon fontSize='small'/> por <a href='mailto:joao.valeriano.silva@gmail.com'>João Marcos</a> e <a href='mailto:pepedro-henrique@hotmail.com'>Pedro Henrique</a>.Todos os direitos reservados.
          </Typography>
        </Toolbar>
    </>
  );
}