import * as mongoose from 'mongoose';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import logger from '../utils/logger.util';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof mongoose.Error.ValidationError) {
            logger.warn(exception.message);
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: exception.message,
            });
        }
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
                logger.error('internal server request error.', exception);
            }
            return response.status(status).json(exception.getResponse());
        }

        logger.error('unknown error.', exception);

        return response.status(status).json({
            error: exception,
        });
    }
}
