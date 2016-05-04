var ClickCounterViewModel = function(cat) {
	this.currentCat = ko.observable(cat);
	this.incrementCounter = function() {
		return this.currentCat().numberOfClicks(this.currentCat().numberOfClicks() + 1);
	};
}

var Cat = function(name, url, nicks){
	this.name = ko.observable(name);
	this.imgSrc = ko.observable(url);
	this.nicks = ko.observableArray(nicks);
	this.numberOfClicks = ko.observable(0);

	this.level = ko.computed(function() {
		if(this.numberOfClicks() < 10){
			return "new born";
		}
		else if(this.numberOfClicks() > 10 && this.numberOfClicks() < 20) {
			return "infant";
		} else {
			return "teen";
		}
	}, this);
}

var cat = new Cat("Taffy", "http://exmoorpet.com/wp-content/uploads/2012/08/cat.png", ["cool cat", "super cool cat", "woot woot"]);

var viewModel = new ClickCounterViewModel(cat);
ko.applyBindings(viewModel);