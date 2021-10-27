var digitSegments = [
    [1, 2, 3, 4, 5, 6],
    [2, 3],
    [1, 2, 7, 5, 4],
    [1, 2, 7, 3, 4],
    [6, 7, 2, 3],
    [1, 6, 7, 3, 4],
    [1, 6, 5, 4, 3, 7],
    [1, 2, 3],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 7, 3, 6]
]

function FileHelper(pathOfFileToReadFrom) {
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var returnValue = request.responseText;
    return returnValue;
}

$(document).ready(function () {
    $("button").click(function () {
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        $.ajax({
            type: "POST",
            url: "resources/scripts/reset.php",
            data: {
                curEpoch: secondsSinceEpoch
            }
        })
    });
});

document.addEventListener('DOMContentLoaded', function () {
    setInterval(function () {
        var storedEpoch = parseInt(FileHelper("resources/scripts/time.log"), 10);
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        deltaEpoch = secondsSinceEpoch - storedEpoch;

        var days = Math.floor(deltaEpoch / (3600 * 24));
        deltaEpoch -= days * 3600 * 24;
        var hrs = Math.floor(deltaEpoch / 3600);
        deltaEpoch -= hrs * 3600;
        var mnts = Math.floor(deltaEpoch / 60);
        deltaEpoch -= mnts * 60;

        var _days = document.querySelectorAll('.days');
        var _hours = document.querySelectorAll('.hours');
        var _minutes = document.querySelectorAll('.minutes');
        var _seconds = document.querySelectorAll('.seconds');

        setNumber(_days[0], Math.floor(days / 100), 1);
        setNumber(_days[1], Math.floor(days / 10) % 10, 1);
        setNumber(_days[2], days % 10, 1);

        setNumber(_hours[0], Math.floor(hrs / 10), 1);
        setNumber(_hours[1], hrs % 10, 1);

        setNumber(_minutes[0], Math.floor(mnts / 10), 1);
        setNumber(_minutes[1], mnts % 10, 1);

        setNumber(_seconds[0], Math.floor(deltaEpoch / 10), 1);
        setNumber(_seconds[1], deltaEpoch % 10, 1);
    }, 1000);
});

var setNumber = function (digit, number, on) {
    var segments = digit.querySelectorAll('.segment');
    var current = parseInt(digit.getAttribute('data-value'));

    // only switch if number has changed or wasn't set
    if (!isNaN(current) && current != number) {
        // unset previous number
        digitSegments[current].forEach(function (digitSegment, index) {
            setTimeout(function () {
                segments[digitSegment - 1].classList.remove('on');
            }, index * 45)
        });
    }

    if (isNaN(current) || current != number) {
        // set new number after
        setTimeout(function () {
            digitSegments[number].forEach(function (digitSegment, index) {
                setTimeout(function () {
                    segments[digitSegment - 1].classList.add('on');
                }, index * 45)
            });
        }, 250);
        digit.setAttribute('data-value', number);
    }
}