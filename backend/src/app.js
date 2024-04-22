import express, { json, urlencoded } from "express";
//import cookieParser from "cookie-parser";
//import logger from "morgan";
//import dotenv from 'dotenv'
import protectRoutes from './lib/protectRotes.js'

import cors from 'cors'

import indexRouter from "./rotas/index.js";
import usersRouter from "./rotas/users.js";

// Importa as variáveis de ambiente do arquivo .env
dotenv.config()

const app = express();

app.use(cors({
  origin: process.env.FRONT_ORIGIN,
  credentials: true
}))

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
//app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

/////////////////////////////////////////////////

// Protege as rotas, exigindo autenticação prévia

app.use(protectRoutes)

import mesaRouter from './rotas/mesa.js'
app.use('/mesa', mesaRouter)

import pedidoRouter from './rotas/pedido.js'
app.use('/pedido', pedidoRouter)

import userRouter from './rotas/user.js'
app.use('/user', userRouter)

export default app;
