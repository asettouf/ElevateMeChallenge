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
                var diff = 0;
				var minDiff = 100;
				var elevatorToSend = 0;
				var that = this;
                elevators.forEach(function(elevator, i){
                    diff = Math.abs(that.floorNum() - elevator.currentFloor());
					if(diff < minDiff && this.loadFactor != 1){
						elevatorToSend = i;
						minDiff = diff;
						
					}
                });
				elevators[elevatorToSend].goToFloor(this.floorNum());
            });
			floor.on("down_button_pressed", function(){
				var diff = 0;
				var minDiff = 100;
				var elevatorToSend = 0;
				var that = this;
                elevators.forEach(function(elevator, i){
                    diff = Math.abs(that.floorNum() - elevator.currentFloor());
					if(diff < minDiff && this.loadFactor != 1){
						elevatorToSend = i;
						minDiff = diff;
					}
                });
				elevators[elevatorToSend].goToFloor(this.floorNum());
            });
        });

    },
        update: function(dt, elevators, floors) {}
}







