//Generate random numbers (function will call for randomization throughout the game)
var randomNumber = function(min,max){
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var getPlayerName = function(){
    var name = "";
    //add loop here with prompt and condition
    while (name === "" || name === null){
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name; 
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money:10,
    reset: function() {
        this.health = 100;
        this.health = 10;
        this.attack = 10;
    },//add additional methods so use comma!
    refillHealth: function() {
        if(this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -=  7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    },//comma!
    upgradeAttack: function () {
        if (this.money >= 7){
            window.alert ("Upgrading player's attack by 6 or 7 dollars");
        this.attack += 6;
        this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!");
        }
    }
};
//log multiple values at once
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
//this is still an array//enemyInfo[0], accessing name would be: enemy Info[0].name
var enemyInfo = [
    {
    name: "Roborto",
    attack: randomNumber(10,14)
    },
    {
    name: "Amy Android",
    attack: randomNumber(10,14)
    },
    {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
    },
];

var fightOrSkip = function() {
    var promptFight = window.prompt ("Do you want to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //enter conditional recursive here
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    //if player picks "skip" confirm and stop loop
    if (promptFight === "skip") {
        var confirmSkip =  window.confirm("Are you sure you'd like to quit?");
        //if true, (yes), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            //return true if player wants to leave
            return true;
        }
    }
    return false;
};

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
    isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
          // if true, leave fight by breaking loop
        break;
        }

        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        // remove enemy's health by subtracting the amount we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
        playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

          // award player money for winning
        playerInfo.money = playerInfo.money + 20;

          // leave while() loop since enemy is dead
        break;
        } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // player gets attacked first
    } else {
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        // remove player's health by subtracting the amount we set in the damage variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
        enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
          // leave while() loop if player is dead
        break;
        } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
      // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
    }
};

//function to start a new game

var startGame = function() {
    //reset player stats
    playerInfo.reset ();
// startGame = function() {
for (var i=0; i<enemyInfo.length;i++){
    if (playerInfo.health > 0) {
        //let player know what round they are in,arrays start at 0,so it needs 1 added to it
        window.alert ("Welcome to the Robot Gladiators! Round " + (i + 1));
        //pick new emeny to fight based on the index of the enemyNames array
        var pickedEnemyObj = enemyInfo[i];
        //reset enemyHealth before starting new fight
        pickedEnemyObj.health = randomNumber(40,60);
        //use debugger to pause script from running and check what's going on with the code at this moment
        //debugger;
        //pass the pickedEnemyName variable's value into the fight function where it will assume the value of the enemyName parameter
        fight(pickedEnemyObj); 
        if (playerInfo.health > 0 && i < enemyInfo.length - 1){
            var storeConfirm = window.confirm("This fight is over, visit the store before the next round?");
            //if yes go to store
            if (storeConfirm){
                shop();
            }
        }      
    } else {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
        }
    }
    endGame();
};

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
      highScore = 0;
    }
    // if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
  
      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } 
    else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }
  
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
  
    if (playAgainConfirm) {
      startGame();
    } 
    else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
  };

var shop = function(){
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE'."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);
    //use switch for options
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            //dont do anything here so function will end
            break;
            default:
                window.alert("You did not pick a valid option.Try again.");
            //call our shop() to force player to pick a valid option
            shop();
            break;
    } 
};


startGame();


//fight();
