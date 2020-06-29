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
    // Oggetto della data
    var data = moment('2018-01-01')
    console.log(data)

    // Converto la data(perche oggetto) in stringa
    var dataConvertita = data.format('D MMMM')

    // CICLO per stampare tutti i giorni del mese
    for (var i = 0; i < giorniNelMese; i++) {
      // hendlebars template
      var source = $('#calendar-template').html();
      var template = Handlebars.compile(source);

      var context = {dataConvertita}
      var html = template(context);

      // Inserisco elemento del template nel html
      $('.calendar').append(html);

      data.add(1, 'd');
      dataConvertita = data.format('D MMMM');
    }

  }



}); // End document ready
