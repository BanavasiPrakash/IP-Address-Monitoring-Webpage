const ipData = JSON.parse(localStorage.getItem("ipData")) || [];
const statusTableBody = document.querySelector("#statusTable tbody");
const lastUpdatedEl = document.getElementById("lastUpdated");

// Simulated ping (Replace later with real backend API)
function simulatePing(ip) {
    const random = Math.random();
    if (random > 0.85) return null; // null = no response (down)
    return Math.floor(Math.random() * 800); // ms
}

// Map ping time to status
function getStatusFromPing(pingTime) {
    if (pingTime === null) return { text: "Down", class: "status-red" };
    if (pingTime < 100) return { text: "Active Fast", class: "status-green" };
    if (pingTime < 300) return { text: "Active Slow", class: "status-yellow" };
    if (pingTime < 600) return { text: "Active Slowdown", class: "status-orange" };
    return { text: "Down", class: "status-red" };
}

// Render the status table
function renderStatusTable() {
    statusTableBody.innerHTML = "";

    const rows = ipData.map(item => {
        const pingTime = simulatePing(item.ip);
        const status = getStatusFromPing(pingTime);

        return {
            location: item.location,
            ip: item.ip,
            status
        };
    });

    // Sort so "Down" rows appear on top
    rows.sort((a, b) => {
        if (a.status.text === "Down" && b.status.text !== "Down") return -1;
        if (a.status.text !== "Down" && b.status.text === "Down") return 1;
        return 0;
    });

    // Render rows
    rows.forEach(rowData => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${rowData.location}</td>
            <td>${rowData.ip}</td>
            <td class="${rowData.status.class}">${rowData.status.text}</td>
        `;
        statusTableBody.appendChild(row);
    });

    // Update last updated time
    lastUpdatedEl.textContent = "Last Updated: " + new Date().toLocaleTimeString();
}

// Initial render
renderStatusTable();

// Auto-refresh every 5 seconds
setInterval(renderStatusTable, 5000);
