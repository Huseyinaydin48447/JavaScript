<script>
        document.addEventListener("DOMContentLoaded", function() {
            updateNavbarContent();

            function updateNavbarContent() {
                const authUsername = localStorage.getItem("auth");

                const loginLink = document.querySelector("#navbar-login .dropdown-btn");
                const dropdownContent = document.querySelector("#navbar-login .dropdown-content");

                if (loginLink && dropdownContent) {
                    if (authUsername) {
                        // Oturum açılmışsa
                        loginLink.innerHTML = `<i class="fas fa-user"></i> ${authUsername}`;

                        const hesabimLink = document.createElement("a");
                        hesabimLink.href = "#";
                        hesabimLink.textContent = "Hesabım";

                        const logoutLink = document.createElement("a");
                        logoutLink.href = "#";
                        logoutLink.id = "logout-link";
                        logoutLink.textContent = "Çıkış Yap";

                        logoutLink.addEventListener("click", function() {
                            localStorage.removeItem("auth");
                            updateNavbarContent(); // Çıkış yapıldığında anında güncelleme yap
                        });

                        dropdownContent.innerHTML = "";
                        dropdownContent.appendChild(hesabimLink);
                        dropdownContent.appendChild(logoutLink);
                    } else {
                        // Oturum açılmamışsa
                        loginLink.innerHTML = `<i class="fas fa-user"></i> Login`;

                        dropdownContent.innerHTML = `
                    <a href="./login/index.html">Login</a>
                    <a href="./login/index.html">Sign Up</a>
                `;
                    }
                }
            }

            console.log('DOM content loaded');
            var addToCartButtons = document.querySelectorAll('.pro #add-to-cart');
            var cartCountElement = document.getElementById('cart-count');

            addToCartButtons.forEach(function(button) {
                button.addEventListener('click', function(event) {
                    event.preventDefault();

                    var currentCount = parseInt(cartCountElement.textContent);
                    cartCountElement.textContent = currentCount + 1;
                });
            });



            function sendData(event) {
                event.preventDefault(); // Sayfa yönlendirmesini engelle

                // Seçilen ürünün bilgilerini al
                let img = event.currentTarget.querySelector("img").src;
                let brand = event.currentTarget.querySelector("span").textContent;
                let name = event.currentTarget.querySelector("h5").textContent;
                let price = event.currentTarget.querySelector("h4").textContent;

                // Bilgileri bir nesne olarak sakla
                let product = {
                    img: img,
                    brand: brand,
                    name: name,
                    price: price
                };

                // Nesneyi JSON formatına çevir
                let productJSON = JSON.stringify(product);

                // Bilgileri yerel depolamaya kaydet
                localStorage.setItem("product", productJSON);

                // Product.html sayfasına yönlendir
                window.location.href = "product.html";
            }

        });

        function sendData(event) {
            event.preventDefault();

            let img = event.currentTarget.querySelector("img").src;
            let brand = event.currentTarget.querySelector("span").textContent;
            let name = event.currentTarget.querySelector("h5").textContent;
            let price = event.currentTarget.querySelector("h4").textContent;

            // Bilgileri bir nesne 
            let product = {
                img: img,
                brand: brand,
                name: name,
                price: price
            };

            let productJSON = JSON.stringify(product);
            localStorage.setItem("product", productJSON);

            window.location.href = "product.html";
        }
    </script>