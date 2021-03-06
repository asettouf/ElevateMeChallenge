{
    init: function(elevators, floors) {
        //array with number of time floor was queued
        var queuedFloors = [];
        var maxFloor = 11;

        //init queue with zeros
        var k = 0;
        for(k; k <= maxFloor; k++){
            queuedFloors[k] = 0;
        }
		var cleanDestQueue = function(elevator){
			elevator.destinationQueue = elevator.getPressedFloors();
			elevator.checkDestinationQueue();
		  };

        var reorderDestQueue = function(elevator){
          elevator.destinationQueue = sortQueue(elevator);
          elevator.checkDestinationQueue();
        };

        var sort = function(arr){
            var j = 1;
            var key = arr[0];
            var i = j;
            for(j; j < arr.length; j++){
                key = arr[j];
                i = j - 1;
                while( i >= 0 && arr[i] > key){
                    arr[i+1] = arr[i];
                    i -= 1;

                }
                arr[i+1] = key;
            }
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

		var sendElevatorOnFloorButtonPressed = function(elevators, floor){
		  var diff = 0;
		  var minDiff = 100;
		  var elevatorToSend = elevators[0];
		  var i = 0;
		  for(i;i < elevators.length; i++){

  			if((elevators[i].currentFloor < floor.floorNum() && elevators[i].destinationDirection === "up") ||
  			(elevators[i].currentFloor > floor.floorNum() && elevators[i].destinationDirection === "down")){
             // diff = Math.abs(elevators[i].currentFloor() - floor.floorNum());
  			   elevatorToSend = elevators[i];
               elevatorToSend.goToFloor(floor.floorNum());
               reorderDestQueue(elevatorToSend);
   			  return;
            }
            queuedFloors[floor.floorNum()]++;
		  }

		};

        //TODO: Make new function
        var onIdling = function(elevator){
            queuedFloors = removeDuplicate(queuedFloors);
            console.log("IDLING QUEUE " + queuedFloors);
            if(queuedFloors.length === 0){
                elevator.goToFloor(0);
            } else {
                elevator.destinationQueue = queuedFloors.slice(0, queuedFloors.length / elevators.length);
                queuedFloors = queuedFloors.slice( queuedFloors.length / elevators.length, queuedFloors.length);
                elevator.checkDestinationQueue();
                reorderDestQueue(elevator);
                console.log("AFTER IDLING " + elevator.destinationQueue);
            }

        }

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
				} else {
                    if(elevator.currentFloor() === 0){
    					elevator.goingDownIndicator(false);
    					elevator.goingUpIndicator(true);
    					console.log("Fire stop");
                    } else if (elevator.currentFloor() === 11) {
                        elevator.goingDownIndicator(true);
    					elevator.goingUpIndicator(false);
                    } else {
                        elevator.goingDownIndicator(true);
    					elevator.goingUpIndicator(false);
                    }
				}
                if(elevator.loadFactor() === 0){
                    elevator.goingDownIndicator(true);
                    elevator.goingUpIndicator(true);
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
                    onIdling(this);
                });
    			elevator.on("floor_button_pressed", function(floorNum){
                    this.goToFloor(floorNum);
                    reorderDestQueue(this);
					activateArrow(this);
                });
				 elevator.on("stopped_at_floor", function(floorNum){
					//console.log(this.destinationDirection());
                    this.destinationQueue = removeDuplicate(this.destinationQueue);
                    this.checkDestinationQueue();

                    this.destinationQueue.length === 0 ? onIdling(this) : "";
                    this.loadFactor() > 0.9 ? cleanDestQueue(this) : "";
                    reorderDestQueue(this);
					activateArrow(this);
                  });
    		}


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


    },
        update: function(dt, elevators, floors) {
			var i = 0;

			for(i;i < elevators.length; i++){
				//console.log("elevator " + i + " current Queue: " + elevators[i].destinationQueue);

			}


		}
}
