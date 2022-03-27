export class Workout {
    constructor(partial) {
        this.id = Number(partial.id)
        this.distance = Number(partial.distance || 0)
        this.avgSpeed = Number(partial.avgSpeed || 0)
        this.totalTime = Number(partial.totalTime || 0)
        this.maxAlt = Number(partial.maxAlt || 0)
        this.calsBurned = Number(partial.calsBurned || 0)
        this.startTime = new Date(partial.startTime) || null;
    }
}