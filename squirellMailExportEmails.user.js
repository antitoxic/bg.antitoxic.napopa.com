// ==UserScript==
// @name        Export emails on demand
// @namespace   antitoxic
// @include     /^https?://.+/squirrelmail/src.*$/
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery-1.10.1.min.js
// ==/UserScript==

$(function(e) {
    var contacts = {}
    var $moveButton = $('[name=moveButton]')
    var $exportButton = $('<input>', {name: "exportEmails", id: "exportEmails", type: "button", "value": "Айдее, да ги сваляме мейлитее!"})
    var $topMenu = $('body > table:first');
    var $cpaste = $('<textarea>', {css: {display:'block', width: '100%', height: '150px'}});
    
    $cpaste.insertAfter($topMenu);
    
    var $msgs = $('td>label[for^="msg"]')
    $exportButton.on('click', function(e) {
        e.preventDefault();
        $msgs.each(function() {
            var $msg = $(this);
            var email = $msg.parent().attr('title');
            var name = $msg.text();
            if (!contacts[email]) {
                contacts[email] = name;
            }
        })
        var str = "";
        $.each(contacts, function(email, name) {
            str = str + email + ',' + name + "\n";
        })
        $cpaste.val(str);
    })
    $exportButton.insertAfter($moveButton);
})
