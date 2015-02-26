// Dirty hack
var ready = false;
beforeEach(function (done) {
    if (!ready) {
    	setTimeout(function(){
		    done();
	    }, 500);
	} else {
		done();
	}
});

describe("The Ratings component", function() {
	function getComponent() {
		return React.addons.TestUtils.renderIntoDocument(RatingsComponent.create());
	}

	function getIcon(parent, childIndex) {
		return React.addons.TestUtils.scryRenderedDOMComponentsWithClass(parent, "icon")[childIndex];
	}

	function numActiveIcons(parent) {
		return React.addons.TestUtils.scryRenderedDOMComponentsWithClass(parent, "active").length;
	}

	function isActiveIcon(icon) {
		return numActiveIcons(icon) === 1;
	}

	function clickOnIcon(icon) {
		React.addons.TestUtils.Simulate.click(icon.getDOMNode());
	}

	it("is a React Composite Component", function() {
		var component = getComponent();
		expect(React.addons.TestUtils.isCompositeComponent(component)).toBeTruthy();
	});

	it("contains 4 individual Rating components", function() {
		var component = getComponent();
		var ratingComponents = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(component, "rating");
    	expect(ratingComponents.length).toBe(4);
	});

	it("initially does not have any active icon", function() {
		var component = getComponent();
		expect(numActiveIcons(component)).toBe(0);
	});

	it("clicking on an inactive icon makes it active", function() {
		var component = getComponent();
		var icon = getIcon(component, 0);
		expect(isActiveIcon(icon)).toBeFalsy();

		clickOnIcon(icon);
    	expect(isActiveIcon(icon)).toBeTruthy();
	});

	it("clicking on an active icon makes it inactive", function() {
		var component = getComponent();
		var icon = getIcon(component, 0);
		clickOnIcon(icon);
		expect(isActiveIcon(icon)).toBeTruthy();

		clickOnIcon(icon);
    	expect(isActiveIcon(icon)).toBeFalsy();
	});

	it("a rating component can only have one icon active at a time", function() {
		var component = getComponent();
		var rating = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(component, "rating")[0];
		var icons = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(rating, "icon");
		
		expect(icons.length).toBe(3);	
		expect(numActiveIcons(rating)).toBe(0);

		clickOnIcon(icons[0]);
		expect(numActiveIcons(rating)).toBe(1);

		clickOnIcon(icons[1]);
		expect(numActiveIcons(rating)).toBe(1);

		expect(numActiveIcons(icons[0])).toBe(0);
		expect(numActiveIcons(icons[1])).toBe(1);
	});
});