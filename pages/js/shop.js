 let categories = [];
        let i = 0;
        let cart = [];

        fetch('../products.json')
            .then(response => response.json())
            .then(data => {
                categories = [...new Set(data.map(item => item))];
                renderProducts();
            })
            .catch(error => console.error('Error fetching products:', error));

        function renderProducts() {
            document.getElementById('root').innerHTML = categories.map(item => {
                const { image, title, price } = item;
                return (
                    `<div class='box'>
                        <div class='img-box'>
                            <img class='images' src=${image} style="width: fit-content"></img>
                        </div>
                        <div class='bottom'>
                            <p>${title}</p>
                            <h2>$ ${price}.00</h2>` +
                            `<button onclick='addtocart(${i++})'>Add to cart</button>` +
                        `</div>
                    </div>`
                );
            }).join('');
        }

        function addtocart(a) {
            cart.push({ ...categories[a] });
            displaycart();
        }

        function delElement(a) {
            cart.splice(a, 1);
            displaycart();
        }

        function displaycart() {
            let j = 0, total = 0;
            document.getElementById("count").innerHTML = cart.length;
            if (cart.length === 0) {
                document.getElementById('cartItem').innerHTML = "Your cart is empty";
                document.getElementById("total").innerHTML = "$ 0.00";
            } else {
                document.getElementById("cartItem").innerHTML = cart.map(items => {
                    const { image, title, price } = items;
                    total += price;
                    document.getElementById("total").innerHTML = "$ " + total + ".00";
                    return (
                        `<div class='cart-item'>
                            <div class='row-img'>
                                <img class='rowimg' src=${image}>
                            </div>
                            <p style='font-size:12px;'>${title}</p>
                            <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
                            `<i class='fa fa-trash' onclick='delElement(${j++})'></i></div>`
                    );
                }).join('');
            }
        }