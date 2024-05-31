import { Request, Response } from 'express';
import { Module, DynamicModule, Controller, Get, Req, Res } from '@nestjs/common';
import next from 'next';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

@Controller()
class SSRController {
    @Get('/_next/*')
    async _next(@Req() request: Request, @Res() response: Response) {
        handle(request, response);
    }

    @Get('/blog/articles/:id')
    async article(@Req() request: Request, @Res() response: Response) {
        return app.render(request, response, '/blog/article', { id: request.params.id });
    }

    @Get('/m/blog/articles/:id')
    async m_article(@Req() request: Request, @Res() response: Response) {
        return app.render(request, response, '/m/blog/article', { id: request.params.id });
    }

    @Get('/')
    async index(@Req() request: Request, @Res() response: Response) {
        const userAgent: any = request.headers['user-agent'];
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        response.redirect(isMobile ? '/m/blog' : '/blog');
    }

    @Get('*')
    async _all(@Req() request: Request, @Res() response: Response) {
        const userAgent: any = request.headers['user-agent'];
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        if (isMobile && !request.path.includes('/m')) {
            response.redirect('/m/blog');
            return response.end();
        }
        handle(request, response);
    }
}

@Module({
    controllers: [SSRController],
})
export class SSRModule {
    static forRoot(): Promise<DynamicModule> {
        return app.prepare().then(() => {
            return {
                module: SSRModule,
            };
        });
    }
}
