$(function(){
	
	var imgs = $('#wrapper img');
	var section = $('section');
	var nav = $('#portfolio nav');	
	var list = nav.find('ul');
	var loaded = 0;
	
	var len = imgs.length;
	for(var i = 0, len; i < len; i++)
		imgs.eq(i).attr('data-collection-index', (i+1));
	
	// Populate data fields based on the actual size
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

		loaded++;
		if(loaded==len)
			nav.animate({opacity: 1});
	});
	
	// Scroll setup
	function setHeight()
	{
		var headerH = document.getElementsByTagName('header')[0].offsetHeight;
		var footerH = document.getElementsByTagName('footer')[0].offsetHeight;
		var wrapperH = window.innerHeight - headerH - footerH;
		document.getElementById('wrapper').style.height = wrapperH + 'px';
	}
	
	var myScroll = new iScroll('scroller');
	/* myScroll = myScroll.destroy();	// Destroy the iScroll */
	
	window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', setHeight, false);
/* 	document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false); */
	setHeight();
	
	// expanding and contracting
	$(imgs).portfolioitem();
	
	// previous and next arrows
	$.fn.portfolioviewer(imgs);

});