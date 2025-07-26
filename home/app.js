window.onload = function () {
    const stNumSports = document.getElementById("stNumSports");
    const stNumAth = document.getElementById("stNumAth");
    const stNumCoun = document.getElementById("stNumCoun");

    let count = 0;
    const targetSport = 32;
    const targetAth = 10714;
    const targetCoun = 184;

    const duration = 3000; // Duration in milliseconds

    const intervalSport = duration / targetSport;  // Time per increment
    const intervalAth = duration / targetAth;  // Time per increment
    const intervalCoun = duration / targetCoun;  // Time per increment

    function incrementCounterSports() {
        if (count < targetSport) {
            count++;
            stNumSports.textContent = count;
            setTimeout(incrementCounterSports, intervalSport);  // Recursively call function
        }
    }

    incrementCounterSports();

    let count2 = 0;

    function incrementCounterAth() {
        if (count2 < targetAth && count2 != 10700) {
            count2 += 20;
            stNumAth.textContent = count2;
            setTimeout(incrementCounterAth, intervalAth);  // Recursively call function
        }

        else if (count2 == 10700 && count2 != 10710) {
            count2 += 10;
            stNumAth.textContent = count2;
            setTimeout(incrementCounterAth, intervalAth);
        }
    }

    incrementCounterAth();

    count2 = count2 - 26
    stNumAth.textContent = count2;

    let count3 = 0;

    function incrementCounterCoun() {
        if (count3 < targetCoun) {
            count3++;
            stNumCoun.textContent = count3;
            setTimeout(incrementCounterCoun, intervalCoun);  // Recursively call function
        }
    }

    incrementCounterCoun();
};