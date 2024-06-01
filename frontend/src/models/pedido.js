import { z } from 'zod'

const maxSellingDate = new Date();  // Hoje

const Pedido = z.object({
    produtoNome: 
        z.string()
        .min(1, { message: 'Preencha este campo' })
        .max(30, { message: 'Número de caracteres excedido' }),
    
    ready: 
        z.boolean(),
    
    selling_date: 
        z.coerce.date()
        .max(maxSellingDate, { message: 'A data de venda não pode ser posterior à data de hoje'})
        .nullable(),
    
    selling_price: 
        z.coerce.number()
        .min(10, { message: 'O preço do pedido deve ser de pelo menos 10 R$' })
        .nullable(),
    
    emp_id: 
        z.coerce.number()
        .int()
        .positive({ message: 'Selecione "nenhum garçom" ou o nome do garçom que realizou o pedido' })
        .nullable()
    
})

export default Pedido