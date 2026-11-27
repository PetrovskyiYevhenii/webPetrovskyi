function nacitajKnihy() {
    const hladat = document.getElementById("hladatInput").value.trim();
    const zoradit = document.getElementById("zoraditSelect").value;
    const smer = document.getElementById("smerSelect").value;
    const parametre = new URLSearchParams({ hladat, zoradit, smer });

    fetch("/api/knihy?" + parametre.toString())
        .then(odpoved => {
            if (!odpoved.ok) throw new Error("Server vrátil " + odpoved.status);
            return odpoved.json();
        })
        .then(knihy => {
            const zoznam = document.getElementById("zoznam");
            if (!zoznam) return;
            zoznam.innerHTML = "";

            knihy.forEach(kniha => {
                const riadok = document.createElement("tr");

                [kniha.id, kniha.nazov, kniha.autor, kniha.rok, kniha.cena]
                    .forEach(hodnota => {
                        const bunka = document.createElement("td");
                        bunka.textContent = hodnota !== undefined && hodnota !== null ? hodnota : "";
                        riadok.appendChild(bunka);
                    });

                const bunkaAkcia = document.createElement("td");

                const tlacidloVymazat = document.createElement("button");
                tlacidloVymazat.textContent = "Vymazať";
                tlacidloVymazat.onclick = () => {
                    if (!confirm(`Naozaj chceš vymazať knihu „${kniha.nazov}“?`)) return;
                    fetch("/api/knihy/" + kniha.id, { method: "DELETE" })
                        .then(() => nacitajKnihy());
                };

                const tlacidloCena = document.createElement("button");
                tlacidloCena.textContent = "Cena";
                tlacidloCena.onclick = () => zmenitCenu(kniha);

                const tlacidloUpravit = document.createElement("button");
                tlacidloUpravit.textContent = "Upraviť";
                tlacidloUpravit.onclick = () => upravitKnihu(kniha);

                bunkaAkcia.append(tlacidloVymazat, tlacidloCena, tlacidloUpravit);
                riadok.appendChild(bunkaAkcia);

                zoznam.appendChild(riadok);
            });
        })
        .catch(err => console.error("Chyba pri načítaní:", err));
}

function pridatKnihu() {
    const nazov = document.getElementById("nazov").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const rok = Number(document.getElementById("rok").value);
    const cena = Number(document.getElementById("cena").value);

    if (!nazov || !autor || !rok || !cena) {
        alert("Vyplň všetky polia správne.");
        return;
    }

    fetch("/api/knihy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nazov, autor, rok, cena })
    })
    .then(response => {
        if (!response.ok) throw new Error("Server vrátil " + response.status);
        document.getElementById("nazov").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("rok").value = "";
        document.getElementById("cena").value = "";
        nacitajKnihy();
    })
    .catch(err => alert("Chyba pri pridávaní knihy: " + err.message));
}

function zmenitCenu(kniha) {
    const zmena = prompt("O koľko zmeniť cenu? (napr. 2 alebo -1.5)", "0");
    if (zmena === null) return;

    fetch("/api/knihy/" + kniha.id + "/cena", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zmena: Number(zmena) })
    })
    .then(response => {
        if (!response.ok) throw new Error("Server vrátil " + response.status);
        nacitajKnihy();
    })
    .catch(err => alert("Chyba pri zmene ceny: " + err.message));
}

function upravitKnihu(kniha) {
    const nazov = prompt("Názov knihy:", kniha.nazov);
    if (nazov === null) return;
    const autor = prompt("Autor:", kniha.autor);
    if (autor === null) return;
    const rok = prompt("Rok:", kniha.rok);
    if (rok === null) return;

    fetch("/api/knihy/" + kniha.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nazov: nazov.trim(), autor: autor.trim(), rok: Number(rok) })
    })
    .then(response => {
        if (!response.ok) throw new Error("Server vrátil " + response.status);
        nacitajKnihy();
    })
    .catch(err => alert("Chyba pri úprave: " + err.message));
}

document.getElementById("hladatInput").addEventListener("input", nacitajKnihy);
document.getElementById("zoraditSelect").addEventListener("change", nacitajKnihy);
document.getElementById("smerSelect").addEventListener("change", nacitajKnihy);

document.getElementById("resetFilterBtn").addEventListener("click", () => {
    document.getElementById("hladatInput").value = "";
    document.getElementById("zoraditSelect").value = "id";
    document.getElementById("smerSelect").value = "ASC";
    nacitajKnihy();
});

const prihlasenyEl = document.getElementById("prihlaseny");
const ulozenyPouzivatel = sessionStorage.getItem("prihlasenyPouzivatel");

if (ulozenyPouzivatel) {
    const pouzivatel = JSON.parse(ulozenyPouzivatel);
    prihlasenyEl.textContent = `Prihlaseny pouzivatel: ${pouzivatel.meno}`;
} else {
    prihlasenyEl.innerHTML = '<a href="prihlasenie.html">Prihlasit sa</a>';
}

// Завантажуємо книжки при відкритті сторінки
nacitajKnihy();