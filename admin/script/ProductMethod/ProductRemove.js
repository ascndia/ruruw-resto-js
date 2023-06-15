import { RenderProductEdit } from "../ProductRender.js";

export function ProductRemove(id){   

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){
        return;
    } else {
        const next = confirm('Are you sure?')
        if(next){
            data = data.map(element => {
                element.items = element.items.filter(e => {
                    return e.id !== id;
                })
                return element;
            })
        localStorage.setItem('menu',JSON.stringify(data));
        alert('Product Deleted')
        } else {
            alert('Operation Canceled')
        }
        
    }
}