import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardForm() {

  const [likes, setLikes] = React.useState({
    like: {}
  })

  // Desestruturando as variáveis de estado
  const {
    like
  } = likes

  return (
    <div style={{ display: 'flex' }}>
      <Card sx={{ maxWidth: 345, margin: '10px' }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/src/assets/foto.png"
          title="Autor"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sobre o Autor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            O autor é um aluno do ensino superior da faculdade de tecnologia Fatec Franca do estado de São Paulo.
            Seu nome é João Marcos Valeriano da Silva
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Like</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345, margin: '10px' }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/src/assets/WhatsApp Image 2023-11-23 at 20.02.58.jpeg"
          title="Autor"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sobre o Autor
          </Typography>
          <Typography variant="body2" color="text.secondary">
            O autor é um aluno do ensino superior da faculdade de tecnologia Fatec Franca do estado de São Paulo.
            Seu nome é Pedro Henrique de Oliveira e ele adora animais.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Like</Button>
        </CardActions>
      </Card>
    </div>
  );
}
