## getVisibleRect(el) ##

[![Build Status](https://travis-ci.org/insidewarehouse/get-visible-rect.svg?branch=master)](https://travis-ci.org/insidewarehouse/get-visible-rect)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/iw-get-visible-rect.svg)](https://saucelabs.com/u/iw-get-visible-rect)

Note: tests are failing, because they only run in PhantomJS on travis for now - enabling real browsers soon.

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

My primary purpose for building this (and not using something else) is to calculate the visible percentage of the 
element. `visibleHeight` is actually `bottom - top` and `visibleWidth` is `right - left`. This means that the visible
percentage is `(visibleHeight * visibleWidth) / (height * width)`.
