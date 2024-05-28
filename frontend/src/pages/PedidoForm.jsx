import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import myfetch from '../utils/myfetch'
import Waiting from '../components/ui/Waiting'
import Notification from '../components/ui/Notification'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmDialog from '../components/ui/ConfirmDialog'
//import InputMask from 'react-input-mask'
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import ptLocale from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import { FormControlLabel, Switch } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
//import Pedido from '../models/pedido'
import { ZodError } from 'zod'

export default function PedidoForm() {

  const navigate = useNavigate()
  const params = useParams()

  const pedidoDefaults = {
    mesa: '',
    produtoNome: '',
    quantidade: '',
    selling_price: '',
    selling_date: '',
    read: false,
    emp_id: ''
  }

  const [state, setState] = React.useState({
    pedido: pedidoDefaults, 
    emps: [],   
    showWaiting: false,
    notification: {
      show: false,
      severity: 'success',
      message: ''
    },
    openDialog: false,
    isFormModified: false,
    validationErrors: {}
  })

  const {
    pedido,
    emps,
    showWaiting,
    notification,
    openDialog,
    isFormModified,
    validationErrors
  } = state
  
  


  // useEffect com vetor de dependências vazio. Será executado
  // uma vez, quando o componente for carregado
  React.useEffect(() => {
    // Verifica se existe o parâmetro id na rota.
    // Caso exista, chama a função fetchData() para carregar
    // os dados indicados pelo parâmetro para edição
    fetchData(params.id)
  }, [])

  async function fetchData(isUpdating) {
    // Exibe o backdrop para indicar que uma operação está ocorrendo
    // em segundo plano
    setState({ ...state, showWaiting: true })
    try {

      let pedido = pedidoDefaults

      // Se estivermos no modo de atualização, devemos carregar o
      // registro indicado no parâmetro da rota 
      if(isUpdating) {
        pedido = await myfetch.get(`pedido/${params.id}`)
        pedido.selling_date = parseISO(pedido.selling_date)
      }

      // Busca a listagem de clientes para preencher o componente
      // de escolha
      let emps = await myfetch.get('emp')

      // Cria um cliente "fake" que permite não selecionar nenhum
      // cliente
      emps.unshift({id: null, name: '(Nenhum garçom)'})

      setState({ ...state, showWaiting: false, pedido, emps })

    } 
    catch(error) {
      setState({ ...state, 
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'error',
          message: 'ERRO: ' + error.message
        } 
      }) 
    }
  }

  function handleFieldChange(event) {
    const newPedido = { ...pedido }
    
    if (event.target.name === 'read'){
      newPedido[event.target.name] = event.target.checked
    } else {
      newPedido[event.target.name] = event.target.value
    }

    setState({ 
      ...state, 
      pedido: newPedido,
      isFormModified: true      // O formulário foi alterado
    })
  }

  async function handleFormSubmit(event) {
    setState({ ...state, showWaiting: true }) // Exibe o backdrop
    event.preventDefault(false)   // Evita o recarregamento da página
  
    try {
      console.log({pedido})
      Pedido.parse(pedido)

      let result 
      // se id então put para atualizar
      if(pedido.id) result = await myfetch.put(`pedido/${pedido.id}`, pedido)
      //senão post para criar novo 
      else result = await myfetch.post('pedido', pedido)
      setState({ ...state, 
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'success',
          message: 'Dados salvos com sucesso.',
          validationErrors: {}
        }  
      })  
    }
    catch(error) {

      if(error instanceof ZodError) {
        console.error(error)

        // Preenchendo os estado validationError
        // para exibir os erros para o usuário
        let valErrors = {}
        for(let e of error.issues) valErrors[e.path[0]] = e.message

        setState({
          ...state,
          validationErrors: valErrors,
          showWaiting: false, // Esconde o backdrop
          notification: {
            show: true,
            severity: 'error',
            message: 'ERRO: há campos inválidos no formulário.'
          }
        })
        
      }

      else setState({ ...state, 
        showWaiting: false, // Esconde o backdrop
        notification: {
          show: true,
          severity: 'error',
          message: 'ERRO: ' + error.message,
          validationErrors: {}
        } 
      })  
    }
  }

  function handleNotificationClose() {
    const status = notification.severity
    
    // Fecha a barra de notificação
    setState({...state, notification: { 
      show: false,
      severity: status,
      message: ''
    }})

    // Volta para a página de listagem
    if(status === 'success') navigate('..', { relative: 'path' })
  }

  function handleBackButtonClose(event) {
    // Se o formulário tiver sido modificado, abre a caixa de diálogo
    // para perguntar se quer mesmo voltar, perdendo as alterações
    if(isFormModified) setState({ ...state, openDialog: true })

    // Senão, volta à página de listagem
    else navigate('..', { relative: 'path' })
  }

  function handleDialogClose(answer) {

    // Fechamos a caixa de diálogo
    setState({ ...state, openDialog: false })

    // Se o usuário tiver respondido quer quer voltar à página
    // de listagem mesmo com alterações pendentes, faremos a
    // vontade dele
    if(answer) navigate('..', { relative: 'path' })
  }

  return(
    <>

      <ConfirmDialog
        title="Atenção"
        open={openDialog}
        onClose={handleDialogClose}
      >
        Há alterações que ainda não foram salvas. Deseja realmente voltar?
      </ConfirmDialog>

      <Waiting show={showWaiting} />

      <Notification
        show={notification.show}
        severity={notification.severity}
        message={notification.message}
        onClose={handleNotificationClose}
      /> 

      <Typography variant="h1" sx={{ mb: '50px' }}>
        Cadastro de Pedidos
      </Typography>

      <form onSubmit={handleFormSubmit}>

        <Box className="form-fields">
        
          <TextField 
            id="mesa"
            name="mesa" 
            label="Mesa" 
            variant="filled"
            required
            fullWidth
            value={pedido.mesa}
            onChange={handleFieldChange}
            autoFocus
            error={validationErrors?.mesa}
            helperText={validationErrors?.mesa}
          />

          <TextField 
            id="produtoNome"
            name="produtoNome" 
            label="Produto" 
            variant="filled"
            required
            fullWidth
            placeholder="Ex.: Porção de bacon"
            value={pedido.produtoNome}
            onChange={handleFieldChange}
            error={validationErrors?.produtoNome}
            helperText={validationErrors?.produtoNome}
          />

          <TextField 
            id="quantidade"
            name="quantidade" 
            label="Quantidade" 
            variant="filled"
            required
            fullWidth
            value={pedido.quantidade}
            onChange={handleFieldChange}
            error={validationErrors?.quantidade}
            helperText={validationErrors?.quantidade}
          />

          <FormControlLabel 
            className="MuiFormControl-root"
            sx={{ justifyContent: "start" }}
            onChange={handleFieldChange} 
            control={<Switch defaultChecked />} 
            label="Necessita de preparo" 
            id="read" 
            name="read" 
            labelPlacement="start" 
            checked={pedido.read}
            error={!!validationErrors?.read}
            helperText={validationErrors?.read}
          />

          <TextField 
            id="selling_price"
            name="selling_price" 
            label="Preço de venda" 
            variant="filled"
            fullWidth
            type="number"
            InputProps={{ 
              startAdornment: <InputAdornment position="start">R$</InputAdornment>
            }}         
            value={pedido.selling_price}
            onChange={handleFieldChange}
            error={validationErrors?.selling_price}
            helperText={validationErrors?.selling_price}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
            <DatePicker
              label="Data de venda"
              value={pedido.selling_date}
              onChange={ value => 
                handleFieldChange({ target: { name: 'selling_date', value } }) 
              }
              slotProps={{ textField: { variant: 'filled', fullWidth: true,
              error:validationErrors?.selling_date,
              helperText:validationErrors?.selling_date } }}
            />
          </LocalizationProvider>

          <TextField
            id="emp_id"
            name="emp_id" 
            label="Garçom"
            select
            defaultValue=""
            fullWidth
            variant="filled"
            // helperText="Selecione o garçom"
            value={pedido.emp_id}
            onChange={handleFieldChange}
            error={validationErrors?.emp_id}
            helperText={validationErrors?.emp_id}
          >
            {emps.map(emp => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
              </MenuItem>
            ))}
          </TextField>
          
        </Box>

        <Box sx={{ fontFamily: 'monospace' }}>
          { JSON.stringify(pedido) }
        </Box>

        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Button 
            variant="contained" 
            color="secondary" 
            type="submit"
          >
            Salvar
          </Button>
          
          <Button 
            variant="outlined"
            onClick={handleBackButtonClose}
          >
            Voltar
          </Button>
        </Toolbar>
      
      </form>
    </>

    
  )
}