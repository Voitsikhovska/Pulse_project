$(document).ready(function () {
  $(".carousel_inner").slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../img/slides/chevron left solid.png" /></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../img/slides/chevron right solid.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  });
  $("ul.catalog_tabs").on("click", "li:not(.catalog_tab_active)", function () {
    $(this)
      .addClass("catalog_tab_active")
      .siblings()
      .removeClass("catalog_tab_active")
      .closest("div.container")
      .find("div.catalog_content")
      .removeClass("catalog_content_active")
      .eq($(this).index())
      .addClass("catalog_content_active");
  });
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog_item_content")
          .eq(i)
          .toggleClass("catalog_item_content_active");
        $(".catalog_item_list").eq(i).toggleClass("catalog_item_list_active");
      });
    });
  }

  toggleSlide(".catalog_item_link");
  toggleSlide(".catalog_item_back");
  // Modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".overlay__close").on("click", function () {
    $(".overlay, #consultation, #thanks, #order").fadeOut("slow");
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog_item_subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "Please, enter your name",
          minlength: jQuery.validator.format("Enter {0} symbols"),
        },
        phone: "Please, enter your phone number",
        email: {
          required: "Please, enter your email",
          email: "Uncorrect email",
        },
      },
    });
  }

  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");

  $("input[name=phone]").mask("+38 (099) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");

      $("form").trigger("reset");
    });
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".page-up").fadeIn();
    } else {
      $(".page-up").fadeOut();
    }
  });

  $("a[href=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
});
