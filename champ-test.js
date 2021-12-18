var answerbox = document.getElementById('AnswerBox');
var abilities = document.getElementsByClassName('ability');
var totalAbilitiesText = document.getElementById('denominator');
var answersCorrect = document.getElementById('numerator');

var toggleButton = document.getElementById('toggleButton');
var hide_rows_bool = true;


//Count the total abilities
totalAbilitiesText.innerHTML = abilities.length;
//Count initial amount correct (Should be 0)
updateCount();

//Check if answer is correct

// THEN we need to check each value of it. Also do tolower
//Then if x == y update the .text of it with it's value

function checkAnswer()
{
    var guess = answerbox.value.toLowerCase(); 

    //Check if the entered value is one of the abilities
    $('.ability').each(function()
    {
        //Break data attribute "abilityname" into an array in lowercase ['A1', 'A2']
        const abilities = $(this).data('abilityname').toLowerCase().split(",");
        const abilities_capped = $(this).data('abilityname').split(","); //Can we break this into just the firsta bilitiy
        
        //Answer is correct
        if(abilities.includes(guess))
        {
            $(this).find('a').text(abilities_capped[0]).attr('style', 'color:white');//Display The Most Correct Answer
            
            //if answer is correct then update the count
            updateCount(); 
        }
    });
    //Reset Answer 
    answerbox.value= "";
}


$("form").on("submit", function(e){
    e.preventDefault();
    checkAnswer();
});


//Count how many elements with ability are being shown.
function updateCount(){
    let counter = 0;
    $('.ability').each(function()
    {
        if($(this).text().trim() !== "")
            counter++;
    });
    answersCorrect.innerHTML = counter;

    if(hide_rows_bool)
    {
        hideRows();
    }
}


function showAnswers()
{
    //Iterate through each one and display the answers.
    $('.ability').each(function()
    {
        const abilities = $(this).data('abilityname').split(",");
        if($(this).text().trim() == "")
            $(this).find('a').text(abilities[0]).attr('style', 'color:red');
     });

    //Disable the input box so people don't do stupid stuff
    answerbox.disabled = true;

     //Show answers 
     showRows();
    //Display appropriate message
    const denom = abilities.length;
    const numer = answersCorrect.innerHTML;
    const answer = (numer/denom)*100;
    alert("Your Percentage Correct is: " + parseFloat(answer).toFixed(2) + "%");
}

function clearAnswers()
{
    //Iterate through each one and hide the answers.
    $('.ability').each(function(){
            $(this).find('a').text('\xa0'); // Reset answer to a space
     });

     answerbox.disabled = false;

     showRows();
     updateCount();
}

function hideRows()
{
    $('tr').each(function()
    {
        var trLength = $(this).children('td.ability').length;
        var answercounter = 0;
        //This being TR and we are now looking at each td
        $(this).find('td.ability').each (function() 
        {
            //If ability is filled in, increment counter
            if($(this).text().trim() !== "")
                answercounter++;

            if(answercounter == trLength)
            {
                $(this).parent().hide();
            }
        });  
        answercounter = 0;                      
    });

}

function showRows()
{
    $('tr').each(function(){
        $(this).show();
     });
}

function showhideRows()
{
    //alternate the text
    //if bool is true
    if(hide_rows_bool)
    {
        showRows();
        //Change text to Hide Completed Rows and updated boolean
        toggleButton.innerHTML = "Hide Completed Rows";
        hide_rows_bool = !hide_rows_bool;
    }
    else //Change it to Show Completed Rows
    {   
        hideRows();
        toggleButton.innerHTML = "Show Completed Rows";
        hide_rows_bool = !hide_rows_bool;
    }
    //Update other functions 
}