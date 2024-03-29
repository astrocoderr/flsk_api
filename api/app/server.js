import async_redis from 'async-redis'

import {
	PORT, REDIS_PORT, ERRORS, errors
} from './config'

import app from './app'
import logger from './utils/logs/logger'

const client = async_redis.createClient(REDIS_PORT)


client.on("error", function(error) {
	logger.error(`----- Redis error ----- ${error}     `)
	throw new Error(error)
});

client.set(Object.keys(errors)[0], JSON.stringify(ERRORS))

const server = app.listen(PORT, (err) => {
	if (err) logger.error(err);

	console.log(`Fullstack_mock running on port: ${PORT}`);
});


export default server;

export { client }


// ---- TESTING ----
// function createApp(){
// 	return app;
// }

// if(!module.parent){
// 	createApp().listen(PORT, (err) => {
// 		if(err) console.log(err);
// 		console.log(`Server started on port \'${PORT}\'`);
// 	})
// }

// export default createApp;