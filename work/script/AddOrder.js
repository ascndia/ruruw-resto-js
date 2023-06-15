import * as Or from "./Render/RenderOrder.js"

let orders = {}
orders.id = new Date().getTime();
orders.items = [];

$(document).ready(function(){
    Or.RenderOrderList(orders);
    Or.RenderOrderHeader(orders);
    $('#process').click(function(){
        NewOrder();
    })
    $('#clear').click(function(){
        Clear();
    })
})

export function Clear(){
    if(orders.items.length == 0){
        alert('Cannot delete when order is empty');
    }
    orders.items = [];
    Or.RenderOrderList(orders);
    Or.RenderOrderHeader(orders);
}


export function NewOrder(){
    if(orders.items.length == 0){
        alert('Cannot delete when order is empty');
    }
    orders.id = new Date().getTime();
    orders.items = [];
    Or.RenderOrderList(orders);
    Or.RenderOrderHeader(orders);
}

export function AddOrder(id){

    let duplicate = false;
    orders.items.map(order => {
        if(order.id == id){
            duplicate = true;
            order.count++;
        }
        return order
    })
    if(!duplicate){
        let item = {};
        item.id = id;
        item.count = 1;
        orders.items.push(item);
    }
    Or.RenderOrderList(orders);
    Or.RenderOrderHeader(orders);
}

