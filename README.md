## getVisibleRect(el) ##

Returns:
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
