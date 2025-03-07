function fightMonster(attackPower, weaponType) {
    // Check if the weaponType is "magic sword" and apply the bonus
    if (weaponType === "magic sword") {
      attackPower += 5;  // Increase attackPower by 5 if using a magic sword
    }
 
    // Now check if the player's attackPower is strong enough to defeat the monster
    if (attackPower > 10) {
      console.log("You defeated the monster!");
    } else {
      console.log("The monster is too strong!");
    }
 }
 
 // Call the function with different values to test the changes
 fightMonster(8, "magic sword");  // Should defeat the monster due to the magic sword bonus
 fightMonster(8, "regular sword");  // Should be too weak to defeat the monster
 fightMonster(12, "magic sword");  // Should defeat the monster even without magic sword