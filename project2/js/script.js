window.addEventListener("load", () => {
	let gnb=document.getElementById("gnb");
	let gnbUl=gnb.firstElementChild;
	let gnbLi=gnbUl.children;
	let header=document.getElementById("header");
	console.log(gnbLi);
	let mobilemenu=document.getElementById("mobile");
	let mobileUl=mobilemenu.firstElementChild;
	let mobileLi=mobileUl.children;

	for(i=0; i<gnbLi.length; i++){
		gnbLi[i].addEventListener("mouseenter", (e) => {
			e.currentTarget.classList.add("active");
		});
		gnbLi[i].addEventListener("mouseleave", (e) => {
			e.currentTarget.classList.remove("active");
		});
	}


	// tab 기능
	let mobile=document.querySelector(".mobile");
	let [tab, mmenu]=mobile.children;
	let dim=document.querySelector(".dim");
	console.log(tab, mmenu);

	tab.addEventListener("click", () => {
		if(mobile.classList.contains("active") == false){
			mobile.classList.add("active");
			gsap.fromTo(dim, {display: "block", opacity: 0}, {opacity: 1}, 0.3);
		}
		else {
			mobile.classList.remove("active");
			gsap.to(dim, {opaicty: 0, duration: 0.3, onComplete : () => {
				dim.removeAttribute("style");
			}});
		}
	})




	let h, winHalf;
	let n=0;
	let targety=0;
	let section=document.getElementById("section");

	let pageList= [];

	for(let i=0; i<section.children.length; i++){

		// 이건 html tag로 선택하는 방법임.
		// if(section.children[i].tagName === "DIV"){
		// 	pageList.push(section.children[i]);
		// }

		// 이건 class 이름으로 선택하는 방법임.
		if(section.children[i].className.indexOf("page") != -1){
			pageList.push(section.children[i]);
		}
		else {
			menu=section.children[i];
		}
	}

	function init(){
		h=window.innerHeight;
		winHalf=h*0.75;
	}

	init();

	this.window.addEventListener("resize", init);

	console.log(pageList[1]);
	function scrollInteraction(t){
		if(t < pageList[1].offsetTop){
			n=0;
		}
		else if(t < pageList[2].offsetTop){
			n=1;
		}
		else if(t < pageList[3].offsetTop){
			n=2;
		}
		else if(t < pageList[4].offsetTop){
			n=5;
		}
		else if(t < pageList[5].offsetTop){
			n=6;
		}
		else if(t < pageList[6].offsetTop){
			n=7;
		}
		else {
			n=8;
		}

		if(t > pageList[0].offsetTop) {
			header.classList.add("color");
		}
		else {
			header.classList.remove("color");
		}
	}

	// header background color
	let winW;
	let wint=0;

	window.addEventListener("resize", () => {
		winW=window.innerWidth;
	
		if(winW > 740){
			if(mobile.classList.contains("active")){
				mobile.classList.remove("active");
				dim.removeAttribute("style");
			}
		}
	});

	const trigger=new ScrollTrigger.default({
		trigger: {
			once: true,
			toggle: {
				class: {
					in: "on",
					out: "off"
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

	trigger.add(".main, .sub");

	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].addEventListener("click", (e) => {
			e.preventDefault();
			console.log(i);
			targety=pageList[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
		});
		mobileLi[i].addEventListener("click", (e) => {
			e.preventDefault();
			targety=pageList[i].offsetTop;
			gsap.to(window, {scrollTo: targety, duration: 0.5});
			mobile.classList.remove("active");
			gsap.to(dim, {opacity: 0, duration: 0.3, onComplete: () => {
				dim.removeAttribute("style");
			}})
		});
	}
});
