import fs from 'fs'
import config from 'config'
import dotenv from 'dotenv'

import envs from './constants/envs'
import env, { IS_TEST } from './utils/env'

import logger from './utils/logs/logger'


if(!IS_TEST){
	dotenv.config();
}

if(!envs[env]){
	 errLog.error(`unknown env '${env}'`);
	 throw Error(`unknown env '${env}'`);
}

const PORT = process.env.PORT || config.has('port') ? config.get('port') : process.env.PORT,

	  MONGO_URI = config.has('mongo.uri') ? config.get('mongo.uri') : process.env.MONGO_URI,
	  
	  JWT_SECRET = config.has('jwt.secret') ? config.get('jwt.secret') : undefined,

	  ERRS = config.has('errors_file_path') ? config.get('errors_file_path') : null
	  

if(!PORT){
	logger.error(`----- Error 'port' is not found -----      `)
	throw Error(`Error 'port' is not found`)
}


if(!MONGO_URI){
	logger.error(`----- Error 'MONGO_URI' is not found -----      `)
	throw Error(`Error 'MONGO_URI' is not found`)
}

if(!JWT_SECRET){
	logger.error(`----- Error 'jwt credential' is not found -----      `)
	throw Error(`Error 'jwt credential' is not found`)
}

if(!ERRS){
	logger.error(`----- Error 'messages file' is not found -----      `)
	throw Error(`Error 'messages file' is not found`)
}

const errors_raw_data = fs.readFileSync(__dirname + ERRS);
const errors = JSON.parse(errors_raw_data);

const ERRORS = errors['errors']

export {
	PORT, MONGO_URI,

	JWT_SECRET,
	
	ERRORS, errors,
}

