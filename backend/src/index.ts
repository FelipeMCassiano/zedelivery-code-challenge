import fastify from "fastify";
import { IPartner } from "./config/types";
import { partnerService } from "./services/partner-service";

const server = fastify();
const APP_PORT = parseInt(process.env.APP_PORT!) ?? 8080;

server.get<{ Params: { partnerId: number } }>(
    "/partners/:partnerId",
    async (request, reply) => {
        const { partnerId } = request.params;
        const response = await partnerService.findPartnerById(partnerId);

        if (!response) {
            return reply.code(404).send();
        }
        return reply.code(200).send(response);
    }
);

server.get<{ Querystring: { long: number; lat: number } }>(
    "/partners",
    async (request, reply) => {
        const { long, lat } = request.query;
        console.log(`long: ${long} lat: ${lat}`);

        const response = await partnerService.searchPartners(long, lat);
        if (response.length < 1) {
            return reply.code(204).send();
        }

        return reply.code(200).send({ data: response });
    }
);
server.post<{ Body: IPartner }>("/partners", async (request, reply) => {
    const newPartner = request.body;
    await partnerService.createPartner(newPartner);

    return reply.code(201).send();
});

server.listen({ port: APP_PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
