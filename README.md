## getVisibleRect(el) ##

[![Build Status](https://travis-ci.org/insidewarehouse/buster-extension-iife.svg?branch=master)](https://travis-ci.org/insidewarehouse/buster-extension-iife)

When the element is inside the viewport, `getVisibleRect()` returns:
```
{
	visibleHeight,
	visibleWidth,
	height,
	width,
	
	// these positions are relative to the elements top/left
	top,
	bottom,
	left,
	right
}
```

When element is outside the viewport, `visibleHeight` and `visibleWidth` will be `0`, 
while `top`/`bottom`/`left`/`right` will be `undefined`.
