import { RenderProductEdit } from "../ProductRender.js";

export function ProductEdit(id){
    let newname = $('#nameinput').val();
    let newprice = $('#priceinput').val();

    if(newname == "" || newprice == "" || newprice <= 0){
        alert('Please Fill valid value')
        return;
    }

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){
        return;
    } else {
        $('#nameinput').val("");
        $('#priceinput').val("");
        let selected = data.flatMap(category => category.items).find(item => item.id == id);
        selected.name = newname;
        selected.price = newprice;
        localStorage.setItem('menu',JSON.stringify(data));
        alert('Product edited succesfully')
        RenderProductEdit();
    }
}