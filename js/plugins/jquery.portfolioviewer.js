(function($) {

	$.fn.portfolioviewer = function(imgs)
	{						
			
		$('#left_arrow').click(function()
		{
			$(previous()).trigger('click');
		});
		
		$('#right_arrow').click(function()
		{
			$(next()).trigger('click');
		});

		function next()
		{
			var next = $('.selected').next().find('img');
			if(next.length==0)
				next = $(imgs.eq(0));
				
			return next;
		};
		
		function previous()
		{
			var prev = $('.selected').prev().find('img');
			if(prev.length==0)
				prev = $(imgs.eq(imgs.length-1));
					
			return prev;
		};
	};

})(jQuery);			