$(function()
{
	var h1 			= $('h1').eq(0);
	var header 		= $('header').eq(0);
	var footer 		= $('footer').eq(0);
	var body 		= $('body').eq(0);
	var links 		= $('#homepage').find('a');
	var list_items	= $('li');
	
	var font_colors = ['#81b481', '#7e98b2','#b2b27e','#b298b2','#b2b298','#b39ab3','#989898','#91adad'];
	var bg_colors 	= ['#006600', '#003366','#666600','#663366','#666633','#663366','#333333','#336666'];
	var color_len 	= font_colors.length;
	var current 	= 0;
	
	var pos 		= h1.position();
	var h1_top 		= pos.top;
	var h1_left 	= pos.left;
	
	header.height(header.height());
			
	h1.wrap("<div/>");
	var motion = h1.parent("div");
	
	motion.css({
		position: 'absolute',
		top: h1_top
	});
	
	$('#homepage ol').css("margin-left", h1.width() + 10);
	
	var to;
	links.each(function(i, item){
		var item = $(item);
		item.click(function(event){
		
			if(to)
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
			    
					to = setTimeout(function(){
						document.location = item.attr("href");
					}, 500);
					
				}
			});
		});
	});
	
	setInterval(function()
	{
		current = (current == color_len) ? 0 : current;
		var font_color = font_colors[current];
		var bg_color = bg_colors[current];
		var time = 500;
		
		h1.animate({
			color: font_color
		}, {
			duration: time,
			step: function()
			{ 
				var color = $(this).css('color');
					
				list_items.css('color', color);
				header.css('border-bottom-color', color);
				footer.css('border-top-color', color);
				
				Cufon.refresh();
			}
		});
		
		body.animate({
			backgroundColor: bg_color
		}, time);
		
		current++;
		
	}, 5000);
	
});