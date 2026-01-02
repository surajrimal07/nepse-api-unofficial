export interface PriceVolumeHistory {
    businessDate: string;
    totalTrades: number;
    totalTradedQuantity: number;
    totalTradedValue: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
}

export type PriceVolumeHistoryArray = PriceVolumeHistory[];
