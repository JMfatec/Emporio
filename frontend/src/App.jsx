import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import TopBar from './components/ui/TopBar'
import theme from './utils/theme'
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box'
import FooterBar from './components/ui/FooterBar';
import Homepage from './pages/Homepage';
import CssBaseline  from '@mui/material/CssBaseline';
import MesasList from './pages/MesasList';
import CardForm from './pages/CardForm';
import './App.css'
//import Cozinha from './pages/Cozinha';
import Login from './pages/Login'
import Logout from './components/ui/Logout';
import EmpList from './pages/EmpList'
import EmpForm from './pages/EmpForm'
import PedidoList from './pages/PedidoList'
import PedidoForm from './pages/PedidoForm'


//import './App.css'

function App() {
  
  return (
    <>
     <BrowserRouter>
     <ThemeProvider theme={theme}>
      <CssBaseline />
       <Box sx={{ 
        width: '100vw' , 
        minheight: '100vh', 
        backgroundColor: 'background.default'
      }}>
       <TopBar />
       <Box sx={{
          margin: '25px 25px 55px 25px',
          //backgroundColor: 'blue'
       }}>
          
          <Routes>
             <Route path='/' element={ <Homepage /> } />   
             <Route path="/login" element={ <Login /> } /> 
             <Route path="/logout" element={ <Logout /> } />  
             <Route path="/emp" element={ <EmpList /> } />
             <Route path="/emp/new" element={ <EmpForm /> } />
             <Route path="/emp/:id" element={ <EmpForm /> } />          
             <Route path='/mesas' element={ <MesasList /> } />
             <Route path='/pedido' element={ <PedidoList /> } />
             <Route path="/pedido/new" element={ <PedidoForm /> } />
             <Route path="/pedido/:id" element={ <PedidoForm /> } /> 
             <Route path='/card' element={ <CardForm /> } />
          </Routes>

       </Box>
       <FooterBar />
       </Box>
     </ThemeProvider>
     </BrowserRouter>
    </>
  )
}

export default App
