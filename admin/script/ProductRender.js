let panel = $('#main-panel');

export function RenderProductList(){  

    // Render the header
    panel.empty();
    let title = $('<p>');    
    title.attr('id','main-title');
    title.text('Product > Product List');
    panel.append(title);
    
    let main = $('<div>');
    main.attr('id','main-content');
    panel.append(main);

}

export function RenderProductAdd(){

    // Render the header
    panel.empty();
    let title = $('<p>');
    title.attr('id','main-title');
    title.text('Product > Add Product');
    panel.append(title);

    let main = $('<div>');
    main.attr('id','main-content');
    panel.append(main);
}

export function RenderProductEdit(){

    // Render the header
    panel.empty();
    let title = $('<p>');
    title.attr('id','main-title');
    title.text('Product > Edit Product');
    panel.append(title);

    let main = $('<div>');
    main.attr('id','main-content');
    panel.append(main);
}