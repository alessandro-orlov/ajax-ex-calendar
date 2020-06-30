$(document).ready(function() {


  var meseBase = moment('2018-01-01');

  $('.wrapper h1').text(meseBase.format('MMMM YYYY')); //ok

  currentMonth(meseBase);
  holidaysInMonth();




  // ====================================================
  // ================ FUNCTIONS =========================

  // Funzuine stampa giorni del mese corrente
  // ---> month è il mese da stampare
  function currentMonth(month) {
    $('.calendar').html('')
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

      var giornoCorrenteAttr = singoloGiorno.format('YYYY-MM-DD')

      var context = {
        data: singoloGiorno.format('D MMMM'),
        currentDay: giornoCorrenteAttr
      }

      var html = template(context);

      // Stampo a scermo il singolo giorno
      $('.calendar').append(html);

    } // fine ciclo for

  } // End function currentMonth()


  // Funzione holidaysInMonth()
  function holidaysInMonth() {
    $.ajax(
      {
        url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
        method: "GET",
        success: function(info) {

          var festivi = info.response

          for (var i = 0; i < festivi.length; i++) {
            var giornoFestivo = festivi[i];
            var dataFestivo = giornoFestivo['date'];
            var nomeFestivo = giornoFestivo['name'];

            // ======================================================
            // ======== Ciclo each() - richiede piu risorse =========
            // Ciclo su tutti gli elementi <li>
            // $('.calendar li').each( function() {
            //   // Seleziono/Leggo attributo del <li> corrente
            //   var elementoCorrente = $(this).attr('data-giorno-corrente');
            //
            //   if (dataFestivo === elementoCorrente) {
            //     // Aggiungo la classe e il nomeFestivo all'elemento <li>
            //     $(this).addClass('festivo');
            //     $(this).append(' - ' + nomeFestivo)
            //   }
            //
            // }); // End each()

            // CONFRONTO CON L'ATTRIBUTO
            var holiday = $('.calendar li[data-giorno-corrente="'+ dataFestivo +'"]');
            holiday.addClass('festivo')
            holiday.append(' - ' + nomeFestivo)
          } // end for()

        },
        error: function() {
          alert('Errore')
        }
      });
  }

}) // end document ready
