
$(document).ready(function(){

    // Open and Close Sidebar in Mobile Devices
    $('.burger').click(()=>{
        $('#admin-panel').toggleClass('a-p-show');
    })
    
    // Toggle Dropdown menu in Admin panel
    $('.a-p-i-head').click(function(){
        $(this).siblings('.item-child').toggleClass('show');
    })

})