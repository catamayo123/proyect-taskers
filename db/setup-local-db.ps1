$ErrorActionPreference = "Stop"

$env:Path += ";C:\Program Files\Instaladores\PostgreSQL\15\bin"

$pgUser = "postgres"
$dbName = "codrrdb"
$appUser = "ucoderr"
$appPassword = "ucoderr"
$hostName = "localhost"
$port = 5432

$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-Host "ERROR: psql no encontrado." -ForegroundColor Red
    Write-Host "Verifica la ruta: C:\Program Files\Instaladores\PostgreSQL\15\bin"
    exit 1
}

Write-Host "Conectando a PostgreSQL en $hostName`:$port..." -ForegroundColor Cyan
Write-Host ""

# 1. Crear rol ucoderr si no existe
Write-Host "[1/3] Creando rol '$appUser'..." -ForegroundColor Yellow
$roleExists = psql -U $pgUser -h $hostName -p $port -d postgres -t -A -c "SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = '$appUser'"
if (-not $roleExists) {
    psql -U $pgUser -h $hostName -p $port -d postgres -c "CREATE ROLE $appUser LOGIN PASSWORD '$appPassword'"
    Write-Host "  Rol '$appUser' creado." -ForegroundColor Green
} else {
    Write-Host "  Rol '$appUser' ya existe." -ForegroundColor Gray
}

# 2. Crear base de datos codrrdb con dueno ucoderr si no existe
Write-Host "[2/3] Creando base de datos '$dbName' con dueno '$appUser'..." -ForegroundColor Yellow
$dbExists = psql -U $pgUser -h $hostName -p $port -d postgres -t -A -c "SELECT 1 FROM pg_database WHERE datname = '$dbName'"
if (-not $dbExists) {
    psql -U $pgUser -h $hostName -p $port -d postgres -c "CREATE DATABASE $dbName OWNER $appUser"
    Write-Host "  Base de datos '$dbName' creada (dueno: $appUser)." -ForegroundColor Green
} else {
    Write-Host "  Base de datos '$dbName' ya existe." -ForegroundColor Gray
}

# 3. Ejecutar init.sql
Write-Host "[3/3] Ejecutando init.sql..." -ForegroundColor Yellow
$initSqlPath = Join-Path $PSScriptRoot "init.sql"
if (Test-Path $initSqlPath) {
    psql -U $pgUser -h $hostName -p $port -d $dbName -f $initSqlPath
    Write-Host "  init.sql ejecutado correctamente." -ForegroundColor Green
} else {
    Write-Host "  init.sql no encontrado en $initSqlPath. Se omite." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Configuracion completada" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Base de datos: $dbName"
Write-Host "  Usuario:       $appUser"
Write-Host "  Password:      $appPassword"
Write-Host "  Puerto:        $port"
Write-Host "  Host:          $hostName"
Write-Host "----------------------------------------" -ForegroundColor Cyan
Write-Host "  DSN: postgresql://$appUser`:$appPassword@$hostName`:$port/$dbName"
Write-Host "========================================" -ForegroundColor Cyan
