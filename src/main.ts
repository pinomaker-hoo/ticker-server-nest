import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  console.log(process.env.NODE_SERVER_PORT)
  await app.listen(process.env.NODE_SERVER_PORT)
}
bootstrap()
