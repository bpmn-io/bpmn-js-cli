# Changelog

All notable changes to [bpmn-js-cli](https://github.com/bpmn-io/bpmn-js-cli) are documented here. We use [semantic versioning](http://semver.org/) for releases.

## Unreleased

___Note:__ Yet to be released changes appear here._

# 2.4.0

* `DEPS`: dependency updates
* `CHORE`: consistently use ES modules internally

# 2.3.0

* `DEPS`: widen `bpmn-js` peerDependency range ([e71a09f](https://github.com/bpmn-io/bpmn-js-cli/commit/e71a09f))

## 2.2.1

* `DEPS`: support `bpmn-js@10`

## 2.2.0

* `FEAT`: add `setRoot` command ([#42](https://github.com/bpmn-io/bpmn-js-cli/pull/42))

## 2.1.0

* `FEAT`: add `color` command
* `FEAT`: add generic `remove` command
* `FEAT`: add `elements` param

## 2.0.2

* `CHORE`: clean up published files

## 2.0.1

* `CHORE`: mark as `bpmn-js@8` compatible

## 2.0.0

### Breaking Changes

* The toolkit now requires the ES6 `Promise` to be present. To support IE11 you must polyfill it.

## 1.4.1

* `CHORE`: fix CHANGELOG

## 1.4.0

_Republish of `v1.2.0`._

## 1.2.0

* `CHORE`: support `bpmn-js@6`

## 1.1.0

* `CHORE`: support `bpmn-js@4` and `bpmn-js@5`

## 1.0.0

* `FEAT`: expose ES modules
* `FEAT`: mark as `bpmn-js@3` compatible
* `CHORE`: drop `bpmn-js@0.x` compatibility

### Breaking Changes

* You must now use an ES module aware bundler such as Webpack or Rollup to consume this library.

## ...

Check `git log` for earlier history.
