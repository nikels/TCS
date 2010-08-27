$(function()
{
	var h1	= $('h1').eq(0);
	var header = $('header').eq(0);
	var footer = $('footer').eq(0);
	var body = $('body').eq(0);
	var links = $('#homepage').find('a');
	var list_items = $('li');
	
	var font_colors = 	['#81b481','#7e98b2','#b2b27e','#b298b2','#b2b298','#b39ab3','#989898','#91adad'];
	var bg_colors = 	['#006600','#003366','#666600','#663366','#666633','#663366','#333333','#336666'];
	var border_colors = ['#257c25','#25507c','#7c7c25','#7c507c','#7c7c50','#7c507c','#505050','#507c7c'];

	var color_len = font_colors.length;
	var current = 0;
	
	var pos = h1.position();
	var h1_top = pos.top;
	var h1_left = pos.left;
	
	var timeout;
	
	/*
	var body = document.getElementsByTagName('body')[0];
	
	var lastSheet = document.styleSheets[document.styleSheets.length - 1];
	lastSheet.insertRule("@-webkit-keyframes starting_keyframes { from { background-color: #000; } to { background-color: " + bg_colors[0] + "; } }", lastSheet.cssRules.length);
	body.style.webkitAnimationName = 'starting_keyframes';
	body.style.backgroundColor = bg_colors[0];
	body.style.webkitAnimationDuration = '4s';
	body.style.webkitAnimationIterationCount = 'infinite';
	var _i = 0;
	var found = false;

	body.addEventListener('webkitAnimationIteration', 
		function(){
		
			if(_i == bg_colors.length)
				_i = 0;
			
			var from = bg_colors[_i];
			var to   = bg_colors[_i+1] || bg_colors[0];
			var rule_name = 'animation'+_i;
			var regexp = new RegExp(rule_name);
			
			if(!found)
			{
				for(var i = lastSheet.cssRules.length-1; i >= 0; i--)
				{
					var css_text = lastSheet.cssRules[i].cssText;
					if(regexp.test(css_text))
					{
						found = true;
						break;
					}
				}

				var newRule = "@-webkit-keyframes " + rule_name + " { from { background-color: " + from + "; } to { background-color: " + to + "; } }";		
				lastSheet.insertRule(newRule, lastSheet.cssRules.length);
			}
			
			body.style.backgroundColor = to;
			body.style.webkitAnimationName = rule_name;
			
			_i++;
			
		} , false);
	*/
	
	
	header.height(header.height());
			
	h1.wrap("<div/>");
	var motion = h1.parent("div");
	
	motion.css({
		position: 'absolute',
		top: h1_top
	});
	
	links.each(function(i, item){
		var item = $(item);
		item.data('href', $(item).attr('href'));
		
		item.click(function(event){
			// Handle multiple clicks.
			if(timeout)
				clearTimeout(to);
			
			// Update the link.
			links.removeClass('active');	
			item.addClass('active');
			Cufon.refresh();
			
			event.preventDefault();
			
			motion.stop().animate({ 
				top: $(this).position().top
			}, {
			    duration: 'slow', 
			    easing: 'easeInOutQuad',
			    complete: function(){

			    	if(item.data("href"))
			    	{
			    		header.stop();
						footer.stop();
						h1.stop();
						
						body.attr('class', 'fadeOut');
						
						setTimeout(function(){
							body.css('opacity', 0);
							document.location = item.attr("href");
				    	}, 1500);
			    	}
				    	
				}
			});
		});
	});
	

	setInterval(function()
	{
		current = (current == color_len) ? 0 : current;
		var font_color = font_colors[current];
		var bg_color = bg_colors[current];
		var border_color = border_colors[current];
		var time = 3000;
		
		h1.animate({
			color: font_color
		}, {
			duration: time,
			step: function()
			{ 
				var color = $(this).css('color');
					
				list_items.css('color', color);
				Cufon.refresh();
			}
		});
		
		header.animate({
			borderBottomColor: border_color
		}, time);
		
		footer.animate({
			borderTopColor: border_color
		}, time);
		
		body.animate({
			backgroundColor: bg_color
		}, time);
		
		current++;
		
	}, 3100);
	
});