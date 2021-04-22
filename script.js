// Grabbing the elements
const tankValue = document.getElementById("fuelTank");
const car = document.getElementById("car");
const line = document.getElementById("finishLine");
const gear = document.getElementById("gearSelect");
const cheatInput = document.getElementById("cheatcode");
const cheatButton = document.getElementById("cheatButton");

// Function to contain the fuel tank privately
const fuelConsumer = () => {
    let fuelTank = 50;

    const consume = (fuel) => {
        fuelTank -= fuel;
    };
    const currentFuel = () => {
        return fuelTank;
    };
    const fuelReset = () => {
        fuelTank = 50;
    }

    return {
        consume: consume,
        fuel: currentFuel,
        reset: fuelReset,
    };
};
const carFuel = fuelConsumer();

// Function that moves the car and deducts the fuel
let moveCounter = 0;
let firstCounter = 0;
let secondCounter = 0;
const carMover = (e) => {
    if (onInput == false) {
        if (e.key == "d") {
            // Normal gameplay without cheats
            if (restrictionCheatActive == false) {
                if (gear.value == 1) {
                    const carPosition = car.getBoundingClientRect().x;
                    car.style.left = carPosition + 2 + "px";
                    carFuel.consume(1);
                    tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
                    moveCounter += 1;
                    firstCounter += 1;
                }
                if (gear.value == 2) {
                    if (firstCounter >= 5) {
                        const carPosition = car.getBoundingClientRect().x;
                        car.style.left = carPosition + 12 + "px";
                        carFuel.consume(0.75);
                        tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
                        moveCounter += 1;
                        secondCounter += 1;
                    } else alert("⚠ Please use the first gear to pass the restriction!");
                }

                if (gear.value == 3) {
                    if (firstCounter >= 5) {
                        const carPosition = car.getBoundingClientRect().x;
                        car.style.left = carPosition + 22 + "px";
                        carFuel.consume(0.25);
                        tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
                        moveCounter += 1;
                    } else alert("⚠ Please use the first gear to pass the restriction!");
                }
            }

            // If the first cheat is activated
            if (restrictionCheatActive == true) {
                secondCounter = 10;
                if (gear.value == 1) {
                    const carPosition = car.getBoundingClientRect().x;

                    // If the second cheat is acivated
                    if (boosterCheatActive == true)
                        car.style.left = carPosition + 20 + "px";
                    else car.style.left = carPosition + 22 + "px";
                    carFuel.consume(1);
                    tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
                    moveCounter += 1;
                }
                if (gear.value == 2) {
                    const carPosition = car.getBoundingClientRect().x;

                    // If the second cheat is acivated
                    if (boosterCheatActive == true)
                        car.style.left = carPosition + 30 + "px";
                    else car.style.left = carPosition + 22 + "px";
                    carFuel.consume(0.75);
                    tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
                    moveCounter += 1;
                }

                if (gear.value == 3) {
                    const carPosition = car.getBoundingClientRect().x;

                    // If the second cheat is acivated
                    if (boosterCheatActive == true)
                        car.style.left = carPosition + 50 + "px";
                    else car.style.left = carPosition + 22 + "px";
                    carFuel.consume(0.25);
                    tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
                    moveCounter += 1;
                }
            }
        }
        if (carFuel.fuel() <= 30) {
            tankValue.style.color = "red";
        }
        if (carFuel.fuel() <= 0) {
            alert(
                "MISSION FAILED!\n⚠ You ran out of fuel at " +
                moveCounter +
                " Movements\nClick OK to restart!"
            );
            carFuel.reset();
            tankValue.style.color = "black";
            tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
            moveCounter = firstCounter = secondCounter = 0;
            car.style.left = "0px";
        }
        collidesWith(car, line);
    }
};

// Don't move the car while the user is entering cheat codes
let onInput = false;
cheatInput.addEventListener("mouseenter", function () {
    onInput = true;
});
cheatInput.addEventListener("mouseleave", function () {
    onInput = false;
});
document.addEventListener("keypress", carMover);

// To detect coillision of two elements--Copied from some website and edited it a bit
function collidesWith(element1, element2) {
    var Element1 = {};
    var Element2 = {};

    Element1.top = element1.getBoundingClientRect().top;
    Element1.left = element1.getBoundingClientRect().left;
    Element1.right =
        Number(element1.getBoundingClientRect().left) +
        Number(element1.offsetWidth);
    Element1.bottom =
        Number(element1.getBoundingClientRect().top) +
        Number(element1.offsetHeight);

    Element2.top = element2.getBoundingClientRect().top;
    Element2.left = element2.getBoundingClientRect().left;
    Element2.right =
        Number(element2.getBoundingClientRect().left) +
        Number(element2.offsetWidth);
    Element2.bottom =
        Number(element2.getBoundingClientRect().top) +
        Number(element2.offsetHeight);

    if (
        Element1.right > Element2.left &&
        Element1.left < Element2.right &&
        Element1.top < Element2.bottom &&
        Element1.bottom > Element2.top
    ) {
        // Do your stuff here
        if (secondCounter >= 5 && carFuel.fuel() < 32) {
            alert("Congratulations!🎉 \n Click OK to see your stats...");
            alert(
                "Movements: " +
                moveCounter +
                "\nScore: " +
                carFuel.fuel() +
                '\nCheat Code 1: "WinnersGetAdvantages:D"\nClick OK to restart!'
            );
            carFuel.reset();
            tankValue.style.color = "black";
            tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
            moveCounter = firstCounter = secondCounter = 0;
            car.style.left = "0px";
        } else if (carFuel.fuel() >= 32 && carFuel.fuel() < 42) {
            alert("Congratulations!🎉 \n Click OK to see your stats...");
            alert(
                "Movements: " +
                moveCounter +
                "\nScore: " +
                carFuel.fuel() +
                '\nCheat Code 1: "WinnersGetAdvantages:D"' +
                '\nCheat Code 2: "BetterWinnersGetBetterAdvantages:D:D"\nClick OK to restart!'
            );
            carFuel.reset();
            tankValue.style.color = "black";
            tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
            moveCounter = firstCounter = secondCounter = 0;
            car.style.left = "0px";
        } else if (carFuel.fuel() >= 42) {
            alert("Congratulations!🎉 \n Click OK to see your stats...");
            alert(
                "Movements: " +
                moveCounter +
                "\nScore: " +
                carFuel.fuel() +
                '\nCheat Code 1: "WinnersGetAdvantages:D"' +
                '\nCheat Code 2: "BetterWinnersGetBetterAdvantages:D:D"' +
                '\nCheat Code 3: "UltraWinnersGetUltraAdvantages:D:D:D"\nClick OK to restart!'
            );
            carFuel.reset();
            tankValue.style.color = "black";
            tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
            moveCounter = firstCounter = secondCounter = 0;
            car.style.left = "0px";
        } else {
            alert(
                "You FAIL!\n⚠ You didn't pass the second restriction!\nClick OK to restart..."
            );
            carFuel.reset();
            tankValue.style.color = "black";
            tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
            moveCounter = firstCounter = secondCounter = 0;
            car.style.left = "0px";
        }
    }
}

// Cheat Activations
let restrictionCheatActive = false;
let boosterCheatActive = false;
let dragCheatActive = false;
const cheater = () => {
    if (cheatInput.value == "WinnersGetAdvantages:D") {
        restrictionCheatActive = true;
        alert("Cheat Activated:\nAll Restrictions Removed!");
        cheatInput.value = "";
    } else if (cheatInput.value == "BetterWinnersGetBetterAdvantages:D:D") {
        restrictionCheatActive = true;
        boosterCheatActive = true;
        alert("2 Cheats Activated:\nEnjoy your boosted car with no restrictions!");
        cheatInput.value = "";
    } else if (cheatInput.value == "UltraWinnersGetUltraAdvantages:D:D:D") {
        restrictionCheatActive = true;
        boosterCheatActive = true;
        dragCheatActive = true;
        alert("3 Cheats Activated:\nBoosted Car & No Restrictions\nLet's make this a DRAG race 😉!");
        cheatInput.value = "";
    } else {
        alert("Invalid Cheat Code");
        cheatInput.value = "";
    }
};
cheatButton.addEventListener("click", cheater);

// In case cheat 3 is activated
car.addEventListener("mousedown", function (event) {
    if (dragCheatActive == true) {

        let shiftX = event.clientX - car.getBoundingClientRect().left;


        // moves the car at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX) {
            car.style.left = pageX - shiftX + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX);
        }

        // move the car on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the car, remove unneeded handlers
        car.onmouseup = function () {
            carFuel.consume(1);
            tankValue.innerHTML = "Fuel Tank: " + carFuel.fuel() + " Liters";
            moveCounter += 1;

            collidesWith(car, line);
            document.removeEventListener('mousemove', onMouseMove);
            car.onmouseup = null;
        };
    }
});

car.ondragstart = function () {
    return false;
};