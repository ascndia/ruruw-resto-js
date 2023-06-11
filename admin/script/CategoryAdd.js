
export function AddCategory(){
    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    let name = $('#cadd-input').val();
    if(name == ""){
        alert("Please Fill Category Name");
        return;
    }
    $('#cadd-input').val("");
    let category = {};
    category.name = name;
    category.id = new Date().getTime();
    category.items = [];
    data.push(category);

    localStorage.setItem('menu',JSON.stringify(data));
}