/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.0 (15th July 2010)
 */
(function($) { 
   $.fn.touchwipe = function(settings) {
     var config = {
    		min_move: 100,
 			wipeLeft: function() { alert("left"); },
 			wipeRight: function() { alert("right"); },
 			wipeUp: function() { alert("up"); },
 			wipeDown: function() { alert("down"); },
			preventDefaultEvents: true
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX, startY;
		 var isMoving = false;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 startY = startX = null;
    		 isMoving = false;
    	 }	
    	 
    	 function onTouchMove(e) {
    		 if(config.preventDefaultEvents) {
    			 e.preventDefault();
    		 }
    		 if(isMoving) {
	    		 var x = e.touches[0].pageX;
	    		 var y = e.touches[0].pageY;
	    		 var dx = startX - x;
	    		 var dy = startY - y;
	    		 
	    		 if(Math.abs(dx) >= config.min_move) {
	    			cancelTouch();
	    			if(dx > 0) {
	    				config.wipeLeft();
	    			}
	    			else {
	    				config.wipeRight();
	    			}
	    		 }else if(Math.abs(dy) >= config.min_move) {
	    			cancelTouch();
	    			if(dy > 0) {
	    				config.wipeUp();
	    			}
	    			else {
	    				config.wipeDown();
	    			}
	    		 }
    		 }
    	 }
    	 
    	 function onTouchStart(e)
    	 {
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
    		 }
    	 }    	 
    		 
		 this.addEventListener('touchstart', onTouchStart, false);
     });
 
     return this;
   };
 
 })(jQuery);
