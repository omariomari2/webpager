

$('.process-blocks').on('mouseenter mouseleave', function() {
  $(this).toggleClass('hover-block');
});

$('.submit-prox').on('click', function() {
  $('.submit-btn').click();
});

//scrolling-animation
$("[tr-scroll-toggle='component']").each(function (index) {
  let component = $(this);
  let lists = component.find("[tr-scroll-toggle='list']");
  let itemTotal = lists.first().children().length;
  component.find("[tr-scroll-toggle='number-total']").text(itemTotal);

  let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }
  let triggers = component.find("[tr-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-140vh");
  let trSpacer = $("<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>").hide().appendTo(component);

  let minWidth = 0;
  let trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }

  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {

    trSpacer.show();

    function makeItemActive(activeIndex) {
      component.find("[tr-scroll-toggle='transform-y']").css("transform", `translateY(${activeIndex * -100}%)`);
      component.find("[tr-scroll-toggle='transform-x']").css("transform", `translateX(${activeIndex * -100}%)`);
      component.find("[tr-scroll-toggle='number-current']").text(activeIndex + 1);
      lists.each(function (index) {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
    }
   //makeItemActive(0);

    let anchorLinks = component.find("[tr-anchors]").children();
    anchorLinks.on("click", function () {
      let myIndex = $(this).index();
      let scrollDistance = triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
      $("html, body").animate({ scrollTop: scrollDistance });
    });

    triggers.each(function (index) {
      let triggerIndex = index;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top top",
          end: "bottom top",
          scrub: true,
          onToggle: ({ self, isActive }) => {
            if (isActive) {
              makeItemActive(triggerIndex);
            }
          }
        },
        defaults: {
          ease: "none"
        }
      });
      lists.each(function () {
        let childItem = $(this).children().eq(triggerIndex);
        tl.to(childItem.find("[tr-item-animation='progress-horizontal']"), { width: "100%" }, 0);
      });
    });
  });
});

//form success animation
$('.form').submit(()=>{	
  $('.success-trig').click();
});

//open lightbox
$('.play-vid-btn').on('click', function() {
  $('.lightbox-open').click();
});

