let medicines = JSON.parse(localStorage.getItem("medicines_v2")) || [];

const categories = [
    "Before Breakfast",
    "After Breakfast",
    "Before Lunch",
    "After Lunch",
    "Before Dinner",
    "After Dinner"
];

function save() {
    localStorage.setItem("medicines_v2", JSON.stringify(medicines));
}

function addMedicine() {
    let name = document.getElementById("name").value;
    let quantity = parseInt(document.getElementById("quantity").value);
    let time = document.getElementById("time").value;

    if (!name || !quantity) {
        alert("Fill all fields!");
        return;
    }

    medicines.push({ name, quantity, time });
    save();
    render();

    document.getElementById("name").value = "";
    document.getElementById("quantity").value = "";
}

function deleteMedicine(index) {
    medicines.splice(index, 1);
    save();
    render();
}

function reduceQuantity(index) {
    if (medicines[index].quantity > 0) {
        medicines[index].quantity--;
        save();
        render();
    }
}

function render() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    categories.forEach(cat => {
        let card = document.createElement("div");
        card.className = "card";

        let title = document.createElement("h3");
        title.innerText = cat;
        card.appendChild(title);

        medicines.forEach((med, index) => {
            if (med.time === cat) {
                let div = document.createElement("div");

                div.className = "medicine";
                if (med.quantity <= 2) div.classList.add("low");

                div.innerHTML = `
                    <span>${med.name} (${med.quantity})</span>
                    <div class="controls">
                        <button class="reduce" onclick="reduceQuantity(${index})">-1</button>
                        <button class="delete" onclick="deleteMedicine(${index})">X</button>
                    </div>
                `;

                card.appendChild(div);
            }
        });

        grid.appendChild(card);
    });
}

render();
