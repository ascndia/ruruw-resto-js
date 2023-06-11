export function RemoveCategory(id){
    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data):[];
    if(data == []){
        return;
    } else {
        data = data.filter(e => {
           return e.id != id;
        })
        localStorage.setItem('menu',JSON.stringify(data));
    }
}
    