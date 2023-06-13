    /* Open the sidenav */
    function openNav() {
        document.getElementById("mySidenav").style.width = "100%";
      }
      /* Close/hide the sidenav */
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0"
      }
/* SWIPER */
var achievementSlider = new Swiper('.partnersSlider', {
    spaceBetween: 1, 
    slidesPerView: 5,
    spaceBetween: 20,
    loop: true,
    speed: 1000,
    effect: "slide",
    centeredSlides: true,
    autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
    breakpoints: {
320: {
slidesPerView: 2,
},
575: {
slidesPerView: 3,
},
768: {
slidesPerView: 3,
},
992: {
slidesPerView: 4,
},
1199: {
slidesPerView: 5,
},
},
    });
/* SWIPER END */
function GetFood() { 
  var dp = [];
  var mt = [];

      $('.diet_pre:checkbox:checked').each(function() {
       console.log("Food Value", this.value);
         
          dp.push(this.value);
      });

      $('.mealtime:checkbox:checked').each(function() {
         console.log("Meal Value", this.value);
       
          mt.push(this.value);
      });
      console.log(dp);
    $.ajax({ 
        type: 'GET', 
        url: 'https://toneopeats.com/get-foods',
        data: {'dietprev': dp,'mealtime': mt },
        dataType: 'json', 
        success:function(data) { 
          $('#tabcon').html('');
                $('#tabcon').html(data.html);
         
        }       
    }); 
} 


function GetPrice() { 

var price = [];
      
  var html = [];
  var title =[];
  var imageurl=[];
  var ids=[];
  var meals=[];
  var menus = [];
  var mainmeals=[];
  var persrpor=[];
          $('input[name="pkgprice"]:checked').each(function() {
             var str=this.value;                               
             price.push(this.value);
             var str_array = str.split('-');
             ids.push(str_array[0]);
             meals.push(str_array[1]);
             mainmeals.push(str);
             html.push()
          });
          var perseas= $('#perpricedd').val();

          for (var i = 0; i < ids.length; i++) {
            //console.log("ids",ids);
            title.push($('#mealtitle-'+ids[i]).html());
            imageurl.push($('#pimage-'+ids[i]).val());
            menus.push($('#menusname-'+mainmeals[i]).val());
            persrpor.push($('#persrpor-'+mainmeals[i]).val());

          }
          console.log("Check", price); 
         if(price.length > 0){
          $.ajax({ 
            type: 'GET', 
            url: 'https://toneopeats.com/get-package-price',
            data: {'package': price },
            dataType: 'json', 
            success:function(data) { 
              let htmls="";
              for (let x in title){
                htmls+='<div class="divmacros_outer" id="menuMacro"><ul class="menuMacro" ><li>\
                    <img class="if_img img-fluid" src="'+imageurl[x]+'">\
                    <input type="hidden" id="proimage" value="'+imageurl[x]+'">\
                    <input type="hidden"  class="protitles" id="protitle" value="'+title[x]+'">\
                </li>\
                <li>\
                  <label class="if_title">'+title[x]+'</label>\
                </li>\
                <li><div class="cat action"><label><input type="checkbox"  name="meal_time[]"  class="mealtime" value="'+menus[x]+'"><span>'+menus[x]+'</span></label>\
                </div></li><br>\
                <li style="display: flex;"><i class="fa fa-plus" style="cursor: pointer;margin-top: 10px;" id="plus'+[x]+'" onclick="addqnt('+[x]+')"></i> <span id="qnt'+[x]+'" class="form-control qnts" style="margin-left: 11px;margin-right: 11px;">1</span><i class="fa fa-minus" id ="minus'+[x]+'" style="cursor: pointer;margin-top: 10px;margin-left:5px" onclick="removeqnt('+[x]+')"></i></li>\
                <li style="font-size:18px"><input tye="text" class="form-control perprir" id="perprir'+[x]+'" readonly>₹ <span class="pricess" id="prplus'+[x]+'" style="font-size: 18px;font-weight: bold;"></span></li>\
                </ul></div>';
              }
              $('#menuMacro').html(htmls);
             
             $('#checkout_btn').show();
             $('#package_data').val(price);
             $('#pricelist').html('');
             $('#pricelist').html(data.html);
             // $('#pricelists').html(data.html);
             $('#checkout_btn').show();
             
            }       
        });
         }else{
          $('#pricelist').html('');
          $('#checkout_btn').hide();
         }
       
} 

$(document).ready(function() {
GetFood();
});
