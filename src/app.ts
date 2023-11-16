import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async () => {
    main();
})();


async function main(){

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    server.start();
        
}