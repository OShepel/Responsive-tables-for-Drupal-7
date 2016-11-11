/**
 * Created by o_shepel
 */

/**
 *  Responsive table implementation.
 *  This will clone the content of header's cell into each corresponding data cell.
 *  Mobile layout will be activated with CSS media query.
*/
(function ($, Drupal, window, document, undefined) {

    // Run the javascript on page load.
    $(document).ready(function() {
        responsiveTable();
    });
    function responsiveTable() {
        // get class for target tables from Drupal settings
        var tableClass = Drupal.settings.responsive_tables.tableClass;
        var selector = "table." + tableClass;

        $(selector).each(function(){
            var heads = $(this).find("thead th");
            //if there is no thead element - return
           if(!heads.length) return;
            
            // if we have cells that are merged vertically - return
            if($(this).find('td[rowspan]').length){
                var passTest = true;
                $(this).find('td[rowspan]').each(function(){
                   if($(this).attr('rowspan') > 1){
                     passTest = false;
                     return false;
                    }
               });

               if(!passTest){
                   return;
               }             
           }

            //if we have a table with a header and no rowspan attribute,
            //clone it and exucute transformation in a try-catch block
            var testTable = $(this).clone();
            var rows = $(testTable).find("tbody tr");
            try{
                for(var n=0;n<rows.length;n++){
                    var row = rows.get(n);
                    var cells = row.getElementsByTagName("td");
                    var headIndex = 0;

                    for(var i=0; i < cells.length; i++){
                        var text = ('<span class="cell-label">' + heads.get(headIndex).innerHTML + '</span>');
                        text += ('<span class="cell-text">' + cells[i].innerHTML + '</span>');
                        cells[i].innerHTML = text;

                        var colSpan = cells[i].hasAttribute('colspan') ? parseInt(cells[i].getAttribute("colspan")) : 1;
                        if(colSpan > 0){
                            headIndex += colSpan;
                        }
                    }
                }
            }
            catch(e){
                return;
            }
            // if there are no errors during clone table transformation,
            // remove tbody from original table and append tbody from transformed clone
            $(this).find("tbody").remove();
            $(this).append($(testTable).find("tbody"));
            // make table responsive with CSS class
            $(this).addClass('responsive');
        });
    }
  })(jQuery, Drupal, this, this.document);