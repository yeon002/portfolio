$(function(){
	const offsetData={
		shadowInfo: [
			{left: "10%", width: "43%"},
			{left: "60%", width: "35%"},
			{left: "10%", width: "40%"},
			{left: "0%", width: "30%"},
			{left: "55%", width: "35%"}
		],
		textInfo: [
			{left: "57%"},
			{left: "25%"},
			{left: "57%"},
			{left: "37%"},
			{left: "25%"}
		]
	};

	const titleData=[
		{
			title: "<span>OLGODA</span><span><span>",
			subject: "<dt>반응형 웹 구축</dt><dd><span>3 Weeks</span><span>TypeScript</span><span>SASS</span><span>HTML5 + CSS3</span></dd>",
			link: "../portfolio/project1/index.html"
		},
		{
			title: "<span>Wylie</span><span><span>",
			subject: "<dt>반응형 웹 구축</dt><dd><span>EcmaScript</span><span>JavaScript Native</span><span>HTML5 + CSS3</span></dd>",
			link: "../portfolio/project2/index.html"
		},
		{
			title: "<span>Emons</span>",
			subject: "<dt>반응형 웹 구축</dt><dd><span>jQuery</span><span>SASS</span><span>HTML5 + CSS3</span></dd>",
			link: "../portfolio/project3/index.html"
		},
		{
			title: "<span>구름 아래 소극장</span>",
			subject: "<dt>반응형 웹 구축</dt><dd><span>jQuery</span><span>HTML5 + CSS3</span></dd>",
			link: "../portfolio/project4/index.html"
		},
		{
			title: "<span>노을 바다 펜션</span>",
			subject: "<dt>반응형 웹 구축</dt><dd><span>jQuery</span><span>HTML5 + CSS3</span></dd>",
			link: "../portfolio/project5/index.html"
		}
	];

	let current, total, winw;
	let targety=0;

	let mainSwiper=new Swiper(".mainSwiper", {
		allowTouchMove: false,
		loop: true,
		autoplay: {
			delay: 8000,
			disableOnInteraction: false
		},
		on: {
			init: function(){
				current=this.realIndex;
				total=this.slides.length;

				$(".main_slider .keytext").removeClass("active");
				$(".main_slider .controller .swiper_control .current").text("0"+(this.realIndex+1));
				$(".main_slider .controller .swiper_control .total").text("0"+this.slides.length);
				$(".main_slider .controller .swiper_control .progressbar span").delay(10).animate({width: "100%"}, 8000);

				setTimeout(function(){
					$(".main_slider .swiper-slide.list"+(current+1)).find(".area").addClass("active");
					$(".main_slider .keytext").addClass("active");

					if(winw > 720){
						$(".main_slider .keytext").css({left: offsetData.textInfo[current].left}); 
					}
					else{
						$(".main_slider .keytext").css({left: 30});
					}

					$(".main_slider .keytext .title").html(titleData[current].title);
					$(".main_slider .keytext .subject dl").html(titleData[current].subject);
					$(".main_slider .shadow").css({left: offsetData.shadowInfo[current].left, width: offsetData.shadowInfo[current].width}); 
					$(".main_slider .keytext .link").attr("href", titleData[current].link);
				}, 1200);
			},
			slideChange: function(){
				current=this.realIndex;

				$(".main_slider .swiper-slide .area").removeClass("active");
				$(".main_slider .keytext").removeClass("active");
				$(".main_slider .controller .swiper_control .current").text("0"+(current+1));
				$(".main_slider .controller .swiper_control .total").text("0"+this.slides.length);
				$(".main_slider .controller .progressbar span").stop().removeAttr("style");
				$(".main_slider .controller .progressbar span").delay(10).animate({width: "100%"}, 8000);
				//= gsap.to(span, {width: "100%", duration: 8, delay: 0.01};

				setTimeout(function(){
					$(".main_slider .swiper-slide.list"+(current+1)).find(".area").addClass("active");
					$(".main_slider .keytext").addClass("active");

					if(winw > 720){
						$(".main_slider .keytext").css({left: offsetData.textInfo[current].left});
					}
					else{
						$(".main_slider .keytext").css({left: 30});
					}

					$(".main_slider .keytext .title").html(titleData[current].title);
					$(".main_slider .keytext .subject dl").html(titleData[current].subject);
					$(".main_slider .shadow").css({left: offsetData.shadowInfo[current].left, width: offsetData.shadowInfo[current].width});
					$(".main_slider .keytext .link").attr("href", titleData[current].link);
				}, 600);
			}
		}
	});

	$(window).resize(function(){
		winw=$(window).width();

		if(winw > 720){
			$(".main_slider .keytext").css({left: offsetData.textInfo[current].left});
			$(".main_slider .page_control").css({display: "block"});
		}
		else{
			$(".main_slider .keytext").css({left: 30});
			$(".main_slider .page_control").css({display: "none"});
		}
	});

	$(window).trigger("resize");

	$(".main_slider .page_control .bt_prev").click(function(e){
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	$(".main_slider .page_control .bt_next").click(function(e){
		e.preventDefault();
		mainSwiper.slideNext();
	});

	$(window).scroll(function(){
		wint=$(window).scrollTop();
		winw=$(window).width();
		if(winw > 720) {
			if(wint > 120) {
				$(".page_control").css({display: "none"});
			}
			else {
				$(".page_control").css({display: "block"});
			}
		}
		else {
			$(".page_control").css({display: "none"});
		}
	});

	let tab=document.querySelector(".tab");
	let menu=document.getElementById("menu");
	let menuUl=menu.firstElementChild;
	let menuLi=menuUl.children;
	
	let contarea=document.getElementById("contarea");
	let continner=contarea.firstElementChild;

	let home=document.getElementById("home");
	let pageList= [];

	for(let i=0; i<continner.children.length; i++){
		if(continner.children[i].className.indexOf("page") != -1) {
			pageList.push(continner.children[i]);
		}
	}
	tab.addEventListener("click", (e) => {
		e.preventDefault();
		if(tab.classList.contains("active") === false){
			tab.classList.add("active");
			menu.classList.add("active");
		}
		else {
			tab.classList.remove("active");
			menu.classList.remove("active");
		}
	});

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
			element: window
		}
	});

	trigger.add(".main, .sub");

	for(let i=0; i<menuLi.length; i++){

		if( i == 0 ){
			menuLi[0].addEventListener("click", (e) => {
				e.preventDefault();
				gsap.to(window, {scrollTo: home.offsetTop, duration: 0.5});
			});
		}
		else if ( i == 1 ){
			menuLi[i].addEventListener("click", (e) => {
				e.preventDefault();
				gsap.to(window, {scrollTo: pageList[0].offsetTop, duration: 0.5});
			});
		}
		else if ( i == 2 ){
			menuLi[i].addEventListener("click", (e) => {
				e.preventDefault();
				gsap.to(window, {scrollTo: pageList[1].offsetTop, duration: 0.5});
			});
		}
		else {
			menuLi[i].addEventListener("click", (e) => {
				e.preventDefault();
				gsap.to(window, {scrollTo: pageList[2].offsetTop, duration: 0.5});
			});
		}
	}
});