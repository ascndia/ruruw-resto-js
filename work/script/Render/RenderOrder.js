import * as Rmv from "../OrderMethod/OrderRemove.js";

let body = $('#order-content');

export function RenderOrderList(orders){
    body.text("");

    if(orders.items.length == 0){
        body.css({
            'display':'flex',
            'justify-content':'center',
            'align-items':'center',
            'text-align':'center'
        })
        body.text('Empty..')
    } else {
        body.css({
            'flex-direction':'column',
            'gap':'16px',
            'justify-content':'flex-start'
        })

        let data = localStorage.getItem('menu');
        data = data ? JSON.parse(data): [];

        if (data.length == 0){
            return;
        }
        orders.items.forEach(order => {
            let selected = data.flatMap(category => category.items).find(item => item.id == order.id);
            let li = $('<div>');
            li.addClass('o-list');
            li.attr('data-id',order.id)

            let top = $('<div>');
            top.addClass('ol-top');
            top.text(selected.name);

            let count = $('<span>');
            count.addClass('ol-count');
            count.text(`${order.count} Items`)
            top.append(count);

            let bot = $('<div>');
            bot.addClass('ol-bot');

            let price = $('<span>');
            price.addClass('ol-p')
            price.text(`Price: Rp ${parseInt(selected.price).toLocaleString()}`);

            let totalprice = $('<span>');
            totalprice.addClass('ol-tp')
            totalprice.text(`Total Price: Rp ${(parseInt(selected.price) * order.count).toLocaleString()}`);

            bot.append(price);
            bot.append(totalprice);

            let rmv = $('<span>');
            rmv.addClass('material-symbols-outlined ol-rmv');
            rmv.text('delete');
            bot.append(rmv);

            // Remove order
            rmv.click(function(){
                orders.items = orders.items.filter(e => {
                    return e.id !== order.id;
                })
                RenderOrderList(orders);
                RenderOrderHeader(orders);
            })

            li.append(top);
            li.append(bot);
            top.click(function(){
                li.toggleClass('ol-clicked')
                top.toggleClass('ol-top-clicked')
                bot.toggleClass('ol-bot-clicked')
            })
            body.append(li);
        })
    }
    
}
let tp = $('#h-tp');
let ic = $('#h-count');
let hid = $('#h-id');
export function RenderOrderHeader(orders){

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    let items = 0;
    let total = 0;
    orders.items.forEach(e => {
        let selected = data.flatMap(category => category.items).find(item => item.id == e.id);
        total = total + parseInt(selected.price) * e.count;
        items = items + e.count;
    })
    
    hid.text(`OID: ${orders.id}`)
    tp.text(`Rp ${total.toLocaleString()}`);
    ic.text(`${items} Items`)

}