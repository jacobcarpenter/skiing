controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    changeHorizontal(20)
})
function changeHorizontal (changeAmount: number) {
    vx += changeAmount
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        value.vx = vx
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    changeHorizontal(-20)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        value.ay = 0
        value.setVelocity(0, 0)
    }
    mySprite.setImage(img`
. . . . . . . . . . . . . . . . 
. 2 2 . . . . . . . . . . . . . 
. . 2 2 . . . . . . . . . . . . 
. . . 2 2 . . . . . . . 2 2 2 2 
. . . . 2 . . . . . 2 2 2 . . 2 
. . . . 2 2 . . . 2 2 . . . . . 
. . . . . d d d d . . . . . . . 
. . . d d d 1 8 d d d d . . . . 
. . . d 1 d 1 1 8 9 9 d d d . . 
. . . d d d 1 d d d 1 1 . d . . 
. . . d d 9 1 d 1 . . 1 . d . . 
. . . . . d . . . . d . . . . . 
. . . . . d d d d d d . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`)
    game.showLongText("Good run! " + Math.round(game.runtime() / 100) / 10 + "s", DialogLayout.Bottom)
    game.reset()
})
let projectile: Sprite = null
let vx = 0
let mySprite: Sprite = null
mySprite = sprites.create(img`
. . . . . 2 2 2 . . . . . . . . 
. . . . . . 2 2 2 . . . . . . . 
. . . . . . 4 4 4 . . . . . . . 
. . . . . 9 9 9 9 9 . . . . . . 
. . . . 9 1 9 9 9 1 9 . . . . . 
. . . . f 1 9 9 9 1 f . . . . . 
. . . . f 1 8 8 8 1 f . . . . . 
. . . . f 1 8 1 8 1 f . . . . . 
. . . . f 1 8 1 8 1 f . . . . . 
. . . . f 1 8 1 8 1 f . . . . . 
. . . . . . 2 1 2 . . . . . . . 
. . . . . . 2 1 2 . . . . . . . 
. . . . . . 2 1 2 . . . . . . . 
. . . . . . 2 1 2 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
scene.setBackgroundColor(1)
vx = 0
game.onUpdateInterval(200, function () {
    projectile = sprites.createProjectileFromSide(img`
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . 7 . . . 
. . 7 7 . . . 
. . 7 7 7 . . 
. . 7 7 7 7 . 
. 7 7 7 7 7 7 
. 7 7 7 7 7 . 
7 7 7 7 7 7 7 
. . . e . . . 
. . . e . . . 
. . . e . . . 
`, vx, -120)
    if (vx == 0 || Math.percentChance(50)) {
        projectile.x = randint(0, 159)
    } else {
        projectile.y = randint(60, 120)
    }
})
