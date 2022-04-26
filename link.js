class Link{
    constructor(bodyA,bodyB){
        var lastLink = bodyA.body.bodies.length-2
        var options ={
            bodyA:bodyA.body.bodies[lastLink],
            pointA:{x: 0, y: 0},
            bodyB:bodyB,
            pointB:{x: 0, y: 0},
            length: -10,
            stiffness: 0.01
        }
        
        this.link=Constraint.create(options)
        World.add(world, this.link)
    }
    detach(){
        World.remove(world, this.link)
    }
}