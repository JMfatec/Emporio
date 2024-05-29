import prisma from '../database/client.js'

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {
    const { mesa, quantidade, produtoNome, selling_price, selling_date, ready, emp_id } = req.body
    
    await prisma.pedido.create({
      data: {
        mesa: parseInt(mesa), // Convertendo mesa para inteiro
        quantidade: parseInt(quantidade), // Convertendo quantidade para inteiro
        produtoNome,
        selling_price,
        selling_date: new Date(selling_date), // Convertendo a data para o formato Date
        ready,
        emp_id: emp_id ? parseInt(emp_id) : null // Convertendo emp_id para inteiro se existir
      }
    })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    let include = {}    // Por padrão, não inclui nenhum relacionamento

    // Somente vai incluir entidades relacionadas se
    // a querystring "related" for passada na URL
    if(req.query.related) include.emp = true

    const result = await prisma.pedido.findMany({
      include,
      orderBy: [
        { mesa: 'asc' },
        { produtoNome: 'asc' }
      ]
    })

    // HTTP 200: OK
    res.send(result)
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.pedido.findUnique({
      where: { id: Number(req.params.id) }
    })

    // Encontrou: retorna HTTP 200: OK
    if(result) res.send(result)
    // Não encontrou: retorna HTTP 404: Not found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.update = async function(req, res) {
  try {
    const { mesa, quantidade, produtoNome, selling_price, selling_date, ready, emp_id } = req.body
    
    const result = await prisma.pedido.update({
      where: { id: Number(req.params.id) },
      data: {
        mesa: parseInt(mesa), // Convertendo mesa para inteiro
        quantidade: parseInt(quantidade), // Convertendo quantidade para inteiro
        produtoNome,
        selling_price,
        selling_date: new Date(selling_date), // Convertendo a data para o formato Date
        ready,
        emp_id: emp_id ? parseInt(emp_id) : null // Convertendo emp_id para inteiro se existir
      }
    })

    // HTTP 204: No content
    if(result) res.status(204).end()
    // HTTP 404: Not found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    const result = await prisma.pedido.delete({
      where: { id: Number(req.params.id) }
    })
    
    // HTTP 204: No Content
    if(result) res.status(204).end()
    // HTTP 404: Not Found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    // HTTP 500: Internal Server Error
    res.status(500).send(error)
  }
}

export default controller
