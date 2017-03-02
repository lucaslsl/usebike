// $(function(){

  function putLocationOnMap(location,map){
      var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">'+location.name+'</h1>'+
          '<div id="bodyContent">'+
          '<p><b>'+location.description+'</b></p>'+            
          '</div>'+
          '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: {lat: location.latitude, lng: location.longitude},
        map: map,
        title: location.name
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);        
        var opcao = $("#selectPonto").find("option:contains("+this.title+")");
        $('#selectPonto').val(opcao[0].value);
      });

    }

    function getLocations(map){
      var locations;
      $.ajax({
          url: "api/locations",
          type: "get",
          dateType: "json",
          success: function (locations) {  
              for(var location = 0; location < locations.length; location++){
                $('#selectPonto').append($("<option></option>")
                  .attr("value",locations[location].id)
                  .text(locations[location].name)); 

                putLocationOnMap(locations[location],map);
              }

          },
          error: function(jqXHR, textStatus, errorThrown) {
              alert(textStatus, errorThrown);
          }
       });    
      }


    function initMap() {
      var saoluis = {lat: -2.55, lng: -44.28};

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: saoluis
      });

      map.setOptions({draggable: true, zoomControl: false, scrollwheel: true, disableDoubleClickZoom: true});

      getLocations(map);

    }


    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });

    $('#dataLocacao').val(new Date().toDateInputValue());

    $( "#duracaoLocacao" ).change(function() {
      var time = this.value;
      var hora = time.split(':')[0];
      var min = time.split(':')[1];
      var minutos = (parseInt(hora)*60) + parseInt(min);
      
      var preco = parseInt(minutos) * 0.25;
      $('#precoLocacao').val(preco);
      if(isNaN(preco)){
        $('#precoLocacao').val(0);
      }
      
    });

    function authenticate(){
      data = [];
      data.push({name: 'password',value: "123456"});
      data.push({name: 'email', value: "vqz@mail.com"});      

      $.ajax({
        url: "api/user/login",
        type: "put",
        data: data,
        dateType: "json",
        success: function (response) {  
          console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
         console.log(jqXHR.status);
        }
       });
    }

    // authenticate();

    function alugarBike(){
      var location = $('#selectPonto').val();
      var time = $('#duracaoLocacao').val();
      var hora = time.split(':')[0];
      var min = time.split(':')[1];
      var duration = (parseInt(hora)*60) + parseInt(min);

      data = [];
      data.push({name: 'location',value: location});
      data.push({name: 'duration', value: duration});

      $.ajax({
        url: "api/me/pickups",
        type: "post",
        data: data,
        dateType: "json",
        success: function (response) {  
          console.log(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
         var responseText = jQuery.parseJSON(jqXHR.responseText);
         console.log(responseText.error);
         if(responseText.error == 'unavailable_bikes'){
             toastr.warning('Ops','Não há bikes disponíveis neste ponto!');
             //alert('Não há bikes disponíveis neste ponto!');
         }else{
            alert('Ops. um erro interno ocorreu.');
         }
        }
       });
    }

    $("#btnAlugar").on("click", function() {
      alugarBike();
    });

// });
