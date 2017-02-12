import $ from 'jQuery';

$( () => {

  let navbar = $('ul.navbar-nav').html();

  $('.fat-nav__wrapper').html( `<ul>${navbar}</ul>` );
  $.fatNav();

});
