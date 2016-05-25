{
    init: function(elevators, floors) {
        var elevatorFirst = elevators[0];
        var elevatorSecond = elevators[1];
        var elevatorThird = elevators[2];
        var elevatorFourth = elevators[3];
        elevators.forEach(function(elevator, i){
            elevator.on("idle", function(floorNum){
                this.goToFloor(0);
            });
			elevator.on("floor_button_pressed", function(floorNum){
                this.goToFloor(floorNum);
            });
        });
		var removeDuplicate = function(a) {
			var seen = {};
			var out = [];
			var len = a.length;
			var j = 0;
			for(var i = 0; i < len; i++) {
				 var item = a[i];
				 if(seen[item] !== 1) {
					   seen[item] = 1;
					   out[j++] = item;
				 }
			}
			return out;
		};
        floors.forEach(function(floor, i){
            floor.on("up_button_pressed", function(){
                var diff = 0;
				var minDiff = 100;
				var elevatorToSend = 0;
				var that = this;
                elevators.forEach(function(elevator, i){
                    diff = Math.abs(elevator.destinationQueue[0] - elevator.currentFloor());
					if(diff < minDiff && this.loadFactor != 1){
						elevatorToSend = i;
						minDiff = diff;
						
					}
                });
				elevators[elevatorToSend].destinationQueue.splice(1,0, this.floorNum());
				elevators[elevatorToSend].destinationQueue = removeDuplicate(elevators[elevatorToSend].destinationQueue);
				elevators[elevatorToSend].checkDestinationQueue();
				//elevators[elevatorToSend].goToFloor(this.floorNum());
            });
			floor.on("down_button_pressed", function(){
				var diff = 0;
				var minDiff = 100;
				var elevatorToSend = 0;
				var that = this;
                elevators.forEach(function(elevator, i){
                    diff = Math.abs(elevator.destinationQueue[0] - elevator.currentFloor());
					if(diff < minDiff && this.loadFactor != 1){
						elevatorToSend = i;
						minDiff = diff;
					}
                });
				//console.log(this.floorNum());
				//console.log(elevators[elevatorToSend].destinationQueue);
				elevators[elevatorToSend].destinationQueue.splice(1,0, this.floorNum());
				elevators[elevatorToSend].destinationQueue = removeDuplicate(elevators[elevatorToSend].destinationQueue);
				//console.log(elevators[elevatorToSend].destinationQueue);
				elevators[elevatorToSend].checkDestinationQueue();
				//elevators[elevatorToSend].goToFloor(this.floorNum());
            });
        });

    },
        update: function(dt, elevators, floors) {
			elevators.forEach(function(elevator, i){
				console.log("elevator " + i + " current Queue: " + elevator.destinationQueue);
            });
			
		}
}







