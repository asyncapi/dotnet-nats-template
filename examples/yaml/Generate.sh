#!/bin/sh

rm -rf ./streetlight
../../node_modules/.bin/asyncapi generate fromTemplate "../streetlight.yaml" "../../" --force-write --output "./streetlight" 