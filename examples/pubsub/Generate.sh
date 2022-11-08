#!/bin/sh

rm -rf ./streetlight
../../node_modules/@asyncapi/generator/cli.js --output "./streetlight" "../streetlight.json" "../../" --force-write
