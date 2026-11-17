function nacitajKnihy() {
    fetch("/api/knihy")
        .then(odpoved => odpoved.json())
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
                const tlacidlo = document.createElement("button");
                tlacidlo.textContent = "Vymazať";
                tlacidlo.onclick = () => {
                    if (!confirm(`Naozaj chceš vymazať knihu „${kniha.nazov}“?`)) return;
                    fetch("/api/knihy/" + kniha.id, { method: "DELETE" })
                        .then(() => nacitajKnihy());
                };
                bunkaAkcia.appendChild(tlacidlo);
                riadok.appendChild(bunkaAkcia);

                zoznam.appendChild(riadok);
            });
        });
}

function pridatKnihu() {
    const kniha = {
        nazov: document.getElementById("nazov").value,
        autor: document.getElementById("autor").value,
        rok: Number(document.getElementById("rok").value),
        cena: Number(document.getElementById("cena").value)
    };

    fetch("/api/knihy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kniha)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById("nazov").value = "";
            document.getElementById("autor").value = "";
            document.getElementById("rok").value = "";
            document.getElementById("cena").value = "";
            nacitajKnihy();
        }
    });
}

// Завантажуємо книжки при відкритті сторінки
nacitajKnihy();