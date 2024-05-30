#!/usr/bin/env bash

cd $WORKSPACE_FOLDER/api
poetry install
pre-commit install

cd $WORKSPACE_FOLDER/app
npm install
