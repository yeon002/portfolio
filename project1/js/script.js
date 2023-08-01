
$(document).ready(function(){

	let winw;
	let wint=0;
	let winHalf;

	//hover white
	$(".desktop_menu > ul > li").hover(function(){
		$("#header").addClass("active");
	},
	function(){
		$("#header").removeClass("active");
	});

	//scroll white
	$(window).scroll(function(){
		wint=$(window).scrollTop();
		winHalf=$(window).height()/2;
		// console.log(wint);

		if(wint > 70) {
			$("#header").addClass("white");
		}
		else {
			$("#header").removeClass("white");
		}
	});

	//mobile_menu 

	$(".tab").click(function(e){
		e.preventDefault();
		$("#mobile").addClass("active");
	});
	$("#mobile a").click(function(e){
		e.preventDefault();
	});
	$("#mobile > a > i").click(function(){
		$("#mobile").removeClass("active");
	});

	$("#mobile > .mobile_menu > ul > li").click(function(){

		if($(this).hasClass("active") == false){
			$("#mobile > ul > li").removeClass("active");
			$(this).addClass("active");
			$("#mobile ul ul").slideUp(300, function(){
				$(this).removeAttr("style");
			});
			$(this).find("ul").slideDown(300);
		}
		else{
			$("#mobile > ul > li").removeClass("active");
			$(this).removeClass("active");
			$(this).find("ul").slideUp(300, function(){
				$(this).removeAttr("style");
				$("#mobile > ul > li").removeClass("active");
			});
		}
	});



	// mainslider
	const mainSwiper = new Swiper(".mainSwiper", {
		speed: 2000, 
		loop: true,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		on: {
			init: function(){
				$("#page1 .container .text .control li").removeClass("active");
				$("#page1 .container .text .control li").eq(this.realIndex).addClass("active");
			},
			slideChange: function(){
				$("#page1 .container .text .control li").removeClass("active");
				$("#page1 .container .text .control li").eq(this.realIndex).addClass("active");
			}
		}
	});

	const momentSwiper = new Swiper(".momentSwiper", {
		loop: true,
		// slidesPerView: 2,
		// spaceBetween: 20,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false
		// },
		breakpoints: {
			800: {
				slidePerView: 1,
				spaceBetween: 20
			},
			1020: {
				slidesPerView: 2,
				spaceBetween: 20
			}
		}
	});



	// 문의사항 숫자 카운트
	$('#test').on('keyup', function() {
		$('#test_cnt').html(""+$(this).val().length+" / 1000");
	
		if($(this).val().length > 100) {
			$(this).val($(this).val().substring(0, 100));
			$('#test_cnt').html("(100 / 100)");
		}
	});

	//개인정보 동의 클릭
	$(".check a").click(function(e){
		e.preventDefault();
		// $(this).toggleClass("checked");

		if($(this).hasClass("checked") == false){
			$(this).addClass("checked");
			$(this).prev().prop("checked", true);
		}
		else{
			$(this).removeClass("checked");
			$(this).prev().prop("checked", false);
		}
	});

	// family site select 

	$(".select dt a").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(".select dd").slideToggle(100);
	});
	$(".select dd a").click(function(e){
		e.preventDefault();
		$(this).removeClass("active");
		$(".select dd").slideUp(100);
	});

	let hoverFlag=false;

	function scrollInteraction(t){
		if(hoverFlag) return;

		if($(".content2").hasClass("active")){
			setTimeout(function(){
				$("#section .content2 li").addClass("hover");
				hoverFlag=true;
			}, 1200);
		}
	}

	// scroll trigger 
	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "active",
					out: "inactive"
				}
			},
			offset: {
				viewport: {
					x: 0,
					y: 0.25
				}
			}
		},
		scroll: {
			sustain: 200,
			element: window,
			callback: (offset, dir) => { scrollInteraction(offset.y); }
		}
	});
	trigger.add("div[class^=content]");
	trigger.add("#footer");
});