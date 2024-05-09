import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import Cozinha from './pages/Cozinha.jsx';

export default function MesasList() {
  const [state, setState] = React.useState({
    numTables: 10,
    tableColors: Array(10).fill('white'),
    selectedTable: null,
    productHistory: Array(10).fill(null).map(() => []),
  });

  const { numTables, tableColors, selectedTable, productHistory } = state;

  function handleAddTable() {
    setState({
      ...state,
      numTables: numTables + 1,
      tableColors: [...tableColors, 'white'],
      productHistory: [...productHistory, []],
    });
  }

  function handleRemoveTable() {
    if (numTables > 1) {
      const newTableColors = [...tableColors];
      const newProductHistory = [...productHistory];
      newTableColors.pop();
      newProductHistory.pop();
      setState({
        ...state,
        numTables: numTables - 1,
        tableColors: newTableColors,
        productHistory: newProductHistory,
      });
    }
  }

  function handleTableClick(index) {
    setState({
      ...state,
      selectedTable: selectedTable === index ? null : index,
    });
  }

  function handleClick(e, index) {
    e.stopPropagation();
    handleTableClick(index);
  }

  const calculateSubtotal = (product) => product.quantity * product.value;

  const calculateTotal = () => {
    const selectedProductHistory = productHistory[selectedTable];
    return selectedProductHistory.reduce(
      (total, product) => total + calculateSubtotal(product),
      0
    );
  };

  function handleAddProduct() {
    const newProductHistory = [...productHistory];
    newProductHistory[selectedTable].push({
      productName: 'Nome',
      quantity: 1,
      value: 0,
    });
    setState({ ...state, productHistory: newProductHistory });
  }

  function handleQuantityChange(productIndex, change) {
    const newProductHistory = [...productHistory];
    newProductHistory[selectedTable][productIndex].quantity += change;
    setState({ ...state, productHistory: newProductHistory });
  }

  function handleRemoveProduct(productIndex) {
    const newProductHistory = [...productHistory];
    newProductHistory[selectedTable].splice(productIndex, 1);
    setState({ ...state, productHistory: newProductHistory });
  }

  function handleProductNameChange(productIndex, newName) {
    const newProductHistory = [...productHistory];
    newProductHistory[selectedTable][productIndex].productName = newName;
    setState({ ...state, productHistory: newProductHistory });
  }

  function handleProductValueChange(productIndex, newValue) {
    const newProductHistory = [...productHistory];
    newProductHistory[selectedTable][productIndex].value = newValue;
    setState({ ...state, productHistory: newProductHistory });
  }
 
  // Verifica se há algum item no histórico da mesa para definir a cor
  const tableColor = (index) =>
    productHistory[index] && productHistory[index].length > 0 ? 'red' : 'white';

  return (
    <>
      <Typography variant="h1" sx={{ mb: '50px' }}>
        Listagem de Mesas
      </Typography>

      {/* Botões para adicionar e remover mesas */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '25px' }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<AddBoxIcon />}
          onClick={handleAddTable}
        >
          Adicionar Mesa
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<DeleteForeverIcon />}
          onClick={handleRemoveTable}
        >
          Remover Mesa
        </Button>
      </Box>

      <hr />

      {/* Boxes com nomes das mesas */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {Array.from({ length: numTables }, (_, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: '10px',
              marginBottom: '10px',
              cursor: 'pointer',
              backgroundColor: tableColor(index), // Utiliza a função para determinar a cor
              width: 'calc(20% - 15px)', // 20% width with margin
              boxSizing: 'border-box',
              textAlign: 'center', // centraliza o texto
            }}
            onClick={(e) => handleClick(e, index)}
          >
            <Typography variant="h6">Mesa {index + 1}</Typography>
          </Paper>
        ))}
      </Box>

      <hr />

      {/* Menu para adicionar produtos */}
      {selectedTable !== null && (
        <div>
          <Typography variant="h5">Histórico de Pedidos</Typography>
          <table style={{ width: '100%', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Nome</th>
                <th style={{ textAlign: 'left' }}>Quantidade</th>
                <th style={{ textAlign: 'left' }}>Valor (R$)</th>
                <th style={{ textAlign: 'left' }}>Subtotal (R$)</th>
                <th style={{ textAlign: 'left' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {productHistory[selectedTable].map((product, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={product.productName}
                      onChange={(e) => handleProductNameChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                    <IconButton
                      aria-label="Remover"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      <RemoveIcon color="error" />
                    </IconButton>
                    {product.quantity}
                    <IconButton
                      aria-label="Adicionar"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      <AddIcon color="success" />
                    </IconButton>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={product.value}
                      onChange={(e) => handleProductValueChange(index, e.target.value)}
                    />
                  </td>
                  <td>{calculateSubtotal(product).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td>
                    <IconButton
                      aria-label="Remover"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <DeleteForeverIcon color="error" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            sx={{ mt: 2, mb: 2 }}
          >
            Adicionar Pedido
          </Button>

          <hr />

          <Typography variant="h6">
            TOTAL: {calculateTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Typography>
        </div>
      )}
    </>
  );
}
