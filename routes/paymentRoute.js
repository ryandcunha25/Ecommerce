document.getElementById('buyNow').addEventListener('click', async () => {
    console.log('proceeding to payment...');
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    console.log(total); // This will print the total value to the console

    // Convert total to integer paise
    const amountInPaise = Math.round(total * 100);
    console.log(amountInPaise); // This will print the amount in paise to the console

    const orderResponse = await fetch('/products/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: amountInPaise, // Razorpay expects the amount in paise
            currency: 'INR',
            receipt: `receipt_${Math.random().toString(36).substr(2, 9)}`
        })
    });

    const order = await orderResponse.json();
    console.log(order)

    const options = {
        key: 'rzp_test_8Yxkd0FgKI1EqR', // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async function(response) {
            const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
            };

            const verifyResponse = await fetch('/products/verify-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });

            const verificationResult = await verifyResponse.json();

            if (verificationResult.status === 'success') {
                alert('Payment successful!');
                cart = [];
                displaycart();
            } else {
                alert('Payment verification failed!');
            }
        },
        prefill: {
            name: 'Your Name',
            email: 'your.email@example.com',
            contact: '9999999999'
        },
        theme: {
            color: '#F37254'
        }
    };

    const paymentObject = new Razorpay(options);
    paymentObject.open();
});