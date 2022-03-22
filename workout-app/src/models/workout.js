export class Workout {
    constructor(partial) {
        this.distance = partial.distance || 0
        this.avgSpeed = partial.avgSpeed || 0
        this.totalTime = partial.totalTime || 0
    }
}