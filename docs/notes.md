### cognitive-services-tool - notes

#### New React lifecycle methods
- https://hackernoon.com/replacing-componentwillreceiveprops-with-getderivedstatefromprops-c3956f7ce607

#### Misc React
- https://www.javascriptstuff.com/component-communication/#4-event-bubbling
- https://medium.com/@justintulk/react-anti-patterns-props-in-initial-state-28687846cc2e
- https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

#### Workers
- https://www.npmjs.com/package/typed-web-workers
- https://blog.sessionstack.com/how-javascript-works-the-building-blocks-of-web-workers-5-cases-when-you-should-use-them-a547c0757f6a
- https://github.com/Microsoft/TypeScript/blob/master/lib/lib.webworker.d.ts

#### dialogflow
- https://stackoverflow.com/questions/49758008/nodejs-error-failed-to-load-grpc-binary-module-because-it-was-not-installed-fo
- https://stackoverflow.com/questions/50476054/nw-js-failed-to-load-grpc-binary-module
- https://github.com/pubref/rules_node/issues/55
- https://stackoverflow.com/questions/44998401/cant-make-grpc-work-with-electron-js
  - ./node_modules/.bin/electron-rebuild
- https://github.com/grpc/grpc-node/issues/230
  - npm rebuild --runtime=electron --target=1.8.4 --disturl=https://atom.io/download/electron
  - npm rebuild --runtime=electron --target=2.0.5 --disturl=https://atom.io/download/electron

#### google speech api
- https://cloud.google.com/speech-to-text/docs/quickstart-client-libraries#client-libraries-install-nodejs
- https://github.com/googleapis/nodejs-speech/tree/master/samples
- https://github.com/googleapis/nodejs-speech/blob/master/src/v1/speech_client.js#L34
- https://github.com/googleapis/nodejs-vision/issues/120
- https://github.com/ropensci/googleLanguageR/issues/34
- https://codelabs.developers.google.com/codelabs/speaking-with-a-webpage/index.html?index=..%2F..%2Findex#6

#### Audio
- sox -t raw -r 16000 -b 16 -c 1 -L -e signed-integer audio.raw audio.wav

#### Misc
- https://www.npmjs.com/package/concurrently
- https://www.npmjs.com/package/pngjs
