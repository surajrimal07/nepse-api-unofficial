export interface MarketDepthItem {
    stockId: number;
    orderBookOrderPrice: number;
    quantity: number;
    orderCount: number;
    isBuy: 1 | 2;
    buy: boolean;
    sell: boolean;
}

export interface MarketDepth {
    buyMarketDepthList: MarketDepthItem[];
    sellMarketDepthList: MarketDepthItem[];
}

export interface MarketDepthResponse {
    symbol: string;
    totalBuyQty: number;
    marketDepth: MarketDepth;
    totalSellQty: number;
    timeStamp: number;
    version: string;
}
