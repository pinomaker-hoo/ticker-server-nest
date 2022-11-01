import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"
import { urlencoded, json } from "body-parser"
import * as express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
  app.use("/src/source/img", express.static("./src/source/img"))
  app.use(json({ limit: "50mb" }))
  app.use(urlencoded({ limit: "50mb", extended: true }))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.NODE_SERVER_PORT)
}
bootstrap()
