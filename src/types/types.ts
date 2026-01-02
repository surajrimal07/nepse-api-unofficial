
import type { IndexKey } from "./indexes.js";


export interface TopTransactions {
    symbol: string;
    name: string;
    ltp: number;
    transactions: number;
}


//
export const INDEX_URL_MAP: Record<IndexKey, string> = {
    "Banking SubIndex": "DailyBankSubindexGraph",
    "Development Bank Ind.": "DailyDevelopmentBankSubindexGraph",
    "Finance Index": "DailyFinanceSubindexGraph",
    "Hotels And Tourism": "DailyHotelTourismSubindexGraph",
    "HydroPower Index": "DailyHydroPowerSubindexGraph",
    Investment: "DailyInvestmentSubindexGraph",
    "Life Insurance": "DailyLifeInsuranceSubindexGraph",
    "Manufacturing And Pr.": "DailyManufacturingProcessingSubindexGraph",
    "Microfinance Index": "DailyMicrofinanceSubindexGraph",
    "Mutual Fund": "DailyMutualFundSubindexGraph",
    "NEPSE Index": "DailyNepseIndexGraph",
    "Non Life Insurance": "DailyNonLifeInsuranceSubindexGraph",
    "Others Index": "DailyOthersSubindexGraph",
    "Trading Index": "DailyTradingSubindexGraph",
} as const;



export interface StockData {
    symbol: string;
    ltp: number;
    pointchange: number;
    percentchange: number;
    open: number;
    high: number;
    low: number;
    volume: number;
    previousclose: number;
}

export interface AdvanceDecline {
    advance: number;
    decline: number;
    neutral: number;
}

export interface SectorAdvanceDecline {
    advance: number;
    decline: number;
    neutral: number;
}

export type AdvanceDeclineResult = {
    [K in IndexKey]: SectorAdvanceDecline;
};
//end of listed companies

//exp nepse index

// Final output schema with defaults and transformations

//base schema of index intraday

// export type IndexIntraday = z.infer<typeof indexIntradayBaseSchema>;

//end of nepse index

//isOpen

//

export type IndexHighLow = {
    [key in IndexKey]?: {
        high: number;
        low: number;
    };
};
export type DashboardData = {
    gainers: Array<{
        symbol: string;
        name: string;
        ltp: number;
        pointchange: number;
        percentchange: number;
    }>;
    losers: Array<{
        symbol: string;
        name: string;
        ltp: number;
        pointchange: number;
        percentchange: number;
    }>;
    transactions: Array<{
        symbol: string;
        name: string;
        ltp: number;
        transactions: number;
    }>;
    turnovers: Array<{
        symbol: string;
        name: string;
        ltp: number;
        turnover: number;
    }>;
    traded: Array<{
        symbol: string;
        name: string;
        ltp: number;
        shareTraded: number;
    }>;
};

export interface TopCompany {
    ticker: string;
    name: string;
    impact: number;
}

// Enum for NEPSE sources to provide type safety
export enum NepseSources {
    AbhiyanDaily = "Abhiyan Daily",
    Arthasarokar = "Arthasarokar",
    KarobarDaily = "Karobar Daily",
    Bizmandu = "Bizmandu",
    Arthapath = "Arthapath",
    Clickmandu = "Clickmandu",
    CapitalNepal = "Capital Nepal",
    BizKhabar = "BizKhabar",
    ArthaKendraNepali = "ArthaKendra Nepali",
    ArthaKendraEnglish = "ArthaKendra English",
    ShareSansar = "Share Sansar",
    MeroLagani = "Mero Lagani",
}

export interface RestartResponse {
    success: boolean;
    message: string;
    statusCode?: number;
}

export interface TopGainersApiResponse {
    symbol: string;
    securityName: string;
    ltp: number;
    pointChange: number;
    percentageChange: number;
}

export interface Summary {
    "Total Turnover Rs:": number;
    "Total Traded Shares": number;
    "Total Transactions": number;
    "Total Scrips Traded": number;
}

export interface TopTurnoversApiResponse {
    symbol: string;
    securityName: string;
    closingPrice: number;
    turnover: number;
}

// export interface SupplyDemandResponse {
//   highestQuantityperOrder: HighestOrderWithSupplyDemandData[];
//   highestSupply: SupplyDemand[];
//   highestDemand: SupplyDemand[];
//   updated: boolean;
//   version: string;
// }



//end of supply demand

//stock intraday

// export const MarketClosedError = z.object({
// 	error: z.string().default("Market is closed"),
// });

// export type MarketClosedErrorType = z.infer<typeof MarketClosedError>;

export interface SecurityDailyChart {
    contractRate: number;
    time: number;
}

//used in lib
export interface PriceVolumeHistory {
    businessDate: string;
    totalTrades: number;
    totalTradedQuantity: number;
    totalTradedValue: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
}

//used in lib
export interface LiveMarket {
    securityId: string;
    securityName: string;
    symbol: string;
    indexId: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    totalTradeQuantity: number;
    totalTradeValue: number;
    lastTradedPrice: number;
    percentageChange: number;
    lastUpdatedDateTime: string;
    lastTradedVolume: number;
    previousClose: number;
    averageTradedPrice: number;
    totalTradedVolume: number;
    numberOfTrades: number;
}

//used in lib
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

//disclosure
export interface DisclosureResponse {
    exchangeMessages: ExchangeMessage[];
    companyNews: CompanyNewsItem[];
}

export interface ExchangeMessage {
    id: number;
    messageTitle: string;
    messageBody: string; // HTML from API (before sanitization)
    encryptedId: string | null;
    expiryDate: string; // YYYY-MM-DD
    filePath: string | null;
    remarks: string | null;
    addedDate: string | null; // ISO string
    modifiedDate: string | null;
    approvedDate: string | null;
}

export interface CompanyNewsDocument {
    id: number;
    activeStatus: string;
    modifiedBy: string;
    modifiedDate: string;
    application: number;
    documentType: number;
    submittedDate: string;
    filePath: string;
    encryptedId: string;
}

export interface CompanyNewsItem {
    id: number;
    newsHeadline: string;
    newsBody: string; // HTML from API (before sanitization)
    newsSource: string;
    addedDate: string;
    modifiedDate: string;
    approvedDate: string | null;
    applicationDocumentDetailsList: CompanyNewsDocument[];
}
