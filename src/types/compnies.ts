export interface StockDailyPrice {
    businessDate: string;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    previousDayClosePrice: number;
    fiftyTwoWeekHigh: number;
    lastTradedPrice: number;
    totalTradedQuantity: number;
    closePrice: number;
}

export type StockDailyPriceArray = StockDailyPrice[];
