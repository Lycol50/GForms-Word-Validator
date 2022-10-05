var POST_URL = ""; // insert Discord Webhook link inside the "".

function onSubmit(e) {
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
    var items = [];

    // Get all Response on a form
    for (var i = 0; i < response.length; i++) {
        var question = response[i].getItem().getTitle();
        var answer = response[i].getResponse();
        try {
            var parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            var parts = answer;
        }

        if (answer == "") {
            continue;
        }
        for (var j = 0; j < parts.length; j++) {
            if (j == 0) {
                items.push({
                    "name": question,
                    "value": parts[j],
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": parts[j],
                    "inline": false
                });
            }
        }
    }

    // Get Response
    var formResponses = form.getResponses();
    var lastResponse = formResponses[formResponses.length - 1];
    var itemResponses = lastResponse.getItemResponses();
    var itemResponse = itemResponses[1]; // Change the array identifier on the location of response form (please use array counting)
    var input = itemResponse.getResponse();

    /* SAMPLE
    const array = new Array("US","Great Britain","Marshall Plan","Smithsonian Agreement","Democratic Governance","Human rights","Environment","Critics","Dollar","Gold","gentlemans agreement","John F. Kennedy","New Hampshire","JOHN MAYNARD KEYNES","HARRY DEXTER WHITE","fundamental disequilibrium","liquidity","bank and fund","letter of intent","Independent Evaluation Office","Independent Evaluation Group","parody","lack traction","mega projects","forests"); // Change Array contents to list of words
       SAMPLE */
    cont array = new Array(); // Change Array contents to list of words. See example above
    // find match in array from text - used with Github Codespaces
    const x = input.match(new RegExp(array.join("|"), "gi"));

    function removeDups(names) {
        var unique = {};
        names.forEach(function (i) {
            if (!unique[i]) {
                unique[i] = true;
            }
        });
        return Object.keys(unique);
    }

     function getUniqueValuesWithCase(arr, caseSensitive){
            let temp = [];
            return [...new Set(caseSensitive ? arr : arr.filter(x => {
                let _x = typeof x === 'string' ? x.toLowerCase() : x;
                if(temp.indexOf(_x) === -1){
                    temp.push(_x)
                    return x;
                }
            }))];
        }

    var data = removeDups(x);
    const final = getUniqueValuesWithCase(data, false)
    // Discord Webhook JSON Data
    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "",
            "embeds": [{
                "title": final.toString(),
                "color": 65515,
                "fields": items,
                "description": final.length + "correct answers in this form.",
                "footer": {
                    "text": "GForms Word Validator"
                }
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
