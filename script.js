const taskInput = document.querySelector(".task-input input"),
//console.log(taskInput)
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"), 
boton = document.querySelector(".clear-btn"),
taskbox = document.querySelector(".task-box");

//console.log(taskbox);


let editId;
let isEditedTask = false;
let todos = JSON.parse(localStorage.getItem("todo-list")); //obtengo las tareas del local Storage


if( todos.length == 0){
       
        
    boton.classList.add("claro"); 
}



filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active"); //remueve la etiqueeta que tiene active 
        btn.classList.add("active"); //agrega la etiqueta
        mostrarTareas(btn.id)
        console.log(btn.id) //mandarle el estado, si es pendiente, completed o all
    })
});



function mostrarTareas(filter){
    let li = "";
    //if( todos.length = 0){
              
      //   
   // }

    if(todos){
        
        
        todos.forEach((todo,id) => { //recorre el arreglo todo
            //si el estado de la tarea esta completado, modifica el valor  a checked
            let isCompleted = todo.status == "completed" ? "checked" : ""; //esto hace para que al actaulizar muestre la tarea  tachada y tildada
           if( filter == todo.status || filter == "all"){
               li += `
            <li class="task">
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="task-menu">
                            <li onclick="editTask(${id}, '${todo.name}')" > <i class="uil uil-pen"></i>Editar</li>
                            <li onclick="deleteTask(${id})"> <i class="uil uil-trash"></i>Eliminar</li>
                        </ul>
                    </div>
                </li>` 
           }
           
                //console.log(id,todo);
            }); }
    taskbox.innerHTML = li || `<span class="tamanio"> No tienes ninguna tarea </span> `; //acceso al elemento y agrego el li con todas las tareas obtenidas del localstorage
}

mostrarTareas("all");


function showMenu(tareaSeleccionada){

    //console.log(tareaSeleccionada);
    let taskMenu = tareaSeleccionada.parentElement.lastElementChild; 
    //console.log(taskMenu)
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        //console.log(e.target) //me devuelve el objeto
      //  console.log(e.target.tagName) //nombre de la etiqueta

        if(e.target.tagName != "I"   || e.target != tareaSeleccionada){
            taskMenu.classList.remove("show");

        }
    });


}

function editTask(taskId, taskName){
    editId = taskId;
    taskInput.value =taskName
    isEditedTask = true;
}


function deleteTask(deleteId){
//console.log (deleteId)
    todos.splice(deleteId,1)
    localStorage.setItem("todo-list", JSON.stringify(todos));
    if( todos.length == 0){
       
        
        boton.classList.remove("claro"); 
    }
    mostrarTareas("all");

}






clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    mostrarTareas("all");
    if( todos.length == 0){
       
        
        boton.classList.add("claro"); 
    }
    
});



//cuando presiono en el check me devuelve la tarea
function updateStatus(e){
    //console.log(e);
    let taskName = e.parentElement.lastElementChild; //obtengo el nodo padre, y lueg el ultimo nodo hijo de padre
    //console.log(selectTask.parentElement) aqui devuelve el nodo padre del elemento
    //console.log(taskName) aqui devuelve el ultimo nodo hijo del elemento padre
    if(e.checked){ //si el elemento chechbox ha sido chequeado, devuelve true o false, son dos propiedades del input "checkbox"
        taskName.classList.add("checked"); //agrego en la etiqueta p lo siguiente: class="checked"
        todos[e.id].status = "completed" //toma el arreglo, selecciona el id
        
    } else{
        taskName.classList.remove("checked")
        todos[e.id].status = "pending"
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}







//keyup:  El usuario libera la tecla.
taskInput.addEventListener("keyup", e => { //keyup:  El usuario libera la tecla.
    let userTask = taskInput.value.trim(); //obtengo lo que escribo en el input
    //console.log(userTask);
    if (e.key == "Enter" && userTask){
      // console.log(userTask)
     if(!isEditedTask){ //si es falso
            if(!todos){
                todos = [];
            }  
            let taskInfo = {name: userTask, status:"pending"}; //define la var y guarda la tarea como arreglo
            todos.push(taskInfo); //inserta la sentencia anterior en el arreglo  llamado "todos"
            boton.classList.remove("claro"); 
     }else {
         isEditedTask = false;
         todos[editId].name = userTask //edita el registro segun ese id
         boton.classList.remove("claro"); 
     }
      
      
      taskInput.value = ""; //pone vacio el input para que al hacer enter se borre
       localStorage.setItem("todo-list", JSON.stringify(todos))
       if( todos.length == 0){
       
        
        boton.classList.remove("claro"); 
    }
      mostrarTareas("all");
    }
});