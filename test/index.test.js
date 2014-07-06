(function () {

	var expect = buster.referee.expect;

	function createTestIframe(testCase, done) {
		var loaded = false;
		var iframe = document.createElement('iframe');
		iframe.setAttribute("scrolling", "no"); // warning: strong language about IE below

		var initIframe = function () {
			if (loaded) return; // IE might fire this multiple times
			var doc = iframe.contentDocument;
			try {
				doc.open(); // this is also for IE...
			} catch (e) {
				setTimeout(initIframe, 10);
				return;
			}
			loaded = true;
			doc.write("<!doctype html>"); // and this is too for IE...
			doc.close();

			testCase.iframe = iframe;
			setSize(testCase.iframe, 100, 100);

			testCase.window = doc.defaultView;

			testCase.document = doc;
			doc.body.style.margin = 0;
			doc.body.style.padding = 0;

			testCase.element = doc.body.appendChild(doc.createElement("div"));
			testCase.element.style.position = "relative";
			setSize(testCase.element, 50, 50);

			done();
		};

		iframe.addEventListener('load', initIframe);
		document.body.appendChild(iframe);
	}

	function setSize(el, h, w) {
		el.style.height = h + "px";
		el.style.width = w + "px";
	}

	buster.testCase("getVisibleRect()", {

		"setUp": function (done) {
			createTestIframe(this, done);
		},

		"tearDown": function () {
			this.iframe.parentNode.removeChild(this.iframe);
		},

		"testcase should be set up correctly": function () {
			expect(this.iframe).toBeDefined();
			expect(this.document).toBeDefined();
			expect(this.element).toBeDefined();
			expect(this.element.ownerDocument).toBe(this.document);
			expect(this.element.parentNode).toBe(this.document.body);
		},

		"should be defined": function () {
			expect(getVisibleRect).toBeFunction();
		},

		"should get visible position": function () {
			expect(getVisibleRect(this.element)).toMatch({
				visibleHeight: 50,
				visibleWidth: 50,
				height: 50,
				width: 50,
				top: 0,
				bottom: 50,
				left: 0,
				right: 50
			})
		},

		"should return zeroes": {
			"setUp": function () {
				setSize(this.document.body, 1000, 1000);
				this.element.style.margin = "200px";
			},
			"when above the top": function () {
				this.window.scrollTo(0, 200);
				expect(getVisibleRect(this.element)).toEqual({
					visibleHeight: 0,
					visibleWidth: 0,
					height: 50,
					width: 50,
					top: undefined,
					bottom: undefined,
					left: undefined,
					right: undefined
				});
			},
			"when below bottom": function () {
				this.window.scrollTo(0, 0);
				expect(getVisibleRect(this.element)).toEqual({
					visibleHeight: 0,
					visibleWidth: 0,
					height: 50,
					width: 50,
					top: undefined,
					bottom: undefined,
					left: undefined,
					right: undefined
				});
			},
			"when outside left edge": function () {
				this.window.scrollTo(200, 0);
				expect(getVisibleRect(this.element)).toEqual({
					visibleHeight: 0,
					visibleWidth: 0,
					height: 50,
					width: 50,
					top: undefined,
					bottom: undefined,
					left: undefined,
					right: undefined
				});
			},
			"when outside right edge": function () {
				this.window.scrollTo(0, 0);
				expect(getVisibleRect(this.element)).toEqual({
					visibleHeight: 0,
					visibleWidth: 0,
					height: 50,
					width: 50,
					top: undefined,
					bottom: undefined,
					left: undefined,
					right: undefined
				});
			}
		},

		"should return deltas": {
			"setUp": function () {
				setSize(this.document.body, 1000, 1000);
				this.element.style.margin = "200px";
			},
			"when sitting on top left edge": function () {
				this.window.scrollTo(225, 225);
				expect(getVisibleRect(this.element)).toEqual({
					visibleHeight: 25,
					visibleWidth: 25,
					height: 50,
					width: 50,
					top: 25,
					bottom: 50,
					left: 25,
					right: 50
				});
			},
			"when sitting on bottom right edge": function (done) {
				setSize(this.iframe, 225, 225);
				expect(getVisibleRect(this.element)).toEqual({
					visibleHeight: 25,
					visibleWidth: 25,
					height: 50,
					width: 50,
					top: 0,
					bottom: 25,
					left: 0,
					right: 25
				});
				this.element.style.background="#f00";
				this.timeout = 2000;
				setTimeout(done, 1000);
			}
		}

	});

}());
