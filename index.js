const Fastify = require("fastify");
const routes = require("./src/routes/index");

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
