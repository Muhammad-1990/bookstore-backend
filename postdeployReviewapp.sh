#!/bin/bash
$ chmod +x postdeployReviewapp.sh

heroku config:set GITHUB_USERNAME=muhammad-1990

echo $HEROKU_APP_NAME
export SERVER_URL=https://$HEROKU_APP_NAME.herokuapp.com/parse