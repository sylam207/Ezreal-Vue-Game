new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        enemyHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.enemyHealth = 100;
            this.turns = [];
        },
        attack: function () {
            let damage = this.calculateDamage(3, 10);
            this.enemyHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Enemy for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.enemyAttacks();
        },
        specialAttack: function () {
            let damage = this.calculateDamage(10, 20);
            this.enemyHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Enemy hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.enemyAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.enemyAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        enemyAttacks: function() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Enemy hits Player for ' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.enemyHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});