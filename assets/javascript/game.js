$(document).ready(function() {
	//// var declaration ////
  var imagesArr;
  var charNames;
  var yourCharArr;
  var yourEnemyArr;
  var counter;
  var wCounter;
  var health;
  var hitPower;
  var revisedHitPower
  var starterList;
  var startEl;
  var enemiesList;
  var enemiesyEl;
  var liImg;
  var imgImg;
  var prntInfo;
  var gameOver;

  //// initialize game ////
  var initializeGame = function() {
    imagesArr = [
      "./assets/images/frieza.jpg",
      "./assets/images/goku.jpg",
      "./assets/images/majin-buu.jpg", 
      "./assets/images/piccolo.jpg"
    ];
    charNames = ["Frieza", "Goku", "Majin-buu", "Piccolo"];
    yourCharArr = false; //first selection
    yourEnemyArr = false; //second selection
    gameOver = false; //game status
    counter = 1; //used for first selected players power increase
    wCounter = 0; //win conditin counter
    health = [260, 120, 280, 100];
    hitPower = [25, 8, 30, 5];
    // DOM minipulation vars //
    starterList = "starterList";
    startEl = "#starterEl";
    enemiesList = "enemiesList";
    enemiesyEl = "#enemiesEl";
    liImg = $("<li>");
    imgImg = $("<img>");
    prntInfo = $("<p>");
    // clear DOM //
    $("#starterEl").empty(); //clear initial list
    $('#yourCharEl, #enemiesEl, #defenderEl').find('*').not('h2').remove(); //clearing DOM except h2 headers
  }

  //// create initial list on DOM ////
  var listCreator = function (listy, elementy) {
    for (var i = 0; i < imagesArr.length; i++) { //creating li with <p>, <img> for each fighter

      // li created and added to give ul //
      liImg = $("<li>");
      liImg.addClass(listy);
      liImg.addClass(listy + i);
      liImg.attr("value", i); //giving li a valaue equal to i
      $(elementy).append(liImg);
      // p created and added to li - character name //
      prntInfo = $("<p>");
      prntInfo.addClass("prntNames");
      prntInfo.text(charNames[i]); //charactor name
      $("."+listy + i).append(prntInfo); //append to unique class
      // img created and added to li //
      imgImg = $("<img>");
      imgImg.addClass("letter letter-button-color");
      imgImg.attr("src", imagesArr[i]);
      imgImg.attr("value", i); //giving img a value equal to i
      //note to self//imgImg.text(imagesArr[i]); //adds text between img tags
      $("."+listy + i).append(imgImg); //append to unique class
      // p created and added to li - character health //
      prntInfo = $("<p>");
      prntInfo.addClass("prntHealth");
      prntInfo.text(health[i]); //charactor health
      $("."+listy + i).append(prntInfo);
      //////////////////////
    }
  }

  //// button needed when game ends ////
  var gameOverBtnCreate = function () {
    gameOverBtn = $("<button>");
    gameOverBtn.attr("id", "gameOverEl"); //id given to btn
    $("#restartEl").append(gameOverBtn);
    $("#gameOverEl").text("Restart");
  }

  initializeGame(); //game initialized
  listCreator(starterList, startEl); //creating a starting list

  //// action to be taken when click inital list ////
  $("ul").on("click", ".starterList", function() { //referencing an existing element, because class created dynamically
    if (yourCharArr === false) {
      clickedValue = this.value; //getting the value of the item clicked
      
      // li created and added to given ul //
      liImg = $("<li>"); //creating a li in our new list
      liImg.addClass("yourCharList");
      liImg.attr("id", "yourCharList" + clickedValue); //creating a unique class based on clicked img
      liImg.attr("value", clickedValue); //giving li value equal to clickValue
      $("#yourCharEl").append(liImg);
      // p created and added to li - character name //
      prntInfo = $("<p>");
      prntInfo.addClass("prntNames" + clickedValue);
      prntInfo.text(charNames[clickedValue]); //character name
      prntInfo.attr("value", clickedValue); //value given
      $("#"+"yourCharList" + clickedValue).append(prntInfo);   
      // img created and added to li //
      imgImg = $("<img>");
      imgImg.addClass("letter letter-button-color");
      imgImg.attr("src", imagesArr[clickedValue]); //img clicked
      imgImg.attr("value", clickedValue);
      $("#"+"yourCharList" + clickedValue).append(imgImg);
      // p created and added to li - character health //
      prntInfo = $("<p>");
      prntInfo.addClass("prntHealth" + clickedValue);
      prntInfo.text(health[clickedValue]); //health
      prntInfo.attr("value", clickedValue);
      $("#"+"yourCharList" + clickedValue).append(prntInfo);

      // claring starterList //
      $("#starterEl").empty(); //want list cleared when item clicked
      // enemies list created //
      listCreator(enemiesList, enemiesyEl);
      $(".enemiesList" + clickedValue).remove(); //removes from the enemiesList the item already clicked in starter
      
      yourCharArr = true; //user character is now selected
    }
  });

  //// action to be taken when click an enemy image ////
  $("ul").on("click", ".enemiesList", function() {
    if ( (yourCharArr === true) && (yourEnemyArr === false) ) {
      clickedValue = this.value; //getting the value of the item clicked
      
      // li created and added to given ul //
      liImg = $("<li>"); //creating a li in our new list
      liImg.addClass("defenderList");
      liImg.attr("id", "defenderList" + clickedValue); //creating a unique class based on clicked img
      liImg.attr("value", clickedValue); //giving li value equal to clickValue
      $("#defenderEl").append(liImg);
      // p created and added to li - character name //
      prntInfo = $("<p>");
      prntInfo.addClass("prntNames" + clickedValue);
      prntInfo.text(charNames[clickedValue]);
      prntInfo.attr("value", clickedValue);
      $("#"+"defenderList" + clickedValue).append(prntInfo);
      // img created and added to li //
      imgImg = $("<img>");
      imgImg.addClass("letter letter-button-color");
      imgImg.attr("src", imagesArr[clickedValue]); //img clicked
      imgImg.attr("value", clickedValue);
      $("#"+"defenderList" + clickedValue).append(imgImg);
      // p created and added to li - character health //
      prntInfo = $("<p>");
      prntInfo.addClass("prntHealth" + clickedValue);
      prntInfo.text(health[clickedValue]); //health
      prntInfo.attr("value", clickedValue);
      $("#"+"defenderList" + clickedValue).append(prntInfo);

      // clear //
      $(".enemiesList" + clickedValue).remove(); //removes from the enemiesList itme just clicked

      // related to fight button - reseting communication output //
      $("#comCharEl").text("");
      $("#comDefEl").text("");

      yourEnemyArr = true;
    }
  });

  //// action to be taken when click fight button ////
  $("#fightBtn").on("click", function() {
    if ( (yourCharArr === true) && (yourEnemyArr === false) && (gameOver === false) ) {
      $("#comCharEl").text("No enemy selected");
      $("#comDefEl").text("");
    } else if ( (yourCharArr === true) && (yourEnemyArr === true) && (gameOver === false) ) {
      // which characters are currently in the your chara and defender sections // 
      var yourCharVal = $(".yourCharList").children(".letter").attr("value");
      var defenderVal = $(".defenderList").children(".letter").attr("value");
      // defender //
      revisedHitPower = hitPower[yourCharVal] * counter; //your character increase each time fight clicked
      health[defenderVal] -= revisedHitPower; //update defender health
      $(".prntHealth" + defenderVal).text(health[defenderVal]); //accessing unique definders html id and updating shown health
      $("#comDefEl").text(charNames[defenderVal] + " attacked " +  charNames[yourCharVal] + " back for " + hitPower[defenderVal] + " damage."); //communicated result of fight
      // update counter used to update yourChar hitpower //
      counter *=2;

      // condition check defender defeated //
      if (health[defenderVal] <= 0) {
        $("#defenderList" + defenderVal).empty(); //removed from defender section
        $("#comCharEl").text(charNames[yourCharVal] + " defeated " + charNames[defenderVal] + ".");
        $("#comDefEl").text("FIGHT ANOTHER ENEMY!");
        // can now chose new defender //
        yourEnemyArr = false;
        // checking number of wins //
        wCounter++;

        // condition check all defenders defeated //
        if (wCounter > (imagesArr.length - 2) ) {
          gameOverBtnCreate();
          $("#comCharEl").text(charNames[yourCharVal] + " defeated EVERYONE!");
          $("#comDefEl").text("YOU WIN!");
          gameOver = true;
          return;
        }
        // after performing actions/checks on defender, your character will be attacked //
      } else if (health[yourCharVal] >= 0) {
        // yourChar //    
        health[yourCharVal] -= hitPower[defenderVal]; //current selected charaters health will decrease by constant amt
        $(".prntHealth" + yourCharVal).text(health[yourCharVal]); //accessing unique yourChar html id and updating shown health
        $("#comCharEl").text(charNames[yourCharVal] + " attacked " + charNames[defenderVal]+ " for " + revisedHitPower + " damage.");
      }
      // condition check if yourChar defeated //
      if (health[yourCharVal] <= 0) {
        $("#comCharEl").text(charNames[yourCharVal] + " was defeated by " + charNames[defenderVal] + ".");
        $("#comDefEl").text("GAME OVER!");
        gameOverBtnCreate(); //creates button with id gameOverEl
        gameOver = true;
      }
    }
  });

  //// Option to restart game ////
  $("#restartEl").on("click", "#gameOverEl", function() {
    initializeGame();
    listCreator(starterList, startEl);
    // clear out html in the follow ids //
    $("#restartEl").empty();
    $("#comCharEl").text("");
    $("#comDefEl").text("");
    // can no start new game //
    gameOver = false;
  });


});