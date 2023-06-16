
import { Request } from "./requests";
import { UI } from "./ui";

const formm = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
// export dahil etmek içinde import kullanılır
const request = new Request("http://localhost:3000/employees");
//(16)
// buradaki updateState  güncele tablosunun daki bütün veriyi alır
let updateState = null;

request.get()
.then(employees => console.log(employees))
.catch(err => console.log(err));

// request.post({name:"mehmet kaya",department:"pazarlama",salary:600})
// .then(employee => console.log(employee))
// .catch(err => console.log(err))

// request.put(1,{name:"ali kaya",department:"pazarlama",salary:600})
// .then(employee => console.log(employee))
// .catch(err => console.log(err))

// request.delete(3)
// .then(message => console.log(message))
// .catch(err => console.log(err))

const ui = new UI();

eventListeners();
function eventListeners() {
    
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    //(2)
    
        formm.addEventListener("submit",addEmployee);

    //(8)
    employeesList.addEventListener("click", UpdateOrDelete);
    //(14)
    updateEmployeeButton.addEventListener("click",updateEmployee);

}
function getAllEmployees() {
    // reguest içindekileri  web eklemek için request.get() kullanılır.
    request.get()
        .then(employees => {
            // bize gelen employees buraya yazarak başka yerde çağrıyoruz aşağo+ı
            ui.addAllEmployeeToUI(employees);

        })
        .catch(err => console.log(err))
    //(3)
    function addEmployee(e) {

        //(6)
        const employeeName = nameInput.value.trim();
        const employeeDepartment = departmentInput.value.trim();
        const employeeSalary = salaryInput.value.trim();

        if (employeeName === " " || employeeDepartment === " " || employeeSalary === " ") {
            alert("LÜTFEN BÜTÜN ALANLARI DOLDURUNUZ...");
        } else {
            request.post({ name: employeeName, department: employeeDepartment, salary: employeeSalary })
                // arayüze eklemek içinde
                .then(employee => {
                    ui.addAllEmployeeToUI(employee);
                })
                .catch(err => console.log(err))

        }


        //(5)
        ui.clearInputs();
        e.preventDefault();

    }
    //(9)
    function UpdateOrDelete(e) {
        // console.log(e.target);
        if(e.target.id==="delete-employee") {
            // Silme
            deleteEmployee(e.target);
        }
        else if(e.target.id==="update-employee") {
            //Güncelleme
            //(12)
            updateEmployeeController(e.target.parentElement.parentElement);// hepsini alması için

        }

    }
    //(10)
    function deleteEmployee(targetEmployee) {
        const id=targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
        request.delete(id)
        .then(message=>{
            //(11)
            ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);// burada tr en yukarısana girmek için kullandı içindekini
          //(18)  // ui.clearInputs();// tablonun içerisini boşaltır günceleme yaptıktan sonra.
        })
        .catch(err => console.error(err) )
    }
//(13)
    function  updateEmployeeController(targetEmployee){// tr hepsini kapsar
        ui.toggleUpdateButton(targetEmployee)
        //(17)
        if(updateState === null){
            updateState ={
                updateId : targetEmployee.children[3].textContent,
                updateParent: targetEmployee// güncelede nereyi değiştirmek istiyorsak onun tekrardan oraya  gelmesi için targetEmployee
            }
        }else{
            updateState=null; // buradaki null güncele 2 defa bastığımz hiç bir şey olmaması

        }

    }
    //(15)
    function updateEmployee(){
        //(18) updateState id demek
        if(updateState){
            // günceleme
            const data={name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())}

            // id=updateState.updateId
            request.get(updateState.updateId,data)
            .then(updateEmployee => {
                // günceledikten sonra tablonun içerisini değiştirmek içinde
                // güncelemiş updateEmployee gönderiyoruz
                // tr güncelemek içinde  updateState yazıyoruz



            })
            .catch(err=> console.log(err))
        }

    }


}
