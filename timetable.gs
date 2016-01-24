var CLASSES_PER_DAY = 10;
var sheet = SpreadsheetApp.openById("1IR86M691RktPGQUlAMyuJxe4S6Z4tsxylB-lnKhTnDE").getSheets()[0];

/**
 * Parses timetable and returns a json object containing class hours
 **/
function getHours() {
    var result = [];
    var values = sheet.getRange(2, 3, CLASSES_PER_DAY).getValues();
    for (var hours in values) {
        var split = values[hours][0].split("-");
        result.push({
            from: split[0],
            to: split[1]
        });
    }
    return JSON.stringify(result);
}

/**
 * Parses timetable and returns a json object containing weekly timetable for specific group
 * @param {String} group
 **/
function getTimetable(group) {
    if (!group) {
        group = 'IIB';
    }
    //Fetch      classes     row, startColumn, noRows, noColumns
    var range = sheet.getRange(1, 1, 1, sheet.getLastColumn() - 3);
    var values = range.getValues();
    var result = [];

    for (var cell in values[0]) {
        if (values[0][cell] != group) {
            continue;
        }
        // Five working days
        for (var i = 0; i < 5; i++) {
            result.push([]);
            //One spacing row, 2 shifted from the top
            values = sheet.getRange(2 + ((CLASSES_PER_DAY + 1) * i), (parseInt(cell) + 1), CLASSES_PER_DAY, 2).getValues();
            for (var j = 0; j < CLASSES_PER_DAY; j++) {
                result[i][j] = {
                    name: values[j][0],
                    room: values[j][1]
                };
            }
        }
        return JSON.stringify(result);
    }

    return null;
}
