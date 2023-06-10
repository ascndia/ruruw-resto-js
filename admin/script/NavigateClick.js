import * as Cr from "./CategoryRender.js";
import * as Pr from "./ProductRender.js";

$(document).ready(function(){
    // Render Categories feature
    $('#category-list').click(Cr.RenderCategoryList);
    $('#category-add').click(Cr.RenderCategoryAdd);
    $('#category-edit').click(Cr.RenderCategoryEdit);

    // Render Product feature
    $('#product-list').click(Pr.RenderProductList);
    $('#product-add').click(Pr.RenderProductAdd);
    $('#product-edit').click(Pr.RenderProductEdit);
})

