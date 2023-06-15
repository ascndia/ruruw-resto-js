import * as Cr from "./CategoryRender.js";
import * as Add from "./ProductMethod/ProductAdd.js";
import * as Rmv from "./ProductMethod/ProductRemove.js";
import * as Edit from "./ProductMethod/ProductEdit.js";


let panel = $('#main-panel');
let selectedcategories;
let selectedproduct;

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

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){
        var m = $('<p>');
        m.text('You dont have any category..');
        main.append($(m));

        var button = $('<button>');
        button.click(Cr.RenderCategoryAdd);
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
        let totalproduct = data.reduce((total,e) => {
            return total + e.items.length;
        },0)
        
        if(totalproduct == 0){
            var m = $('<p>');
            m.text('You dont have any product yet..');
            main.append($(m));

            var button = $('<button>');
            button.click(RenderProductAdd);
            button.text('Add new product');
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

            //header
            let header = $('<header>');
            header.css({
                'height':'80px'
            })
            let select = $('<div>');
            select.attr('id','select-categories');

            let menu = $('<div>');
            menu.addClass('menu');

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
            select.append(menu);
            header.append(select);
            main.append(header);

            let dropdownmenu = $('<div>');
            dropdownmenu.addClass('dropdown');
            menu.click(()=>{
                dropdownmenu.toggleClass('dd-show');
            })
            select.append(dropdownmenu);

            let li = $('<div>');
            if(selectedcategories == undefined){
                li.addClass('dd-list-active');
            }

            li.addClass('dd-list');
            li.text('All Categories');
            li.click(function(){
                selectedcategories = $(this).attr('data-id');
                RenderProductList();
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
                    RenderProductList();
                })
                dropdownmenu.append(li);
            });

            //content
            let content = $('<div>');
            content.addClass('list-body');
            content.css({
                'flex-direction':'column',
                'justify-content':'flex-start',
                'gap':'16px',
                'overflow':'auto',
                'padding':'8px'
            })
            main.append(content);

            if(selectedcategories == undefined){

                let totalproduct = data.reduce((total,e) => {
                    return total + e.items.length;
                },0)
                
                let count = $('<span>');
                count.text(`${totalproduct} items`);
                count.css({
                    'position':'absolute',
                    'right':'16px',
                    'width':'120px',
                    'display':'flex',
                    'justify-content':'flex-end'
                })
                header.append(count);

                data.forEach(category => {
                    category.items.forEach(product => {
                        let li = $('<div>');
                        li.addClass('p-list');

                        let leftdiv = $('<div>');
                        leftdiv.addClass('left-div')
                        let h2 = $('<h2>');
                        h2.text(product.name);
                        leftdiv.append(h2);

                        let rightdiv = $('<div>');
                        rightdiv.addClass('right-div');
                        let catt = $('<span>');
                        let price = $('<span>');

                        catt.text(category.name);
                        price.text(`Rp ${product.price.toLocaleString()}`);

                        rightdiv.append(catt);
                        rightdiv.append(price);

                        li.append(leftdiv);
                        li.append(rightdiv);
                        content.append(li)
                    })
                })
            } else {
                let selected = data.filter(e => {
                    return e.id == selectedcategories;
                })[0];
                
                let totalproduct = selected.items.length;

                let count = $('<span>');
                count.text(`${totalproduct} items`);
                count.css({
                    'position':'absolute',
                    'right':'16px',
                    'width':'120px',
                    'display':'flex',
                    'justify-content':'flex-end'
                })
                header.append(count);

                // navigate to add product
                if(totalproduct == 0){
                    var m = $('<p>');
                    m.text('You dont have any product yet..');
                    content.append(m);

                    var button = $('<button>');
                    button.click(RenderProductAdd);
                    button.text('Add new product');
                    button.addClass('btn')
                    content.append(button);
                    content.css({
                        'display':'flex',
                        'gap':'16px',
                        'flex-direction':'column',
                        'justify-content':'center',
                        'align-items':'center',
                        'font-size': '1.2rem'
                    })
                    return;
                }
                selected.items.forEach(product => {
                    let li = $('<div>');
                    li.addClass('p-list');

                    let leftdiv = $('<div>');
                    leftdiv.addClass('left-div')
                    let h2 = $('<h2>');
                    h2.text(product.name);
                    leftdiv.append(h2);

                    let rightdiv = $('<div>');
                    rightdiv.addClass('right-div');
                    let price = $('<span>');

                    price.text(`Rp ${product.price.toLocaleString()}`);

                    rightdiv.append(price);

                    li.append(leftdiv);
                    li.append(rightdiv);
                    content.append(li)
                })
            }
    
        }
    }
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

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){
        var m = $('<p>');
        m.text('You dont have any category..');
        main.append($(m));

        var button = $('<button>');
        button.click(Cr.RenderCategoryAdd);
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
        let header = $('<header>');
        header.css({
            'height':'80px'
        })
        main.append(header);

        let select = $('<div>');
        select.attr('id','select-categories');

        let menu = $('<div>');
        menu.addClass('menu');
        if(selectedcategories == undefined){
            menu.text('Select Categories');
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
        select.append(menu);
        header.append(select);

        let dropdownmenu = $('<div>');
        dropdownmenu.addClass('dropdown');
        menu.click(()=>{
            dropdownmenu.toggleClass('dd-show');
        })
        select.append(dropdownmenu);

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
                RenderProductAdd();
            })
            dropdownmenu.append(li);
        });

        // add content area
        let content = $('<div>');
        content.addClass('add-body');

        let addcontainer = $('<div>');
        addcontainer.attr('id','add-container');
        content.append(addcontainer);

        let addname = $('<div>');
        addname.attr('id','addname');
        addcontainer.append(addname);

        let nameinput = $('<input>');
        nameinput.addClass('inp');
        nameinput.attr('id','inputname');
        addname.append(nameinput);

        let namelabel = $('<label>');
        namelabel.addClass('label');
        namelabel.text('Product name');
        addname.append(namelabel);

        let addprice = $('<div>');
        addprice.attr('id','addprice');
        addcontainer.append(addprice);

        let priceinput = $('<input>');
        priceinput.attr('id','inputprice')
        priceinput.attr('type','number');
        priceinput.attr('min',0);
        priceinput.addClass('inp');
        addprice.append(priceinput);

        let pricelabel = $('<label>');
        pricelabel.addClass('label');
        pricelabel.text('Product price');
        addprice.append(pricelabel);

        main.append(content);

        // add footer
        let footer = $('<footer>');
        footer.css({
            'height':'80px'
        })
        main.append(footer);
        let btn = $('<button>');
        btn.addClass('btn btn-dark');
        btn.text('Add Product');
        btn.click(function(){
            Add.AddProduct(selectedcategories)
        });
        priceinput.keypress(function(e){
            if(e.which === 13){
                Add.AddProduct(selectedcategories);
            }
        });
        footer.append(btn);

    }
    
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

    let data = localStorage.getItem('menu');
    data = data ? JSON.parse(data): [];

    if(data.length == 0){
        var m = $('<p>');
        m.text('You dont have any category..');
        main.append($(m));

        var button = $('<button>');
        button.click(Cr.RenderCategoryAdd);
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
        
        // header
        let header = $('<header>');
        header.css({
            'height':'70px'
        })

        let toggle = $('<span>');
        toggle.addClass('material-symbols-outlined sidebar-toggle');
        toggle.text('menu');
        header.append(toggle);
        main.append(header);

        // select
        let select = $('<div>');
        select.attr('id','select-categories');

        let menu = $('<div>');
        menu.addClass('menu');

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
        select.append(menu);
        header.append(select);
        main.append(header);

        // dropdown categories
        let dropdownmenu = $('<div>');
        dropdownmenu.addClass('dropdown');
        menu.click(()=>{
            dropdownmenu.toggleClass('dd-show');
        })
        select.append(dropdownmenu);

        let li = $('<div>');
        if(selectedcategories == undefined){
            li.addClass('dd-list-active');
        }

        li.addClass('dd-list');
        li.text('All Categories');
        li.click(function(){
            selectedcategories = $(this).attr('data-id');
            RenderProductEdit();
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
                RenderProductEdit();
            })
            dropdownmenu.append(li);
        });    

        // content
        let content = $('<div>');
        content.addClass('list-body');
        content.css({
            'flex-direction':'column',
            'justify-content':'center',
            'gap':'16px',
            'overflow':'hidden',
            'padding':'0 8px'
        })   

        // main form
        if(selectedproduct){
            let product = data.flatMap(obj => obj.items).find(item => item.id == selectedproduct);
            let editcontainer = $('<div>');
            editcontainer.css({
                'display':'flex',
                'flex-direction':'column',   
                'gap':'16px',
                'justify-content':'center',
                'position':'relative',
                'align-items':'center'        
            })
            let a = $('<h3>');
            a.text(`Selected: ${product.name}`);
            a.css({
                'font-size':'24px',
                'color':'#522a1f'
            })
            editcontainer.append(a);
            let namecon = $('<div>');
            namecon.css({
                'margin-top':'16px'
            })
            namecon.attr('id','editname');
            let nameinput = $('<input>');
            {
                nameinput.addClass('inp');
                nameinput.attr('id','nameinput');
                nameinput.attr('placeholder','Product name')
                nameinput.val(product.name);

                let namelabel = $('<label>');
                namelabel.addClass('label');
                namelabel.text('Product Name');
        
                namecon.append(nameinput);
                namecon.append(namelabel);

            }
            let pricecon =$('<div>');
            pricecon.attr('id','editprice')
            pricecon.css({
                'margin-top':'16px'
            })
            let priceinput = $('<input>');
            {  
                priceinput.addClass('inp');
                priceinput.attr('type','number');
                priceinput.attr('id','priceinput');
                priceinput.attr('placeholder','Product price')
                priceinput.val(product.price);
                priceinput.keypress(function(e){
                    if(e.which === 13){
                        Edit.ProductEdit(selectedproduct);
                    }
                });

                let pricelabel = $('<label>');
                pricelabel.addClass('label');
                pricelabel.text('Product Price');
                

                pricecon.append(priceinput);
                pricecon.append(pricelabel);
            }
            let submitcon = $('<div>');
            let submitbtn = $('<button>');
            {
                submitbtn.addClass('btn');
                submitbtn.text('Save Changes');
                submitcon.append(submitbtn)
                submitbtn.click(function(){
                    Edit.ProductEdit(selectedproduct);
                })
            }
            let removecon = $('<div>');
            let removebtn = $('<button>');
            {
                removebtn.addClass('btn');
                removebtn.text('Remove Product');
                removecon.append(removebtn);
                removebtn.click(function(){
                    Rmv.ProductRemove(selectedproduct);
                    selectedproduct = undefined;
                    RenderProductEdit();
                })
            }
            editcontainer.append(namecon);
            editcontainer.append(pricecon);
            editcontainer.append(submitcon);
            editcontainer.append(removecon);
            content.append(editcontainer);
        } else {
            content.css({
                'justify-content':'center',
                'align-items':'center'
            })
            content.text('Select a Product');
        }

        let closesidebar = $('<div>');
        closesidebar.addClass('sb-black');
        closesidebar.css({
            'z-index':'3'
        })
        content.append(closesidebar);
        closesidebar.click(function(){
            closesidebar.toggleClass('black-toggle');
            sidebar.toggleClass('sb-show');
        })
        // sidebar
        let sidebar = $('<div>');
        toggle.click(function(){
            closesidebar.toggleClass('black-toggle');
            sidebar.toggleClass('sb-show');
        })
        sidebar.addClass('sidebar');
        content.append(sidebar);
        if(selectedcategories == undefined){

            let total = data.reduce((total,e) => {
                return total + e.items.length;
            },0)

            if(total == 0){
                var m = $('<p>');
                m.text('Product Empty..');
                sidebar.append($(m));

                var button = $('<button>');
                button.click(RenderProductAdd);
                button.text('Add Product');
                button.addClass('btn btn-medium btn-dark')
                sidebar.append(button);
                sidebar.css({
                    'display':'flex',
                    'gap':'16px',
                    'flex-direction':'column',
                    'justify-content':'center',
                    'align-items':'center',
                    'font-size': '1.2rem'
                })
            } else {
                data.forEach(category => {
                    category.items.forEach(pro => {
                        let li = $('<div>');
                        li.addClass('sb-list');
                        if(pro.id == selectedproduct){
                            li.addClass('sb-list-selected');
                        }
                        li.attr('data-id',pro.id);
                        let p = $('<p>');
                        p.text(pro.name)
                        li.append(p);
                        li.click(function(){
                            selectedproduct = pro.id;
                            RenderProductEdit();
                        })
                        sidebar.append(li);
                    })
                })
            }
        } else {

            let total = data.find(e => e.id == selectedcategories).items.length;

            if(total == 0){
                var m = $('<p>');
                m.text('Product Empty..');
                sidebar.append($(m));

                var button = $('<button>');
                button.click(RenderProductAdd);
                button.text('Add Product');
                button.addClass('btn btn-medium btn-dark')
                sidebar.append(button);
                sidebar.css({
                    'display':'flex',
                    'gap':'16px',
                    'flex-direction':'column',
                    'justify-content':'center',
                    'align-items':'center',
                    'font-size': '1.2rem'
                })
            } else {
                let selected = data.filter(e => {
                    return e.id == selectedcategories;
                })[0];
    
                selected.items.forEach(e => {
                    let li = $('<div>');
                        li.addClass('sb-list');
                        if(e.id == selectedproduct){
                            li.addClass('sb-list-selected');
                        }
                        li.attr('data-id',e.id);
                        let p = $('<p>');
                        p.text(e.name)
                        li.append(p);
                        li.click(function(){
                            selectedproduct = e.id;
                            RenderProductEdit();
                        })
                        sidebar.append(li);
                })
            }
        }

        main.append(content);
    }
}