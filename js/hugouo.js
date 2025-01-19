/* Detect if is mobile */
var isMobile = false;
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
) {
  isMobile = true;
}

/* Document ready */
jQuery(document).ready(function ($) {
  if (isMobile) return;

  /* Detect element overflow */
  $.fn.overflown = function () {
    var e = this[0];
    return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
  };

  /* Prevent scroll main window */
  var b = $("body");
  $("#toc-scroll")
    .mouseenter(function () {
      if ($(this).overflown()) {
        b.css("overflow", "hidden");
      }
      $(this).removeClass("hide-scrollbar");
    })
    .mouseleave(function () {
      b.css("overflow", "");
      $(this).addClass("hide-scrollbar");
    });

  /* Smooth scroll */
  var url = "https://cdnjs.cloudflare.com/ajax/libs/jquery-smooth-scroll/2.2.0/jquery.smooth-scroll.min.js";
  $.getScript(url, function () {
    $(".smoothScroll").click(function (event) {
      event.preventDefault();
      var dest = 0;
      var target = $(jq(decodeURI(this.hash)));
      if (target.offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height();
      } else {
        dest = target.offset().top;
      }
      $("html,body").animate({ scrollTop: dest }, 300, "swing");
      window.location = $(this).attr("href");
    });
  });

  /* Scrollspy */
  $(window).bind("scroll", function () {
    $("#toc-scroll").scrollTop($(this).scrollTop() / 50 - 10);
    var currentTop = $(window).scrollTop() + 40;
    var elems = $(".scrollspy");
    elems.each(function () {
      var elemTop = $(this).offset().top - 20;
      var elemBottom = elemTop + $(this).height() + 20;
      if (currentTop >= elemTop && currentTop <= elemBottom) {
        var href = $(this).attr("href").toLowerCase();
        var nowElem = $('a.toc-link[href="' + href + '"]');
        $("a.toc-link").removeClass("active");
        nowElem.addClass("active");
      }
    });
  });

  /* Go to top button */
  $("#gotop_btn").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 1000);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#gotop_btn').fadeIn("fast");
    } else {
      $('#gotop_btn').stop().fadeOut("fast");
    }
  });

  /* Footnote tooltip popup bubble */
  fnTooltip();

  /* Show the code label for code highlight block */
  putLanguageLabels();
});

/* Select element by ID with special characters */
function jq(myid) {
  return myid.replace(/(:|\.|\[|\]|,|=|@)/g, "\\$1");
}

/* Footnote tooltip popup bubble */
function fnTooltip() {
  $(".footnote-ref-wrapper").each(function () {
    var id = $(this).children("a").attr("href").substr(1),
      footnote = $(document.getElementById(id)).clone(),
      outer_wrapper = $("<span>", { "class": "fn-content" }),
      inner_wrapper = $("<span>", { "class": "fn-text" });
    footnote.find(".footnote-backref").remove();
    $(this).append(outer_wrapper.append(inner_wrapper.html(footnote.html())));
  });

  /* Fix tooltip position & width */
  var position = function () {
    var content = $(".fn-content").removeAttr("style");
    if ($(window).width() < 640)
      content.css("width", $(window).width() / 2);
    else
      content.css("width", 340);
    content.each(function () {
      var width = $(this).children(".fn-text").outerWidth();
      $(this).css({
        "width": width,
        "margin-left": width / -2
      });
    });
  };
  position();
  $(window).resize(position);
}

/* Generate random ID */
function random_id() {
  return Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
}

/* Show the code label for code highlight block */
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
    let color_overwrite = "";
    let bg = block.getAttribute('bg');
    if (bg != null) {
      color_overwrite += "background-color:" + bg + ";";
    }
    let fg = block.getAttribute('fg');
    if (fg != null) {
      color_overwrite += "color:" + fg + ";";
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

/* Copy code to clipboard */
function copyCodeToClip(code_id) {
  let code = document.getElementById(code_id);
  let textArea = document.createElement("textarea");

  /* Hide line number before copy */
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

  /* Notify user */
  const Notify = new XNotify("BottomLeft");
  Notify.info({
    borderRadius: "2px",
    content: "copied!",
    duration: 3000,
    background: "#646464"
  });
}

/* Encrypt and decrypt functions */
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i !== bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function rhexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i !== bytes.length; i++) {
    bytes[i] = parseInt(hex.substring((bytes.length - i) * 2, (bytes.length - i) * 2 - 2).split("").reverse().join(""), 16);
  }
  return bytes;
}

function byteArrayToInt(byteArray) {
  let value = 0;
  for (var i = 0; i < byteArray.length; i++) {
    value = (value * 256) + byteArray[i];
  }
  return value;
}

function intToBytes(input, length) {
  const bytes = new Uint8Array(length);
  for (let i = length - 1; i >= 0; i--) {
    let byte = input & 0xff;
    bytes[i] = byte;
    input = (input - byte) / 256;
  }
  return bytes;
}

function removeLeadingZeroes(bytes) {
  let i = 0;
  while (i < bytes.length && bytes[i] === 0) {
    i++;
  }
  return bytes.slice(i);
}

function decrypt(id) {
  let success = true;
  const password_str = document.querySelector("#password-" + id).value;
  if (password_str.trim() === "") {
    success = false;
  }

  let password = parseInt(password_str);
  const encodedString = document.querySelector("#encrypt-wrapper-" + id).innerText;
  const list = encodedString.split('-');
  const step = Math.floor(281474976710656 / (list.length - 1));
  let decryptResult = [];

  for (let i = 0; i < list.length; i++) {
    xb = rhexToBytes(Base64.decode(list[i]));
    x = byteArrayToInt(xb) - password;
    password = (password + step) % 281474976710656;
    dxb = intToBytes(x, xb.length);
    try {
      decryptResult.push(new TextDecoder("utf8", { fatal: true }).decode(removeLeadingZeroes(dxb)));
    } catch (e) {
      success = false;
      if (!(e instanceof TypeError)) {
        console.error(e);
      }
    }
  }
  if (success) {
    document.querySelector("#decrypt-result-" + id).innerHTML = '<p>' + decryptResult.join('') + '</p>';
  } else {
    document.querySelector("#decrypt-result-" + id).innerHTML = '<p>Wrong password!</p>';
  }
}

function cleanDecrypt(id) {
  document.querySelector("#decrypt-result-" + id).innerHTML = '<p>Some things are hidden...</p>';
  document.querySelector("#password-" + id).value = '';
}