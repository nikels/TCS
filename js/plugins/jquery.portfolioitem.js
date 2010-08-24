(function($) {

	$.fn.portfolioitem = function()
	{
		var selected = "selected";
		
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', center, false);
	
		return this.each(function(){
		
			var parent = $(this).parent();
			$(this).click(change_item);
			
			function select()
			{
				parent.siblings().removeClass(selected);
				parent.addClass(selected);
			};

			function change_item()
			{	

				if(parent.hasClass(selected) && $('.item').children(':not(cite)') > 0)
					return;
				
				var caption = $(this).attr('data-caption');
				var src = $(this).attr('data-display');
				var asset_type = $(this).attr('data-asset-type');
				var poster = $(this).attr('data-poster');

				switch(asset_type)
				{
				case "video":
					
					select();
							
					$('.item').children('img').remove();
					$('.item').children('cite').remove();
						
					$('<video/>')
						.prependTo($('.item'))
						.attr({
							'controls': true,
							'autoplay': true,
							'src': src
						});
						
					$('<cite/>')
						.appendTo($('.item'))
						.html(caption);
					Cufon.refresh('cite');
						
					resize_video();
					center();
					
					$('video')[0].setAttribute('poster', poster);
					$('video')[0].load();
					$('video')[0].play();
					
					$('video').fadeIn('slow');
						
					break;
					
				default:
					$('<img />')
						.prependTo($('.item'))
						.css('display', 'none')
						.bind('load', function(){
							
							$(this).siblings('img').remove();
							$(this).siblings('cite').remove();
							
							$('<cite/>')
								.appendTo($('.item'))
								.html(caption);
							Cufon.refresh('cite');
							
							select();
							resize_img();
							center();
							
							if($('video').length > 0)							
								$('video')[0].pause();
								
							$('video').remove();
							
							$(this).fadeIn('slow');						
						})
						.attr('src', src);
				}
			};
			
			if(parent.hasClass(selected))
				$(this).trigger('click');
			
		});
		
		function resize_video()
		{
			var max_width = $('.arrows').offset().left;
			var video = $('.item').find('video');
			video.attr({
				width: max_width,
				height: max_width * 9 / 16
			});
		}
		
		function resize_img()
		{
			var max_width = $('.arrows').offset().left;
			var max_height = $(window).height() - ($('cite').outerHeight(true) + $('header').outerHeight(true) + $('footer').outerHeight(true));
			
			// Set w/ of container for text-align: center.
			$('.item').css({
				'width': max_width,
				'text-align': 'center'
			});
			
			var img = $('.item').find('img');
			var item_width = img.width();
			var item_height = img.height();
			
			if(item_width > max_width)
			{
				item_height = max_width * item_height / item_width;
				item_width = max_width;
			}
				
			if (item_height > max_height)
			{
				item_width = max_height * item_width / item_height;
				item_height = max_height;
			}
			
			img.css('width', item_width);
			img.css('height', item_height);
		}
		
		function center()
		{			
			var item = $('.item').children().eq(0);
			var item_height = item.height();
			var max_height = $(window).height() - ($('cite').outerHeight(true) + $('header').outerHeight(true) + $('footer').outerHeight(true));
				
			item.css('padding-top', (max_height > item_height) ? (max_height - item_height) / 2 : 0);
		};
	};

})(jQuery);