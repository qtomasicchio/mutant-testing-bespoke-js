# Mutation Testing

## Introduction

Presentation about "Mutation Testing" with [Stryker](https://stryker-mutator.io/).


## View slides locally

First, ensure you have the following installed:

* [Node.js](https://nodejs.org/en/) >= 4.2 <sup>[1](#myfootnote1)</sup>
* [Gulp](https://gulpjs.com/) (command line interface only)

```bash
 $ npm install -g gulp-cli
```

Next, install dependencies (if you ran the generator with the `--skip-install` switch):

```bash
 $ npm install
```

Finally, build and serve the presentation!

```bash
 $ gulp serve
```

You can view the presentation in your browser at the URL displayed in the console.

By default, the preview server runs on port 8080.
To change this default, you can assign a different number to the PORT environment variable:

```bash
 $ PORT=8888 gulp serve
```

To build the presentation without starting the preview server, use:

```bash
 $ gulp
```

In both cases, the files are built into the *dist* directory.
You can view the slides outside of the local preview server by navigating to *dist/index.html* in your browser.

<a name="myfootnote1">1</a>: We strongly recommend using [nvm](https://github.com/creationix/nvm) to manage Node.


## Credits

* Bespoke: https://github.com/bespokejs/bespoke
* Bespoke Theme Build Wars: https://github.com/akatopo/bespoke-theme-build-wars
* Stryker: https://stryker-mutator.io/
* Vincent Massol Presentation "https://cfp.devoxx.fr/2018/talk/OCF-8843/Nouvelle_generation_de_tests_pour_projets_Java": https://cfp.devoxx.fr/2018/talk/OCF-8843/Nouvelle_generation_de_tests_pour_projets_Java

## License

[License under MIT](./LICENSE)


