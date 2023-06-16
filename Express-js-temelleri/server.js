const express = require("express");
//(6)
const {accessControl,defaultMiddleware} = require("./middeleware");
const app = express();

const PORT = 5000;
//(14)13 yaptığımzda hata çıkyor onu yazdırmak için
app.use(express.json());

//(2)
const users = [
    { id: 1, name: "hüseyin aydın", place: "mardin" },
    { id: 2, name: "melek aydın", place: "istanbul" }
    //(16) buraya eklenir
];
//(7)
app.use(accessControl);// uygulama Kapsamı için
//(3)
// Get Request
// localhost :5000/users
//(8) accessControl sadece istediğimiz yerde kullanmak istiyorsak
// app.get("/users",accessControl, (req, res, next) => { kullanılır


app.get("/users",[ accessControl ,defaultMiddleware], (req, res, next) => {
    // res.send("Hello  Express!");
    //(4)
    res.json(users);
})
app.get("/products", (req, res, next) => {
    // res.send("Hello  Express!");
    //(4)
    res.send("Metin...");
})
//(12)
app.post("/users", (req, res, next) => {
    //(13) postman yaptımız şeyi yazmak içinde
    console.log(req.body);
    // (15) users klasörüne eklemek içinde
    users.push(req.body);
    res.json({
        success: true,
        data:"Post Request "
    });
})

app.put("/users/:id", (req, res, next) => {
    //(17)
    const id=parseInt(req.params.id);
    for(let i=0; i<users.length; i++){
        if(users[i].id===id){
            users[i]={
                ...users[i],
                ...req.body
            }
        }
    }
    res.json({
        success: true,
        data:users
    });
})
app.delete("/users/:id", (req, res, next) => {
    //(18)
    const id=parseInt(req.params.id);
    for(let i=0; i<users.length; i++){
        if(users[i].id===id){
           users.splice(i, 1);
        }
    }

    res.json({
        success: true,
        data:users
    });
})


app.listen(PORT, () => {
    console.log("Serveri başlatıyoruz PORTU: " + PORT);
});