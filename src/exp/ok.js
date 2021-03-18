function Driver(name) {
    this.name = name;
}

Driver.prototype.drive = function (name) {
    if (this.cars && name) {
	    if (this.cars instanceof Array) {
		    for (var i = 0; i < this.cars.length; i++) {
			    if (this.cars[i].name === name) {
				    this.cars[i].start();
					break;
				}
			}
	    } else if (this.cars.name === name) {
		    this.cars.start();
	    }
    }
}