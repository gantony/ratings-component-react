var Icon = React.createClass({
    getInitialState: function() {
        return {active: false};
    },
    className: function() {
        var classes = ["icon", this.props.type];
        if (this.state.active) {
            classes.push("active");
        }
        return classes.join(" ");
    },
    toggle: function(e) {
        e.preventDefault();
        this.setState({active: !this.state.active});
    },
    render: function() {
        return <span className={this.className()} onClick={this.toggle}></span>;
    }
});


var Rating = React.createClass({
    getIcons: function(colours) {
        return colours.map(function(colour) { 
            return <Icon type={colour} />;
        });
    },
    /*
        I currently don't have any logic to implement the fact that only
        one icone can be active at a time. this is potentially better 
        managed at the model/collection level
    */
    render: function() {
        return <div className="rating">
            <span className="type">{this.props.type}: </span>{this.getIcons(["red", "green", "blue"])}
        </div>;
    }
});

var Ratings = React.createClass({
    getRatings: function(types) {
        return types.map(function(type) { 
            return <Rating type={type} />;
        });
    },
    render: function() {
        return <div className="ratings">
            <div className="headline">How are you today?</div>
            <div>
                {this.getRatings(["Stress", "Mood", "Energy", "Sleep"])}
            </div>
        </div>;
    }
});

// React.render(<Icon type="red" />, document.body);
// React.render(<Rating type="Mood" rate="2" />, document.body);
React.render(<Ratings />, document.body);

