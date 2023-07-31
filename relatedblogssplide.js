//function file for blogs page

function relatedblog() {
let splides = $('.related');
for ( let i = 0, splideLength = splides.length; i < splideLength; i++ ) {
	new Splide( splides[ i ], {
  // Desktop on down
	perPage: 2,
	perMove: 1,
  focus: 'left', // 0 = left and 'center' = center
  type: 'loop', // 'loop' or 'slide'
  gap: '2.25rem', // space between slides
  arrows: 'slider', // 'slider' or false
  pagination: false, // 'slider' or false
  speed : 600, // transition speed in miliseconds
  dragAngleThreshold: 30, // default is 30
  autoWidth: false, // for cards with differing widths
  rewind : false, // go back to beginning when reach end
  rewindSpeed : 400,
  waitForTransition : false,
  updateOnMove : true,
  trimSpace: false, // true removes empty space from end of list
  breakpoints: {
		991: {
		perPage: 2,
		perMove: 1,
		},
    767: {
    	// Mobile Landscape
      	perPage: 1,
		perMove: 1,
		},
    479: {
    	// Mobile Portrait
        	perPage: 1,
			perMove: 1,
		}
	}
} ).mount();
}

}
relatedblog();
