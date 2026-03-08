#!/bin/bash

# =========================================================
# resume_build.sh
# Build and watch a Latex resume using latexmk
#
# Usage:
# ./resume_build.sh         -> Build resume once and clean aux files
# ./resume_build.sh watch   -> Watch files and auto-rebuild
# ./resume_build.sh --help  -> Show help message
# =========================================================



TEX_FILE="Richard_Lin_Resume.tex"

show_help() {
    echo "Usage: ./resume_build.sh [option]"
    echo ""
    echo "Options:"
    echo "  watch      Watch file and auto-rebuild on save"
    echo "  --help     Show this help message"
    echo ""
}

if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    show_help
    exit 0
# Watch mode
# If argument is "watch"
elif [ "$1" = "watch" ]; then
    echo "Watching $TEX_FILE for changes..."
    # -pdf -> generate pdf
    # -interaction=nonstopmode -> Do not stop on errors
    # -pvc -> Preview continuously (watch mode)
    latexmk -pdf -interaction=nonstopmode -pvc "$TEX_FILE"
    echo "Stopping watch. Cleaning..."
    # -c -> Clean auxiliary files but keep the pdf
    latexmk -c "$TEX_FILE"
else
    echo "Building $TEX_FILE..."
    # Build the pdf once
    latexmk -pdf -interaction=nonstopmode "$TEX_FILE"
    echo "Cleaning auxiliary files..."
    # -c -> Clean auxiliary files but keep the pdf
    latexmk -c "$TEX_FILE"
    echo "Build Complete."
fi