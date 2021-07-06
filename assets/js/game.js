//Generate random numbers (function will call for randomization throughout the game)
var randomNumber = function(min,max){
    var value = Math.floor(Math.random() * (max-min + 1) + min);
    return value;
};

var getPlayerName = function(){
    var name = "";
    //add loop here with prompt and condition
    while (name === "" || name === null){
        name = prompt ("What is your robot's name?");
    }
    console.log("You're robot's name is " + name);
    return name;
    
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money:10,
    reset: function(){
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

//log multiple values at once:
console.log(playerInfo.name, playerInfo.attack, playerInfo.money);

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

var fightOrSkip = function(){
    var promptFight = window.prompt ("Do you want to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //enter conditional recursive here
    if (promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    //if player picks "skip" confirm and stop loop
    if (promptFight === "skip") {
        var confirmSkip =  window.confirm("Are you sure you'd like to quit?");
        //if true, (yes), leave fight
        if (confirmSkip){
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            //return true if player wants to leave
            return true;
        }
    }
    return false;
};

        var fight = function(enemy){
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            while(playerInfo.health > 0 && enemy.health > 0){
                fightOrSkip();
                if (fightOrSkip()){
                
                break;
                }
            

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemy.health = Math.max(0, enemy.health-damage);

        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
        //award player for winning
        playerInfo.money = playerInfo.money + 20;
        //leave while() loop since enemy is dead
        break;
        }
        else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
    
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        //leave while() if player is dead
        break;
        } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
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
    if (playerInfo.health > 0) {
        window.alert ("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else{
        window.alert("You've lost your robot in battle.");
    }
}

var playAgainConfirm = window.confirm("Would you like to play again?");
if (playAgainConfirm) {
    //restart game
    startGame();
}
else{
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}

var shop = function(){
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    //use switch for options
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            //dont do anything here so function will end
            break;
            default:
                window.alert("You did not pick a valid option.Try again.");
            //call our shop() to force player to pick a valid option
            shop();
            break;
    }
}


startGame();





//fight();
