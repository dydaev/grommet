'use strict';

exports.__esModule = true;
exports.expectPortal = exports.createPortal = undefined;

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createPortal = exports.createPortal = function createPortal() {
  // make sure to remove all body children
  document.body.innerHTML = '';
  document.body.appendChild(document.createElement('div'));
};

var expectPortal = exports.expectPortal = function expectPortal(portalId) {
  return {
    toMatchSnapshot: function toMatchSnapshot() {
      var node = document.getElementById(portalId);
      if (node) {
        var styles = _css2.default.parse(document.getElementsByTagName('style')[0].innerHTML);
        styles.stylesheet.rules = styles.stylesheet.rules.filter(function (rule) {
          // skip everything that is not media or rule
          if (['media', 'rule'].indexOf(rule.type) < 0) {
            return false;
          }
          if (!rule.selectors) {
            return true;
          }
          var selector = rule.selectors.join('');
          return Array.from(node.classList).some(function (className) {
            return selector.indexOf(className) >= 0;
          });
        });
        expect(document.getElementById(portalId)).toMatchSnapshot();
        expect(_css2.default.stringify(styles)).toMatchSnapshot();
      } else {
        fail(portalId + ' portal does not exist');
      }
    }
  };
};

exports.default = { createPortal: createPortal, expectPortal: expectPortal };