$(document).ready(function(){


  // MOMENT
  var date = moment('2018-06-29');
  console.log(date);

  var giorno = date._i
  console.log(giorno);

  var mese = moment().month()

  // Stampo i giorni del mese
  for (var i = 0; i < 1; i++) {
    dayTamplate(mese);
  }


  // =====================================================
  // =============== FUNCTIONS ===========================

  // Handlebars tamplate function
  function dayTamplate(day) {
    var source = $('#calendar-template').html();
    var template = Handlebars.compile(source);

    var context = {day};
    var html = template(context);

    // append tamplate to all'elemnto in HTML
    $('.days').append(html)
  }


}); // End document ready
