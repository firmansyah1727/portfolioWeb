		$(function(){
			$(window).scroll(function(){
				if($(window).scrollTop() > 180) {
					$(".navbar").addClass("bg-nav");
					$(".navbar").removeClass("in-top");
				}else{
					$(".navbar").removeClass("bg-nav");
					$(".navbar").addClass("in-top");
				}
			})
		  $('.smooth-scroll').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html, body').animate({
		          scrollTop: target.offset().top-50
		        }, 1000, 'easeInOutExpo');
		        return false;
		      }
		    }
		  });


			//Pretty Photo
			$("a[rel^='prettyPhoto']").prettyPhoto({
				social_tools: false
			});	
		});