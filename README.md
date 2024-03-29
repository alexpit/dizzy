**Dizzy: A Deezer client sandbox**

Deezer streaming service has a collection of web/native clients, which are making use of the public [API](https://developers.deezer.com/api) & [SDK](https://developers.deezer.com/sdk/javascript) published. At times, the subscribers of the streaming service are in the most uncomfortable position experiencing features that are explicitly disabled or no longer performing as expected.

A typical example: there's a long [forum thread](https://en.deezercommunity.com/features-44/where-is-hear-this-39816) where subscribers complain without much hope about the "Hear this" feature being removed. It's hard to conceive how can subscribers be alienated is such manner by some decent service providers, but it's the reason this project came about :-)

Not all Deezer APIs are probably published, but the ones available are pretty good and could help access/build the features that have been denied or never been available in the official web/native clients of the streaming service.

This sandbox project is attempting to experiment and resurface some of those useful, sought after features.


**Development environment**

As a result of Deezer [implementation of the OAuth](https://developers.deezer.com/api/oauth) authorization, in this initial stage, the project development environment setup is quite awkward, trying to enable authorization based on 4 subscriber specific and confidential fields (listed below), in order to obtain the `access_token` manually, before the application is deployed at the expected `<your-app-URL>`:
 1. `<your-app-id>`
 2. `<your-app-URL>`
 3. `<your-APP-secret>`
 4. `<Deezer-user-ID>`

```
>> npm install
>> open in browser: https://connect.deezer.com/oauth/auth.php?app_id=<your-app-id>&redirect_uri=<your-app-URL>&perms=basic_access,email

... use above retrieved <code> as a GET param below, replacing <CODE>:
>> curl/[wget]  'https://connect.deezer.com/oauth/access_token.php?output=json&app_id=<your-app-ID>&secret=<your-APP-secret>&code=<CODE>

... use above retrieved <access_token> as a GET param below, replacing <ACCESS-TOKEN>, besides the other user specific settings:
>> DUID=<Deezer-user-ID> TOK=<ACCESS-TOKEN> SMTPID=<user-id> SMTPSWD=<secret> SMTPURL=<smtp.domain.com> node index.js

... open another terminal and call:
>> curl/[wget]  'http://localhost:99/wasup'
```
