async function loadOrders() {
    const res = await fetch("/orders");
    const orders = await res.json();

    const container = document.getElementById("orders");
    container.innerHTML = "";

    orders.forEach(order => {
        container.innerHTML += `
            <div class="order">
                <b>${order.name}</b><br>
                ${order.address}<br>
                Durum: <b>${order.status}</b><br>
                <small>${order.time}</small><br><br>
                <button onclick="updateStatus(${order.id}, 'Yolda')">Yolda</button>
                <button onclick="updateStatus(${order.id}, 'Teslim Edildi')">Teslim Edildi</button>
            </div>
        `;
    });
}

async function addOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;

    await fetch("/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address })
    });

    loadOrders();
}

async function updateStatus(id, status) {
    await fetch("/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
    });

    loadOrders();
}

loadOrders();