#!/bin/bash
$ chmod +x postdeployReviewapp.sh
echo "$DATABASE_URL"

heroku config:set MYTEST="works"
export ANOTHER_TESTVAR=xxx