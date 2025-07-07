// app.js
const { searchWorks, searchJournals } = require('./coreApi');

async function runSearches() {
    try {
        console.log("Searching for works (e.g., 'artificial intelligence')...");
        const works = await searchWorks("artificial intelligence");
        console.log("Found works:", JSON.stringify(works, null, 2));

        console.log("\nSearching for journals (e.g., 'computer science')...");
        const journals = await searchJournals("computer science");
        console.log("Found journals:", JSON.stringify(journals, null, 2));
    } catch (error) {
        console.error("Failed to run searches:", error);
    }
}

runSearches();