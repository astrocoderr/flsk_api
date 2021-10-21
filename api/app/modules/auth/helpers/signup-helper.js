import randomatic from 'randomatic'

import {
    client
} from '../../../server'

import logger from "../../../utils/logs/logger"


export default async (phone) => {
    const code = '8888',
            pwd = randomatic('A0', 10)

    const auth = { phone, pwd }

    try{
        await client.set(code, JSON.stringify(auth), 'EX', 60 * 15)
    }catch(ex){
        logger.error(`----- Error. 'Redis' message: ${ex.message} -----     `)
        return 0
    }

    return 1
}