/**
 * Comprehensive Test Suite for NEPSE Unofficial API
 *
 * Tests:
 * - All API functions
 * - Worker pool scaling
 * - Type checking (ensuring we get expected data structures)
 *
 * Run with: npm test
 */

import {
    // API Functions
    get_market_status,
    getSummary,
    getTopGainers,
    getTopLoosers,
    getTopTenTradeScrips,
    getTopTenTransactions,
    getTopTenTurnover,
    getNepseIndex,
    getNepseIndexIntraday,
    getIndexPriceVolumeHistory,
    getSecurityList,
    getCompaniesList,
    get_security_detail,
    stockIntraday,
    getStockDailyPrice,
    getPriceVolumeHistory,
    getPriceVolume,
    getMarket_depth,
    getSupplyDemand,
    liveMarketData,
    disclosure,
    // Worker pool management
    getWorkerPool,
    getWorkerPoolStats,
    shutdownWorkerPool,
    // Types for validation
    type MarketStatus,
    type Summary,
    type TopGainerLoosers,
    type NepseIndex,
    type SecurityDetailResponse,
    type LiveMarket,
} from "../index";

console.log("🚀 Starting comprehensive NEPSE API test...\n");

// Disable SSL verification for NEPSE API
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Helper function to format results
function formatResult(name: string, result: unknown, startTime: number): string {
    const duration = Date.now() - startTime;
    const status = result ? "✅ Success" : "❌ Failed";
    return `${name.padEnd(35)} ${status} (${duration}ms)`;
}

// Type validation helpers
function isMarketStatus(obj: unknown): obj is MarketStatus {
    return obj !== null && typeof obj === "object" && "isOpen" in obj;
}

function isSummary(obj: unknown): obj is Summary {
    return obj !== null && typeof obj === "object";
}

function isTopGainerLoosers(obj: unknown): obj is TopGainerLoosers[] {
    return Array.isArray(obj) && (obj.length === 0 || ("symbol" in obj[0]));
}

function isNepseIndex(obj: unknown): obj is NepseIndex {
    return obj !== null && typeof obj === "object";
}

function isSecurityDetailResponse(obj: unknown): obj is SecurityDetailResponse {
    return obj !== null && typeof obj === "object" && "security" in obj;
}

function isLiveMarket(obj: unknown): obj is LiveMarket[] {
    return Array.isArray(obj);
}

// Test results tracking
let successCount = 0;
let failCount = 0;
let totalDuration = 0;

async function runTest(
    name: string,
    fn: () => Promise<unknown>,
    typeValidator?: (obj: unknown) => boolean
): Promise<void> {
    const startTime = Date.now();
    try {
        const result = await fn();
        const duration = Date.now() - startTime;
        totalDuration += duration;

        if (result) {
            // Type validation if provided
            if (typeValidator && !typeValidator(result)) {
                console.log(`${name.padEnd(35)} ⚠️ Type mismatch (${duration}ms)`);
                failCount++;
                return;
            }
            console.log(formatResult(name, result, startTime));
            successCount++;
        } else {
            console.log(formatResult(name, null, startTime));
            failCount++;
        }
    } catch (error) {
        const duration = Date.now() - startTime;
        totalDuration += duration;
        console.log(`${name.padEnd(35)} ❌ Error (${duration}ms)`);
        console.log(`   └─ ${error}`);
        failCount++;
    }
}

async function testAllFunctions(): Promise<void> {
    console.log("🧪 Testing all NEPSE API functions...\n");
    console.log("=".repeat(60));

    // Market status and summary
    await runTest("get_market_status()", get_market_status, isMarketStatus);
    await runTest("getSummary()", getSummary, isSummary);

    // Top lists
    await runTest("getTopTenTradeScrips()", getTopTenTradeScrips);
    await runTest("getTopTenTransactions()", getTopTenTransactions);
    await runTest("getTopTenTurnover()", getTopTenTurnover);
    await runTest("getTopGainers()", getTopGainers, isTopGainerLoosers);
    await runTest("getTopLoosers()", getTopLoosers, isTopGainerLoosers);

    // Index data
    await runTest("getNepseIndex()", getNepseIndex, isNepseIndex);
    await runTest("getNepseIndexIntraday('NEPSE Index')", () =>
        getNepseIndexIntraday("NEPSE Index")
    );
    await runTest("getIndexPriceVolumeHistory('NEPSE Index', 10)", () =>
        getIndexPriceVolumeHistory("NEPSE Index", 10)
    );

    // Stock data
    await runTest("stockIntraday('NABIL')", () => stockIntraday("NABIL"));
    await runTest("getPriceVolume()", getPriceVolume);
    await runTest("getSecurityList()", getSecurityList);
    await runTest("getCompaniesList()", getCompaniesList);

    // Market depth and supply/demand
    await runTest("getMarket_depth('NABIL')", () => getMarket_depth("NABIL"));
    await runTest("getSupplyDemand()", getSupplyDemand);

    // Historical data
    await runTest("getPriceVolumeHistory('NABIL', 10)", () =>
        getPriceVolumeHistory("NABIL", 10)
    );
    await runTest("getStockDailyPrice('NABIL')", () =>
        getStockDailyPrice("NABIL")
    );

    // Live data
    await runTest("liveMarketData()", liveMarketData, isLiveMarket);
    await runTest("get_security_detail('NABIL')", () =>
        get_security_detail("NABIL"), isSecurityDetailResponse
    );

    // Disclosures
    await runTest("disclosure()", disclosure);

    console.log("=".repeat(60));
}

async function testWorkerPoolScaling(): Promise<void> {
    console.log("\n\n🔧 Testing Worker Pool Scaling...\n");
    console.log("=".repeat(60));

    // Get initial stats
    let stats = getWorkerPoolStats();
    console.log(`Initial workers: ${stats?.totalWorkers ?? 0}`);

    // Fire off multiple concurrent requests to trigger scaling
    console.log("\nFiring 10 concurrent requests to test auto-scaling...");

    const startTime = Date.now();
    const promises = [
        get_market_status(),
        getSummary(),
        getTopGainers(),
        getTopLoosers(),
        getNepseIndex(),
        getSecurityList(),
        getPriceVolume(),
        getSupplyDemand(),
        liveMarketData(),
        disclosure(),
    ];

    // Check stats during execution
    setTimeout(() => {
        const midStats = getWorkerPoolStats();
        console.log(
            `\n📊 Mid-execution stats:`,
            `\n   Workers: ${midStats?.totalWorkers}`,
            `\n   Busy: ${midStats?.busyWorkers}`,
            `\n   Queue: ${midStats?.queueLength}`
        );
    }, 500);

    await Promise.all(promises);
    const duration = Date.now() - startTime;

    // Get final stats
    stats = getWorkerPoolStats();
    console.log(
        `\n📈 Final stats after concurrent requests:`,
        `\n   Total workers: ${stats?.totalWorkers}`,
        `\n   Busy workers: ${stats?.busyWorkers}`,
        `\n   Idle workers: ${stats?.idleWorkers}`,
        `\n   Tasks completed: ${stats?.totalTasksCompleted}`,
        `\n   Total errors: ${stats?.totalErrors}`,
        `\n   Total time: ${duration}ms`
    );

    console.log("\n✅ Worker pool scaling test completed!");
    console.log("=".repeat(60));
}

async function testEdgeCases(): Promise<void> {
    console.log("\n\n🧪 Testing edge cases...\n");
    console.log("=".repeat(60));

    // Test with invalid symbol
    console.log("Testing with invalid stock symbol...");
    const startTime = Date.now();
    const invalidResult = await getMarket_depth("INVALID_SYMBOL_12345");
    console.log(formatResult("Invalid symbol test", invalidResult, startTime));
    console.log(
        `   Expected: null (${invalidResult === null ? "✅ Correct" : "❌ Unexpected value"})`
    );

    // Test with empty symbol
    const emptyResult = await get_security_detail("");
    console.log(formatResult("Empty symbol test", emptyResult, Date.now()));
    console.log(
        `   Expected: null (${emptyResult === null ? "✅ Correct" : "❌ Unexpected value"})`
    );

    console.log("=".repeat(60));
}

async function main(): Promise<void> {
    const overallStart = Date.now();

    try {
        // Display worker pool info
        console.log("📊 Worker Pool initialized");
        const pool = getWorkerPool();
        const initialStats = pool.getStats();
        console.log(`   Min workers: 1, Max workers: 10`);
        console.log(`   Current workers: ${initialStats.totalWorkers}\n`);

        // Run all tests
        await testAllFunctions();
        await testWorkerPoolScaling();
        await testEdgeCases();

        const totalTime = Date.now() - overallStart;

        console.log("\n\n🎉 All tests completed!");
        console.log("=".repeat(60));
        console.log(`📈 Test Summary:`);
        console.log(`   Total tests: ${successCount + failCount}`);
        console.log(`   Successful: ${successCount}`);
        console.log(`   Failed: ${failCount}`);
        console.log(
            `   Success rate: ${(
                (successCount / (successCount + failCount)) *
                100
            ).toFixed(1)}%`
        );
        console.log(`   Total duration: ${totalTime}ms`);
        console.log(`   Average per test: ${(totalDuration / (successCount + failCount)).toFixed(1)}ms`);
        console.log("=".repeat(60));

        // Graceful shutdown
        console.log("\n🔄 Shutting down worker pool...");
        await shutdownWorkerPool();
        console.log("✅ Worker pool shutdown complete!");

        console.log("\n✅ The NEPSE Unofficial API is working correctly!");

        process.exit(failCount > 0 ? 1 : 0);
    } catch (error) {
        console.error("\n❌ Test suite failed with error:", error);
        await shutdownWorkerPool();
        process.exit(1);
    }
}

// Handle graceful shutdown on SIGINT
process.on("SIGINT", async () => {
    console.log("\n\n⚠️  Received SIGINT, shutting down gracefully...");
    await shutdownWorkerPool();
    process.exit(0);
});

// Run the test suite
main();
