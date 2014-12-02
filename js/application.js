// js for shopping cart


jQuery(document).ready(function() {

      /* supporting functions */

      var checkInput = function(input) {
        if (input < 0) {
          alert("This quantity can not be negative");
          return false;
        } else if (!$.isNumeric(input)) {
          alert("This must be numeric");
          return false;
        } else {
          var totalPrice = calculateTotal();
          totalPrice = formatCurrency(totalPrice);
          $('#total-price').text(totalPrice);
          return true;
        }
      };

      var dollarToNumber = function(str) {
        str = str.replace(",", "");
        str = str.replace("$", "");
        str = str.replace(" ", "");
        return (parseFloat(str));
      };

      var formatCurrency = function(total) {
        var neg = false;
        if (total < 0) {
          neg = true;
          total = Math.abs(total);
        }
        return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
      };


      var calculateTotal = function() {
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
        return totalPrice;
      };

        /* event functions */

        $('#calc-prices-button').on('click', function() {
          var totalPrice = calculateTotal();
          totalPrice = formatCurrency(totalPrice);
          $('#total-price').text(totalPrice);
        });


        $('.quantity').blur(function() {
          var itemQuantity = $(this).val();

          if (checkInput(itemQuantity)) {
            $(this).parent().parent().removeClass("has-error");
            $(this).parent().parent().addClass("has-success");
            console.log("Input ok");
          } else {
            $(this).parent().parent().addClass("has-error");
            $(this).parent().parent().removeClass("has-success");
            $(this).focus();
            console.log("Some problem here");
          }
        });

        $('.remove-button').on('click', function() {
          if (confirm("Are you sure you want to delete this item?")) {
            $(this).parent().parent().remove();
          }
        });

        $('#create-item-button').on('click', function() {
          // make an array of items so far
          var itemList = $('.item-price');
          var numItems = itemList.length;
          console.log("itemList is "+itemList);
          console.log("numItems is "+numItems);

          // add code for another row

          var newItem = "example";
          var newPrice = "$2.00";

// need to add to data container, another item group

          var newItemCode1 = $('<div class="row form-group has-success">');
          var newItemCode2 = $('<div class="item-name col-xs-5">New item</div><div class="item-price col-xs-2">New Price</div>');
          var newItemCode3 = $('<span class="item-qty col-xs-3"><input class="quantity form-control input-lg" type="text" value=0></span>');
          var newItemCode4 = $('<button class="remove-button" type="button">Remove</button></div>');

          $('.data-container').append(newItemCode1).append(newItemCode2).append(newItemCode3).append(newItemCode4);

// a row in the data container
/*
      <div class="row form-group has-success">
        <!-- <img class="item-image col-xs-1" src="images/thumbs/thumb1.png"> -->
        <div class="item-name col-xs-5">
          Salmon
        </div>
        <div class="item-price col-xs-2">
          $60.00
        </div>
        <span class="item-qty col-xs-3">
          <input class="quantity form-control input-lg" type="text" value=0>
        </span>
        <button class="remove-button" type="button">Remove</button>
      </div> <!-- end row -->


$('#button').on('click', function() {
    var orange = $('<li>Orange</li>');
    $('.food').append(orange);
});
*/

        });



      }); // end document ready
