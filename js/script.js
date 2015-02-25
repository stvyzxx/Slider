
(function( $ ){ 

	$.fn.stvySlider = function(options) {
		var options = $.extend({
			prevBtn: "param1",
			nextBtn: "param2",
			imgsNumber: 1,
			autoPlay: false,
			changeImage: 1000,
			delay: 1000
		}, options);
		

		var list = this.find("ul");
		var imgQuantity = options.imgsNumber;
		list.css("width", list.width()*imgQuantity + (10*imgQuantity));
		var step = list.width()/imgQuantity;
		var freezAnimation = false;
		var timer;
		
		
		$(options.prevBtn+","+options.nextBtn).click(onBtnClick);
		
		// -------------------- buttons
		function onBtnClick(){
			if(freezAnimation == true) return;
			freezAnimation = true;
			$(this).addClass("disabled");
			
			if($(this).hasClass((options.prevBtn).slice(1))){
				prevImg();
			}else{
				nextImg();
			}
			
		}
			
		function prevImg(){			
			if(list.css("left") >= 0+"px"){
				list.css("left","-="+step+"px");
				list.find("li").last().remove().prependTo(list);				
				list.animate({ "left": "+="+step+"px"}, options.delay || "slow", afterAnimation);
			}else{
				list.animate({ "left": "+="+step+"px" },  options.delay || "slow", afterAnimation);
			}
		};	
		
	    function nextImg(){
			 if(list.css("left") == -(list.width() - step) +"px"){
				list.css("left","+="+step+"px");
				list.find("li").first().remove().appendTo(list);				
				list.animate({ "left": "-="+step+"px" },  options.delay || "slow", afterAnimation);
			 }else{
				list.animate({ "left": "-="+step+"px" },  options.delay || "slow",  afterAnimation);
			}
			
		};

		
		// -------------autoplay
		function afterAnimation(){
			freezAnimation = false;
			$(options.prevBtn+","+options.nextBtn).removeClass("disabled");
		}

		function autoPlayOn(){	
			$(options.nextBtn).click();
		}
		
		if(options.autoPlay){			
			timer = setInterval(autoPlayOn,options.changeImage);	

			// ---------------hover
			$(this).hover(function(){
				clearInterval(timer);	
					
			});
			
			$(this).mouseleave(function(){
				timer = setInterval(autoPlayOn,options.changeImage);		
					
			});
		}
		
		
		
		$(options.prevBtn+","+options.nextBtn+","+this).bind('selectstart mousedown',function(){return false;});
		$(options.prevBtn+","+options.nextBtn+","+this).on('mousemove',function(){
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
			} else { 
				document.selection.empty();
			}
		});
	}
	

	
})( jQuery );

$(".sliderWrapper").stvySlider({
	prevBtn: ".previous",
	nextBtn: ".next",
	imgsNumber: 5,
	autoPlay: true,
	changeImage: 3000,
	delay: 1000
});