(function (drupalSettings) {

  Drupal.webprofiler.helpers = (function () {

    "use strict";

    var escapeRx = function escapeRegExp(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      },

      repl = function replaceAll(string, find, replace) {
        return string.replace(new RegExp(escapeRx(find), 'g'), replace);
      },

      shortLink = function (clazz) {
        if (!clazz) {
          return null;
        }
        clazz = repl(clazz, '/', '\\');
        var parts = clazz.split("\\"), result = [], size = (parts.length - 1);

        _.each(parts, function (item, key) {
          if (key < size) {
            result.push(item.substring(0, 1));
          } else {
            result.push(item);
          }
        });
        return result.join("\\");
      },

      abbr = function (clazz) {
        if (!clazz) {
          return null;
        }

        return '<abbr title="' + clazz + '">' + shortLink(clazz) + '</abbr>';
      },

      ideLink = function (file, line) {
        if (!file) {
          return null;
        }

        line = line || 0;

        return drupalSettings.webprofiler.idelink.replace("@file", file).replace("@line", line);
      },

      classLink = function (data) {
        var link = ideLink(data['file'], data['line']), clazz = abbr(data['class']), method = data['method'], output = '';

        output = clazz;
        if (method) {
          output += '::' + method;
        }

        if (link) {
          output = '<a href="' + link + '">' + output + '</a>';
        }

        return output;
      },

      printTime = function (data, unit) {
        data = Math.round((data + 0.00001) * 100) / 100;
        return data + ' ' + unit;
      },

      frm = function (obj) {
        var str = '<ul class="list--unstyled list--flat">', prop;
        if (typeof obj != 'object') {
          return obj;
        }
        for (prop in obj) {
          if (isInt(prop)) {
            str += '<li>' + frm(obj[prop]) + '</li>';
          } else {
            str += '<li>' + prop + ': ' + frm(obj[prop]) + '</li>';
          }
        }
        return str + '</ul>';
      },

      isInt = function (value) {
        var x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
      };

    return {
      frm: frm,
      ideLink: ideLink,
      shortLink: shortLink,
      classLink: classLink,
      printTime: printTime
    }

  })();

}(drupalSettings));
