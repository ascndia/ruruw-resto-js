import { RenderMenuContent } from "./RenderMenuContent.js";

let header = $('#menu-header');
let dropdownmenu = $('.dropdown');
let menu = $('.menu-title');
menu.click(()=>{
    dropdownmenu.toggleClass('dd-show');
})

export function RenderMenuHeader(selectedcategories){

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){
        header.text('Category Empty')
    } else {
        dropdownmenu.text("");
        if(selectedcategories == undefined){
            menu.text('All Categories');
        } else {
            let a = data.find(e => {
                return e.id == selectedcategories;
            })
            menu.text(`${a.name}`);
        }
        let d = $('<span>');
        d.addClass('material-symbols-outlined');
        d.text('arrow_drop_down');
        d.css({
            'position':'absolute',
            'right':'6px'
        })
        menu.append(d);
       
        let li = $('<div>');
        if(selectedcategories == undefined){
            li.addClass('dd-list-active');
        }

        li.addClass('dd-list');
        li.text('All Categories');
        li.click(function(){
            selectedcategories = undefined;
            RenderMenuHeader(selectedcategories);
            RenderMenuContent(selectedcategories);
            dropdownmenu.toggleClass('dd-show');
        })
        dropdownmenu.append(li);
    
        data.forEach(element => {
            let li = $('<div>');
            if(element.id == selectedcategories){
                li.addClass('dd-list-active');
            }
            li.addClass('dd-list');
            li.text(`${element.name}`);
            li.attr('data-id',`${element.id}`);
            li.click(function(){
                selectedcategories = $(this).attr('data-id');
                RenderMenuHeader(selectedcategories);
                RenderMenuContent(selectedcategories);
                dropdownmenu.toggleClass('dd-show');
            })
            dropdownmenu.append(li);
        });   
    }
}