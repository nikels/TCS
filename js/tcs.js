$(function()
{	
	// FONT REPLACING FOR NORMAL WEIGHTED TEXT
	Cufon
		.set('fontFamily', 'Geometric Slabserif')
		.set('fontWeight', '500')
		.set('hover', 'true')
		.replace('p')('details')('.text-asset')('.scroll-text');
		
	// FONT REPLACEMENT FOR BOLD TEXT	
	Cufon
		.set('fontFamily', 'Geometric Slabserif')
		.set('fontWeight', '700')
		.set('hover', 'true')
		.replace('#biography cite')('a')('span')('h1')('h2')('address');

});