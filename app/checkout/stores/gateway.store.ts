import { CommonRequest } from "@/data/dtos/common/common-request";
import { Gateway } from "@/data/models/gateway.model";
import { IGatewayRepository } from "@/data/repositories/remote/gateway/gateway.repository.interface";
import { ApiException } from "@/data/types/api-exception";
import { AppStatus } from "@/shared/enums/app-status";
import { resolveClient } from "@/shared/ioc/client-container";
import { IOC_TOKENS } from "@/shared/ioc/tokens";
import { create } from "zustand";

export interface GatewayStoreState {
    status: AppStatus;
    gateways: Gateway[];
    exception?: ApiException;
}

export interface GatewayStoreAction {
    initial: () => Promise<void>;
    fetchGateways: () => Promise<void>;
    setState: (state: GatewayStoreState) => void;
}


const initState: GatewayStoreState = {
    status: AppStatus.initial,
    gateways: [],
    exception: undefined,
};

export const useGatewayStore = create<GatewayStoreState & GatewayStoreAction>((set, get) => ({
    ...initState,
    
    async initial() {
        set({ status: AppStatus.loading });
        await this.fetchGateways();
        set({ status: AppStatus.done });
    },

    async fetchGateways() {
        const repository = resolveClient<IGatewayRepository>(IOC_TOKENS.GATEWAY_REPOSITORY);
        const apiResult = await repository.getAll(new CommonRequest(1));
        apiResult.when({
            success(response) {
                const gateways = response.data;
                set({ gateways: gateways });
            },

            error(exception) {
                set({ exception: exception, status: AppStatus.error });
            },
        });
    },

    setState(state) { set({ ...state }); },
}));