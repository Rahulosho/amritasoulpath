(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);


// reusable javascript code to show modal and reset form
  function showThankYou() {
    setTimeout(function () {
      const thankYouModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
      thankYouModal.show();

      document.querySelectorAll("form").forEach(form => form.reset());

      if (typeof grecaptcha !== "undefined") {
        grecaptcha.reset();
      }
    }, 1500);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // 1. Inject item name into the hidden field dynamically
    const triggers = document.querySelectorAll(".open-request-modal");
    const itemInput = document.getElementById("selectedItemInput");

    triggers.forEach(button => {
      button.addEventListener("click", function () {
        const itemName = this.getAttribute("data-item");
        itemInput.value = itemName;
        document.getElementById("universalRequestLabel").textContent = `Request: ${itemName}`;
      });
    });

    // 2. Handle form submission
    const form = document.querySelector(".book-request-form");
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add("was-validated");
      } else {
        e.preventDefault();

        fetch(form.action, {
          method: form.method,
          body: new FormData(form),
        }).then(() => {
          const modalEl = form.closest(".modal");
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal.hide();

          showThankYou();
        }).catch(() => {
          alert("Something went wrong. Please try again.");
        });
      }
    });
  });
