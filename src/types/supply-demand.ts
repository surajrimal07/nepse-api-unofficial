export interface SupplyDemand {
    symbol: string;
    totalOrder: number;
    totalQuantity: number;
    quantityPerOrder?: number;
    orderSide?: string;
    securityId?: string;
}

export interface HighestOrderWithSupplyDemandData extends SupplyDemand {
    totalBuyOrder?: number;
    totalBuyQuantity?: number;
    totalSellOrder?: number;
    totalSellQuantity?: number;
    buyQuantityPerOrder?: number;
    sellQuantityPerOrder?: number;
    buyToSellOrderRatio?: number;
    buyToSellQuantityRatio?: number;
}

export interface SupplyDemandData {
    supplyList: SupplyDemand[];
    demandList: SupplyDemand[];
}

export interface SupplyDemandResponse {
    highestQuantityperOrder: HighestOrderWithSupplyDemandData[];
    highestSupply: SupplyDemand[];
    highestDemand: SupplyDemand[];
    version: string;
    time: string;
    date: string;
}
