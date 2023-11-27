export class UI {
    constructor() {
        this.employeesList = document.getElementById("employees");
        this.updatesList = document.getElementById("update");
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
    }
    addAllEmployeeToUI(employees) {
        // burada her employees üzerinden gezineçeğiz
        //     <!-- <tr>

        //     <td>Mustafa Murat Coşkun</td>
        //     <td>Bilişim</td>
        //     <td>4000</td>
        //     <td>1</td>
        //     <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        //     <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        // </tr>

        let result = "";
        employees.forEach(employee => {
            result += `
            
            <tr>
                                            
               <td>${employee.name}</td>
                 <td>${employee.department}</td>
                 <td>${employee.salary}</td>
                 <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
             </tr>      
            
            `
        });
        this.employeesList.innerHTML = result;

    }
    //(4)
    clearInputs() {
        this.nameInput.value = "";
        this.departmentInput = "";
        this.salaryInput = "";
    }
    //(7)
    // addAllEmployeeToUI(employee) {
    //     this.employeesList.innerHTML += `
    //         <tr>

    //         <td>${employee.name}</td>
    //           <td>${employee.department}</td>
    //           <td>${employee.salary}</td>
    //           <td>${employee.id}</td>
    //          <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
    //          <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    //       </tr>  


    //         `; 

    // }
    //(12)
    deleteEmployeeFromUI(element) {
        element.remove;
    }
    //(14)
    toggleUpdateButton(target) {// bu target tr saklıyor
        if (this.updateButton.style.display == "none") {
            this.updateButton.style.display = "block"
            // bunları yaptıktan sonra güncele button gelecek ondan sonra yeni bilgiler eklmek içinde
            this.addEmployeeInfoInputs(target);
        } else {
            this.updateButton.style.display = "none";
            //(16) güncele bastıktan sonra icerisindekini boşaltması içinde
            this.clearInputs();
        }
    }
    //(15)
    addEmployeeInfoInputs(target) {
        const children = target.children;

        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;

    }
    //(17)
    updateEmployeeOnUI(employee, parent) {
        parent.innerHTML = `
        <tr>                               
            <td>${employee.name}</td>
               <td>${employee.department}</td>
               <td>${employee.salary}</td>
              <td>${employee.id}</td>
              <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
         <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
          </tr>  
        `
        this.clearInputs();// (19)
    }


}