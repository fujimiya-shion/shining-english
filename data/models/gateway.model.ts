import { Expose } from "class-transformer";
import { BaseModel } from "./base.model";
import { Serializable } from "./serializable.model";

export type SerializedGateway = {
    id: string | number;
    name?: string;
    slug?: string;
    isActive?: boolean;
}

export class Gateway extends BaseModel implements Serializable<SerializedGateway> {
    name?: string;
    slug?: string;

    @Expose({ name: 'is_active' })
    isActive?: boolean;

    serialize(): SerializedGateway {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            isActive: this.isActive,
        };
    }
}