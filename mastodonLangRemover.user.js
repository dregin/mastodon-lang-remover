// ==UserScript==
// @name         mastodonLangRemover
// @namespace    https://arthurlacoste.com
// @version      0.0.1
// @description  Remove a lang from web interface
// @author       Arthur Lacoste <arthak@gmail.com>
// @match        *://*/web/*
// @match        *://*/settings/preferences
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      https://raw.githubusercontent.com/pietrasiak/jquery.initialize/master/jquery.initialize.min.js
// @connect      obscure-fjord-89228.herokuapp.com
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    $(".status").initialize(function () {
         getTranslation($(this));
    });


    function getTranslation(toot) {
        var langText = {};
        var text = toot.children('.status__content').text().replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
				var regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g; 
				if(regex.test(text)) {
					toot.remove();
				}
    }

    function saveSettings(event) {
        if (event.target.tagName.toLowerCase() === 'button' && event.target.textContent === 'Save changes') {
            event.preventDefault();
            var input = document.getElementById('translation_locale');
            var selectedLanguage = input.options[input.selectedIndex].value;
            GM_setValue('lang', selectedLanguage);

            setTimeout(function() {
                document.querySelector('body').removeEventListener('click', saveSettings, false);
                actions.children[0].click();
            }, 500);
        }
    }

    if (window.location.pathname === '/settings/preferences') {
        // We're on the settings page
        var form = document.querySelector('form.simple_form');
        var actions = document.querySelector('div.actions');

        var settingsGroup = form.querySelector('div.fields-group').cloneNode(true);
        settingsGroup.children[1].remove(); // Remove the privacy element from the clone

        var notice = document.createElement('div');
        var noticeMsg = 'Select here the langage you want to remove.';
        notice.setAttribute('id', 'translation_notice');
        notice.innerHTML = '<h3 style="color: #d9e1e8; font-size: 20px; line-height: 24px; font-weight: 400; margin-bottom: 20px;">Lang Remover</h3><p style="margin-bottom: 20px;">'+noticeMsg+'</p>';

        var languageDiv = settingsGroup.children[0];
        languageDiv.classList.remove('user_locale');
        languageDiv.classList.add('translation_locale');
        var label = languageDiv.children[0].children[0];
        label.setAttribute('for', 'translation_locale');
        label.textContent = 'Language to remove';
        var input = languageDiv.children[0].children[1];
        input.setAttribute('name', 'user[translation]');
        input.setAttribute('id', 'translation_locale');
        input.value = GM_getValue('lang', 'ja');

        settingsGroup.insertBefore(notice, languageDiv);

        form.insertBefore(settingsGroup, actions);

        document.querySelector('body').addEventListener('click', saveSettings, false);
    }

})();
