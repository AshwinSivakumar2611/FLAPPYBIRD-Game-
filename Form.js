class Form {
    constructor(){
        this.title = createElement('h1');
        this.button = createButton('START FLYING!');
    }

    display(){
        this.title.html("FLAPPY BIRD🦅");
        this.title.position(350,600);

        this.button.position(350,500);

        this.button.mousePressed(()=>{
            gameState=PLAY;
        });    
    }
}