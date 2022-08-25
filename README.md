## README

### Description

### Software versions

- Node >= 14.18.3
- npm >= 6.14.15

### Configure React CLI

Configure [react native cli](https://reactnative.dev/docs/environment-setup)

### Run React Native application

Open two terminals:

1º terminal - run application server

```bash
npx react-native start
```

2º terminal - build the application and open android emulator

```bash
npx react-native run-android
```

### Generating and test APKS

On development is always necessary to generate APKs to test or deploy
in the stores. Follows the steps below to generate APKs for testing.

#### Build .aab
<!-- TODO: Provide a secure way to build and sign the apk. -->
Use the provisory key in the path `android/app/my-upload-key.keystore` to
generate the `.aab` file and skip the first react native tutorial step that
is responsible for generate the key.

- Generating the release AAB

```bash
cd android
./gradlew bundleRelease
```

The command will generate the .aab file that should be inside the following path
`android/app/build/outputs/bundle/release/*.aab`.

You can check and understand the details on [react native docs/signed-apk-android](https://reactnative.dev/docs/signed-apk-android).

#### Generate .apks from .aab for testing

- Download the [bundletool-x.x.jar](https://github.com/google/bundletool/releases)
- Put the `bundletool.jar` inside the same folder of the `.aab`
- Build the apks

```bash
java -jar bundletool.jar build-apks --bundle=my_app.aab --output=my_app.apks --connected-device --local-testing --ks=my-upload-key.keystore --ks-key-alias=my-key-alias --ks-pass=pass:123456 --overwrite
```

- Install the apks into the connected device

```bash
java -jar bundletool.jar install-apks --apks my_app.apks
```

You can check and understand the details on [bundletol](https://developer.android.com/studio/command-line/bundletool),
[bundletool test module](https://developer.android.com/guide/app-bundle/test/testing-fakesplitinstallmanager).
