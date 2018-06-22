from aiohttp import web
from captcha import createCaptcha
routes = web.RouteTableDef()

def generateCaptcha():
    return

@routes.get('/')
async def hello(request):
    print(createCaptcha())
    return web.Response(content_type="image/png",body=createCaptcha())

app = web.Application()
app.add_routes(routes)
web.run_app(app, port=8090)