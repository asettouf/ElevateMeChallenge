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

        floors.forEach(function(floor, i){
            floor.on("up_button_pressed", function(){
                elevators.forEach(function(elevator, i){
                    if(!elevator.destinationQueue || elevator.loadFactor == 1  || elevator.destinationQueue.indexOf(floor.floorNum) > -1){
                        return;
                    }
                    elevator.goToFloor(floor.floorNum);
					return false;

                });
            });
			floor.on("down_button_pressed", function(){
                elevators.forEach(function(elevator, i){
                    if(!elevator.destinationQueue || elevator.loadFactor == 1 || elevator.destinationQueue.indexOf(floor.floorNum) > -1){
                        return;
                    }
                    elevator.goToFloor(floor.floorNum);
					return false;

                });
            });
        });

    },
        update: function(dt, elevators, floors) {}
}







