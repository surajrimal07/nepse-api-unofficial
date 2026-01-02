/**
 * NEPSE Unofficial API
 *
 * A Node.js client for the Nepal Stock Exchange (NEPSE) unofficial API.
 * Features auto-scaling worker pool for high-concurrency scenarios.
 *
 * @example
 * ```typescript
 * import {
 *   get_market_status,
 *   getSummary,
 *   getTopGainers,
 *   getWorkerPoolStats,
 *   shutdownWorkerPool
 * } from 'nepse-api-unofficial';
 *
 * // Get market status
 * const status = await get_market_status();
 * console.log('Market is:', status?.isOpen);
 *
 * // Get top gainers
 * const gainers = await getTopGainers();
 * console.log('Top gainer:', gainers?.[0]?.symbol);
 *
 * // Check worker pool stats
 * console.log(getWorkerPoolStats());
 *
 * // Graceful shutdown when done
 * await shutdownWorkerPool();
 * ```
 *
 * @packageDocumentation
 */

// ============================================================================
// Worker Pool API Functions (Main API)
// ============================================================================
export {
    // Worker pool management
    WorkerPool,
    type WorkerPoolOptions,
    getWorkerPool,
    shutdownWorkerPool,
    getWorkerPoolStats,
    // API functions
    get_market_status,
    get_security_detail,
    disclosure,
    getCompaniesList,
    getIndexPriceVolumeHistory,
    getMarket_depth,
    getNepseIndex,
    getNepseIndexIntraday,
    getPriceVolume,
    getPriceVolumeHistory,
    getSecurityList,
    getStockDailyPrice,
    getSummary,
    getSupplyDemand,
    getTopGainers,
    getTopLoosers,
    getTopTenTradeScrips,
    getTopTenTransactions,
    getTopTenTurnover,
    liveMarketData,
    stockIntraday,
} from "./worker/index";

// ============================================================================
// Core Utilities
// ============================================================================
export { TokenManager, tokenManager } from "./token-manager";
export { BASE_URL } from "./constants";
export { createNepseHeaders } from "./headers";
export { createNepseError, type NepseError } from "./error";
export { logger } from "./logger";

// ============================================================================
// Types from securityDetail
// ============================================================================
export type {
    IndexDataPoint,
    IndexIntradayData,
    NepseIndex,
    PriceVolume,
    SecurityDetail,
    SecurityDetailResponse,
    SecurityList,
    Summary,
    TopGainerLoosers,
    TopTradeScrips,
    TopTransaction,
    TopTurnover,
    CompanyList,
} from "./securityDetail";

export type { MarketStatus } from "./marketStatus";
export type { Prove, ProveExtra } from "./prove";
export type { SecurityBrief } from "./securityBrief";

// ============================================================================
// Types from types/ directory
// ============================================================================
export type { IndexKey } from "./types/indexes";
export { nepseIndexes } from "./types/indexes";

export type { StockDailyPrice, StockDailyPriceArray } from "./types/compnies";

export type { MarketDepthResponse } from "./types/market-depth";

export type {
    SupplyDemand,
    HighestOrderWithSupplyDemandData,
    SupplyDemandData,
    SupplyDemandResponse,
} from "./types/supply-demand";

export type { PriceVolumeHistory, PriceVolumeHistoryArray } from "./types/price-volume";

export type { IndexHistoricalData, IndexHistoricalDataArray } from "./types/index-history";

export type {
    StockData,
    AdvanceDecline,
    AdvanceDeclineResult,
    IndexHighLow,
    DashboardData,
    TopCompany,
    TopGainersApiResponse,
    TopTurnoversApiResponse,
    SecurityDailyChart,
    LiveMarket,
    DisclosureResponse,
    ExchangeMessage,
    CompanyNewsDocument,
    CompanyNewsItem,
    TopTransactions,
    SectorAdvanceDecline,
    RestartResponse,
    Summary as RawSummary,
} from "./types/types";
export { INDEX_URL_MAP, NepseSources } from "./types/types";
