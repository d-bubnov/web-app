#!/bin/bash

echo $'\n-----------------------------------------------'
echo $'-------- Build angular application ------------'
echo $'-----------------------------------------------\n'

yarn install
ng build --prod

echo $'\n-----------------------------------------------'
echo $'-------------- Build finished -----------------'
echo $'-----------------------------------------------\n'
