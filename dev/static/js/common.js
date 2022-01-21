const toastModes = {
  succes: "succes",
  alert: "alert",
};

const TIME_LIMIT = 60,
      FULL_DASH_ARRAY = 283;


function showToast(text, toastMode) {
  const toastColor = {
    [toastModes.succes]: "#4caf50",
    [toastModes.alert]: "#f44336",
  };
  const toastBlock = document.getElementById("toast");
  const toastImageBlock = document.getElementById("toast-image");
  const toastTextBlock = document.getElementById("toast-text");
  toastTextBlock.innerText = text;
  toastBlock.style.display = "flex";
  toastBlock.style.backgroundColor = toastColor[toastMode];
  toastImageBlock.src = `/static/img/general/toasts/${toastMode}.svg`;

  setTimeout(() => {
    toastBlock.style.display = "none";
  }, 2500);
}

document.addEventListener("DOMContentLoaded", function () {
  /* SLIDERS */

  const sliders = [
    /*
    {
      container: '.cources__slider-blocks',
      prevButton: '.cources__arrows-prev',
      nextButton: '.cources__arrows-next',
    },
*/
    {
      container: ".new-cources__slider-blocks",
      prevButton: ".new-cources__arrows-prev",
      nextButton: ".new-cources__arrows-next",
    },
    // {
    //   container: ".free-materials__slider-blocks",
    //   prevButton: ".free-materials__arrows-prev",
    //   nextButton: ".free-materials__arrows-next",
    // },
  ];

  if (isHasSlider(sliders)) {
    sliders.forEach(({ container, prevButton, nextButton }) => {
      tns({
        container,
        items: 1,
        gutter: 27,
        // edgePadding: 150,
        loop: false,
        fixedWidth: 230,
        nav: false,
        prevButton,
        nextButton,
        responsive: {
          768: {
            fixedWidth: false,
            items: 2,
            gutter: 38,
          },
          992: {
            items: 3,
          },
          1200: {
            gutter: 55,
          },
        },
      });
    });
  }

  const aboutStories = document.querySelector(".about-us__stories-row");

  if (aboutStories) {
    tns({
      container: aboutStories,
      items: 1,
      // gutter: 30,
      loop: true,
      nav: false,
      prevButton: ".about-us__stories-arrows-prev",
      nextButton: ".about-us__stories-arrows-next",
    });
  }

  const studyRevs  = document.querySelector(".study__reviews-row");

  if (studyRevs) {
    tns({
      container: studyRevs,
      items: 1,
      // gutter: 30,
      loop: true,
      nav: false,
      prevButton: ".study__reviews-arrows-prev",
      nextButton: ".study__reviews-arrows-next",
    });
  }

  const whyOnlineSlider = document.querySelector(".about-us-why-online__items");

  if (whyOnlineSlider) {
    tns({
      container: whyOnlineSlider,
      items: 1,
      gutter: 30,
      // edgePadding: 150,
      loop: false,
      // fixedWidth: 230,
      nav: false,
      prevButton: ".about-us-why-online__arrows-prev",
      nextButton: ".about-us-why-online__arrows-next",
      responsive: {
        // 768: {
        //   fixedWidth: false,
        //   items: 2,
        //   gutter: 38,
        // },
        576: {
          items: 2,
        },
        1200: {
          items: 3,
          // gutter: 55,
        },
      },
    });
  }

  const whyOnlineSlider1 = document.querySelector(".study-pluses__card__items");

  if (whyOnlineSlider1) {
    tns({
      container: whyOnlineSlider1,
      nav: false,
      prevButton: ".study-pluses__arrows-prev",
      nextButton: ".study-pluses__arrows-next",
      disable: false,
      responsive: {
        575: {
          disable: true,
        },
      },
    });
  }

  /* VALIDATE */

  const form = document.querySelector("#order-form");
  const form2 = document.querySelector("#question-form");

  const fields = [
    {
      name: "name",
      rules: "required",
    },
    {
      name: "email",
      rules: "required|valid_email",
    },
    {
      name: "checkbox",
      rules: "checkbox",
    },
  ];

  const fields2 = [
    {
      name: "name",
      rules: "required",
    },
    {
      name: "email",
      rules: "required|valid_email",
    },
    {
      name: "question",
      rules: "required",
    },
  ];

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validate(form, fields)) {
        console.log("ajax here");
        console.log(getData(form, fields));
      }

      form.querySelectorAll("input").forEach(function (el) {
        el.addEventListener("input", function () {
          validate(form, fields);
        });
      });
    });
  }

  if (form2) {
    form2.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validate(form2, fields2)) {
        fetch("https://notification-mailer-proxy.oneplanet.team/send-email", {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          method: "POST",
          body: JSON.stringify({
            to: "support@oneplanet.club",
            subject: "New client email",
            message: JSON.stringify(getData(form2, fields2)) + " ",
          }),
        })
          .then(() => {
            form2.reset();
            showToast("Ваш вопрос отправлен.", toastModes.succes);
          })
          .catch(() => {
            showToast("Произошла ошибка.", toastModes.alert);
          });
      }
      form2.querySelectorAll(".js-input").forEach(function (el) {
        el.addEventListener("input", function () {
          validate(form2, fields2);
        });
      });
    });
  }

  const inputFields = document.querySelectorAll('.input-decorator').forEach(function (el) {
    el.addEventListener("input", function () {
      if(el.value.length) {
        el.nextElementSibling.classList.add('focused')
      }else {
        el.nextElementSibling.classList.remove('focused')
      }
    });
  });

  /* TABS */

  const whoNeedsTabSelectors = {
    btn: ".js-btn",
    content: ".js-content",
  };

  tabs(whoNeedsTabSelectors);

  /* FILTER */

  const whoNeedsFilterSelectors = {
    btn: ".js-filter-btn",
    content: ".js-filter-content",
  };

  filter(whoNeedsFilterSelectors);

  /* BURGER */

  const burgerBtn = document.querySelector(".js-burger");
  const closeBtn = document.querySelector(".js-close");
  const mobileContent = document.querySelector(".js-mobile");
  const activeClass = "active";

  function closeMenu() {
    closeBtn.classList.remove(activeClass);
    burgerBtn.classList.add(activeClass);
    mobileContent.classList.remove(activeClass);
  }

  if (burgerBtn) {
    burgerBtn.addEventListener("click", function () {
      this.classList.remove(activeClass);
      closeBtn.classList.add(activeClass);
      mobileContent.classList.add(activeClass);
    });

    closeBtn.addEventListener("click", closeMenu);

    window.addEventListener("click", function (e) {
      if (!mobileContent.contains(e.target) && !burgerBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // BURGER BLOG 

  const burgerBlogBtn = document.querySelector('#js-blog-burger')
  const blogCategoriesList = document.querySelector('.blog-navigation__list')

  if (burgerBlogBtn) {
    burgerBlogBtn.addEventListener('click', function(){
      blogCategoriesList.classList.toggle('opened')
    })
  }

  // SHOW SEARCH BLOG 

  const showSearchTrigger = document.querySelector('.search-open-trigger')
  const searchBlog = document.querySelector('.blog-navigation__search')
  
  if (showSearchTrigger) {
    showSearchTrigger.addEventListener('click', function(){
      searchBlog.classList.toggle('opened')
      showSearchTrigger.classList.toggle('opened')
    })
  }

  /* ROTATE TO SCROLL */

  const rotateElems = document.querySelectorAll(".js-rotate");

  if (rotateElems) {
    rotateElems.forEach(function (el) {
      window.addEventListener("scroll", function () {
        el.style.transform = `rotate(${window.pageYOffset}deg)`;
      });
    });
  }

  /* Init animate */

  AOS.init();

  /* ACCORDION */

  const accordion = document.querySelectorAll(".js-accordion");

  if (accordion.length !== 0) {
    accordion.forEach(function (el) {
      new Accordion(el);
    });
  }

  // FADING TEXT 

  const typed = $('#typed2')
  if (typed.length){
    loop("#typed2 p")
  }


  // open lightgallery

  $('.js-open-roadmap').magnificPopup({
    type: 'image'
    // other options
  });


  // handle select 

  $('.js-tarif-picker').select2({
    placeholder: 'Select an option',
    width: 'resolve'
  })


  // timer
  // TIMER

  let mins = 14;
  let secs = 59;
  
  const minsTimer = document.querySelector('#base-timer-label-mins'),
      secsTimer = document.querySelector('#base-timer-label-secs');

  if(minsTimer){
    const minsTimerLabel = minsTimer.querySelector('.base-timer__label'),
          secsTimerLabel = secsTimer.querySelector('.base-timer__label'),
          minsTimerPath = minsTimer.querySelector('.base-timer__path-remaining'),
          secsTimerPath = secsTimer.querySelector('.base-timer__path-remaining');

    minsTimerLabel.innerHTML = mins;
    secsTimerLabel.innerHTML = secs;

    let timerCase2 = setInterval(function(){
      secs -= 1;
      if (secs < 0) {
        secs = 59;
        mins -= 1;
      }
      if (mins < 0) {
        mins = secs = 0;
        clearInterval(timerCase2)
      }
      minsTimerLabel.innerHTML = mins;
      secsTimerLabel.innerHTML = secs;
      setCircleDasharray(minsTimerPath, mins);
      setCircleDasharray(secsTimerPath, secs);
    }, 1000)
  }

  const case2 = document.querySelector('#case2')
  if (case2) {
    fetch("/static/js/reviews.json")
    .then(response => response.json())
    .then(json => console.log(json));
  }


});
/* END DOCUMENT LISTENER*/

/* FUNCTIONS */

function loop(els) {
  $(els).each(function() {
    var $self = $(this);
    $self.parent().queue(function (n) {
      $self.fadeIn(2000).delay(2000).fadeOut(2000, n);
    });
  }).promise().done(loop);
};

function isHasSlider(sliders) {
  let bool = false;
  sliders.forEach(function (form) {
    bool = !!document.querySelector(form.container);
  });
  return bool;
}

function tabs(selectors) {
  const btn = document.querySelectorAll(selectors.btn);
  const content = document.querySelectorAll(selectors.content);

  if (btn.length !== 0) {
    btn.forEach(function (el) {
      el.addEventListener("click", function () {
        btn.forEach(function (elChild) {
          elChild.classList.remove("active");
        });
        el.classList.add("active");

        content.forEach(function (rowSingle) {
          rowSingle.style.display = "none";
        });
        const getId = el.getAttribute("data-target");
        document.querySelector(getId).style.display = "block";
      });
    });
  }
}

function filter(selectors) {
  const btn = document.querySelectorAll(selectors.btn);
  const content = document.querySelectorAll(selectors.content);

  if (btn.length !== 0) {
    btn.forEach(function (el) {
      const getCategory = el.getAttribute("data-target");

      el.addEventListener("click", function () {
        btn.forEach(function (elChild) {
          elChild.classList.remove("active");
        });
        el.classList.add("active");

        if (getCategory === "all") {
          content.forEach(function (rowSingle) {
            rowSingle.style.display = "flex";
          });
        } else {
          content.forEach(function (rowSingle) {
            const getItemCategory = rowSingle.getAttribute("data-category");

            if (getCategory === getItemCategory) {
              rowSingle.style.display = "flex";
            } else {
              rowSingle.style.display = "none";
            }
          });
        }
      });
    });
  }
}

function inputElement(form, inputName) {
  const input = form.querySelector(`input[name=${inputName}]`);
  const textarea = form.querySelector(`textarea[name=${inputName}]`);
  if (input) return input;
  return textarea;
}

function getData(form, fields) {
  let data = {};
  fields.forEach((item) => {
    if (item.name !== "checkbox") {
      data[item.name] = inputElement(form, item.name).value;
    }
  });
  return data;
}

function validate(form, fields) {
  const errorMessageOneElement = (inputName) =>
    form.querySelector(`#error-${inputName}`);
  const errorMessagesElements = form.querySelectorAll(".form-error-text");
  const errorInputsElements = form.querySelectorAll(".error");

  function clearError() {
    errorMessagesElements.forEach(function (el) {
      el.innerHTML = "";
    });

    errorInputsElements.forEach(function (el) {
      el.classList.remove("error");
    });
  }

  function isEmpty(inputName) {
    const value = inputElement(form, inputName).value;
    return !!validator.isEmpty(value, { ignore_whitespace: true });
  }

  function isEmail(inputName) {
    const value = inputElement(form, inputName).value;
    return !!validator.isEmail(value);
  }

  function isChecked(inputName) {
    const isChecked = inputElement(form, inputName).checked;
    return validator.equals(isChecked ? "true" : "false", "true");
  }

  function addError(inputName, message) {
    errorMessageOneElement(inputName).innerHTML = message;
    inputElement(form, inputName).classList.add("error");
  }

  clearError();

  const errors = [];

  fields.forEach(function (field) {
    const fieldRules = field.rules;
    const fieldName = field.name;

    if (validator.contains(fieldRules, "valid_email") && !isEmail(fieldName)) {
      addError(fieldName, "Некорректный Email");
      errors.push(`valid_email__${fieldName}`);
    }
    if (validator.contains(fieldRules, "checkbox") && !isChecked(fieldName)) {
      addError(fieldName, "Нужно согласиться на обработку");
      errors.push(`checkbox__${fieldName}`);
    }
    if (validator.contains(fieldRules, "required") && isEmpty(fieldName)) {
      addError(fieldName, "Поле обязательно к заполнению");
      errors.push(`required__${fieldName}`);
    }
  });

  return errors.length === 0;
}

function calculateTimeFraction(timeLeft) {
  return timeLeft / TIME_LIMIT;
}

function setCircleDasharray(el, timeLeft) {
  const circleDasharray = `${(
    Math.abs(FULL_DASH_ARRAY - calculateTimeFraction(timeLeft) * FULL_DASH_ARRAY)
  ).toFixed(0)} 283`;
  el.setAttribute("stroke-dasharray", circleDasharray);
}