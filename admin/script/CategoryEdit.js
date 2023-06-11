export function EditCategory(newname,id){
    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data):[];
    if(data == []){
        return;
    } else {     
        data = data.map(e => {
            if(e.id === id){
                return {...e, name: newname};
            }
            return e;
        })
        localStorage.setItem('menu',JSON.stringify(data));
    }
}