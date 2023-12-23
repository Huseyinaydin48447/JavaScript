<?php
$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "alisveris";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Bağlantı hatası: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $productName = isset($_POST["product_name"]) ? $_POST["product_name"] : "";
    $productDescription = isset($_POST["product_description"]) ? $_POST["product_description"] : "";
    $productPrice = isset($_POST["product_price"]) ? $_POST["product_price"] : "";

    if (isset($_FILES["product_image"]) && $_FILES["product_image"]["error"] == 0) {
        $targetDir = "uploads/";
        $targetFile = $targetDir . basename($_FILES["product_image"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        if ($imageFileType != "jpg" && $imageFileType != "jpeg" && $imageFileType != "png" && $imageFileType != "gif") {
            echo "Sadece JPG, JPEG, PNG ve GIF formatlarına izin verilir.";
            $uploadOk = 0;
        }

        if ($uploadOk) {
            $imageData = file_get_contents($_FILES["product_image"]["tmp_name"]);
            $imageName = $_FILES["product_image"]["name"];

            $stmt = $conn->prepare("INSERT INTO shop (product_name, product_description, product_price, product_image_name, product_image_data) VALUES (?, ?, ?, ?, ?)");

            if ($stmt === false) {
                die("Prepare hatası: " . $conn->error);
            }

            $stmt->bind_param("ssdss", $productName, $productDescription, $productPrice, $imageName, $imageData);
            if ($stmt === false) {
                die("Bind_param hatası: " . $stmt->error);
            }

            $stmt->execute();

            if ($stmt === false) {
                die("Execute hatası: " . $stmt->error);
            }

            $stmt->close();

            echo "Ürün başarıyla ekledi ve veritabanına eklendi.";
        }
    } else {
        echo "Dosya seçilmedi veya yüklenirken bir hata oluştu.";
    }
}

$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ürün Ekleme Formu</title>
</head>
<body>
    <h2>Ürün Ekleme Formu</h2>
    <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post" enctype="multipart/form-data">
        <label for="product_name">Ürün Adı:</label>
        <input type="text" name="product_name" id="product_name" required>
        <br>
        <label for="product_description">Ürün Açıklaması:</label>
        <textarea name="product_description" id="product_description" required></textarea>
        <br>
        <label for="product_price">Ürün Fiyatı:</label>
        <input type="text" name="product_price" id="product_price" required>
        <br>
        <label for="product_image">Ürün Resmi Seç:</label>
        <input type="file" name="product_image" id="product_image" accept="image/*" required>
        <br>
        <input type="submit" value="Ürünü Ekle">
    </form>
</body>
</html>
