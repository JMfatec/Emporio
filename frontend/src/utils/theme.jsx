import { createTheme } from '@mui/material/styles';
import { blueGrey, blue } from '@mui/material/colors';
import { ptBR } from '@mui/x-data-grid';

const theme = createTheme({
  palette: {
    mode: 'light', //por pradão escurece tudo
    primary: {
      main: blueGrey[600],
    },
    secondary: {
      main: blue[500],
    },
  },
  typography: {
    h1: {
      fontSize: '30px',
      fontWeight: 'bold'
    }
  }
}, ptBR);

export default theme