

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pay-form').forEach(function(element) {
        element.addEventListener('click', function(e) {
            console.log('reijeroif');

            var formData = new FormData(this);
            var formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });

            fetch('/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    var options = {
                        "key": "" + res.key_id + "",
                        "amount": "" + res.amount + "",
                        "currency": "INR",
                        "name": "" + res.product_name + "",
                        "description": "" + res.description + "",
                        "image": "https://dummyimage.com/600x400/000/fff",
                        "order_id": "" + res.order_id + "",
                        "handler": function (response) {
                            alert("Payment Succeeded");
                            // window.open("/","_self");
                        },
                        "prefill": {
                            "contact": "" + res.contact + "",
                            "name": "" + res.name + "",
                            "email": "" + res.email + ""
                        },
                        "notes": {
                            "description": "" + res.description + ""
                        },
                        "theme": {
                            "color": "#2300a3"
                        }
                    };
                    var razorpayObject = new Razorpay(options);
                    razorpayObject.on('payment.failed', function (response) {
                        alert("Payment Failed");
                    });
                    razorpayObject.open();
                } else {
                    alert(res.msg);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});
