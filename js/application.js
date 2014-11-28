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



        // nice to have
        // highlight box when cursor inside


      }); // end document ready
