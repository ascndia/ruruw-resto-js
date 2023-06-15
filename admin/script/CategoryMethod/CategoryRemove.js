export function RemoveCategory(id){

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data):[];

    if(data == []){
        return;
    } else {
        const next = confirm("Are you sure?");
        if(next){
            data = data.filter(e => {
                return e.id != id;
            })  
            localStorage.setItem('menu',JSON.stringify(data));
            alert('Category Deleted')
        } else {
            alert('Operation Cancled')
        }
        
    }
}
    