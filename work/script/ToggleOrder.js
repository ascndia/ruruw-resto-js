$(document).ready(function(){
    let menu = $('.menu');
    let order = $('.order');
    $('.toggle-order').click(function(){
        order.toggleClass('Hide');
        menu.toggleClass('Show');
    })
})