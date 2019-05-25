//Element Seçimi
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList= document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners(){//Gerekli tüm event listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
    

}
function clearAllTodos(e){
    if(confirm("Tüm todolar silinsin mi?")){
        //Arayüzden todoların silinmesi
        while (todoList.firstElementChild != null){//hala bir elemnt varsa(todo)
            todoList.removeChild(todoList.firstElementChild);
        }
        //TodoListte gez ve ilk eleman null olana kadar sil
        localStorage.removeItem("todos");
    }
    
}
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)=== -1)// bulamadı
        {
            listItem.setAttribute("style","display : none !important");
        }
        else{listItem.setAttribute("style","display : block");}
    });
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();//arayüzden silmek
       deleteTotoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Silindi");

    }

}
function deleteTotoFromStorage(deletetodo){
    let todos = getTodosFromStorage();//tüm todoları getirip
    todos.forEach(function(todo,index){// todoların üzerinde gezin
        if(todo === deletetodo){//aradığımız todoyu bulduğunda sil
            todos.splice(index,1);// Arrayden değeri silme

        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));

}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){ // Storagedeki todolar sayfa yenilendiğinde ekranda olacak
        addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    if(newTodo===""){
        showAlert("danger","Lütfen bir todo giriniz");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo eklendi");
    }
    


    e.preventDefault();
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos = [];
    }
    else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoToStorage(newTodo){
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));


}
function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){//Hata mesajı 1sn sonra silinsin
        alert.remove();

    },1000);

}
function addTodoToUI(newTodo){//Arayüze Todoyu ekleme
    const listItem =document.createElement("li");//ListItem
    const link =document.createElement("a");//İiçindeki linkler
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";
    //Gelen Todo
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);//TodoListe ListItemi ekleme
    todoInput.value="";


}