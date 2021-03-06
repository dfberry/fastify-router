import * as fastify from "fastify";
import * as fastifyBlipp from "fastify-blipp";
import { Server, IncomingMessage, ServerResponse } from "http";
import statusRoutes from "./modules/routes/status";

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify();

server.register(fastifyBlipp);
server.register(statusRoutes);


const path = require('path')
server.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/app/', // optional: default '/'
  })
  server.get('/app/test1', function (req, reply) {
    reply.sendFile('test1.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
  })

const start = async () => {
  try {
    await server.listen(3000, "0.0.0.0");
    server.blipp();
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

process.on("uncaughtException", error => {
  console.error(error);
});
process.on("unhandledRejection", error => {
  console.error(error);
});

start();