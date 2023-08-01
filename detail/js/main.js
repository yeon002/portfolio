window.addEventListener("load", () => {
	let header=document.getElementById("header");
	let main=document.getElementById("main");
	let cont=document.querySelector(".cont_box");
	let container=document.querySelector(".container")
	let [sub0, sub1, sub2]=cont.children;
	console.log(sub0, sub1, sub2);
	console.log(cont);

	function scrollInteraction(t){
		if(t < main.offsetTop){
			n=0;
		}
		else if(t < container.offsetTop){
			n=1;
		}
		else if(t < sub0.offsetTop){
			n=2;
		}
		else if(t < sub1.offsetTop){
			n=3;
		}
		else if(t < sub2.offsetTop){
			n=4;
		}
	}


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
	trigger.add(".main, .sub");
});
