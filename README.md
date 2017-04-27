# Mastodon Lang Remover

Remove a lang from the mastodon web interface.

## Install

### 1. Install Tampermonkey

On chrome, install the Tampermonkey extension here :
https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr

On firefox, is should be here :
https://addons.mozilla.org/fr/firefox/addon/tampermonkey/

### 2. Go to this page and click on "install" button : 	

https://github.com/arthurlacoste/mastodon-lang-remover/raw/master/mastodonLangRemover.user.js

### 3. You need to start on a your.instance/web/* page, like :
https://mastodon.social/web/

## Can I edit the langage to remove ?

By default, the script remove Japanese, Chinese, French, German, Spanish... basically any toots that have include characters outside of a-z, A-Z and special characters such as !@#$%^&*():?]/


## How it's work ?

The script uses regex to look for specific character ranges and hides toots that match.
