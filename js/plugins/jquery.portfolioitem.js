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
			wipeUp: move_up,
			wipeDown: move_down,
			min_move: 100,
			preventDefaultEvents: true
		});	
	
		return this.each(function()
		{	
			if($(this).parent().hasClass(selected))
				init($(this));			
		});
		
		function init(current)
		{	
/*
			if(parent.hasClass(selected) && $('.item').children(':not(cite)') > 0)
				return;
*/			
			var _prev = build_previous(previous());
			var _curr = build_current(current);
			var _next = build_next(next());			
/*			$(".items").click(move_left); */

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
					preload_complete = true
				})
				.attr('src', (asset_type == "video" ) ? poster : src);
			

/*
				$('<video/>')
					.prependTo(item)
					.css('display', 'none')
					.attr({
						'controls': true,
						'preload': true,
						'src': src
					});
					
				center(item);
				
				$('video')[0].setAttribute('poster', poster);
				$('video')[0].load();
				$('video')[0].play();
*/
			
			return item;
			
		}
		
		function move_up()
		{
			alert('up');
		};
		
		function move_down()
		{
			alert('down');
		};
		
		function select(item)
		{
			item.parent().siblings().removeClass(selected);
			item.parent().addClass(selected);
			
			//scroll.scrollTo(scrollToElement("#elementID", '400ms'));
			scroll.scrollToElement(".selected", '400ms')
		};
		
		function move_left()
		{
			if(!preload_complete)
				return; 
				
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
			
			if(media[0].nodeName == "VIDEO")
			{
				media.attr({
					width: max_width,
					height: max_width * 9 / 16
				});
			}
			else if(media[0].nodeName == "IMG")
			{
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
			}
			
			return item;
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