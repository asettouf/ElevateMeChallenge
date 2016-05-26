{
    init: function(elevators, floors) {
		var cleanDestQueue = function(elevator){
			elevator.destinationQueue = elevator.getPressedFloors();

			elevator.checkDestinationQueue();
		  };

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
		var sendElevatorOnFloorButtonPressed = function(elevators, floor){
		  var diff = 0;
		  var minDiff = 100;
		  var elevatorToSend = elevators[0];
		  var i = 0;
		  for(i;i < elevators.length; i++){
			if(elevators[i].destinationQueue.includes(floor.floorNum())){
			  console.log("ABORT");
			  return;
			}
			if(elevators[i].destinationQueue.length === 0){
			  elevatorToSend = elevators[i];
			  break;
			}
			diff = Math.abs(elevators[i].destinationQueue[0] - elevators[i].currentFloor() - floor.floorNum());
			if(diff < minDiff && elevators[i].loadFactor != 1){
			  elevatorToSend = elevators[i];
			  minDiff = diff;
			}
		  };

		  elevatorToSend.destinationQueue.splice(1,0, floor.floorNum());
		  elevatorToSend.destinationQueue = removeDuplicate(elevatorToSend.destinationQueue);
		  elevatorToSend.checkDestinationQueue();

		};

		var sortQueue = function(elevator){
		  var i = 0;
		  var sortedArray = elevator.destinationQueue.slice();
		  var pivot = elevator.currentFloor();
		  console.log(elevator.currentFloor());
		  console.log(sortedArray);
		  for(i; i < sortedArray.length; i++){
			var j = i;
			for(j; j < sortedArray.length; j++){
			  if(Math.abs(pivot - sortedArray[j]) < Math.abs(pivot - sortedArray[i])){
				var buff = sortedArray[i];
				sortedArray[i] = sortedArray[j];
				sortedArray[j] = buff;
			  }
			}
		  }
		  console.log(sortedArray);
		  return sortedArray;
		};
	
		var activateArrow = function(elevator){
			console.log("MY FLOOR " + elevator.currentFloor());
				console.log("MY QUEUE " + elevator.destinationQueue);
				if(elevator.currentFloor() < elevator.destinationQueue[0]){
					console.log("Fire up");
					elevator.goingDownIndicator(false);
					elevator.goingUpIndicator(true);
				} else if(elevator.currentFloor() > elevator.destinationQueue[0]){
					elevator.goingDownIndicator(true);
					elevator.goingUpIndicator(false);
					console.log("Fire down");
				} else{
					elevator.goingDownIndicator(true);
					elevator.goingUpIndicator(true);
					console.log("Fire stop");
				}
				
		};
		
		
        var elevatorFirst = elevators[0];
        var elevatorSecond = elevators[1];
        var elevatorThird = elevators[2];
        var elevatorFourth = elevators[3];
    		var i = 0;
    		for(i;i < elevators.length; i++){
				//console.log("Pass count: " + elevators[i].maxPassengerCount());
    			var elevator = elevators[i];
    			elevator.on("idle", function(floorNum){
                    this.goToFloor(0);
                });
    			elevator.on("floor_button_pressed", function(floorNum){
                    this.goToFloor(floorNum);
                    this.destinationQueue = sortQueue(this);
                    this.checkDestinationQueue();
					activateArrow(this);
                });
				elevator.on("stopped_at_floor", function(floorNum){
					//console.log(this.destinationDirection());
                    //cleanDestQueue(this);
                    this.destinationQueue = sortQueue(this);
                    this.checkDestinationQueue();
					activateArrow(this);
                  });
    		}

/**
  		var j = 0;
  		for(j;j < floors.length; j++){
  			var floor = floors[j];
  			floor.on("up_button_pressed", function(){
  				sendElevatorOnFloorButtonPressed(elevators, this);

  				//elevators[elevatorToSend].goToFloor(this.floorNum());
              });
  			floor.on("down_button_pressed", function(){
  				sendElevatorOnFloorButtonPressed(elevators, this);
  			});
		  }

**/
    },
        update: function(dt, elevators, floors) {
			var i = 0;

			for(i;i < elevators.length; i++){
				//console.log("elevator " + i + " current Queue: " + elevators[i].destinationQueue);

			}


		}
}
