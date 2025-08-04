import mongoose, { model, Schema } from "mongoose";
import { IPartner, Multipolygon, Point } from "./types";

const DB_USER = process.env.DB_USER ?? "admin";
const DB_PASS = process.env.DB_PASS ?? 1234;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASS}@mongo:27017/partners`, {
    authSource: "admin",
});

const PointSchema = new Schema<Point>(
    {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true },
    },
    { _id: false }
);

const multiPolygonSchema = new Schema<Multipolygon>(
    {
        type: { type: String, enum: ["MultiPolygon"], required: true },
        coordinates: { type: [[[[Number]]]], required: true },
    },
    { _id: false }
);

const partnerSchema = new Schema<IPartner>({
    id: { type: Number, required: true },
    tradingName: { type: String, required: true },
    ownerName: { type: String, required: true },
    document: { type: String, required: true },
    coverageArea: {
        type: multiPolygonSchema,
        required: true,
        index: "2dsphere",
    },
    address: { type: PointSchema, required: true },
});

const Partner = model<IPartner>("Partner", partnerSchema);
export default Partner;
