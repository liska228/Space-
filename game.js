var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload, // передзавантаження ресурсів
        create: create, // створення гри
        update: update // оновлення гри
    }
};
var game = new Phaser.Game(config);
function preload() {
    this.load.image('space', 'assets/space.png'); // завантаження зображення фону
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 64, frameHeight: 64}); // завантаження спрайту гравця
    this.load.image('ground', 'assets/platform.png'); // Завантаження зображення платформи
}

const WORLD_WIDTH = 5000; // змінено ширину світу для відображення додаткової платформи

/// Створення гри
function create() {

    this.add.tileSprite(0, 0, WORLD_WIDTH, 500, 'space').setOrigin(0,0).setDepth(0);

    
    // cтворення платформ
    platforms = this.physics.add.staticGroup();

    for (var x=0; x < WORLD_WIDTH; x=x+256){
        console.log(x)
        platforms.create(x, 500-128, 'ground').setOrigin(0,0).refreshBody();}
    player = this.physics.add.sprite(256, 256, 'dude'); // додано гравця
    player.setBounce(0.2);
    player.setCollideWorldBounds(false); 
    player.setDepth(5)
    
    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();
   
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 12}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 8}),
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 13, end:  16}),
        frameRate: 10,
        repeat: -1
    });
    // налаштування камери
     this.cameras.main.setBounds(0, 0, WORLD_WIDTH, window.innerHeight);
     this.physics.world.setBounds(0, 0, WORLD_WIDTH, window.innerHeight);
 
     // слідкування камери за гравцем
     this.cameras.main.startFollow(player);
}
function update() {
        // оновлення фону, якщо гравець дійшов до межі екрану
        // if (player.x >= this.cameras.main.worldView.right) {
        //     this.add.image(this.cameras.main.worldView.right + 500, 500, 'space').setDisplaySize(WORLD_WIDTH, 500);
        // }
    
        // перевірка, чи гравець може рухатися
        // if (canMove) {
        //     if (cursors.left.isDown) {
        //         player.setVelocityX(-160); // рух вліво
        //         player.anims.play('left', true);
        //     } else if (cursors.right.isDown) {
        //         player.setVelocityX(160); // рух вправо
        //         player.anims.play('right', true);
        //     } else {
        //         player.setVelocityX(0); // зупинка гравця
        //         player.anims.play('turn');
        //     }
    
        //     if (cursors.up.isDown && player.body.touching.down) {
        //         player.setVelocityY(-380); // пристріл вгору, тільки коли гравець на платформі
        //     }
        }
    
// }