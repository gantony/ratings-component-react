var Icon = React.createClass({
    getInitialState: function() {
        return {active: false};
    },
    getIconClass: function(iconType) {
        var fontAwsomeClasses = {
            bad: "icon-frown",
            average: "icon-meh",
            good: "icon-smile"
        };
        return fontAwsomeClasses[iconType];
    },
    className: function() {
        var classes = ["icon", "circle-icon", "icon-2x"];
        if (this.state.active) {
            classes.push("active");
        }
        classes.push(this.getIconClass(this.props.type));
        return classes.join(" ");
    },
    toggle: function(e) {
        e.preventDefault();
        
        var active = !this.state.active;
        this.setState({active: active});
        if (active) {
            this.props.activeCallBack();
        }
    },
    clear: function() {
        this.setState({active: false});
    },
    render: function() {
        return <span className={this.className()} onClick={this.toggle}></span>;
    }
});


var Rating = React.createClass({
    getInitialState: function(){
        return {activeRating: "none"};
    },
    iconActivated: function(colour) {
        for(refKey in this.refs) {
            if (refKey !== colour) {
                this.refs[refKey].clear();
            }
        }
    },
    getIcons: function(colours) {
        return colours.map(function(colour, i) { 
            return <Icon type={colour} ref={colour} activeCallBack={this.iconActivated.bind(this, colour)} key={i} />;
        }, this);
    },
    render: function() {
        return <div className="rating">
            <span className="type">{this.props.type}: </span>{this.getIcons(["bad", "average", "good"])}
        </div>;
    }
});

var Ratings = React.createClass({
    getRatings: function(types) {
        return types.map(function(type, i) { 
            return <Rating type={type} key={i} />;
        });
    },
    render: function() {
        return <div className="ratings">
            <div className="heading">How are you?</div>
            <hr />
            <div>
                {this.getRatings(["Stress", "Mood", "Energy", "Sleep"])}
            </div>
        </div>;
    }
});

// React.render(<Icon type="red" />, document.body);
// React.render(<Rating type="Mood" rate="2" />, document.body);
React.render(<Ratings />, document.body);

