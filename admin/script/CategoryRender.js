import * as Add from "./CategoryMethod/CategoryAdd.js";
import * as Rmv from "./CategoryMethod/CategoryRemove.js";
import * as Edit from "./CategoryMethod/CategoryEdit.js";

import * as Pr from "./ProductRender.js";

let panel = $('#main-panel');
let selectedcategories;

export function RenderCategoryList(){  
    // Render the header
    panel.empty();
    let title = $('<p>');    
    title.attr('id','main-title');
    title.text('Categories > Categories List');
    panel.append(title);
    
    let main = $('<div>');
    main.attr('id','main-content');
    panel.append(main);

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): []; 

    if(data.length == 0){
        var m = $('<p>');
        m.text('Category Empty..');
        main.append($(m));

        var button = $('<button>');
        button.click(RenderCategoryAdd);
        button.text('Add new category');
        button.addClass('btn')
        main.append(button);
        main.css({
            'display':'flex',
            'gap':'16px',
            'flex-direction':'column',
            'justify-content':'center',
            'align-items':'center',
            'font-size': '1.2rem'
        })
    } else {
        main.css({
            'flex-direction':'column'
        })
        let header = $('<p>');
        header.text(`Category count : ${data.length}`);
        header.attr('id','content-header');
        main.append(header);

        let content = $('<div>');
        content.attr('id','content');
        content.css({
            'flex-direction':'column',
            'justify-content':'flex-start',
            'gap':'16px',
            'overflow':'auto'
        });
        data.forEach(element => {
            let li = $('<div>');
            li.addClass('c-list');

            let a = $('<div>');

            let h2 = $('<h1>');
            h2.text(element.name);
            a.append(h2);
            li.append(a);
            let p = $('<p>');
            p.text(`${element.items.length} items`)
            li.append(p);
            content.append(li)
        });
        main.append(content);      
    }
}

export function RenderCategoryAdd(){
    // Render the header
    panel.empty();
    let title = $('<p>');
    title.attr('id','main-title');
    title.text('Categories > Add Category');
    panel.append(title);

    let main = $('<div>');
    main.attr('id','main-content');
    main.css({
        'display':'flex',
        'justify-content':'center',
        'align-items':'center',
        'font-size': '1.2rem'
    })
    panel.append(main);

    let create = $('<div>');
    create.css({
        'display':'flex',
        'flex-direction':'column',
        'gap':'8px',
        'align-items':'center'
    })
    main.append(create);
    create.text('Create New Category');
    let input = $('<input>');
    input.addClass('inp');
    input.attr('type','text');
    input.attr('placeholder','Category name..');
    input.attr('id','cadd-input');
    input.keypress(function(e){
            if(e.which === 13){
                Add.AddCategory();
            }
        });
    create.append(input);

    let btn = $('<button>');
    
    btn.addClass('btn');
    btn.text('Add Category');
    btn.click(Add.AddCategory);
    create.append(btn);

}

export function RenderCategoryEdit(){


    // Render the header
    panel.empty();
    let title = $('<p>');
    title.attr('id','main-title');
    title.text('Categories > Edit Category');
    panel.append(title);

    let main = $('<div>');
    main.attr('id','main-content');
    main.css({
        'display':'flex'
    })
    panel.append(main);

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){

        var m = $('<p>');
        m.text('Category Empty..');
        main.append($(m));

        var button = $('<button>');
        button.click(RenderCategoryAdd);
        button.text('Add new category');
        button.addClass('btn')
        main.append(button);
        main.css({
            'display':'flex',
            'gap':'16px',
            'flex-direction':'column',
            'justify-content':'center',
            'align-items':'center',
            'font-size': '1.2rem'
        })

    } else {
        main.css({
            'flex-direction':'column'
        })

        let content = $('<div>');
        content.attr('id','content');
        content.css({
            'gap':'16px'
        });
        main.append(content);

        let l = $('<div>');
        l.attr('id','content-left');
        l.css({
            'overflow':'auto'
        })
        content.append(l);
        let r = $('<div>');
        r.attr('id','content-right');
        content.append(r);

        let lh = $('<header>');
        lh.text('Select category');
        l.append(lh);

        let rh = $('<header>');
        if(selectedcategories == undefined){
            rh.text('Category info');
        } else {
            let a = data.find(function(element){
                return element.id == selectedcategories;
            });
            rh.text(`${a.name}`);
        }
        
        r.append(rh);

        let lc = $('<div>');
        lc.addClass('c-content');
        lc.attr('id','lc-content');
        l.append(lc);

        let rc = $('<div>');
        rc.addClass('c-content');
        rc.attr('id','rc-content')
        r.append(rc);

        data.forEach(element => {
            let li = $('<div>');
            li.addClass('c-list');
            li.addClass('c-e-list');
            li.attr('data-id',element.id);
            
            
            let name = $('<h1>');
            name.text(`${element.name}`);
            name.css({
                'white-space':'nowrap',
                'max-width':'67%',
                'overflow':'hidden',
                'position':'absolute',
                'left':'16px',
                'color':'#522a1f',
                'text-overflow':'ellipsis'
            });
            if(element.id == selectedcategories){
                li.css({

                    'white-space':'nowrap',
                    'background-color':'#884A39',
                    'border':'4px solid white'
                });
                name.css({
                    'color':'white'
                })
            }
            li.append(name);

            let item = $('<p>');
            item.text(`${element.items.length} items`);
            item.css({
                'position':'absolute',
                'right':'16px',
                'color':'#522a1f'
            })
            li.append(item);   

            li.click(function(){
                selectedcategories = $(this).data('id');
                RenderCategoryEdit();
            })  
            lc.append(li);
        })

        if(selectedcategories == undefined){
            rc.css({
                'font-size':'18px',
                'color':'#884A39'
            })
            rc.text('Select an Category');
        } else {
            let editcontainer = $('<div>');
            editcontainer.css({
                'position':'relative',
                'width':'100%',
                'height':'60px',
                'display':'flex',
                'justify-content':'center',
                'align-items':'center',
                'gap':'16px'
            })
            let label = $('<span>');
            label.text('Edit categories name');
            label.css({
                'position':'absolute',
                'font-size':'16px',
                'color':'#522a1f',
                'top':'-16px',
                'left':'32px'
            })
            editcontainer.append(label);
            let editinp = $('<input>');
            editinp.addClass('inp inp-full');
            editinp.attr('placeholder','new category name...')
            editcontainer.append(editinp);
            let editbtn = $('<button>');
            editbtn.attr('id','edit-btn');
            editbtn.addClass('btn btn-small');
            editbtn.text('Edit');
            editbtn.click(function(){
                let newname = editinp.val();
                Edit.EditCategory(newname,selectedcategories);
                RenderCategoryEdit();
            })
            editcontainer.append(editbtn);
            rc.append(editcontainer);

            let rmvcontainer = $('<div>');
            rmvcontainer.css({
                'width':'100%',
                'height':'60px',
                'display':'flex',
                'justify-content':'center',
                'align-items':'center',
                'gap':'16px'
            })
            let rmvbtn = $('<button>');
            rmvbtn.addClass('btn btn-full');
            rmvbtn.click(() => {
                Rmv.RemoveCategory(selectedcategories);
                selectedcategories = undefined;
                RenderCategoryEdit();
            });
            rmvbtn.text('Delete Category');
            rmvcontainer.append(rmvbtn);
            rc.append(rmvcontainer);

            let addcontainer = $('<div>');
            addcontainer.css({
                'width':'100%',
                'height':'60px',
                'display':'flex',
                'justify-content':'center',
                'align-items':'center',
                'gap':'16px'
            })

            let addbtn = $('<button>');
            addbtn.addClass('btn btn-full');
            addbtn.click(() => {
                Pr.RenderProductAdd();
            });
            addbtn.text('Add Product');
            addcontainer.append(addbtn);
            rc.append(addcontainer);
        
        }

        

    }
}