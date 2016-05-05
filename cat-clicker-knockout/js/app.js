var ClickCounterViewModel = function() {
	this.currentCat = ko.observable();
	this.incrementCounter = function() {
		return this.numberOfClicks(this.numberOfClicks() + 1);
	};
}

var Cat = function(){
	this.name = ko.observable("Taffy");
	this.imgSrc = ko.observable("http://exmoorpet.com/wp-content/uploads/2012/08/cat.png");
	this.nicks = ko.observableArray(["cool cat", "super cool cat", "woot woot"]);
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

var viewModel = new ClickCounterViewModel();
ko.applyBindings(viewModel);

var cat = new Cat();
viewModel.currentCat(cat);