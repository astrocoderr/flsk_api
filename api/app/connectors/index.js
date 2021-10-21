import mongooseConnector from './mongoose-connector'
import server from '../server'
import logger from '../utils/logs/logger'

import { MONGO_URI } from '../config';

async function connectorsInit(){
	try{
		await mongooseConnector(MONGO_URI);
	}catch(ex){
		logger.error(`----- ConnectorsInit Error ----- status: ${ex.status} ----- message: ${ex.message}      `)
		server.close()
	}
}

export {
	mongooseConnector
}

export default connectorsInit