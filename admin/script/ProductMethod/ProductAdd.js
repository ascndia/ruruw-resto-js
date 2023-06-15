export function AddProduct(id){
    if(id === undefined){
        alert('Select a Category');
        return;
    }
    $(document).ready(function(){
        let data = localStorage.getItem('menu');
        data = data ? JSON.parse(data): [];
        if(data.length == 0){
            alert('Category Empty')
            return;
        } 
        else if($('#inputname').val() == "" || ($('#inputprice').val() == "" || $('#inputprice').val() <= 0 )){
            alert('Please Fill form Correctly');
            return;
        }
        else 
        {
            let cat = data.find(e => {
                return e.id == id;
            })
            let newproduct = {};
            newproduct.name = $('#inputname').val();
            $('#inputname').val("");
            newproduct.price = parseFloat($('#inputprice').val());
            $('#inputprice').val("");
            newproduct.id = new Date().getTime();
            cat.items.push(newproduct);
            localStorage.setItem('menu',JSON.stringify(data));
            alert('Product Added')
        }
        
    })
   
}