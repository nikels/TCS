(function($) {

	$.fn.portfolioitem = function(config)
	{
		var selected = "selected";
		var nav = $('#portfolio nav');	
		var imgs = this;
		var ww = $(window).width();
		var preload_complete = false;
		var scroll = config.scroll;
		
		$('section').height($(window).height() - $('header').outerHeight(true) - $('footer').outerHeight(true));
		
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', center, false);
		
		$(".items").touchwipe({
			wipeLeft: move_left,
			wipeRight: move_right,
/*
			wipeUp: move_up,
			wipeDown: move_down,
*/
			min_move: 100,
			preventDefaultEvents: true
		});	
	
		return this.each(function()
		{	
			$(this).click()
			
			if($(this).parent().hasClass(selected))
				init($(this));			
		});
		
		function init(current)
		{	
/*
			if(parent.hasClass(selected) && $('.item').children(':not(cite)') > 0)
				return;
*/			
			build_previous(previous());
			build_current(current);
			build_next(next());			
/* 			$(".items").click(move_left); */

		};
		
		function remove_video()
		{				
			if($('video').length > 0)							
				$('video')[0].pause();
				
			$('video').remove();
		};
		
		function add_citation(asset, caption)
		{
			$('<cite/>')
				.appendTo(asset)
				.html(caption);
				
			Cufon.refresh('cite');
		};
		
		function build_next(asset)
		{
			var item = build_asset(asset);
			
			item.addClass('next');
			item.css({
				position: 'absolute',
				left: ww,
				top: 0
			});
		};
		
		function build_current(asset)
		{
			var item = build_asset(asset);
			
			item.addClass('current');
			item.css({
				position: 'absolute',
				left: 0,
				top: 0
			});
		};
		
		function build_previous(asset)
		{
			var item = build_asset(asset);
			
			item.addClass('previous');
			item.css({
				position: 'absolute',
				left: -1 * ww,
				top: 0
			});
		};
		
		function build_asset(asset)
		{
			var caption = asset.attr('data-caption');
			var src = asset.attr('data-display');
			var asset_type = asset.attr('data-asset-type');
			var poster = asset.attr('data-poster');
			preload_complete = false;
			
			var item = $('<li/>')
				.attr('class','item')
				.css('width', $(window).width())
				.appendTo('.items');
			
			$('<img />')
				.prependTo(item)
				.bind('load', function(){
				
					center(item);
					add_citation(item, caption);
					
					// handle playback 
					if(asset_type == "video")
					{
						var play_button = draw_play(item);
						play_button.click(function(){
							add_video(item, asset);				
						})
					}
					preload_complete = true;
				})
				.attr('src', (asset_type == "video" ) ? poster : src);
			
			return item;
			
		}
		
/*
		function move_up()
		{
			alert('up');
		};
		
		function move_down()
		{
			alert('down');
		};
*/
		
		function select(item)
		{
			item.parent().siblings().removeClass(selected);
			item.parent().addClass(selected);
			
			//scroll.scrollTo(scrollToElement("CSS3 selector", '400ms'));
			scroll.scrollToElement(".selected", '400ms')
		};
		
		function move_left()
		{
			if(!preload_complete)
				return; 
			
			// only one video at a time
			$('video').remove();
			
			$(".previous").animate({
				left: '-='+ww
			},'slow', function(){
				$(this).remove();
			});
			
			$(".current").animate({
				left: '-='+ww
			},'slow', function(){
				$(this).attr('class', 'item previous');
			});
			
			$(".next").animate({
				left: '-='+ww
			},'slow', function(){
				$(this).attr('class', 'item current');
				select(next());				
				build_next(next());
			});
			
		};
		
		function move_right()
		{
			if(!preload_complete)
				return;
				
			// only one video at a time
			$('video').remove();
			
			$(".next").animate({
				left: '+='+ww
			},'slow', function(){
				$(this).remove();
			});
			
			$(".current").animate({
				left: '+='+ww
			},'slow', function(){
				$(this).attr('class', 'item next');
			});
			
			$(".previous").animate({
				left: '+='+ww
			},'slow', function(){
				$(this).attr('class', 'item current');
				select(previous());
				build_previous(previous());
			});
		};
		
		function draw_play(item) {  			
			var h_wide = (item.width() / 2) - 25;
			var h_high = item.find('img').offset().top + (item.height() / 2) - 50;
			
			var canvas = $('<canvas/>')
				.css({
					position: 'absolute',
					top: h_high,
					left: h_wide
				})
				.attr('width',75)
				.attr('height',100)
				.appendTo(item);
			
			var context = canvas[0].getContext("2d");
			
			context.fillStyle   = 'rgba(255, 255, 255, .7)';
			context.strokeStyle = 'rgba(33, 33, 33, .5)';
			context.lineWidth   = 1;
			
			// Draw a right triangle.
			context.beginPath();
			context.moveTo(0, 0);
			context.lineTo(75, 50);
			context.lineTo(0, 100);
			context.lineTo(0, 0);
			context.closePath();
			context.fill();
			context.stroke();
			
			return canvas;
		}
		
		function add_video(item, asset)
		{
			
			var src = asset.attr('data-display');
			var poster = asset.attr('data-poster');
			
			item.find('img').hide();
			
			var video = $('<video/>')
				.prependTo(item)
				.attr({
					'controls': true,
					'preload': true,
					'src': src
				});
			
			center(item);
			
			video[0].setAttribute('poster', poster);
			video[0].load();
			video[0].play();
			video[0].addEventListener(
				'pause',
				function(){
					item.find('img').show();
					$("video").hide();		
				},
				false
			);
			
		};
		
		function next()
		{
			var n = $('.'+selected).next().find('img');
			if(n.length==0)
				n = $(imgs.eq(0));
				
			return n;
		};
		
		function previous()
		{
			var p = $('.'+selected).prev().find('img');
			if(p.length==0)
				p = $(imgs.eq(imgs.length-1));
					
			return p;
		};
		
		function resize(item)
		{
			var max_width = nav.offset().left;
			var max_height = $(window).height() - ($('cite').outerHeight(true) + $('header').outerHeight(true) + $('footer').outerHeight(true));
			
			// Set w/ of container for text-align: center.
			item.css({
				'width': max_width,
				'text-align': 'center'
			});
			
			var media = item.children().eq(0);
			
			switch(media[0].nodeName)
			{
			case "VIDEO":
				media.attr({
					width: max_width,
					height: max_width * 9 / 16
				});
				break;
				
			case "IMG":
				var img = media;
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
				break;
				
			}
			
			return media;
		}
		
		function center(item)
		{			
			item = resize(item);
			var item_height = item.height();
			var max_height = $(window).height() - ($('cite').outerHeight(true) + $('header').outerHeight(true) + $('footer').outerHeight(true));
				
			item.css('padding-top', (max_height > item_height) ? (max_height - item_height) / 2 : 0);
		};
	};

})(jQuery);