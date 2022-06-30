(function($) {
	$.fn.slidesbg = function(options) {
		var defaults = {
			dataSlide: "",
			navSelector: ".slidesbg-slider-nav",
			nav: true,
			customNav: "",
			pagination: true,
			autoPlay: true,
			delay: 10000,
			speed: 300,
			start: 0,
			parallax: false,
			overlay: false
		};
		var options = $.extend({}, defaults, options);

		var $slider = this;
		
		if(options.nav == true) {
			if(!options.customNav) {
				var navSlider = "<div class=\"slidesbg-slider-nav\">";
					navSlider += "<a class=\"prev-slide\">&lsaquo;</a>";
					navSlider += "<a class=\"next-slide\">&rsaquo;</a>";
					navSlider += "</div>";
				$slider.prepend(navSlider);
				var navS = options.navSelector;
			}else{
				var navS = options.customNav;
			}
		}
		
		var $nav = $(navS);
		var $navNext = $(navS + " .next-slide");
		var $navPrev = $(navS + " .prev-slide");

		$slider.attr("data-slider-now",options.start);
		$slider.css({
			"background-image": "url("+options.dataSlide[$slider.attr("data-slider-now")]+")"
		})
		if(options.parallax == true) {
			$slider.css({
				"background-attachment": "fixed"
			})
		}

		if(!options.dataSlide) {
			alert("Can't find some images for slide header.");
		}

		$navNext.click(function(){
			nextSlide();
			return false;
		});

		$navPrev.click(function(){
			prevSlide();
			return false;
		});

		var nextSlide = function() {
			var getSlide = "";
			var SliderNow = $slider.attr("data-slider-now");

			if(SliderNow >= options.dataSlide.length-1) {
				SliderNow = -1;
			}
			SliderNow = Number(SliderNow)+Number(1);
			$slider.attr("data-slider-now",SliderNow);

			getSlide = options.dataSlide[SliderNow];

			$slider.fadeTo(options.speed, 0.7, function(){
				$(this).css({
					"background-image": "url("+getSlide+")"
				})
			}).fadeTo(options.speed,1);

			changeActivePage(SliderNow);
		}

		var prevSlide = function() {
			var getSlide = "";
			var SliderNow = $slider.attr("data-slider-now");

			if(SliderNow <= 0 ) {
				SliderNow = options.dataSlide.length;
			}
			SliderNow = Number(SliderNow)-Number(1);
			$slider.attr("data-slider-now",SliderNow);

			getSlide = options.dataSlide[SliderNow];

			$slider.fadeTo(options.speed, 0.7, function(){
				$(this).css({
					"background-image": "url("+getSlide+")"
				})
			}).fadeTo(options.speed,1);

			changeActivePage(SliderNow);
		}

		if(options.autoPlay == true) {
			var AP = setInterval(function(){
				nextSlide();
			},options.delay);
		}

		if(options.pagination == true) {
			var paginationEl = "<div class=\"slidesbg-pagination\">";
				paginationEl += "<ul>"
			for(var bull=0; bull<=options.dataSlide.length-1; bull++) {
				paginationEl += "<li><a data-slidesbg-to=\""+bull+"\"></a></li>";
			}
				paginationEl += "</ul>"
				paginationEl += "</div>";

			$slider.append(paginationEl);
			var pgnTop = $slider.height()-50;
			$(".slidesbg-pagination").css({
				top: pgnTop,
				transform: "translate(-50%,0)"
			});
			$(".slidesbg-pagination li a").eq($slider.attr("data-slider-now")).addClass("active");

			$(".slidesbg-pagination li a").click(function(){
				var getSlideCS = $(this).attr("data-slidesbg-to");
				$slider.attr("data-slider-now",getSlideCS);
				$(".slidesbg-pagination li a").removeClass("active");
				$(this).addClass("active");
				$slider.fadeTo(options.speed, 0.7, function(){
					$(this).css({
						"background-image": "url("+options.dataSlide[getSlideCS]+")"
					})
				}).fadeTo(options.speed,1);
			});

			var changeActivePage = function(slide) {
				$(".slidesbg-pagination li a").removeClass("active");
				$(".slidesbg-pagination li a").eq(slide).addClass("active");
			}
		}

		if(options.overlay == true) {
			var overlayEl = "<div class=\"slidesbg-overlay\"></div>";
			$slider.prepend(overlayEl);
		}
	};
}(jQuery));