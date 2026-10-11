// Tavaroiden lisääminen listalle
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const packingList = document.getElementById("packingList");

addButton.addEventListener("click", function() {
    const item = itemInput.value;

    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");

    newCell.textContent = item;
    newRow.appendChild(newCell);

    packingList.appendChild(newRow);

    itemInput.value = "";
});