#!/bin/sh

rm -rf ./streetlight
../../node_modules/@asyncapi/generator/cli.js --param "serializationLibrary=newtonsoft" --force-write --output "./streetlight" "../streetlight.json" "../../"
