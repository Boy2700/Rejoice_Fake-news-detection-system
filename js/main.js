(function($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function() {
        $(this).on('blur', function() {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function() {
        if (showPass == 0) {
            $(this).next('input').attr('type', 'text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        } else {
            $(this).next('input').attr('type', 'password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);











function analyzeSentiment(event) {
    event.preventDefault();
    const apiKey = "5ee387c588b59c2cf2a1ee9448d54628";
    const text = document.getElementById("content").value;

    if (text.trim() === '') {
        alert("Please enter some text in the box to detect.");
        return; // Stop further execution
    }




    const url =
        `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent( 
        text 
    )}&lang=en`;

    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Request failed");
            }
        })
        .then((data) => {
            const sentiment = data.score_tag;
            // console.log(`Text: ${text}`); 
            // console.log(`Sentiment: ${sentiment}`); 
            if (sentiment == "P+") {
                document.getElementById("result").innerHTML = "The News is Authentic and Comfirm!" + "<br><br>" + "This is absolutely wonderful news! It's so uplifting to see such positive developments in our community." +
                    "This achievement is a testament to hard work, dedication, and the power of unity.It's a moments like these that remind us of the incredible potential we have to make a difference and create a brighter future for all." +
                    "Congratulations to everyone involved in this remarkable success!";
            }
            if (sentiment == "P") {
                document.getElementById("result").innerHTML = "Real and Genuine News without a doubt!" + "<br><br>" +
                    "The detection result analysis reveals a positive news sentiment classification, categorizing the content as real and genuine. " +
                    "This outcome indicates that the information or content in question has been assessed as accurate, trustworthy, and reliable. " +
                    "The positive sentiment news suggests that the content is not only factually correct but also presented in a neutral or constructive manner, without any intention to mislead or deceive. " +
                    "This classification provides assurance that the information can be trusted and relied upon, facilitating informed decision-making and effective communication.";
            }
            if (sentiment == "NEU") {
                document.getElementById("result").innerHTML = "Moderate and Doubtful News!" + "<br><br>" +
                    "Upon analysis, the detection news result indicates a neutral sentiment news classification with a moderate level of certainty. " +
                    "This classification suggests that the content or information falls within a middle ground, neither strongly positive nor negative in news sentiment. " +
                    "The moderate classification implies a level of ambiguity or complexity in the assessment, where the content may not clearly lean towards being definitively positive or negative. " +
                    "In such cases, further investigation or contextual understanding may be necessary to determine the true nature and implications of the information. " +
                    "This nuanced classification underscores the importance of thorough analysis and critical evaluation when encountering content with neutral sentiment and moderate classification levels.";




            }
            if (sentiment == "N") {
                document.getElementById("result").innerHTML = "Fake and Misleading News!" + "<br><br>" +
                    "The detection result analysis indicates a negative sentiment classification, categorizing the content as fake. " +
                    "This outcome suggests that the information or content in question has been assessed as misleading, inaccurate, or intentionally deceptive. " +
                    "Understanding and recognizing such negative sentiment and fake classifications are crucial in navigating the digital landscape, where misinformation and fake news can spread rapidly. " +
                    "It underscores the importance of critical thinking, fact-checking, and verifying sources to combat the dissemination of false information and maintain a more informed and discerning approach to consuming content online.";

            }
            if (sentiment == "N+") {
                document.getElementById("result").innerHTML = "Completely Fake and False News!" + "<br><br>" + "Such devastating news. it goes out to all those affected by this tragedy." +
                    "It's truly heartbreaking to see the impact of such senseless violence. We must come together as a community to support those in need and work towards preventing such tragedies in the future." +
                    "My thoughts and prayers are with all those affected during this difficult time.";

            }
            if (sentiment == "NONE") {
                document.getElementById("result").innerHTML =
                    "Fake News beware!" + "<br><br>" + "In such cases, further investigation or contextual understanding may be necessary to determine the true nature and implications of the information. " +
                    "This nuanced classification underscores the importance of thorough analysis and critical evaluation when encountering content with neutral sentiment and moderate classification levels.";

            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}


function clearScreen() {
    document.getElementById('content').value = ''; // Clear the textarea
    document.getElementById('resultStyle').innerHTML = ''; // Clear the result
    alert("You have cleared the screen");
}

function logOut() {
    // Redirect to the login page or do any other logout actions
    alert("You have succesfully log out!")
    window.location.href = "index.html"; // Change the URL as needed
}

// Add event listener to the logout button
document.getElementById("logoutBtn").addEventListener("click", logout);