import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
/***
 * Filtro de exceciones para la aplicacion de forma global
 */
@Catch()
export class RpcToHttpFilter implements ExceptionFilter {

    catch(exception:any, host:ArgumentsHost){

        const ctx = host.switchToHttp();

        const response = ctx.getResponse() as any;
        
        (response as any).status(exception.status || 500).json({

            statusCode: exception.status || 500,

            message: exception.message || exception

        });

    }

}
