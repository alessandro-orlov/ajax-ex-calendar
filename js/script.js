$(document).ready(function() {


  var meseBase = moment('2018-01-01');

  $('.wrapper h1').text(meseBase.format('MMMM YYYY')); //ok

  currentMonth(meseBase);

  // ====================================================
  // ================ FUNCTIONS =========================

  // Funzuine stampa mese corrente
  // ---> month è il mese da stampare
  function currentMonth(month) {
    var giorniNelMese = month.daysInMonth(); // ok

    // handlebars
    var source = $('#calendar-template').html();
    var template = Handlebars.compile(source);

    for (var i = 1; i <= giorniNelMese; i++) {
      var singoloGiorno = moment({
        year: month.year(),
        month: month.month(),
        day: i,
      });
      console.log(singoloGiorno);

      var context = {
        data: singoloGiorno.format('D MMMM')
      }

      var html = template(context);

      // Stamp a scermo il singolo giorno
      $('.calendar').append(html);
    } // fine ciclo for

  } // End function currentMonth()


  // // Funzione holidaysInMonth()
  //  function holidaysInMonth() {
  //
  //  }



}) // end document ready
