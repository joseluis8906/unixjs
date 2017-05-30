CREATE SCHEMA IF NOT EXISTS "Gis";

CREATE TABLE IF NOT EXISTS "Gis"."Envase"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Numero" INTEGER NOT NULL UNIQUE,
    "NumeroInterno" INTEGER UNIQUE,
    "Propietario" VARCHAR(128),
    "Material" VARCHAR(64),
    "Capacidad" DECIMAL,
    "ClaseProducto" VARCHAR(64),
    "NormaTecnica" VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS "Gis"."EnvaseComplementaryInfo"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Presion" DECIMAL,
    "AlturaConValvula" DECIMAL,
    "PesoConValvula" DECIMAL,
    "Valvula" BOOLEAN,
    "TipoValvula" VARCHAR(64),
    "AcabadoColor" VARCHAR(128)
);

CREATE TABLE IF NOT EXISTS "Gis"."EnvaseGeneralidades"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Proveedor" VARCHAR(128),
    "FechaCompra" DATE,
    "Garantia" BOOLEAN,
    "FechaFabricacion" DATE,
    "PruebaHidrostatica" BOOLEAN,
    "Alquilado" BOOLEAN,
    "FechaAlquiler" DATE,
    "Observaciones" VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS "Gis"."Produccion1"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Producto" VARCHAR(128),
    "FechaFabricacion" DATE,
    "FechaVencimiento" DATE,
    "Lote" VARCHAR(16),
    "Cantidad" DECIMAL,
    "HoraInicial" TIME
);

CREATE TABLE IF NOT EXISTS "Gis"."Produccion2"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "HoraFinal" TIME,
    "Turno" VARCHAR(16),
    "Observaciones" VARCHAR(512),
    "PurezaFinal" DECIMAL,
    "PresionFinal" DECIMAL
);

CREATE TABLE IF NOT EXISTS "Gis"."Cliente"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "NitCC" VARCHAR(32),
    "Nombre" VARCHAR(128),
    "Direccion" VARCHAR(128),
    "Telefono" VARCHAR(16)
);

CREATE TABLE IF NOT EXISTS "Gis"."Remision"
(
    "Id" BIGSERIAL PRIMARY KEY NOT NULL,
    "ClienteId" BIGINT NOT NULL REFERENCES "Gis"."Cliente" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Numero" BIGINT NOT NULL,
    "Fecha" DATE
);

CREATE TABLE IF NOT EXISTS "Gis"."RemisionRecord"
(
    "RemisionId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Remision" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "EnvaseId" BIGINT NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Entra" INTEGER,
    "Sale" INTEGER
);
