#!/bin/bash

cd ../jars-report
cp -r org/*.* ~/.m2/repository/

mkdir /home/npds/sgb/report
cd ../report

cp inscricao /home/npds/sgb/report -r