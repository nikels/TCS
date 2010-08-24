(function($) {

	$.fn.portfolioitem = function()
	{
		var selected = "selected";
		var nav = $('#portfolio nav');	
		
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', center, false);
	
		return this.each(function(){
		
			var parent = $(this).parent();
			$(this).click(change_item);
			
			function select()
			{
				parent.siblings().removeClass(selected);
				parent.addClass(selected);
			};
			
			function remove_video()
			{				
				if($('video').length > 0)							
					$('video')[0].pause();
					
				$('video').remove();
			};
			
			function add_citation(caption)
			{
				$('.item').children('cite').remove();
				
				$('<cite/>')
					.appendTo($('.item'))
					.html(caption);
				Cufon.refresh('cite');
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
					
					remove_video();
					$('.item').children('img').remove();
					
					add_citation(caption);
	
					$('<video/>')
						.prependTo($('.item'))
						.attr({
							'controls': true,
							'autoplay': true,
							'src': src
						});
						
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
							
							select();
							remove_video();
							$(this).siblings('img').remove();
							
							add_citation(caption);
							
							resize_img();
							center();
							
							$(this).fadeIn('slow');						
						})
						.attr('src', src);
				}
				
				$(".item img").touchwipe({
				     wipeLeft: move_left,
				     wipeRight: move_right,
				     wipeUp: move_up,
				     wipeDown: move_down,
				     min_move: 100,
				     preventDefaultEvents: true
				});
			};
			
			if(parent.hasClass(selected))
				$(this).trigger('click');
			
		});
		
		function absolutize(item)
		{
			item.css({
				position: 'absolute',
				left: item.offset().left,
				top: item.offset().top
			});
		}
		
		function move_up()
		{
			alert('up');
		};
		
		function move_down()
		{
			alert('down');
		};
		
		function move_left()
		{
			var item = $(".item");
			absolutize(item);
			
			item.animate({
				left: -1 * $(".item").width()
			},'slow', function(){
				$(this).remove();
			});
		};
		
		function move_right()
		{
			alert('right');
		};
		
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
		
		function resize_video()
		{
			var max_width = nav.offset().left;
			var video = $('.item').find('video');
			video.attr({
				width: max_width,
				height: max_width * 9 / 16
			});
		};
		
		function resize_img()
		{
			var max_width = nav.offset().left;
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