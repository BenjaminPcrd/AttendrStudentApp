const timetableData = require('./timetable.json')

export function getTimetableData() {
    return new Promise((resolve, reject) => resolve(timetableData))
}