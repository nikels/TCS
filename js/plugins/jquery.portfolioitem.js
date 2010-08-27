(function($) {

	$.fn.portfolioitem = function()
	{
		
		var imgs = this;
		var section = $('section');
		var selected = "selected";
		var nav = $('#portfolio nav');	
		var list = nav.find('ul');
		var loaded = 0;
		var scroll = new iScroll('scroller');
		var len = imgs.length;
		
		// Populate data fields based on the actual size after its been loaded.
		imgs.bind('load', function(){
			$(this).attr('data-width', this.width);
			$(this).attr('data-height', this.height);
			
			var _h = 50;
			var _r = _h/this.height;
			var _w = Math.round(this.width * _r);
			
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
				$('.item').animate({opacity: 1})
				nav.animate({opacity: 1});
			}
				
		});
		
		// Listen for adjusts in orientation and size.
		window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', resize, false);
		/* 	document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false); */

		$(".items").touchwipe({
			wipeLeft: move_left,
			wipeRight: move_right,
/*			wipeUp: move_up,
			wipeDown: move_down, */
			min_move: 100,
			preventDefaultEvents: true
		});	
	
		return this.each(function()
		{	
			$(this).click(function(){
				
				var li = build_current($(this));
				li.siblings().remove();
				
				var img = li.find('img');
				var that = $(this);
				
				img
					.css('display', 'none')
					.bind('load', function(){
						img.fadeIn('fast');	
						
						select(that);

						build_previous(previous());
						build_next(next());	
				});
				
			});
			
			// A class in the HTML kicks things off.
			if($(this).parent().hasClass(selected))
				init($(this));			
		});
		
/*
		var cache = [];
		function cache_image(src) {
			
			var cached = document.createElement('img');
			cached.src = src;
			cache.push(cached);
		};
*/
		
		function init(current)
		{	
			build_previous(previous());
			build_current(current);
			build_next(next());
			
			// Don't show the items just yet.
			$('.item').css({opacity:0});
			nav.css({opacity:0});
			
			resize();
			
			scroll.scrollToElement(".selected", '400ms');
		};
		
		// Scroll setup
		function resize()
		{
			var headerH = document.getElementsByTagName('header')[0].offsetHeight;
			var footerH = document.getElementsByTagName('footer')[0].offsetHeight;
			var wrapperH = window.innerHeight - headerH - footerH;
			document.getElementById('wrapper').style.height = wrapperH + 'px';
			
			$('section').height($(window).height() - $('header').outerHeight(true) - $('footer').outerHeight(true));
			
			$('.item').each(function(i,item){
				
				var item = $(item);
				var asset = item.children().eq(0);
				var max_width = nav.offset().left;
				
				// Set w/ of container for text-align: center.
				item.parent().css({
					'width': max_width,
					'text-align': 'center'
				});
				
				// Set the dimensions of the video
				if(asset[0].nodeName == "VIDEO")
					size_video(asset);
				
				adjust_padding(asset);
				
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
		
		function adjust_padding(asset)
		{
			var item_height = asset.height();
			var max_height = $(window).height() - ($('cite').outerHeight(true) + $('header').outerHeight(true) + $('footer').outerHeight(true));
			var max_width = nav.offset().left;
			asset.css('padding-top', (max_height > item_height) ? (max_height - item_height) / 2 : 0);
			
			// Set w/ of container for text-align: center.
			asset.parent().css({
				'width': max_width,
				'text-align': 'center'
			});
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
			
			$('<img />')
				.prependTo(item)
				.bind('load', function(){
				
					adjust_padding($(this));
					add_citation(item, caption);
					
					// handle playback 
					if(asset_type == "video")
					{
						var play_button = draw_play(item);
						play_button.click(function(){
							add_video(item, asset);				
						})
					}

					$('.loading').remove();
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
			
			return item;
			
		};
		
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
			
			$(".next").animate({
				left: '-='+$(window).width()
			},'slow', function(){
				$(this).attr('class', 'item current');
				select(next());				
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
			
			$(".previous").animate({
				left: '+='+$(window).width()
			},'slow', function(){
				$(this).attr('class', 'item current');
				select(previous());
				build_previous(previous());
			});
		};
		
		function draw_play(item) { 
			var h_high = item.find('img').height() - 50;
			
			var canvas = $('<canvas/>')
				.css({
					position: 'relative',
					top: -1 * h_high
				})
				.attr('width',75)
				.attr('height',100)
				.appendTo(item);
			
			var context = canvas[0].getContext("2d");
			
			context.fillStyle   = 'rgba(255, 255, 255, .9)';
			context.strokeStyle = 'rgba(00, 00, 00, .6)';
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
		};
		
		function add_video(item, asset)
		{
			
			var src = asset.attr('data-display');
			var poster = asset.attr('data-poster');
			
			item.find('img, canvas').hide();
			
			var video = $('<video/>')
				.prependTo(item)
				.attr({
					'controls': true,
					'preload': true,
					'src': src
				});
			
			size_video(video);
			adjust_padding(video);
			
			function pause_video()
			{
				removeEventListener("pause", pause_video, false);
				
				item.find('img, canvas').show();
				$("video").remove();		
				
				adjust_padding(item.find('img'));
			};
			
			video[0].setAttribute('poster', poster);
			video[0].load();
			video[0].play();
			video[0].addEventListener('pause', pause_video, false);
			
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
		
	};

})(jQuery);