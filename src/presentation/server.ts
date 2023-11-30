import express, { Router } from "express";
import fileUpload from 'express-fileupload';

import cors from 'cors';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, routes, public_path = 'public'} = options;
        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;
    }

    async start(){

        // middlewares 
        this.app.use( cors() );

        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }));

        this.app.use( express.static( this.publicPath));

        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));

        this.app.use( this.routes );

        this.app.listen( this.port, () => {
            console.log('Server running on port ' + this.port);
        })
        
    }

}

