{
    init: function(elevators, floors) {
        var elevatorFirst = elevators[0];
        var elevatorSecond = elevators[1];
        var elevatorThird = elevators[2];
        var elevatorFourth = elevators[3];
		var i = 0;
		for(i;i < elevators.length; i++){
			var elevator = elevators[i];
			elevator.on("idle", function(floorNum){
                this.goToFloor(0);
            });
			elevator.on("floor_button_pressed", function(floorNum){
                this.goToFloor(floorNum);
            });
		}
        
		var removeDuplicate = function(arr) {
			var seen = {};
			var out = [];
			var len = arr.length;
			var j = 0;
			for(var i = 0; i < len; i++) {
				 var item = arr[i];
				 if(seen[item] !== 1) {
					   seen[item] = 1;
					   out[j++] = item;
				 }
			}
			return out;
		};
		var j = 0;
		for(j;j < floors.length; j++){
			var floor = floors[j];
			floor.on("up_button_pressed", function(){
                var diff = 0;
				var minDiff = 100;
				var elevatorToSend = 0;
				var i = 0;
				for(i;i < elevators.length; i++){
					diff = Math.abs(elevators[i].destinationQueue[0] - elevators[i].currentFloor());
					if(diff < minDiff && elevators[i].loadFactor != 1){
						elevatorToSend = i;
						minDiff = diff;
					}
				}
				elevators[elevatorToSend].destinationQueue.splice(1,0, this.floorNum());
				elevators[elevatorToSend].destinationQueue = removeDuplicate(elevators[elevatorToSend].destinationQueue);
				elevators[elevatorToSend].checkDestinationQueue();
				//elevators[elevatorToSend].goToFloor(this.floorNum());
            });
			floor.on("down_button_pressed", function(){
				var diff = 0;
				var minDiff = 100;
				var elevatorToSend = 0;
				var i = 0;
				for(i;i < elevators.length; i++){
					diff = Math.abs(elevators[i].destinationQueue[0] - elevators[i].currentFloor());
					if(diff < minDiff && elevators[i].loadFactor != 1){
						elevatorToSend = i;
						minDiff = diff;
					}
				}
                
				//console.log(this.floorNum());
				//console.log(elevators[elevatorToSend].destinationQueue);
				elevators[elevatorToSend].destinationQueue.splice(1,0, this.floorNum());
				elevators[elevatorToSend].destinationQueue = removeDuplicate(elevators[elevatorToSend].destinationQueue);
				//console.log(elevators[elevatorToSend].destinationQueue);
				elevators[elevatorToSend].checkDestinationQueue();
			});
		}
        

    },
        update: function(dt, elevators, floors) {
			var i = 0;
			for(i;i < elevators.length; i++){
				console.log("elevator " + i + " current Queue: " + elevators[i].destinationQueue);
			}
			
			
		}
}







