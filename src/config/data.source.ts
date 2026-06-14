import { ConfigModule, ConfigService } from "@nestjs/config"
import { DataSource, DataSourceOptions } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`
});

// COMO SE IMPORTO EL ConfigModule SE PUEDE USAR EL ARCHIVO .dev.env
const ConfigServices = new ConfigService();
    
// exportar el DataSourceConfig tipado para las opciones de TypeORM y sera el encargado de correr las migraciones 
// se puede migrar con el servidor apagado, pero tiene que estar levantada la BD y poder correr con un comando la migracion
export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: ConfigServices.get('DB_HOST'),
  port: ConfigServices.get('DB_PORT'),
  username: ConfigServices.get('DB_USER'),
  password: ConfigServices.get('DB_PASSWORD'),
  database: ConfigServices.get('DB_NAME'),
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
}

// para poder correr el comando de migracion tiene quue estar instanceado el AppDataSource
export const AppDS = new DataSource(DataSourceConfig)