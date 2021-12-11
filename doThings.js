var answerbox = document.getElementById('AnswerBox');
var abilities = document.getElementsByClassName('ability');
var totalAbilitiesText = document.getElementById('denominator');
var answersCorrect = document.getElementById('numerator');


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
        const abilities_capped = $(this).data('abilityname').split(",");
        
        //Answer is correct
        if(abilities.includes(guess))
            $(this).text(abilities_capped[0]);//Display The Most Correct Answer 
    });

    //After all this updateCount
    updateCount();
    //Reset Answer 
    answerbox.value= "";
}


$("form").on("submit", function(e){
    e.preventDefault();
    checkAnswer();
});


//Count how many elements with ability are being shown.
function updateCount(){
    var counter = 0;
    $('.ability').each(function()
    {
        if($(this).text() !== "")
            counter++;
    });
    answersCorrect.innerHTML = counter;

    hideRow();
}


function showAnswers()
{
    //Iterate through each one and display the answers.
    $('.ability').each(function()
    {
        const abilities = $(this).data('abilityname').split(",");
        if($(this).text() == "")
            $(this).text(abilities[0]).attr('style', 'color:red');
     });


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
            $(this).text("");//Display the answer
     });

     $('tr').each(function(){
        $(this).show();
     });

     updateCount();
}

function hideRow()
{
    $('tr').each(function()
    {
        var trLength = $(this).children('td.ability').length;
        var counter = 0;
        //This being TR and we are now looking at each td
        $(this).find('td.ability').each (function() 
        {
            //If ability is filled in, increment counter
            if($(this).text() !== "")
                counter++;

            if(counter == trLength)
            {
                $(this).parent().hide();
            }
        });  
        counter = 0;                      
    });

}