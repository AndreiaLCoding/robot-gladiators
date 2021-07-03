var playerName = window.prompt("What is our robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto"
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    //alert players that they are starting the round    
    window.alert ("Welcome to Robot Gladiators!");

    //subtract the value of 'playerAttack'from the value of enemyHealth'.

    enemyHealth = enemyHealth - playerAttack;

    //log a resulting message to the console so we know that it worked.
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " +  enemyHealth + " health remaining."   )

    //substract the value of 'enemyAttack' from the value of 'playerHealth'

    playerHealth = playerHealth - enemyAttack;

    //Log a resulting message to the console so we know that it worked
    console.log(
        enemyName + " attacked " + playerName + ". " + playerHealth + " now has " + playerHealth + "health remaining."
    )

    if (playerHealth <=0) {
        window.alert(playerName + " has died!");
    }
    else {
        window.alert(playerName + " still has " + playerHealth + " health left. ")
    }

    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    )

    //check enemy's health
    if (enemyHealth <=0){
        window.alert (enemyName + " has died!");
    }
    else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

};

fight();