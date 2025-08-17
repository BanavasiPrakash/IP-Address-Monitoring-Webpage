let ipData = JSON.parse(localStorage.getItem("ipData")) || [];

const ipForm = document.getElementById("ipForm");
const ipTableBody = document.querySelector("#ipTable tbody");

function renderTable() {
    ipTableBody.innerHTML = "";
    ipData.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.location}</td>
            <td>${item.ip}</td>
            <td>
                <button onclick="deleteIp(${index})">Delete</button>
            </td>
        `;
        ipTableBody.appendChild(row);
    });
}

ipForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("location").value.trim();
    const ip = document.getElementById("ipAddress").value.trim();
    if (!location || !ip) return;

    ipData.push({ location, ip });
    localStorage.setItem("ipData", JSON.stringify(ipData));
    renderTable();
    ipForm.reset();
});

function deleteIp(index) {
    ipData.splice(index, 1);
    localStorage.setItem("ipData", JSON.stringify(ipData));
    renderTable();
}

renderTable();
