(function($) {

	$.fn.mousenavigation = function(nav, list, listheight)
	{
/* 		var mousepos = 0;  */
/* 		var newY; */
		
		adjust_size();
		$(window).resize(adjust_size);
		
		
		nav.mousemove(function(e) {
		
			var containerheight = nav.height();
			var scrollTop = $(window).scrollTop();
			
/* 			var diff = e.pageY - mousepos;  */
/* 			mousepos = e.pageY;  */
			var newY = (containerheight - listheight) * ((e.pageY - scrollTop) / containerheight); 
/* 	      	var diff = parseInt(Math.abs(list.offset().top - newY));  */
	      	
	      	list.stop().animate({
	      		'top': newY
	      	}, 
			{
				duration: 'fast',
				easing:'easeOutQuad'
			}); 
		}); 
		
		nav.mouseleave(function(e){
			list.stop();
		});
		
		function adjust_size()
		{							
			nav.height($(window).height());
			
			nav.css('left', 
				$('section').width() + 
				$('section').offset().left - 
				(nav.width() / 2)
			);
		};
	};

})(jQuery);