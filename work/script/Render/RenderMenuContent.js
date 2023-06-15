import * as Order from "../AddOrder.js"
import * as Or from "../Render/RenderOrder.js"

let body = $('#menu-content');

export function RenderMenuContent(selectedcategories){

    body.text("");

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){
        var m = $('<p>');
        m.text('Theres no items yet');
        body.append($(m));

        var button = $('<button>');
        button.click(function(){
            let next = confirm('Proceed to Admin page?');
            if(next){
                window.location.href="../../../ruruw-resto-js/admin/admin.html"
            } else {
                alert('Operation canceled')
            }  
        });
        button.text('Add items in Admin page');
        button.addClass('btn')
        body.append(button);
        body.css({
            'display':'flex',
            'gap':'16px',
            'flex-direction':'column',
            'justify-content':'center',
            'align-items':'center',
            'font-size': '1.2rem'
        })
    } else {
        if(selectedcategories == undefined){

            let total = 0;
            data.forEach(i => i.items.forEach(o => {
                total++;
            }))

            if(total == 0){

                var m = $('<p>');
                m.text('Theres no items yet');
                body.append($(m));

                var button = $('<button>');
                button.click(function(){
                    let next = confirm('Proceed to Admin page?');
                    if(next){
                        window.location.href="../../../ruruw-resto-js/admin/admin.html"
                    } else {
                        alert('Operation canceled')
                    }  
                });
                button.text('Add items in Admin page');
                button.addClass('btn')
                body.append(button);
                body.css({
                    'display':'flex',
                    'gap':'16px',
                    'flex-direction':'column',
                    'justify-content':'center',
                    'align-items':'center',
                    'font-size': '1.2rem'
                })

            } else {

                data.forEach(e => e.items.forEach(a => {
                    let li = $('<div>');
                    li.addClass('menu-list');
                    li.attr('data-id',a.id);
                    li.text(a.name);
                    li.click(function(){
                        Order.AddOrder(a.id);
                    })
                    body.append(li);
    
                }))

            }
            
        } else {
            let cat = data.find(a => a.id == selectedcategories);
            if(cat.items.length == 0){
                let p = $('<span>');
                p.text('Theres no product..')
                p.css({
                    'position':'absolute',
                    'top':'50%',
                    'left':'50%',
                    'transform':'translate(-50%,-50%)'
                })
                body.append(p)
            } else {
                cat.items.forEach(e => {
                    let li = $('<div>');
                    li.addClass('menu-list');
                    li.attr('data-id',e.id);
                    li.text(e.name);
                    li.click(function(){
                        Order.AddOrder(e.id)
                    })
                    body.append(li);
                })
            }
        }
    }
}
