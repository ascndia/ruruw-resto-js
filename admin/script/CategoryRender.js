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
    panel.append(main);
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