function zeroIfNegative(v) {
	return v < 0 ? 0 : v;
}

function getVisibleRect(el) {

	var docElement = el.ownerDocument.documentElement;

	var viewportHeight = docElement.clientHeight,
		viewportWidth = docElement.clientWidth;

	var rect = el.getBoundingClientRect();

	// when element is not completely outside, calculate positions
	if (!(rect.bottom < 0
		|| rect.top > viewportHeight
		|| rect.right < 0
		|| rect.left > viewportWidth)) {

		var vStart = zeroIfNegative(-rect.top);
		var vEnd = rect.height - zeroIfNegative(rect.bottom - viewportHeight);
		var hStart = zeroIfNegative(-rect.left);
		var hEnd = rect.width - zeroIfNegative(rect.right - viewportWidth);

	}

	return {
		visibleHeight: (vEnd - vStart) || 0,
		visibleWidth: (hEnd - hStart) || 0,
		height: rect.height,
		width: rect.width,

		// these positions are relative to the elements top/left
		top: vStart,
		bottom: vEnd,
		left: hStart,
		right: hEnd
	};

}

if (module) {
	module.exports = getVisibleRect;
}
