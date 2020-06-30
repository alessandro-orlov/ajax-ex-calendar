$(document).ready(function() {
var mese = 0
$.ajax(
  {
    url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + mese,
    method: "GET",
    success: function(info) {
      var festivita = info['response']
      var feste = [];
      for (var i = 0; i < festivita.length; i++) {
        feste[i] = festivita[i]['date'];
      }
  
      // Mese iniziale Gennaio
      var gennaio = moment('2018-01').format('MMMM YYYY');
      $('.wrapper h1').text(gennaio)

      // Prendo il numero dei giorni nel mese
      var giorniNelMese = moment("2018-01", "YYYY-MM").daysInMonth();
      // handlebars
      var source = $('#calendar-template').html();
      var template = Handlebars.compile(source);
      // Oggetto data iniziale
      var date = moment('2018-01-01');

      // Stampo tutti i giorni del mese
      for (var i = 0; i < giorniNelMese; i++) {

        // Giorno successivo
        var nextDay = moment(date).add(i, 'd');

        // Converto il giorno succesiovo nel formato desiderato
        var dayMonth = nextDay.format('D MMMM');
        // console.log('giorno del mese ' + dayMonth);

        $.each(festivita, function(key, value ) {

          var infoFestivita = festivita[key];
          // console.log(infoFestivita);

          var dataFestivo = value['date'];
          var nomeFestivo = value['name'];
          var dataConfronto = moment(dataFestivo).format('D MMMM');

          var singolaFestivita = nomeFestivo + ' ' + dataConfronto;
          // console.log('Each singola festivita ' + singolaFestivita);

          if(singolaFestivita.includes(dayMonth) ) {
            var giornoDelMese = dataConfronto + ' ' + nomeFestivo;
            var context = {giornoDelMese};
            var html = template(context);
            $('.calendar').append(html);
          } else {
            giornoDelMese = dayMonth;
            context = {giornoDelMese};
            html = template(context);
            $('.calendar').append(html);
          }

        }); // End each

      } // End ciclo for
    },
    error: function(request, state, error) {
      alert('errore ' + error)
    }
  }
);
// FUNZIONI
function ajaxResponseTamplate(response) {
  var source = $('#calendar-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < response.length; i++) {
    var giornoDiFesta = response[i];
    var html = template(giornoDiFesta);

    $('.calendar').append(html)
  }
}

}) // end document ready
