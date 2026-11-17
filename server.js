const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Налаштування підключення до бази (додайте, якщо немає)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "knihy"
});

// 8. Читання книг (GET)
app.get("/api/knihy", (req, res) => {
    db.query("SELECT * FROM kniznica", (error, knihy) => {
        if (error) { console.error(error); return res.status(500).send("Chyba SQL"); }
        res.json(knihy);
    });
});

// 9. Додавання книги (POST)
app.post("/api/knihy", (req, res) => {
    const { nazov, autor, rok, cena } = req.body;
    db.query("INSERT INTO kniznica (nazov, autor, rok, cena) VALUES (?, ?, ?, ?)",
        [nazov, autor, rok, cena], (error) => {
            if (error) { console.error(error); return res.status(500).send("Chyba SQL"); }
            res.send("Kniha pridana");
        });
});

// 9-10. Видalення книги (DELETE)
app.delete("/api/knihy/:id", (req, res) => {
    db.query("DELETE FROM kniznica WHERE id = ?", [req.params.id], (error) => {
        if (error) { console.error(error); return res.status(500).send("Chyba SQL"); }
        res.send("Kniha vymazana");
    });
});

// Зміна ціни (PATCH)
app.patch("/api/knihy/:id/cena", (req, res) => {
    const zmena = Number(req.body.zmena);
    if (!Number.isFinite(zmena))
        return res.status(400).send("Neplatna zmena");
    const sql = "UPDATE kniznica SET cena = cena + ? WHERE id = ?";
    db.query(sql, [zmena, req.params.id], (error, vysledok) => {
        if (error) { console.error(error); return res.status(500).send("Chyba SQL"); }
        if (!vysledok.affectedRows) return res.sendStatus(404);
        res.send("Cena zmenena");
    });
});

// Úprava knihy (PUT)
app.put("/api/knihy/:id", (req, res) => {
    const { nazov, autor, rok } = req.body;
    if (!nazov || !autor || !Number.isInteger(rok))
        return res.status(400).send("Neplatne udaje");
    const sql =
        "UPDATE kniznica SET nazov = ?, autor = ?, rok = ? WHERE id = ?";
    db.query(sql, [nazov, autor, rok, req.params.id],
        (error, vysledok) => {
            if (error) { console.error(error); return res.status(500).send("Chyba SQL"); }
            if (!vysledok.affectedRows) return res.sendStatus(404);
            res.send("Kniha upravena");
        });
});

app.listen(3000, () => console.log("http://localhost:3000"));