$(document).ready(function(){

  $("#footer").html('&copy; <a href="http://www.borealbirds.ca/" target=_blank>Boreal Avian Modelling Project</a> ' + (new Date()).getFullYear() + ' under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target=_blank>CC BY-SA 4.0</a> license.<br/>Made with <i class="fa fa-heart"></i> in Canada using <a href="https://github.com/borealbirds/" target=_blank>GitHub</a>.<br/><a href="https://bulma.io" target=_blank><img src="https://bulma.io/images/made-with-bulma--black.png" alt="Made with Bulma" width="128" eight="24"></a>');

  // launch modal
  $(".image-modal").click(function(){
    var target = $(this).data("target");
    $(target).addClass("is-active");
  });
  // close modal by clicking (X)
  $(".modal-close").click(function() {
    $(".modal").removeClass("is-active");
  });
  // close modal by Esc
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $(".modal").removeClass("is-active");
    }
  });

  // burger navbar
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function() {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });

});
