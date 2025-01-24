#!/bin/bash

set -ex
#DRY_RUN="--dryrun"

if [ "$CODEBUILD_WEBHOOK_TRIGGER" != "branch/master" ]; then
  TARGET="s3://fo-stitchfix-algorithms-tour-production/__$CODEBUILD_WEBHOOK_TRIGGER"
else
  TARGET="s3://fo-stitchfix-algorithms-tour-production"
fi

cd public

for DIR in css img js; do
  aws s3 cp --recursive \
    $DRY_RUN \
    --cache-control max-age=31104000 \
    $DIR \
    $TARGET/$DIR
done

# lower cache time for index.html
aws s3 cp \
  $DRY_RUN \
  --cache-control max-age=300 \
  index.html \
  $TARGET/index.html