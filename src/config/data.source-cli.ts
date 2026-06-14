/*
 Nuevo archivo src/config/data.source-cli.ts — versión independiente del CLI que no usa @nestjs/config. 
 Lee el .env manualmente con fs. Esto es para que funcione la migracion 

 El archivo data.source.ts original se queda intacto para que la app NestJS siga funcionando con @nestjs/config.
*/

import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import * as fs from "fs"
import * as path from "path"

const envFile = path.resolve(process.cwd(), `.${process.env.NODE_ENV}.env`)
if (fs.existsSync(envFile)) {
  const content = fs.readFileSync(envFile, "utf-8")
  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIndex = trimmed.indexOf("=")
      if (eqIndex !== -1) {
        const key = trimmed.substring(0, eqIndex).trim()
        let value = trimmed.substring(eqIndex + 1).trim()
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1)
        }
        process.env[key] = process.env[key] || value
      }
    }
  }
}

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/../**/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
})
