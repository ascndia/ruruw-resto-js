import * as Add from "./CategoryAdd.js";

let panel = $('#main-panel');


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
        let header = $('<p>');
        header.text(`Category count : ${data.length}`);
        header.attr('id','content-header');
        main.append(header);

        let content = $('<div>');
        content.attr('id','content');
        content.css({
            'display':'flex',
            'flex-direction':'column',
            'justify-content':'flex-start',
            'align-items':'center',
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
    panel.append(main);
}