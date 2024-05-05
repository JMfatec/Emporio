import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../assets/montain-logo-600px.jpeg'
import MainMenu from './MainMenu'

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar variant="dense">
          <MainMenu />

          <img
            src={logo}
            alt="logotipo"
            style={{ width: '50px', marginRight: '8px' }}
          />
          <p style={{ margin: 0, fontSize: '1.5rem' }}>ALPESWERE</p>
        </Toolbar>
      </AppBar>
    </Box>
  );
}