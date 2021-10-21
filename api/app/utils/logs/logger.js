import path from 'path'
import bunyan from 'bunyan'

const level = process.env.NODE_LOGGING_LEVEL || 'info'

const logger = bunyan.createLogger({
    name: 'fullstack-mock',
    streams: [
        {
            type: 'rotating-file',
            period: '1d',
            count: 3,
            level: 'info',
            path: path.resolve('/var/log/fullstack-mock/', 'info.log')
        },
        {
            type: 'rotating-file',
            period: '1d',
            count: 3,
            level: 'debug',
            path: path.resolve('/var/log/fullstack-mock/', 'debug.log')
        },
        {
            type: 'rotating-file',
            period: '1d',
            count: 3,
            level: 'error',
            path: path.resolve('/var/log/fullstack-mock/', 'error.log')
        }
    ]
})

logger.info('----- INFO LOG STARTED -----      ')
logger.debug('----- DEBUG LOG STARTED -----      ')
logger.error('----- ERROR LOG STARTED -----      ')

export default logger