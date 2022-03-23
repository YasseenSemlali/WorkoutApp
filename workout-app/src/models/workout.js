export class Workout {
    constructor(partial) {
        this.id = partial.id
        this.distance = partial.distance || 0
        this.avgSpeed = partial.avgSpeed || 0
        this.totalTime = partial.totalTime || 0
        this.totalTimeString = partial.totalTimeString || 0
        this.maxAlt = partial.maxAlt || 0
        this.calsBurned = partial.calsBurned || 0
    }
}