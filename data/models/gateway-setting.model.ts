import { Serializable } from "./serializable.model";

export type SerializedGatewaySetting = {
    name?: string;
    description?: string;
    icon?: string;
}

export class GatewaySettingModel implements Serializable<SerializedGatewaySetting> {
    name?: string;
    description?: string;
    icon?: string;

    serialize(): SerializedGatewaySetting {
        return {
            name: this.name,
            description: this.description,
            icon: this.icon,
        };
    }
}