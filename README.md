## README
### Description

### Software versions
- Node >= 14.18.3
- npm >= 6.14.15

### Config
**Install node with [nvm](https://github.com/nvm-sh/nvm#usage)**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Configure React CLI
Configure [react native cli](https://reactnative.dev/docs/environment-setup)

1º terminal
``
npx react-native start
```

2º terminal
``
npx react-native run-android
```