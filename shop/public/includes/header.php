<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>48447 Alışveriş Sitesi</title>
    <script defer src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<section id="header">
        <a href="#">48447</a>
        <div>
            <ul id="navbar">
                <li><a class="active" href="home.php">Anasayfa</a></li>
                <li><a href="shop.php">Alışveriş</a></li>
                <li><a href="#">Hakkımızda</a></li>
                <li id="navbar-login" class="dropdown">
                    <a href="#" class="dropdown-btn"><i class="fas fa-user"></i>Login</a>
                    <div class="dropdown-content">
                        <a href="./login/index.html">Login</a>
                        <a href="./login/index.html">Sign Up</a>
                    </div>
                </li>
                <li id="navbar-messages" class="dropdown">
                    <a href="#" class="dropdown-btn"><i class="fas fa-envelope"></i></a>
                    <div class="dropdown-content messages-content">
                        <a href="message.html">
                            <div class="message-item">
                                <p><strong>John Doe:</strong> Hello, how are you?</p>
                            </div>
                        </a>
                        <a href="message.html">
                            <div class="message-item">
                                <p><strong>Jane Smith:</strong> Let's catch up later.</p>
                            </div>
                        </a>
                    </div>
                </li>



                <li id="navbar-notifications" class="dropdown">
                    <a href="#" class="dropdown-btn"><i class="fas fa-bell"></i></a>
                    <div class="dropdown-content notifications-content">
                        <a href="./notification.html">Sayın Mehmet kaya çekişten bir gömlek kazandınız</a>
                        <a href="#">Sayın Mehmet kaya çekişten bir gömlek kazandınız</a>
                        <a href="#">Sayın Mehmet kaya çekişten bir gömlek kazandınız</a>
                    </div>
                </li>

                <li id="navbar-cart"><a href="#"><i class="fas fa-shopping-cart"></i> Sepetim <span id="cart-count">0</span>
                    </a></li>

            </ul>

        </div>
        <div id="mobile">
            <i id="bar" class="fas fa-outdent"></i>
        </div>
    </section>
