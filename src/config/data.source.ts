import { DataSource, DataSourceOptions } from "typeorm"

// exportar el DataSourceConfig tipado par alas opciones de TypeORM y sera el encargado de correr las migraciones 
// se puede migrar con el servidor apagado, pero tiene que estar levantada la BD y poder correr con un comando la migracion
export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: '',
  port: 0,
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*{.ts, .js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  
}

// para poder correr el comando de migracion tiene quue estar instanceado el AppDataSource
export const AppDS = new DataSource(DataSourceConfig)