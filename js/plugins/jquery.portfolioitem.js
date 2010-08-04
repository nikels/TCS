(function($) {

	$.fn.portfolioitem = function()
	{

		var len = $(this).length;		
		var zIndex = 99999;
		var selected = "selected";
		var show_count = true;		
		var count = $('<i />')
			.css({
				'position': 'absolute',
				'color': '#fff', 
				'font-size': '11px',
				'word-wrap': 'normal',
				'opacity': 0.8,
				'margin-left': '10px'
			})
			.appendTo($('body'));
			
		update_count(len);
		
		$(window).resize(size_check);
		size_check();
		
		count.hide();
		
		function size_check()
		{
			// Don't show count, if it causes a scroll.
			var left_pos = count.outerWidth(true) + $('#portfolio nav').offset().left + $('#portfolio nav').width();
			
			show_count = (left_pos > $(window).width()) ? false : true;
		};
		
		function update_count(no)
		{	
			if(show_count)
			{	
				count.html('<pre>' + no + '/' + len + '</pre>');
				count.show();
			}
		};
		
		return this.each(function(){
		
			var parent = $(this).parent();
				
			
			$(this).hover(expand, collapse);
			$(this).click(collapse);
			$(this).click(change_image);
		
			$(this).mouseover(function(event){
				var preload = new Image();
				preload.src = $(this).attr('data-display');
				
				update_count($(this).attr('data-collection-index'));
			});
			
			$(this).mousemove(function(event){
				if(show_count)
					count.css({
						'top': event.pageY - count.height(),
						'left': parent.parents('nav').offset().left + parent.parents('nav').width()
					});
			});
			
			$(this).mouseout(function(event){
				count.hide();
			});
			
			function select()
			{
				parent.siblings().removeClass(selected);
				parent.addClass(selected);
			};

			function change_image()
			{	
				if(parent.hasClass(selected))
					return;
				
				var caption = $(this).attr('data-caption');
				var src = $(this).attr('data-display');
				
				$('<img />')
					.prependTo($('.item'))
					.css('display', 'none')
					.bind('load', function(){
						
						$(this).siblings('img').remove();
						$(this).siblings('cite').html(caption);
						$(this).fadeIn('slow');
						
						select();
						
						Cufon.refresh('cite');
					})
					.attr('src', src);
			};
			
			function expand()
			{		
				if(parent.hasClass(selected))
					return;
					
				$(this).css('cursor', 'pointer');
				
				var w_diff = -1 * (($(this).attr('data-width') - $(this).attr('data-s-width')) / 2);
				var h_diff = -1 * (($(this).attr('data-height') - $(this).attr('data-s-height')) / 2);
				
				parent.css('z-index',++zIndex);
				
				$(this).animate({							
					width: $(this).attr('data-width'),
					height: $(this).attr('data-height'),
					marginTop: h_diff,
					marginLeft: w_diff
				}, {
					duration: 'fast',
					easing: 'easeOutQuad'	
				});
			};
			
			function collapse()
			{
				$(this).animate({
					width: $(this).attr('data-s-width'),
					height: $(this).attr('data-s-height'),
					marginTop: 0,
					marginLeft: 0
				}, {
					duration: 'fast',
					easing: 'easeOutQuad'	
				});
			};
			
		});
	};

})(jQuery);