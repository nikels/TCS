$(function()
{	
	// FONT REPLACING FOR NORMAL WEIGHTED TEXT
	Cufon
		.set('fontFamily', 'Geometric Slabserif')
		.set('fontWeight', '500')
		.set('hover', 'true')
		.replace('p')('details');
		
	// FONT REPLACEMENT FOR BOLD TEXT	
	Cufon
		.set('fontFamily', 'Geometric Slabserif')
		.set('fontWeight', '700')
		.set('hover', 'true')
		.replace('#biography cite')('a')('span')('h1')('h2')('address');
	
	function resize()
	{		
		var added = $('header').height() + $('section').height() + $('footer').height();
		
		if(added > $(window).height())
			$('footer').css('position', 'relative');
		else
			$('footer').css('position', 'fixed');
	};
	
	$(window).resize(resize);
	resize();
	
});