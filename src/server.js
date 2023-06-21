import http from 'node:http';
import { routes } from './routes.js';
import { json } from './middlewares/json.js';
import { extractQueryParams } from './utils/extract-query-params.js';


const server = http.createServer(async(req,res) => {

    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route){
        const routerParams = req.url.match(route.path);

        // console.log(extractQueryParams(routerParams.groups.query));

        const { query, ...params } = routerParams.groups;

        req.params = params;
        req.query = query?extractQueryParams(query):{};
        
        return route.handler(req,res);
    }

    return res.writeHead(404).end('Not Found');
})

server.listen(3000)



// ultimo video que vi Atualização de registros





