# Read Me

## run project

### Before to start
  - `git clone https://github.com/vietsaclo/React-Native-Packagist.git` to the same level with current project
  - `yarn @core`

### Android
  - `node -v` = `v14.20.1`
  - `yarn`
  - `yarn start`

### IOS
  - *If having trouble with iOS, try to reinstall the dependencies by running:
  - `cd ios`
  - `bundle install`
  - `bundle exec pod install`
  - Run Project
  - `node -v` = `v14.20.1`
  - `yarn`
  - `yarn start | yarn ios (if error)`

### IOS - Setup (Step by step)
  - `ruby -v` = `2.7.6` (swith by rvm)
  - `cocoapods insall not required`
  - `rvm list` - `* [arm64]`
  - `gem install bundler:2.4.9`

## java home
  - `/usr/libexec/java_home`
## key
  - `sudo keytool -genkey -v -keystore android/dev.keystore -alias react_native_base -keyalg RSA -keysize 2048 -validity 10000`
  - alias: react_native_base
  - pass: vietsaclo1999

## Build
  - find 'signingConfig signingConfigs.debug // FOR DEBUG BUILD' 
  - replace for `DEBUG` OR `BUILD`
  - aab: `cd android && ./gradlew bundleRelease`
  - apk: `cd android && ./gradlew assembleRelease`
  - 