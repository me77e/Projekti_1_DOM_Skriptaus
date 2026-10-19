// Tavaroiden lisääminen listalle
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const packingList = document.getElementById("packingList");
const itemCounter = document.getElementById("itemCounter");
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");

// virheellisen syötön tarkistus
addButton.addEventListener("click", function() {
    const item = itemInput.value;
    if (item.length < 3) {
        itemInput.classList.add("input-error");
        alert("Virhellinen syöttö!");
        return;
    }
itemInput.classList.remove("input-error");

// Luodaan uusi taulukon rivi ja solu tavaran nimelle
    const newRow = document.createElement("tr");
    const newCell = document.createElement("td");
    newCell.textContent = item;

// merkitään tarvike pakatuksi tai poistetaan merkintä
    newCell.addEventListener("click", function () {
        newCell.classList.toggle("pakattu");
        updateCounter();
        
});
    newRow.appendChild(newCell);

// Luodaan poista-painike
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

// laskuri pakkaamattomista tavaroista
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
 //// Tallennetaan tavaroiden nimet ja pakkaus tilanne selaimeen (local storage)
function saveList() {
    const rows = packingList.querySelectorAll("tr");
    const items = [];

    rows.forEach(function(row) {
        const cell = row.querySelector("td:first-child");

        items.push({
            name: cell.textContent,
            packed: cell.classList.contains("pakattu")
        });
    });

    localStorage.setItem("packingList", JSON.stringify(items));
}

// tallenna painike
saveButton.addEventListener("click", function() {
    saveList();
    alert("Lista tallennettu!");
});

// Haetaan tallennettu lista takaisin
function loadList() {
    const savedItems = JSON.parse(localStorage.getItem("packingList")) || [];

    savedItems.forEach(function(item) {
        const newRow = document.createElement("tr");
        const newCell = document.createElement("td");

        newCell.textContent = item.name;

        if (item.packed) {
            newCell.classList.add("pakattu");
        }

        newCell.addEventListener("click", function() {
            newCell.classList.toggle("pakattu");
            updateCounter();
            saveList();
        });

        newRow.appendChild(newCell);

        const removeCell = document.createElement("td");
        const removeButton = document.createElement("button");

        removeButton.textContent = "Poista";

        removeButton.addEventListener("click", function() {
            newRow.remove();
            updateCounter();
            saveList();
        });

        removeCell.appendChild(removeButton);
        newRow.appendChild(removeCell);

        packingList.appendChild(newRow);
    });

    updateCounter();
}

// painike jolla haetaan tallennettu lista

loadButton.addEventListener("click", function() {
    packingList.innerHTML = "";
    loadList();
    alert("Tallennettu lista haettu!");
});