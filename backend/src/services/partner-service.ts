import Partner from "../config/db";
import { IPartner, Point } from "../config/types";

const findPartnerById = async (id: number) => {
    const partner = await Partner.findOne<IPartner>(
        { id: id },
        { __v: 0, _id: 0 }
    );

    return partner;
};

const searchPartners = async (long: number, lat: number) => {
    const pointToQuery: Point = {
        type: "Point",
        coordinates: [long, lat],
    };

    const results = await Partner.find<IPartner>(
        {
            coverageArea: {
                $geoIntersects: {
                    $geometry: pointToQuery,
                },
            },
        },
        { __v: 0, _id: 0 }
    );

    return results;
};

const createPartner = async (newPartner: IPartner) => {
    await Partner.create(newPartner);
};
export const partnerService = {
    createPartner: createPartner,
    findPartnerById: findPartnerById,
    searchPartners: searchPartners,
};
