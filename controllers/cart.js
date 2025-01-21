function updatePrice() {

    const quantity1 = parseInt(document.getElementById("quantity1").value) || 1;
    const quantity2 = parseInt(document.getElementById("quantity2").value) || 1;
    const quantity3 = parseInt(document.getElementById("quantity3").value) || 1;

    const price1 = 1999;
    const price2 = 899;
    const price3 = 2999;

    const finalPrice1 = price1 * quantity1;
    const finalPrice2 = price2 * quantity2;
    const finalPrice3 = price3 * quantity3;

    document.getElementById("finalPrice1").innerText = finalPrice1;
    document.getElementById("finalPrice2").innerText = finalPrice2;
    document.getElementById("finalPrice3").innerText = finalPrice3;

    const totalPrice = finalPrice1 + finalPrice2 + finalPrice3;
    document.getElementById("totalPrice").innerText = totalPrice;

    const shippingFee = 100;
    const discount = 100;
    const finalTotal = totalPrice + shippingFee - discount;

    document.getElementById("finalTotal").innerText = finalTotal;
}

function updateQuantity(action, quantityId) {
    const quantityField = document.getElementById(quantityId);
    let currentQuantity = parseInt(quantityField.value) || 1;

    if (action === 'plus') {
        currentQuantity++;
    } else if (action === 'minus' && currentQuantity > 1) {
        currentQuantity--;
    }

    quantityField.value = currentQuantity;
    updatePrice(); // Updating price after quantity change
}

document.querySelectorAll('.btn-plus').forEach(button => {
    button.addEventListener('click', function () {
        const quantityId = this.dataset.quantityId;
        updateQuantity('plus', quantityId);
    });
});

document.querySelectorAll('.btn-minus').forEach(button => {
    button.addEventListener('click', function () {
        const quantityId = this.dataset.quantityId;
        updateQuantity('minus', quantityId);
    });
});

// Initial call to set the price when the page loads
updatePrice();
