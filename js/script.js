$(document).ready(function(){


  // MOMENT
  var gennaio = moment('2018-01').format('MMMM YYYY')
  $('.wrapper h1').text(gennaio)

  var giorniNelMese = moment("2018-01", "YYYY-MM").daysInMonth();


  dayTamplate(giorniNelMese)


  // =====================================================
  // =============== FUNCTIONS ===========================

  // Handlebars tamplate function
  function dayTamplate(daysInMonth) {

      // Ajax call
      $.ajax(
        {
          url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
          method: "GET",
          success: function(info) {

            var giornoFestivo = info['response']

            for(key in giornoFestivo) {

              var holydays = giornoFestivo[key]
              console.log(holydays['date'])

            }

            // Oggetto della data
            var data = moment('2018-01-01')
            var corispondenza = data['_i']
            console.log(corispondenza)

            // Converto la data(perche oggetto) in stringa
            var dataConvertita = data.format('D MMMM')

            // CICLO per stampare tutti i giorni del mese
            for (var i = 0; i < daysInMonth; i++) {
              // hendlebars template
              var source = $('#calendar-template').html();
              var template = Handlebars.compile(source);

              var context = {dataConvertita}
              var html = template(context);

              // Inserisco elemento del template nel html
              $('.calendar').append(html);

              data.add(1, 'd');
              dataConvertita = data.format('D MMMM');

            } // End ciclo for

          },
          error: function(request, state, error) {

          }
        }
      ); // END Ajax call



  } // End Function



}); // End document ready
