/* Detect if is mobile */
var isMobile = false; //initiate as false
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

/* Change title */
jQuery(document).ready(function ($) {
  if (isMobile) return;
  // Get page title
  // var pageTitle = $("title").text();

  // var w = $(window);
  // var t = $("title");
  // // Change page title on blur
  // w.blur(function () {
  //   t.text("QuQ");
  // });

  // // Change page title back on focus
  // w.focus(function () {
  //   t.text("OuO");
  //   function original() {
  //     t.text(pageTitle);
  //   }
  //   setTimeout(original, 1000);
  // });

  $.fn.overflown = function () {
    // detect element overflow ref: https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing#comment27010845_9541579
    var e = this[0];
    return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
  }

  // prevent scroll main window ref: https://stackoverflow.com/a/24742225/6734174
  // show only hover ref: https://stackoverflow.com/a/12555394/6734174
  var b = $("body");
  $("#toc-scroll")
    .mouseenter(function (event) {
      if ($(this).overflown()) {
        b.css("overflow", "hidden");
      }
      $(this).removeClass("hide-scrollbar");
    })
    .mouseleave(function (event) {
      b.css("overflow", "");
      $(this).addClass("hide-scrollbar");
    });
});

function jq(myid) {
  // Ref: https://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
  return myid.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
}
/* Smooth scroll */
var url =
  "https://cdnjs.cloudflare.com/ajax/libs/jquery-smooth-scroll/2.2.0/jquery.smooth-scroll.min.js";
$.getScript(url, function () {
  $(".smoothScroll").click(function (event) {
    event.preventDefault();
    //calculate destination place
    var dest = 0;
    // console.log(jq(decodeURI(this.hash)));
    // console.log($(jq(decodeURI(this.hash))));
    target = $(jq(decodeURI(this.hash)));
    if (target.offset().top > $(document).height() - $(window).height()) {
      dest = $(document).height() - $(window).height();
    } else {
      dest = target.offset().top;
    }
    //go to destination
    $("html,body").animate({ scrollTop: dest }, 300, "swing");

    // https://forum.jquery.com/topic/bind-a-click-then-continue#14737000002208582
    window.location = $(this).attr("href");
  });
});

/* Scrollspy */
$(window).bind("scroll", function () {
  // link to the toc's scrollbar
  $("#toc-scroll").scrollTop($(this).scrollTop() / 50 - 10);
  var currentTop = $(window).scrollTop() + 40;
  var elems = $(".scrollspy");
  elems.each(function (index) {
    var elemTop = $(this).offset().top - 20;
    var elemBottom = elemTop + $(this).height() + 20;
    if (currentTop >= elemTop && currentTop <= elemBottom) {
      // handle chinese heading
      var href = $(this).attr("href").toLowerCase();
      var nowElem = $('a.toc-link[href="' + href + '"]');
      $("a.toc-link").removeClass("active");
      nowElem.addClass("active");
    }
  });
});

/* gotop_btn */
$(function () {
  $("#gotop_btn").click(function () {
    jQuery("html,body").animate({
      scrollTop: 0
    }, 1000);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#gotop_btn').fadeIn("fast");
    } else {
      $('#gotop_btn').stop().fadeOut("fast");
    }
  });
});

/**
 * footnote tooltip popup bubble
 * Ref: https://www.xianmin.org/hugo-theme-jane/post/doc-footnote-preview/
 * Ref: https://github.com/xianmin/hugo-theme-jane/search?q=footnote
 */
var fnTooltip = function () {
  $(".footnote-ref-wrapper").each(function () {
    var id = $(this).children("a").attr("href").substr(1),
      footnote = $(document.getElementById(id)).clone(),
      outer_wrapper = $("<span>", { "class": "fn-content" }),
      inner_wrapper = $("<span>", { "class": "fn-text" });
    footnote.find(".footnote-backref").remove();
    // console.log(id);
    $(this).append(outer_wrapper.append(inner_wrapper.html(footnote.html())));
  });

  // fix tooltip position & width
  var position = function () {
    var content = $(".fn-content").removeAttr("style");
    if ($(window).width() < 640)
      content.css("width", $(window).width() / 2);
    else
      content.css("width", 340); // default value
    content.each(function () {
      var width = $(this).children(".fn-text").outerWidth();
      $(this).css({
        "width": width,
        "margin-left": width / -2
      });
    });
  }
  position();
  $(window).resize(position());
}

// generate random id
let random_id = () => {
  return Math.floor((1 + Math.random()) * 0x100000000)
    .toString(16)
    .substring(1);
}

/* show the code label for code highlight block */
/* Ref: https://github.com/highlightjs/highlight.js/issues/1108#issuecomment-608415953 */
if (document.readyState !== 'loading') putLanguageLabels()
else document.addEventListener('DOMContentLoaded', putLanguageLabels);
function putLanguageLabels() {
  let highlight = document.querySelectorAll('div.highlight');
  Array.prototype.forEach.call(highlight, function (block) {
    let code = block.querySelectorAll('pre code[data-lang]');
    block.id = "code-" + random_id();
    let language = code[0].getAttribute('data-lang');
    let alias = block.getAttribute('name');
    
    if (alias != null) {
      language = alias;
    }
    if (language == "fallback") {
      return;
    }
    // change the label color
    let color_overwrite = ""
    let bg = block.getAttribute('bg');
    if (bg != null) {
      color_overwrite += "background-color:"+ bg +";";
    }
    let fg = block.getAttribute('fg');
    if (fg != null) {
      color_overwrite += "color:"+ fg +";";
    }
    if (color_overwrite != "") {
      color_overwrite = "style='" + color_overwrite + "'";
    }
    let need_copy = block.getAttribute('copy');
    if (need_copy === null || need_copy != "no") {
      block.insertAdjacentHTML("beforebegin", `<div class="row code-meta"><label class="code-label" ${color_overwrite}>${language}</label><a onclick="copyCodeToClip('${block.id}')" role="button" class="code-copy no-underline no-underline-on-hover no-color" title="Copy the code block" style="cursor: pointer"><i class="far fa-clone"></i></a></div>`);
    } else {
      block.insertAdjacentHTML("beforebegin", `<div class="row code-meta"><label class="code-label" ${color_overwrite}>${language}</label></div>`);
    }
  });
}

function copyCodeToClip(code_id) {
  let code = document.getElementById(code_id);
  let textArea = document.createElement("textarea");

  // hide line number before copy
  let tds = code.querySelectorAll("td");
  if (tds.length > 1) {
    let prestore = tds[0].style.display;
    tds[0].style.display = "none";
    textArea.value += code.innerText
      .replace(/\n\n/gm, "\n")
      .replace(/^> /gm, "")
      .replace(/^\$ /gm, "");
    tds[0].style.display = prestore;
  } else {
    textArea.value += code.innerText
      .replace(/\n\n/gm, "\n")
      .replace(/^> /gm, "")
      .replace(/^\$ /gm, "");
  }

  document.body.appendChild(textArea);
  navigator.clipboard.writeText(textArea.value).then(function () {
    // console.log('Async: Copying to clipboard was successful!');
  }, function (err) {
    console.error('Async: Could not copy text: ', err);
  });
  textArea.remove();

  // https://github.com/Xtrendence/X-Notify  (modified)
  const Notify = new XNotify("BottomLeft");
  Notify.info({
    borderRadius: "2px",
    content: "copied!",
    duration: 3000,
    background: "#646464"
  });
}

/* main */
$(document).ready(function () {
  if (isMobile) return;
  fnTooltip();
});
/**
 * footnote tooltip popup bubble end
 */