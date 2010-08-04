(function($) {

	$.fn.portfolioviewer = function(imgs)
	{			
		
		var len = imgs.length;
					
		// FORWARD AND NEXT BUTTONS
		$('.arrows a').hover(
			function(){
				
				$(this).css('cursor', 'pointer');
				
				// preload
				preload(next());
				
			},
			function(){
				$(this).css('cursor', '');
				
				// preload
				preload(previous());
			}
		);
		
		$('#left_arrow').click(function()
		{
			var n = next();
			$(imgs.eq(n)).trigger('click');
			
			preload(previous());
		});
		
		$('#right_arrow').click(function()
		{
			var p = previous();
			$(imgs.eq(p)).trigger('click');
			
			preload(next());
		});
		
		function next()
		{
			var dci = $('.selected').find('img').attr('data-collection-index');
			var r = dci - 2;
			if(r<0)
				r = len-1;
			return r;
		};
		
		function previous()
		{
			var dci = $('.selected').find('img').attr('data-collection-index');
			var r = dci;
			if(r>=len)
				r = 0;
				
			return r;
		};
		
		function preload(index)
		{
			var preload = new Image();
			preload.src = imgs.eq(index).attr('data-display');
		};
	};

})(jQuery);			