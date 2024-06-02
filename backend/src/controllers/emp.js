import prisma from '../database/client.js'
import Emp from '../models/emp.js'
import { ZodError } from 'zod'

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {

    // Chama a validação do Zod
    Emp.parse(req.body)

    await prisma.emp.create({ data: req.body })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {

    console.error(error)

    // Erro de validação do Zod
    // Retorna HTTP 422: Unprocessable Entity
    if(error instanceof ZodError) res.status(422).send(error.issues)
    
    // HTTP 500: Internal Server Error
    else res.status(500).send(error)
  }
}

controller.retrieveAll = async function(req, res) {
  try{

    let include = {}  // Por padrão, não inclui nenhum relacionamento

    // Somente vai incluir entidades relacionadas se
    // a querystring "related" for passada na URL
    if(req.query.related) include.pedido = true

    const result = await prisma.emp.findMany({
      include,
      orderBy: [
        { name: 'asc' }
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
    const result = await prisma.emp.findUnique({
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

    Emp.parse(req.body)

    const result = await prisma.emp.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })

    // HTTP 204: No content
    if(result) res.status(204).end()
    // HTTP 404: Not found
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)

    // Erro de validação do Zod
    // Retorna HTTP 422: Unprocessable Entity
    if(error instanceof ZodError) res.status(422).send(error.issues)
    
    // HTTP 500: Internal Server Error
    else res.status(500).send(error)
  }
}

controller.delete = async function(req, res) {
  try {
    const result = await prisma.emp.delete({
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