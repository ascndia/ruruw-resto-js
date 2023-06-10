export function AddCategory(){
    let name = $('#cadd-input').val();
    if(name == ""){
        alert("Please Fill Category Name");
        return;
    }
    $('#cadd-input').val("");
    console.log(name);
    let category = {};
    category.name = name;
    category.id = new Date().getTime();
    category.items = [];
    console.log(category);
}