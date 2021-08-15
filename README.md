# sussy-devs-project

## this is out submission for TCOC.

<br>

***introducing*** **sus bot!!**
<br>

# features
- automod
- - anti links
- - anti raid
- - anti caps
- - auto quarantine
- moderation
- - kick
- - ban
- - quarantine
- image gen
- utils

# automod

## auto quarantine

- adds a "quarantine" role to all the sus users, for example new accounts on join
- can be enabled with `-autoquarantine enable` command

## anti links

- will detect any links posted in the server
- can be enabled via `-antilinks enable`
- you can set the action using `-antilinks action`

## anti caps

- will detect excessive caps in a message
- threshold can be set via `-anticaps threshold <num>`
- can be enabled via `-anticaps enable`
- can add whitelisted via `-anticaps whitelist <role/channel> <id>`

## anti raid

- locks down the server and does \<action\> whenever someone joins
- can be enabled via `antiraid enable`
- action can be set using `-antiraid action`

# how it works

I know that lots of you are thinking that we make a request to the database every time when someone sends a message if antilinks is enabled, but we dont. We use `goosecache` so the data is saved locally, it only makes requests on cache misses or data changes.


handler is from my other bot [deF](https://top.gg/bot/783306479721512960) so go check it out

## credits

@Assassin-1234

@tovade

@RaZegame

@YTmxtz

@Sujal Goel