const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const ORDERS_FILE = "./data/orders.json";

app.get("/orders", (req, res) => {
    const data = JSON.parse(fs.readFileSync(ORDERS_FILE));
    res.json(data);
});

app.post("/orders", (req, res) => {
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
    const newOrder = {
        id: Date.now(),
        name: req.body.name,
        address: req.body.address,
        status: "Hazırlanıyor",
        time: new Date().toLocaleString()
    };
    orders.push(newOrder);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    res.json({ success: true });
});

app.post("/orders/update", (req, res) => {
    let orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
    orders = orders.map(o =>
        o.id === req.body.id ? { ...o, status: req.body.status } : o
    );
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Kurye sistemi çalışıyor: " + PORT));
