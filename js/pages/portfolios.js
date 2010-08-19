$(function(){
	
	var imgs = $('#portfolio img');
	var t = 0;
	var len = imgs.length;
	var item_height = 50;
	var item_padding = 10;  
	var item_plus_padding = item_height + item_padding;
	
	var section = $('section');
	var nav = $('#portfolio nav');	
	var list = nav.find('ul');
	var footer_h = $('footer').height();
	var header_h = $('header').height();
	var section_h = section.height()
	var listheight = (list.find('li').length * item_plus_padding) + footer_h + header_h;
	
/*
	for(var i = 0, len; i < len; i++)
	{
		imgs.eq(i).attr('data-collection-index', (i+1))
		imgs.eq(i).parent().css({
			position: 'absolute',
			top: t
		});
		t += item_plus_padding;
	}
*/
	
	// Populate data fields based on the actual size
	imgs.bind('load', function(){
		$(this).attr('data-width', this.width);
		$(this).attr('data-height', this.height);
		
		var _h = item_height;
		var _r = _h/this.height;
		var _w = Math.round(this.width * _r);
		
		$(this).attr('data-width', this.width);
		$(this).attr('data-height', this.height);
		
		$(this).attr('data-s-width', _w);
		$(this).attr('data-s-height', _h);
		
		$(this).attr('width', _w);
		$(this).attr('height', _h);
		
		$(this).parent().css('paddingLeft', ((nav.width() - _w) / 2) + 'px');
		
	});
	
	var myScroll;
	
	function setHeight()
	{
		var headerH = document.getElementsByTagName('header')[0].offsetHeight;
		var footerH = document.getElementsByTagName('footer')[0].offsetHeight;
		var wrapperH = window.innerHeight - headerH - footerH;
		document.getElementById('wrapper').style.height = wrapperH + 'px';
	}
	
	myScroll = new iScroll('scroller');
	/* myScroll = myScroll.destroy();	// Destroy the iScroll */
	
	window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', setHeight, false);
	document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false);
	setHeight();
	
	// expanding and contracting
	$(imgs).portfolioitem();
	
	// previous and next arrows
	$.fn.portfolioviewer(imgs);
	
	
	// NAVIGATION
/* 	$.fn.mousenavigation(nav, list, listheight); */

	
});