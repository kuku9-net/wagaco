#! /bin/sh

js_version=v1
css_version=v1

export RELEASE=_release

(
    cd `dirname $0`;
    rm -rf buid${RELEASE};
    npm run css -- --style=compressed --no-source-map;
    npm run js -- --minify;
    pandoc/build_thumbnail;
    pandoc/build_pandoc $js_version $css_version;
)
