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
		var activeIcons = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(component, "active");
    	expect(activeIcons.length).toBe(0);
	});

	it("clicking on an inactive icon makes it active", function() {
		var component = getComponent();
		var icon = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(component, "icon")[0];
		expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (icon, "active").length).toBe(0);

		React.addons.TestUtils.Simulate.click(icon.getDOMNode());
    	expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (icon, "active").length).toBe(1);
	});

	it("clicking on an active icon makes it inactive", function() {
		var component = getComponent();
		var icon = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(component, "icon")[0];
		React.addons.TestUtils.Simulate.click(icon.getDOMNode());
		expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (icon, "active").length).toBe(1);

		React.addons.TestUtils.Simulate.click(icon.getDOMNode());
    	expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (icon, "active").length).toBe(0);
	});

	it("a rating component can only have one icon active at a time", function() {
		var component = getComponent();
		var rating = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(component, "rating")[0];
		var icons = React.addons.TestUtils.scryRenderedDOMComponentsWithClass(rating, "icon");
		expect(icons.length).toBe(3);	
		expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (rating, "active").length).toBe(0);

		React.addons.TestUtils.Simulate.click(icons[0].getDOMNode());
		expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (rating, "active").length).toBe(1);

		React.addons.TestUtils.Simulate.click(icons[1].getDOMNode());
		expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (rating, "active").length).toBe(1);

		expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (icons[0], "active").length).toBe(0);
		expect(React.addons.TestUtils.scryRenderedDOMComponentsWithClass (icons[1], "active").length).toBe(1);
	});
});