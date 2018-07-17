var isLocalhost = checkLocalhost();

jQuery(document).ready(function ($) {





	for_footer_place();
	setTimeout(function () {
		$('#pre-loader-area').animate({opacity: 1}, 1000)
	}, 2000);

	$(window).load(function () {
		for_footer_place();

		$('#pre-loader').animate({opacity: 0}, 500, function () {
			$(this).hide().remove();
		});

       
       
	});

	$(window, document).resize(function () {
		for_footer_place();
	});

	$(window, document).scroll(function (e) {

	});


    






	$('.number-only').bind("change keyup input click", function () {
		if (this.value.match(/[^0-9\+]/g)) {
			this.value = this.value.replace(/[^0-9\+]/g, '');
		}
	});

	$('.modal').on('click', 'button.close', function () {
		$('.modal').each(function () {
			if ($(this).attr('data-old-title') != '' && $(this).hasClass('in')) {
				$(this).find('.modal-title').text($(this).attr('data-old-title'));
				$(this).removeAttr('data-old-title');
			}
		});
	});

	var isBody = $('body');
	$('.open-mobile-menu-button').on('click', function (e) {
		e.preventDefault();

		var mmMenu = $('#mobile-menu');
		if (mmMenu.hasClass('mobile-menu-hidden') && !isBody.hasClass('over-hidden')) {
			isBody.addClass('over-hidden');
			mmMenu.removeClass('mobile-menu-hidden');
		}
	});
	$('.indins-menu-close-btn').on('click', function (e) {
		e.preventDefault();

		var mmMenu = $('#mobile-menu');
		if (!mmMenu.hasClass('mobile-menu-hidden') && isBody.hasClass('over-hidden')) {
			isBody.removeClass('over-hidden');
			mmMenu.addClass('mobile-menu-hidden');
		}
	});

	$(".youtube").click(function (e) {
		e.preventDefault();
		var isUrl = false, isType;

		if ($(this).attr('data-href') != null) {
			isUrl = $(this).attr('data-href');
		}
		else if ($(this).attr('href') != null) {
			isUrl = $(this).attr('href');
		}

		if (isUrl) {
			if (window.chrome) {
				isUrl = isUrl.replace(new RegExp("watch\\?v=", "i"), 'embed/');
				isType = 'iframe';
			}
			else {
				isUrl = isUrl.replace(new RegExp("watch\\?v=", "i"), 'v/');
				isType = 'swf';
			}

			$.fancybox({
				'padding': 0,
				'autoScale': false,
				'transitionIn': 'none',
				'transitionOut': 'none',
				'title': this.title,
				'width': 680,
				'height': 495,
				'href': isUrl,
				'type': isType,
				'swf': {
					'wmode': 'transparent',
					'allowfullscreen': 'true'
				},
				'helpers': {
					'overlay': {
						'locked': false
					}
				}
			});
		}
	});

	var fancyboxId = 0;
	if ($('.fancybox').length) {
		$('.fancybox-part').each(function () {
			var fancyboxAttr = "gallery_" + fancyboxId;
			$(this).find('.fancybox').attr('rel', fancyboxAttr).fancybox({
				closeBtn: '<a title="Закрыть" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				overlay: {
					closeClick: true,
					speedOut: 500,
					showEarly: true,
					css: {},
					locked: true
				},
				padding: 0,
				maxWidth: 1200,
				maxHeight: 800,
				beforeShow: function () {
					var alt = this.element.find('img').attr('alt');
					this.inner.find('img').attr('alt', alt);
					this.title = alt;
				},
				'helpers': {
					'overlay': {
						'locked': false
					}
				}
			});
			fancyboxId++;
		});
	}
	/* ---------------------------------------------------------------------------------- */
	// Phone actions

	$('.mm-contact,#specialist_call').on('click', function (e) {
		e.preventDefault();

		ga('send', 'event', {
			eventCategory: 'callback',
			eventAction: 'open_modal'
		});
	
		// if(isLocalhost) yaCounter43480839.reachGoal('call_back');

		var bIsMobileView = initMobile();

		if (bIsMobileView) {
			var ph = "tel:" + $(this).find('.mm-contact-phone').text().replace(new RegExp(/\(|\)|\s|-/, 'g'), '');
			window.location.href = ph;
		} else {
			// console.log('asd');
			showModal('cb_form');
		}
		
		
	});
	
// 	$('#specialist_call').on('click', function (e) {
// 		e.preventDefault();
		
        
// 		ga('send', 'event', {
// 			eventCategory: 'callback',
// 			eventAction: 'open_modal'
// 		});
// 		// if(isLocalhost) yaCounter43480839.reachGoal('call_back');
// 		var doctor = $("h1.item-title").text();
// 	$("#doctor").val(doctor);
		    
		
			
			
// 			var bIsMobileView = initMobile();
			
// 			if (bIsMobileView) {
// 			var ph = "tel:" + $(this).find('.mm-contact-phone').text().replace(new RegExp(/\(|\)|\s|-/, 'g'), '');
// 			window.location.href = ph;
// 		} else {
// 			// console.log('asd');
// 			showModal('specialist_form');
// 		}
	
// 	});

// 	$('#cb_submit').on('click', function () {
// 		var phone_is = $('#cb_phone').val();
// 		$('#cb_phone').val('');
// 		sendFeedback(phone_is);
// 	});

// 	$('.mti-phone').on('click', 'button', function (e) {
// 		e.preventDefault();
// 		var phone = $(this).parents('.mti-phone').find('input');
// 		sendFeedback(phone.val());
// 		phone.val('');
// 		// if(isLocalhost) yaCounter43480839.reachGoal('call_back');
// 	});

//OWN FORMS 

$('.mti-phone-new').on('click', 'button', function (e) {
    
    var cf_link = $(this);
   e.preventDefault();
   	var data_arr = {};
   	
   	data_arr.phonetext = cf_link.parents('.mti-phone-new').find('input').val();
   	
   	var order_data = {
    value: data_arr
    };
    $.ajax({
            type: 'POST',
            url: "ajax_handler.php.htm"/*tpa=http://zubnoy-centr.ru/ajax_handler.php*/,
            data: order_data,
            dataType: "json",
            success: function(mes) {
                
                
              if (mes.phoneErr) {  
                if (mes.phoneErr) {
                   cf_link.parents('.mti-phone-new').find('input').addClass("err");
                } else {
                   cf_link.parents('.mti-phone-new').find('input').removeClass("err");
                }
              }
              else
              {
                  cf_link.parents('.mti-phone-new').find('input').val("");
                   cf_link.parents('.mti-phone-new').find('input').removeClass("err");
              }
            },
            error: function(e) {}
        });
});  
    
    
$('#cb_submit').on('click', function (e) {
    
    e.preventDefault();
    var cf_link = $(this);
    
   	var data_arr = {};
   	
   	if($("#doctor").length != 0){
   	 var doctor = $("h1.item-title").text();
	  cf_link.parent().find('input[name="doctortext"]').val(doctor);   
	data_arr.doctortext  = cf_link.parent().find('input[name="doctortext"]').val();
   	}
   	data_arr.phonetext = cf_link.parent().find('input[name="phonetext"]').val();
   	data_arr.nametext  = cf_link.parent().find('input[name="nametext"]').val();

   	var order_data = {
    value: data_arr
    };
    $.ajax({
            type: 'POST',
            url: "ajax_handler_callback.php.htm"/*tpa=http://zubnoy-centr.ru/ajax_handler_callback.php*/,
            data: order_data,
            dataType: "json",
            success: function(mes) {
                
              if (mes.phoneErr || mes.nameErr) {  
                if (mes.phoneErr) {
                   cf_link.parent().find('input[name="phonetext"]').addClass("err");
                } else {
                   cf_link.parent().find('input[name="phonetext"]').removeClass("err");
                }
                 if (mes.nameErr) {
                   cf_link.parent().find('input[name="nametext"]').addClass("err");
                } else {
                   cf_link.parent().find('input[name="nametext"]').removeClass("err");
                }
              }
              else
              {
                  cf_link.parent().find('input[name="phonetext"]').val("");
                  cf_link.parent().find('input[name="nametext"]').val("");
                  cf_link.parent().find('input[name="phonetext"]').removeClass("err");
                cf_link.parent().find('input[name="nametext"]').removeClass("err");
              }
            },
            error: function(e) {}
        });
});  







    
    
	/* ---------------------------------------------------------------------------------- */
});

var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

var mMobileKeywords = [
	'iPhone',
	'iPad',
	'iPod',
	'Android',
	'Opera Mini',
	'Opera Moby',
	'BlackBerry',
	'Windows Phone'
];

function initMobile() {
	var ua = window.navigator.userAgent.toLowerCase(), bTrue = false;
	for (var i = 0; i < mMobileKeywords.length; i++) {
		if (ua.indexOf(mMobileKeywords[i].toLowerCase()) > -1) {
			bTrue = true;
			break;
		}
	}
	return bTrue;
}

function sendFeedback(phone) {
	$.ajax({
		dataType: "json",
		type: "POST",
		url: "ajax.php.htm"/*tpa=http://zubnoy-centr.ru/do/ajax.php*/,
		async: false,
		data: {
			classname: 'feedback',
			direction: 'feedback',
			phone: phone
		},
		error: function (msg) {
			console.log('Query error');
		}
	}).done(function (msg) {
		$('#cb_form').modal('hide');
		if(msg.error.status === true) {
			showModal('feedbackconfirm', 'Ошибка', msg.error.text);
		} else {
			showModal('feedbackconfirm', 'Спасибо', msg.error.text);
		}
	});
}

function for_footer_place() {
	var foot_height = $('#footer').innerHeight(),
		wrapper = $('#wrapper');
	$('body').css({paddingBottom: foot_height});
	if (wrapper.length) wrapper.css({minHeight: $(window).innerHeight() - foot_height});
}

function checkLocalhost() {
	var answer = false;

	$.ajax({
		dataType: "json",
		type: "POST",
		url: "ajax.php.htm"/*tpa=http://zubnoy-centr.ru/do/ajax.php*/,
		async: false,
		data: {direction: 'checkLocalhost'},
		error: function (msg) {
			console.log('Query error');
		}
	}).done(function (msg) {
		answer = msg;
	});
	return answer;
}

function showModal(nameform, headTitle, modalText) {
	// console.log(nameform);
	var thisModal = $('#' + nameform);
	if (headTitle) {
		var modTitle = thisModal.find('.modal-title'),
			modOldTitle = modTitle.text();
		modTitle.text(headTitle);
		thisModal.attr('data-old-title', modOldTitle);
	}
	if (modalText) {
		var modText = thisModal.find('.modal-body');
		modText.text(modalText);
	}
	thisModal.modal('show');
}

$('.modal').on('click', 'button.close', function () {
	$('.modal').each(function () {
		if ($(this).attr('data-old-title') != '' && $(this).hasClass('in')) {
			$(this).find('.modal-title').text($(this).attr('data-old-title'));
			$(this).removeAttr('data-old-title');
		}
	});
});