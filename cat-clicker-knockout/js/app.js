var ClickCounterViewModel = function(name, url) {
	this.name = ko.observable(name);
	this.imgSrc = ko.observable(url);
	this.numberOfClicks = ko.observable(0);

	this.incrementCounter = function() {
		return this.numberOfClicks(this.numberOfClicks() + 1);
	};

	this.level = ko.computed(function() {
		if(this.numberOfClicks() < 10){
			return "new born";
		}
		else if(this.numberOfClicks() > 10 && this.numberOfClicks() < 100) {
			return "infant";
		} else {
			return "teen";
		}
	}, this);
}

var viewModel = new ClickCounterViewModel("Taffy", "http://exmoorpet.com/wp-content/uploads/2012/08/cat.png");
ko.applyBindings(viewModel);