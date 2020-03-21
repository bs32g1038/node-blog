import mongoose from 'mongoose';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import logger from '../utils/logger.util';
import { isString } from 'lodash';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
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
            const exceptionResponse = exception.getResponse() as HttpException;
            if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
                logger.error('internal server request error.', exception);
            }
            return response.status(status).json({
                statusCode: status,
                message: isString(exceptionResponse) ? exceptionResponse : exceptionResponse.message,
            });
        }

        logger.error('unknown error.', exception);

        return response.status(status).json({
            statusCode: status,
            message: '服务器罢工了，请稍后再重试',
        });
    }
}
