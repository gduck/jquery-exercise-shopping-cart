
// js for shopping cart


jQuery(document).ready(function() {




  $('#calc-prices-button').on('click', function() { 
    var numItems = $('.item-price').length;
    var totalPrice = 0;

    /* NOTE using var item in items has some sort of memory overflow
    and after the number of items is garbage */
    for (var i = 0; i < numItems; i++) {
      
      /* note for myself */
      /* must wrap variable in $() for jQuery to recognise */
      var itemPrice = $('.item-price')[i];
      itemPrice = $(itemPrice).text();
      itemPrice = dollarToNumber(itemPrice);

      var itemQuantity = $('.item-qty')[i];
      /* must wrap variable in $() for jQuery to recognise */
      itemQuantity = $(itemQuantity).children('.quantity').val();

      var subTotal = 0;
      subTotal = itemPrice * itemQuantity;
      totalPrice += subTotal;

    }
      totalPrice = formatCurrency(totalPrice);
      $('#total-price').text(totalPrice);
  });


/* supporting functions */

  function dollarToNumber (str) {
    str = str.replace(",","");
    str = str.replace("$","");
    str = str.replace(" ","");
    return (parseFloat(str));
  }

function formatCurrency(total) {
    var neg = false;
    if(total < 0) {
        neg = true;
        total = Math.abs(total);
    }
    return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}


}); // end document ready








// require input checking 
// on 'leave label event'
// is a number & is an integer



// *** require calculate total
// when calculate button pressed
// also on 'leave label event'



// nice to have
// highlight box when cursor inside













/*
// EXAMPLES
 console function
 $('#clickme').on('click', function() {
    var orange = $('<li>Orange</li>');
    $('.food').append(orange);
});
*/
