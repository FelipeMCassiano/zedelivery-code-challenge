import cors from "@fastify/cors";
import fastify from "fastify";
import { IPartner } from "./config/types";
import { partnerService } from "./services/partner-service";

const server = fastify();

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

server.register(cors, {
    origin: "*", // Allows all origins (for development, use specific origins in production)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
    credentials: true, // Allow sending of cookies and authorization headers
});
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
