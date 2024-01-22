Idea is to make game using only console.log function to render view for the game.

I want to decouple model and view for this game.

model would be Fieldobject and GameObject. FieldObject would have method update(gameObject) to
add gameObject to the field (datawise), also it would have render function to console.log field
whenever it's updated. Also it will have clear(gameobject) method to clear object's old position whenever it makes a move.

GameObject would have pattern array, where it's visual representation is recorded, and move(vector) method. It can move too 8 directions(dx,dy):
(0,1)
(1,0)
(1,1)
(0,-1)
(-1,0)
(-1,1)
(-1,-1)
(1,-1)
and maybe sometimes with multiplier m\*(dx,dy) in case user presses quickly many times or other button, whatever....

The game could be anything, for beginning let's see how it works, adding objects to field, rendering, etc. I am thinking of game like either driving car in the boundaries of road or shooter like galaxy invaders or logical slow game P vs robots R where rules for robots and for player defined :)

ANyway, now i need to listen to keyboard events... arrows to control GameObjects

file structure:
main.mjs -- running game
patterns.mjs -- drawings of patterns for the gameObjects
utils.mjs -- translates patterns from `**` to [['*','*']] for example
controls.mjs -- provides event listener for keys and requires details object with functions of how to react to each keypress
