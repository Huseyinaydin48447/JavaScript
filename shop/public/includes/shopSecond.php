<div class="pro-container">
            <?php
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "alisveris";

            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $productIds = [ 9, 10, 11, 12, 13, 14, 15, 16]; // Ürün ID'leri

            foreach ($productIds as $productId) {
                $sql = "SELECT id, product_name, product_description, product_price, product_image_name FROM shop WHERE id = $productId";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $imagePath = "../img/" . $row['product_image_name'];
            ?>

                    <div class="pro">
                        <div href="product.html" onclick="sendData(event)">
                            <img src="<?php echo $imagePath; ?>" style="height: 316.46px; height:316.46px" alt="">
                            <div class="des">
                                <span>adidas</span>
                                <h5><?php echo $row['product_description']; ?></h5>
                                <div class="star">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                                <h4><?php echo $row['product_price']; ?>₺</h4>
                            </div>
                        </div>
                        <a href="#" id="add-to-cart"><i class=" fas fa-shopping-cart cart "></i></a>
                    </div>

            <?php
                }
            }

            $conn->close();
            ?>
        </div>