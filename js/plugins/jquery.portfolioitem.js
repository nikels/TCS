(function($) {

	$.fn.portfolioitem = function()
	{
		
		var imgs = this;
		var section = $('section');
		var selected = "selected";
		var nav = $('#portfolio nav');	
		var list = nav.find('ul');
		var loaded = 0;
		var scroll = new iScroll('scroller', {desktopCompatibility:true});
		var scrollers_count = 0;
		var len = imgs.length;
		var max = 0;
		
		// Populate data fields based on the actual size after its been loaded.
		imgs.bind('load', function(){
			
			var _h = 50;
			var _r = _h/this.height;
			var _w = Math.round(this.width * _r);

			max = Math.max(_w, max);
			$(this).bind('position', function(){
				$(this).css('padding-left', ((max - $(this).attr('width')) / 2) +'px');
			});
			
			$(this).attr('data-width', this.width);
			$(this).attr('data-height', this.height);
			
			$(this).attr('data-s-width', _w);
			$(this).attr('data-s-height', _h);
			
			$(this).attr('width', _w);
			$(this).attr('height', _h);
			
			// show things
			loaded++;
			if(loaded==len)
			{
				imgs.trigger('position');
				$('.item').animate({opacity: 1})
				nav.animate({opacity: 1});
			}
				
		});
		
		// Listen for adjusts in orientation and size.
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', resize, false);
			
		// Moves screens right and left.
		$(".items").touchwipe({
			wipeLeft: move_left,
			wipeRight: move_right,
			min_move: 100,
			preventDefaultEvents: true
		});	
	
		return this.each(function()
		{	
			var asset_type = $(this).attr('data-asset-type');
			var that = $(this);
			var clickon = $(this);
			
			if(asset_type == "textasset")
			{	
				var src = $(this).attr('data-display');
				var caption = $(this).attr('data-caption');
				
				clickon = $("<a/>")
					.attr("href", 'javascript:void(0);')
					.attr('class', 'text-asset')
					.text(caption)
					.insertBefore($(this));
					
				$(this).hide();
			}
		
			clickon.click(function(){
				
				select(that);
				var li = build_current(that);
				li.siblings().remove();
				
				if(asset_type != "textasset")
					li.find('img')
						.css('display', 'none')
						.bind('load', function(){
							$(this).fadeIn('fast');	
							build_previous(previous());
							build_next(next());	
						});				
				else
				{
					li
						.css('display', 'none')
						.fadeIn('fast');
						
					build_previous(previous());
					build_next(next());	
				}
				
			});
			
			// A class in the HTML kicks things off.
			if($(this).parent().hasClass(selected))
				init($(this));			
		});
		
		function init(current)
		{	
			build_previous(previous());
			build_current(current);
			build_next(next());
			
			// Don't show the items just yet.
			$('.item').css({opacity:0});
			nav.css({opacity:0});
			
			resize();
			
			focus();
		};
		
		// Scroll setup
		function resize()
		{
			var headerH = document.getElementsByTagName('header')[0].offsetHeight;
			var footerH = document.getElementsByTagName('footer')[0].offsetHeight;
			var wrapperH = window.innerHeight - headerH - footerH;

			document.getElementById('wrapper').style.height = wrapperH + 'px';			

			$('.text-wrapper').each(function(){
				$(this).css('height', wrapperH);
			});
			
			$('section').height($(window).height() - $('header').outerHeight(true) - $('footer').outerHeight(true));

			$('.items').css({
				'width': nav.offset().left,
				'text-align': 'center'
			});
			
			$('.item').find('video').trigger('center');
			$('.item').find('img').trigger('center');
		};
				
		function adjust_padding(asset)
		{
			var item_height = asset.height();
			var max_height = $(window).height() - ($('cite').outerHeight(true) + $('header').outerHeight(true) + $('footer').outerHeight(true));
			var max_width = nav.offset().left;
			var padding = (max_height > item_height) ? (max_height - item_height) / 2 : 0;
			asset.css('padding-top', padding);
			
			asset.parent().css({
				'width': max_width,
				'text-align': 'center'
			});
		};
		
		function size_video(asset)
		{
			var max_width = nav.offset().left;
			asset.attr({
				width: max_width,
				height: max_width * 9 / 16
			});
		};
		
		function size_image(img)
		{
			var max_width = nav.offset().left;
			var max_height = $(window).height() - ($('cite').outerHeight(true) + $('header').outerHeight(true) + $('footer').outerHeight(true));

			var item_width = img.width();
			var item_height = img.height();
			
			if(!item_width || !item_width)
				return;
			
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
			
			img.attr('width', item_width);
			img.attr('height', item_height);
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
				left: $(window).width(),
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
			
			return item;
		};
		
		function build_previous(asset)
		{
			var item = build_asset(asset);
			
			item.addClass('previous');
			item.css({
				position: 'absolute',
				left: -1 * $(window).width(),
				top: 0
			});
		};
		
		function build_asset(asset)
		{
			var caption = asset.attr('data-caption');
			var src = asset.attr('data-display');
			var asset_type = asset.attr('data-asset-type');
			var poster = asset.attr('data-poster');
			
			var item = $('<li/>')
				.attr('class','item')
				.css('width', $(window).width())
				.appendTo('.items');
			
			if(asset_type == "textasset")
			{	
				var wrapper = $('<div/>')
					.attr('class', 'text-wrapper')
					.prependTo(item);
				
				var scroller_id = 'textscroller'+scrollers_count++;
				var scrolling = $('<div/>')
					.attr('class', 'text-scroller')
					.attr('id', scroller_id)
					.prependTo(wrapper);
					
				var Ps = src.replace(/\n/, '</p><p>');
				scrolling.html('<p>' + Ps + '</p>');
				
				setTimeout(function(){
					new iScroll(scroller_id, { desktopCompatibility:true });
				}, 0);
				
				resize();
			}				
			else
			{
				$('<img />')
					.prependTo(item)
					.css('display', 'none')
					.bind('center', function(){
					
						size_image($(this));
						adjust_padding($(this));
						
					})
					.bind('load', function(){
					
						$(this).trigger('center');
					
						add_citation(item, caption);
						
						// handle playback 
						if(asset_type == "video")
							$(this).click(function(){
								add_video(item, asset);							
							});
	
						$('.loading').remove();
						
						$(this).fadeIn();
					})
					.attr('src', (asset_type == "video" ) ? poster : src);
					
					$('<div/>')
						.css({
							width: 32,
							height: 32,
							position: 'absolute',
							top: ($(window).height() / 2) - 16,
							left: (nav.offset().left / 2) - 16
						})
						.addClass('loading')
						.prependTo($('body'));
			}			
			
			return item;
			
		};
		
		function select(item)
		{
			item.parent().siblings().removeClass(selected);
			item.parent().addClass(selected);
			
			focus();
				
		};
		
		function focus()
		{
			if($('#wrapper').height() <= $('#scroller').height())
				scroll.scrollToElement(".selected", '400ms');
		};
		
		function move_left()
		{
			// only one video at a time
			$('video').remove();
			
			$(".previous").animate({
				left: '-='+$(window).width()
			},'slow', function(){
				$(this).remove();
			});
			
			$(".current").animate({
				left: '-='+$(window).width()
			},'slow', function(){
				$(this).attr('class', 'item previous');
			});
			
			select(next());
			$(".next").animate({
				left: '-='+$(window).width()
			},'slow', function(){
				$(this).attr('class', 'item current');				
				build_next(next());
			});
			
		};
		
		function move_right()
		{	
			// only one video at a time
			$('video').remove();
			
			$(".next").animate({
				left: '+='+$(window).width()
			},'slow', function(){
				$(this).remove();
			});
			
			$(".current").animate({
				left: '+='+$(window).width()
			},'slow', function(){
				$(this).attr('class', 'item next');
			});
			
			select(previous());
			$(".previous").animate({
				left: '+='+$(window).width()
			},'slow', function(){
				$(this).attr('class', 'item current');
				build_previous(previous());
			});
			
		};

		function add_video(item, asset)
		{
			
			var src = asset.attr('data-display');
			var poster = asset.attr('data-poster');
			
			item.find('img, canvas').hide();
			
			var video = $('<video/>')
				.bind('center', function(){
					
					size_video($(this));
					adjust_padding($(this));
					
				})
				.prependTo(item)
				.attr({
					'controls': true,
					'preload': true,
					'src': src
				});
			
			video.trigger('center');
			
			function remove_video()
			{
				removeEventListener("pause", remove_video, false);
				removeEventListener("ended", remove_video, false);
				
				item.find('img, canvas').show();
				$("video").remove();		
				
				item.find('img').trigger('center');
			};
			
			video[0].setAttribute('poster', poster);
			video[0].load();
			video[0].play();
			video[0].addEventListener('pause', remove_video, false);
			video[0].addEventListener('ended', remove_video, false);
			
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
				p = $(imgs.eq(len-1));
					
			return p;
		};
		
	};

})(jQuery);