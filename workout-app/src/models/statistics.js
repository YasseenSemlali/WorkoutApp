export class Statistics {
    constructor(partial) {
        this.totalTime = partial.totalTime || 0
        this.totalDistance = partial.totalDistance || 0
        this.avgDistance = partial.avgDistance || 0
        this.avgSpeed = partial.avgSpeed || 0
        this.maxAlt = partial.maxAlt || 0
    }
}