#!/usr/bin/env bash

aws s3 sync site/ s3://figgy-website/docs/ --delete
aws s3 sync site/images/ s3://figgy-website/images/ --delete