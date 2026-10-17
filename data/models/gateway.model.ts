import { Expose, Type } from "class-transformer";
import { BaseModel } from "./base.model";
import { Serializable } from "./serializable.model";
import { GatewaySettingModel, SerializedGatewaySetting } from "./gateway-setting.model";

export type SerializedGateway = {
    id: string | number;
    name?: string;
    slug?: string;
    isActive?: boolean;
    settings?: SerializedGatewaySetting;
}

export class Gateway extends BaseModel implements Serializable<SerializedGateway> {
    @Expose({ name: 'factory_name' })
    name?: string;
    slug?: string;

    @Expose({ name: 'is_active' })
    isActive?: boolean;
    
    @Type(() => GatewaySettingModel)
    settings?: GatewaySettingModel;

    serialize(): SerializedGateway {
        return {
            id: this.id,
            name: this.name,
            slug: this.slug,
            isActive: this.isActive,
            settings: this.settings?.serialize(),
        };
    }
}