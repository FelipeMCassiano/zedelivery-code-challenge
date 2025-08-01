export type Point = {
    type: "Point";
    coordinates: number[];
};
export type Multipolygon = {
    type: "MultiPolygon";
    coordinates: number[][][][];
};

export interface IPartner {
    id: number;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea: Multipolygon;
    address: Point;
}
