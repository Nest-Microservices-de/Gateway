import 'dotenv/config';
import * as joi from 'joi';

/**
 * garantizar que la aplicación cuente con una configuración inicial válida y
 *  segura antes de empezar a ejecutarse.

  En el desarrollo de software moderno, esto se conoce como validación de variables de entorno.
 */

interface EnvVars {
    PORT: number;
    PRODUCTS_SERVICE_HOST: string;
    PRODUCTS_SERVICE_PORT: number;
    ORDERS_SERVICE_HOST: string;
    ORDERS_SERVICE_PORT: number;
}

// 1. Corregido: Se usa joi.object() para definir el esquema
const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_SERVICE_HOST: joi.string().required(),
    PRODUCTS_SERVICE_PORT: joi.number().required(),
    ORDERS_SERVICE_HOST:   joi.string().required(),
    ORDERS_SERVICE_PORT:   joi.number().required(),
})
.unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// 2. Corregido: Asignación segura con aserción de tipo (as EnvVars)
const envsVars = value as EnvVars;

export const envs = {
    PORT : envsVars.PORT,
    PRODUCTS_SERVICE_HOST : envsVars.PRODUCTS_SERVICE_HOST,
    PRODUCTS_SERVICE_PORT : envsVars.PRODUCTS_SERVICE_PORT,
    ORDERS_SERVICE_HOST:   envsVars.ORDERS_SERVICE_HOST,
    ORDERS_SERVICE_PORT:   envsVars.ORDERS_SERVICE_PORT,
    
}

