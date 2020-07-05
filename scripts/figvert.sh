#!/bin/bash

mov_file=$1

ec
base_name=$(echo "${mov_file}" | cut -d "/" -f 999 | sed -E 's#.*/([a-zA-Z_-]+).mov#\1#g')
echo "Base name: ${base_name}"

ffmpeg -i ${mov_file} -vf scale=-1:720 ~/workspace/figgy/figgy.docs/images/videos/${base_name}.mp4 && mv ${mov_file} ~/Desktop/figverted/