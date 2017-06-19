const colors = [
    'red',
    'blue',
    'magenta',
    'yellow'
]
let lastChosenColorIndex = -1
const nextColor = () => {
    lastChosenColorIndex++
    if (lastChosenColorIndex === colors.length) lastChosenColorIndex = 0
    return colors[lastChosenColorIndex]
}

class Box {
    constructor (game, place) {
        this.game = game
        this.ctx = this.game.ctx
        this.step = this.game.step
        this.place = place
        this.weight = 3
        this.size = this.game.boxSize
        this.color = nextColor()
        this.position = {x: this.place * this.size, y: 0}
        this.positionOnDisplay = {x: this.position.x, y: -this.size}
        this.onStepChanged()
    }
    onStepChanged () {
        this.position.y = ((this.game.step - this.step) * this.size) + this.size
    }
    render () {
        this.changes()
        this.draw()
    }
    changes () {
        this.positionOnDisplay.y += (this.position.y - this.positionOnDisplay.y) / 10
    }
    draw () {
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.positionOnDisplay.x, this.positionOnDisplay.y, this.size, this.size)
        
    }
}

export default Box