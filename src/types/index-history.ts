export interface IndexHistoricalData {
    id: number;
    businessDate: string;
    exchangeIndexId: number;
    closingIndex: number;
    openIndex: number;
    highIndex: number;
    lowIndex: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    turnoverValue: number;
    turnoverVolume: number;
    totalTransaction: number;
    absChange: number;
    percentageChange: number;
}

export type IndexHistoricalDataArray = IndexHistoricalData[];
