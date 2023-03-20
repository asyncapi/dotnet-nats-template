#!/bin/sh

rm -rf ./streetlight
../../node_modules/.bin/asyncapi generate fromTemplate "../streetlight.json" "../../" --force-write --output "./streetlight" --param "serializationLibrary=newtonsoft"
