// Tavaroiden lisääminen listalle
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const packingList = document.getElementById("packingList");
const itemCounter = document.getElementById("itemCounter");

addButton.addEventListener("click", function() {
    const item = itemInput.value;
    if (item.length < 3) {
        itemInput.classList.add("input-error");
        alert("Virhellinen syöttö!");
        return;
    }
itemInput.classList.remove("input-error");

    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");
    newCell.textContent = item;
// merkitään tarvike pakatuksi tai poistetaan merkintä
    newCell.addEventListener("click", function () {
        
        newCell.classList.toggle("pakattu");
        updateCounter();
});
    newRow.appendChild(newCell);
// Luodaan poista-painike tarvikkeen oikealle puolelle
const removeCell = document.createElement("td");
const removeButton = document.createElement("button");

removeButton.textContent = "Poista";

removeButton.addEventListener("click", function () {
    
    newRow.remove();
    updateCounter();
});

removeCell.appendChild(removeButton);
newRow.appendChild(removeCell);

    packingList.appendChild(newRow);

    updateCounter();

    itemInput.value = "";
});

function updateCounter() {
    const rows = packingList.querySelectorAll("tr");
    let count = 0;

    rows.forEach(function(row) {
        const cell = row.querySelector("td:first-child");

        if (!cell.classList.contains("pakattu")) {
            count++;
        }
    });

    itemCounter.textContent = "Pakkaamatta: " + count;
}