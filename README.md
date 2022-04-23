## README
### Description

### Software versions
- Node >= 14.18.3
- npm >= 6.14.15

### Config and running application
**Install node with [nvm](https://github.com/nvm-sh/nvm#usage)**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
**Install Expo**
```
npm install --global expo-cli
```
**Running application**
```
npm start
```

## Simulating on android
Install the [expo app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US) to your android device