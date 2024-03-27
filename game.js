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
        preload: preload, // Передзавантаження ресурсів
        create: create, // Створення гри
        update: update // Оновлення гри
    }
};

// Ініціалізація гри
var game = new Phaser.Game(config);
var score = 0; // Початковий рахунок гравця
var scoreText;
var lifeText; // Текст рахунку
var canMove = true; // Змінна, що визначає, чи може гравець рухатися
var Life = 5;

// Функція для оновлення розмірів гри при зміні розмірів вікна браузера
window.addEventListener('resize', function () {
     game.scale.resize(window.innerWidth, window.innerHeight);
});

// Завантаження ресурсів
function preload() {
    this.load.image('sky', 'assets/sky.png'); // Завантаження зображення неба
    this.load.image('ground', 'assets/platform1.png'); // Завантаження зображення платформи
    this.load.image('ground2', 'assets/platform2.png'); // Завантаження зображення платформи
    this.load.spritesheet('dude', 'assets/girl.png', { frameWidth: 64, frameHeight: 64 }); // Завантаження спрайту гравця
    this.load.image('house', 'assets/house.png'); // Завантаження зображення будинка
    this.load.image('ground1', 'assets/platform.png'); // Завантаження зображення платформи
    this.load.image('star', 'assets/star.png');
    this.load.image('tree', 'assets/Tree.png'); 
    this.load.image('stone', 'assets/Stone.png');
    this.load.image('bush', 'assets/bush.png');
    this.load.image('platformStart', 'assets/platformStart.png');
    this.load.image('platformOne', 'assets/platformOne.png');
    this.load.image('platformFinish', 'assets/platformFinish.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('player2', 'assets/frog.png');
    this.load.image('player3', 'assets/frog.png');
    this.load.image('player4', 'assets/frog.png');
    this.load.image('player5', 'assets/frog.png');
    this.load.image('player6', 'assets/frog.png');
}
// Константа, щоб визначити ширину фону
const WORLD_WIDTH = 5000; // Змінено ширину світу для відображення додаткової платформи

/// Створення гри
function create() {
    // Додавання зображення неба і встановлення розміру на весь екран
    this.add.tileSprite(0, 0, WORLD_WIDTH, 500, 'sky').setOrigin(0,0).setDepth(0);

    // Створення платформ
    platforms = this.physics.add.staticGroup();

    trees = this.physics.add.staticGroup();

    stones = this.physics.add.staticGroup();

    bushes = this.physics.add.staticGroup();

    // Розташовуємо першу платформу з самого низу екрану
    for (var x=0; x < WORLD_WIDTH; x=x+256){
        console.log(x)
        platforms.create(x, 500-128, 'ground2').setOrigin(0,0).refreshBody();
    }
    for (var x = 0; x < WORLD_WIDTH; x = x + Phaser.Math.Between(600, 700)) { 
        var y = Phaser.Math.FloatBetween(300, 93 * 2) 
        platforms.create(x, y, 'platformStart').setDepth(5);
        var i;
    for (i = 1; i < Phaser.Math.Between(0, 5); i++) { 
        platforms.create(x + 100 * i, y, 'platformOne').setDepth(5)}

         platforms.create(x + 100 * i, y, 'platformFinish').setDepth(5);
     }


    for (var x = 320; x < WORLD_WIDTH; x = x + Phaser.Math.FloatBetween(100, 420)) {
      console.log(' x-' + x)
    trees.create(x, 500 - 128, 'tree').setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody().setDepth(Phaser.Math.Between(1,10));
    }

    for (var x = 320; x < WORLD_WIDTH; x = x + Phaser.Math.FloatBetween(100, 420)) {
        console.log(' x-' + x)
      stones.create(x, 500 - 128, 'stone').setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody().setDepth(Phaser.Math.Between(1,10));
      }

      for (var x = 320; x < WORLD_WIDTH; x = x + Phaser.Math.FloatBetween(100, 420)) {
        console.log(' x-' + x)
      bushes.create(x, 500 - 128, 'bush').setOrigin(0, 1).setScale(Phaser.Math.FloatBetween(0.5, 1.5)).refreshBody().setDepth(Phaser.Math.Between(1,10));
      }

      



    // Створення гравця
    player = this.physics.add.sprite(100, 0, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false); // Вимкнення обмежень за межами світу гри
    player.setDepth(5)
    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();



    // Налаштування анімацій гравця
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 8, end:  11}),
        frameRate: 10,
        repeat: -1
    });

    // Налаштування камери
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, 500);
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, 500);

    // Слідкування камери за гравцем
    this.cameras.main.startFollow(player);
    // Створення та розміщення зображення "star" на верхніх платформах
    const stars = this.physics.add.group({
        key: 'star',
        repeat: 5000, // Кількість зірок (змініть за потребою)
        setXY: { x: 250, y: 50, stepX: 70 } // Відстань між зірками (змініть за потребою)
    });

    
    // Налаштування властивостей зірок
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    //Додала бомби
    bombs = this.physics.add.group();
    // scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  

    // Колізія зірок з платформами
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    //Додавання тексту
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' })
    .setOrigin(0,0) 
    .setScrollFactor(0);
}

// Функція для обробки колізії зірок та гравця
function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

    var x = (player.x < 5000) ? Phaser.Math.Between(400, 5000) : Phaser.Math.Between(0, 5000)
}

// Оновлення гри
function update() {
    // Оновлення фону, якщо гравець дійшов до межі екрану
    if (player.x >= this.cameras.main.worldView.right) {
        this.add.image(this.cameras.main.worldView.right + 500, 500, 'sky').setDisplaySize(WORLD_WIDTH, 420);
    }

    // Перевірка, чи гравець може рухатися
    if (canMove) {
        if (cursors.left.isDown) {
            player.setVelocityX(-160); // Рух вліво
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160); // Рух вправо
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0); // Зупинка гравця
            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-380); // Пристріл вгору, тільки коли гравець на платформі
        }
    }

 }

 

 function refreshBody(){
   console.log('game over')
   this.scene.restart();
 };
 
 
 function gameOver() {
    player.setTint(0xff0000); // замалювати гравця червоним кольором 
    this.physics.pause();
   console.log('Гра закінчилася!');
 }