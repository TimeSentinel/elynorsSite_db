-- create Products module tables
--
-- (c) 2025 Lance Stubblefield

CREATE SCHEMA products;

-- Categories ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.categories_defs (
    catID UUID NOT NULL,
    catName varchar(255) NOT NULL,
    catDesc varchar(255),
    catAvail varchar(255),
    PRIMARY KEY(catID),
    UNIQUE(catID)
);

CREATE TABLE IF NOT EXISTS products.categories_subcats (
    subcatID UUID NOT NULL UNIQUE,
    subcatName varchar(255) NOT NULL,
    fkCatID UUID REFERENCES products.categories_defs(catID) ON DELETE CASCADE
);

-- KEYWORDS ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.keywords_types (
    keyTypeID int PRIMARY KEY,
    keyTypeName varchar(16) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products.keywords_defs (
    keyID uuid unique,
    keyName varchar(255) NOT NULL,
    keyDesc varchar(255),
    keyTypeID int REFERENCES products.keywords_types(keyTypeID)
);

-- OPTIONS ------------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.options_defaults (
    optDefaultsID int primary key,
    defaultValue varchar(16)
);

CREATE TABLE IF NOT EXISTS products.options_types (
    optTypesID int primary key,
    optTypeValue varchar(16)
);

CREATE TABLE IF NOT EXISTS products.options_defs (
    optValue varchar(255) NOT NULL,
    optType int REFERENCES products.options_types (optTypesID),
    optDesc varchar(255),
    UNIQUE(optValue)
);

CREATE TABLE IF NOT EXISTS products.options_items (
    optItemName varchar(255) NOT NULL,
    optItemDefault int REFERENCES products.options_defaults(optDefaultsID),
    optCost numeric(5, 2),
    fkValue varchar(255) REFERENCES products.options_defs(optValue) ON DELETE CASCADE
);

-- PRODUCT LIST/CATALOG ------------------++++++++++++++++
CREATE TABLE IF NOT EXISTS products.list (
    productID UUID NOT NULL,
    productName varchar(255),
    productShort varchar(255),
    productDesc varchar,
    productPrice numeric(5,2),
    productImage varchar(255),
    productCategory UUID REFERENCES products.categories_defs(catID),
    productSubCategory UUID REFERENCES products.categories_subcats(subcatID),
    productDeleted char(1),
    productDateAdded date,
    PRIMARY KEY(productID),
    UNIQUE(productID)
 --   keywords ,
 --   options ,
);

CREATE TABLE IF NOT EXISTS products.keywords (
    keyID UUID REFERENCES products.keywords_defs(keyID),
    fkProduct UUID REFERENCES products.list(productID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS products.options (
    optID varchar(255) REFERENCES products.options_defs(optValue),
    fkProduct UUID REFERENCES products.list(productID) ON DELETE CASCADE
);

