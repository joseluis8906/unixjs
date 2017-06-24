CREATE SCHEMA IF NOT EXISTS "Gis";

CREATE TABLE IF NOT EXISTS "Gis"."Envase"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Numero" TEXT NOT NULL UNIQUE,
    "NumeroInterno" TEXT UNIQUE,
    "Material" TEXT,
    "Capacidad" DECIMAL,
    "ClaseProducto" TEXT,
    "NormaTecnica" TEXT,
    "Propietario" TEXT
);

CREATE TABLE IF NOT EXISTS "Gis"."EnvaseComplementaryInfo"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Presion" DECIMAL,
    "AlturaConValvula" DECIMAL,
    "PesoConValvula" DECIMAL,
    "Valvula" TEXT,
    "TipoValvula" TEXT,
    "AcabadoColor" TEXT
);

CREATE TABLE IF NOT EXISTS "Gis"."EnvaseGeneralidades"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Proveedor" TEXT,
    "FechaCompra" DATE,
    "Garantia" TEXT,
    "FechaFabricacion" DATE,
    "PruebaHidrostatica" TEXT,
    "Alquilado" TEXT,
    "FechaAlquiler" DATE,
    "Observaciones" TEXT
);

CREATE TABLE IF NOT EXISTS "Gis"."Produccion1"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "FechaFabricacion" DATE,
    "FechaVencimiento" DATE,
    "Lote" TEXT,
    "Cantidad" DECIMAL,
    "HoraInicial" TIME
);

CREATE TABLE IF NOT EXISTS "Gis"."Produccion2"
(
    "EnvaseId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Gis"."Envase" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "HoraFinal" TIME,
    "Turno" TEXT,
    "Observaciones" TEXT,
    "PurezaFinal" DECIMAL,
    "PresionFinal" DECIMAL
);

CREATE TABLE IF NOT EXISTS "Gis"."Cliente"
(
    "Id" BIGSERIAL PRIMARY KEY NOT NULL,
    "NitCC" TEXT,
    "Nombre" TEXT,
    "Direccion" TEXT,
    "Telefono" TEXT
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
    "Entra" Date,
    "Sale" Date
);
