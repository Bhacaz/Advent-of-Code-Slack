var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/daisyui/src/lib/createPlugin.js
var require_createPlugin = __commonJS({
  "node_modules/daisyui/src/lib/createPlugin.js"(exports2, module2) {
    function createPlugin(plugin, config) {
      return {
        handler: plugin,
        config
      };
    }
    createPlugin.withOptions = (pluginFunction, configFunction = () => ({})) => {
      const optionsFunction = (options) => ({
        __options: options,
        handler: pluginFunction(options),
        config: configFunction(options)
      });
      optionsFunction.__isOptionsFunction = true;
      optionsFunction.__pluginFunction = pluginFunction;
      optionsFunction.__configFunction = configFunction;
      return optionsFunction;
    };
    module2.exports = createPlugin;
  }
});

// node_modules/camelcase-css/index.js
var require_camelcase_css = __commonJS({
  "node_modules/camelcase-css/index.js"(exports2, module2) {
    "use strict";
    var pattern = /-(\w|$)/g;
    var callback = (dashChar, char) => char.toUpperCase();
    var camelCaseCSS = (property) => {
      property = property.toLowerCase();
      if (property === "float") {
        return "cssFloat";
      } else if (property.startsWith("-ms-")) {
        return property.substr(1).replace(pattern, callback);
      } else {
        return property.replace(pattern, callback);
      }
    };
    module2.exports = camelCaseCSS;
  }
});

// node_modules/postcss-js/objectifier.js
var require_objectifier = __commonJS({
  "node_modules/postcss-js/objectifier.js"(exports2, module2) {
    var camelcase = require_camelcase_css();
    var UNITLESS = {
      boxFlex: true,
      boxFlexGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      strokeDashoffset: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    function atRule(node) {
      if (typeof node.nodes === "undefined") {
        return true;
      } else {
        return process2(node);
      }
    }
    function process2(node) {
      let name;
      let result = {};
      node.each((child) => {
        if (child.type === "atrule") {
          name = "@" + child.name;
          if (child.params) name += " " + child.params;
          if (typeof result[name] === "undefined") {
            result[name] = atRule(child);
          } else if (Array.isArray(result[name])) {
            result[name].push(atRule(child));
          } else {
            result[name] = [result[name], atRule(child)];
          }
        } else if (child.type === "rule") {
          let body = process2(child);
          if (result[child.selector]) {
            for (let i in body) {
              result[child.selector][i] = body[i];
            }
          } else {
            result[child.selector] = body;
          }
        } else if (child.type === "decl") {
          if (child.prop[0] === "-" && child.prop[1] === "-") {
            name = child.prop;
          } else if (child.parent && child.parent.selector === ":export") {
            name = child.prop;
          } else {
            name = camelcase(child.prop);
          }
          let value = child.value;
          if (!isNaN(child.value) && UNITLESS[name]) {
            value = parseFloat(child.value);
          }
          if (child.important) value += " !important";
          if (typeof result[name] === "undefined") {
            result[name] = value;
          } else if (Array.isArray(result[name])) {
            result[name].push(value);
          } else {
            result[name] = [result[name], value];
          }
        }
      });
      return result;
    }
    module2.exports = process2;
  }
});

// node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/picocolors/picocolors.js"(exports2, module2) {
    var argv = process.argv || [];
    var env = process.env;
    var isColorSupported = !("NO_COLOR" in env || argv.includes("--no-color")) && ("FORCE_COLOR" in env || argv.includes("--color") || process.platform === "win32" || require != null && require("tty").isatty(1) && env.TERM !== "dumb" || "CI" in env);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "";
      let cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let init = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: init("\x1B[0m", "\x1B[0m"),
        bold: init("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: init("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: init("\x1B[3m", "\x1B[23m"),
        underline: init("\x1B[4m", "\x1B[24m"),
        inverse: init("\x1B[7m", "\x1B[27m"),
        hidden: init("\x1B[8m", "\x1B[28m"),
        strikethrough: init("\x1B[9m", "\x1B[29m"),
        black: init("\x1B[30m", "\x1B[39m"),
        red: init("\x1B[31m", "\x1B[39m"),
        green: init("\x1B[32m", "\x1B[39m"),
        yellow: init("\x1B[33m", "\x1B[39m"),
        blue: init("\x1B[34m", "\x1B[39m"),
        magenta: init("\x1B[35m", "\x1B[39m"),
        cyan: init("\x1B[36m", "\x1B[39m"),
        white: init("\x1B[37m", "\x1B[39m"),
        gray: init("\x1B[90m", "\x1B[39m"),
        bgBlack: init("\x1B[40m", "\x1B[49m"),
        bgRed: init("\x1B[41m", "\x1B[49m"),
        bgGreen: init("\x1B[42m", "\x1B[49m"),
        bgYellow: init("\x1B[43m", "\x1B[49m"),
        bgBlue: init("\x1B[44m", "\x1B[49m"),
        bgMagenta: init("\x1B[45m", "\x1B[49m"),
        bgCyan: init("\x1B[46m", "\x1B[49m"),
        bgWhite: init("\x1B[47m", "\x1B[49m"),
        blackBright: init("\x1B[90m", "\x1B[39m"),
        redBright: init("\x1B[91m", "\x1B[39m"),
        greenBright: init("\x1B[92m", "\x1B[39m"),
        yellowBright: init("\x1B[93m", "\x1B[39m"),
        blueBright: init("\x1B[94m", "\x1B[39m"),
        magentaBright: init("\x1B[95m", "\x1B[39m"),
        cyanBright: init("\x1B[96m", "\x1B[39m"),
        whiteBright: init("\x1B[97m", "\x1B[39m"),
        bgBlackBright: init("\x1B[100m", "\x1B[49m"),
        bgRedBright: init("\x1B[101m", "\x1B[49m"),
        bgGreenBright: init("\x1B[102m", "\x1B[49m"),
        bgYellowBright: init("\x1B[103m", "\x1B[49m"),
        bgBlueBright: init("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: init("\x1B[105m", "\x1B[49m"),
        bgCyanBright: init("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: init("\x1B[107m", "\x1B[49m")
      };
    };
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// node_modules/postcss/lib/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/postcss/lib/tokenize.js"(exports2, module2) {
    "use strict";
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
    var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\r\n"'(/\\]/;
    var RE_HEX_ESCAPE = /[\da-f]/i;
    module2.exports = function tokenizer(input, options = {}) {
      let css = input.css.valueOf();
      let ignore = options.ignoreErrors;
      let code, content, escape, next, quote;
      let currentToken, escaped, escapePos, n, prev;
      let length = css.length;
      let pos = 0;
      let buffer = [];
      let returned = [];
      function position() {
        return pos;
      }
      function unclosed(what) {
        throw input.error("Unclosed " + what, pos);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length;
      }
      function nextToken(opts) {
        if (returned.length) return returned.pop();
        if (pos >= length) return;
        let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
        code = css.charCodeAt(pos);
        switch (code) {
          case NEWLINE:
          case SPACE:
          case TAB:
          case CR:
          case FEED: {
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          }
          case OPEN_SQUARE:
          case CLOSE_SQUARE:
          case OPEN_CURLY:
          case CLOSE_CURLY:
          case COLON:
          case SEMICOLON:
          case CLOSE_PARENTHESES: {
            let controlChar = String.fromCharCode(code);
            currentToken = [controlChar, controlChar, pos];
            break;
          }
          case OPEN_PARENTHESES: {
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
              next = pos;
              do {
                escaped = false;
                next = css.indexOf(")", next + 1);
                if (next === -1) {
                  if (ignore || ignoreUnclosed) {
                    next = pos;
                    break;
                  } else {
                    unclosed("bracket");
                  }
                }
                escapePos = next;
                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                  escapePos -= 1;
                  escaped = !escaped;
                }
              } while (escaped);
              currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", pos];
              } else {
                currentToken = ["brackets", content, pos, next];
                pos = next;
              }
            }
            break;
          }
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE: {
            quote = code === SINGLE_QUOTE ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos + 1;
                  break;
                } else {
                  unclosed("string");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["string", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case AT: {
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case BACKSLASH: {
            next = pos;
            escape = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          default: {
            if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore || ignoreUnclosed) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              currentToken = ["comment", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), pos, next];
              buffer.push(currentToken);
              pos = next;
            }
            break;
          }
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        endOfFile,
        nextToken,
        position
      };
    };
  }
});

// node_modules/postcss/lib/terminal-highlight.js
var require_terminal_highlight = __commonJS({
  "node_modules/postcss/lib/terminal-highlight.js"(exports2, module2) {
    "use strict";
    var pico = require_picocolors();
    var tokenizer = require_tokenize();
    var Input;
    function registerInput(dependant) {
      Input = dependant;
    }
    var HIGHLIGHT_THEME = {
      ";": pico.yellow,
      ":": pico.yellow,
      "(": pico.cyan,
      ")": pico.cyan,
      "[": pico.yellow,
      "]": pico.yellow,
      "{": pico.yellow,
      "}": pico.yellow,
      "at-word": pico.cyan,
      "brackets": pico.cyan,
      "call": pico.cyan,
      "class": pico.yellow,
      "comment": pico.gray,
      "hash": pico.magenta,
      "string": pico.green
    };
    function getTokenType([type, value], processor) {
      if (type === "word") {
        if (value[0] === ".") {
          return "class";
        }
        if (value[0] === "#") {
          return "hash";
        }
      }
      if (!processor.endOfFile()) {
        let next = processor.nextToken();
        processor.back(next);
        if (next[0] === "brackets" || next[0] === "(") return "call";
      }
      return type;
    }
    function terminalHighlight(css) {
      let processor = tokenizer(new Input(css), { ignoreErrors: true });
      let result = "";
      while (!processor.endOfFile()) {
        let token = processor.nextToken();
        let color = HIGHLIGHT_THEME[getTokenType(token, processor)];
        if (color) {
          result += token[1].split(/\r?\n/).map((i) => color(i)).join("\n");
        } else {
          result += token[1];
        }
      }
      return result;
    }
    terminalHighlight.registerInput = registerInput;
    module2.exports = terminalHighlight;
  }
});

// node_modules/postcss/lib/css-syntax-error.js
var require_css_syntax_error = __commonJS({
  "node_modules/postcss/lib/css-syntax-error.js"(exports2, module2) {
    "use strict";
    var pico = require_picocolors();
    var terminalHighlight = require_terminal_highlight();
    var CssSyntaxError = class _CssSyntaxError extends Error {
      constructor(message, line, column, source, file, plugin) {
        super(message);
        this.name = "CssSyntaxError";
        this.reason = message;
        if (file) {
          this.file = file;
        }
        if (source) {
          this.source = source;
        }
        if (plugin) {
          this.plugin = plugin;
        }
        if (typeof line !== "undefined" && typeof column !== "undefined") {
          if (typeof line === "number") {
            this.line = line;
            this.column = column;
          } else {
            this.line = line.line;
            this.column = line.column;
            this.endLine = column.line;
            this.endColumn = column.column;
          }
        }
        this.setMessage();
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _CssSyntaxError);
        }
      }
      setMessage() {
        this.message = this.plugin ? this.plugin + ": " : "";
        this.message += this.file ? this.file : "<css input>";
        if (typeof this.line !== "undefined") {
          this.message += ":" + this.line + ":" + this.column;
        }
        this.message += ": " + this.reason;
      }
      showSourceCode(color) {
        if (!this.source) return "";
        let css = this.source;
        if (color == null) color = pico.isColorSupported;
        let aside = (text) => text;
        let mark = (text) => text;
        let highlight = (text) => text;
        if (color) {
          let { bold, gray, red } = pico.createColors(true);
          mark = (text) => bold(red(text));
          aside = (text) => gray(text);
          if (terminalHighlight) {
            highlight = (text) => terminalHighlight(text);
          }
        }
        let lines = css.split(/\r?\n/);
        let start = Math.max(this.line - 3, 0);
        let end = Math.min(this.line + 2, lines.length);
        let maxWidth = String(end).length;
        return lines.slice(start, end).map((line, index) => {
          let number = start + 1 + index;
          let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
          if (number === this.line) {
            if (line.length > 160) {
              let padding = 20;
              let subLineStart = Math.max(0, this.column - padding);
              let subLineEnd = Math.max(
                this.column + padding,
                this.endColumn + padding
              );
              let subLine = line.slice(subLineStart, subLineEnd);
              let spacing2 = aside(gutter.replace(/\d/g, " ")) + line.slice(0, Math.min(this.column - 1, padding - 1)).replace(/[^\t]/g, " ");
              return mark(">") + aside(gutter) + highlight(subLine) + "\n " + spacing2 + mark("^");
            }
            let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + highlight(line) + "\n " + spacing + mark("^");
          }
          return " " + aside(gutter) + highlight(line);
        }).join("\n");
      }
      toString() {
        let code = this.showSourceCode();
        if (code) {
          code = "\n\n" + code + "\n";
        }
        return this.name + ": " + this.message + code;
      }
    };
    module2.exports = CssSyntaxError;
    CssSyntaxError.default = CssSyntaxError;
  }
});

// node_modules/postcss/lib/stringifier.js
var require_stringifier = __commonJS({
  "node_modules/postcss/lib/stringifier.js"(exports2, module2) {
    "use strict";
    var DEFAULT_RAW = {
      after: "\n",
      beforeClose: "\n",
      beforeComment: "\n",
      beforeDecl: "\n",
      beforeOpen: " ",
      beforeRule: "\n",
      colon: ": ",
      commentLeft: " ",
      commentRight: " ",
      emptyBody: "",
      indent: "    ",
      semicolon: false
    };
    function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
    var Stringifier = class {
      constructor(builder) {
        this.builder = builder;
      }
      atrule(node, semicolon) {
        let name = "@" + node.name;
        let params = node.params ? this.rawValue(node, "params") : "";
        if (typeof node.raws.afterName !== "undefined") {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        if (node.nodes) {
          this.block(node, name + params);
        } else {
          let end = (node.raws.between || "") + (semicolon ? ";" : "");
          this.builder(name + params + end, node);
        }
      }
      beforeAfter(node, detect) {
        let value;
        if (node.type === "decl") {
          value = this.raw(node, null, "beforeDecl");
        } else if (node.type === "comment") {
          value = this.raw(node, null, "beforeComment");
        } else if (detect === "before") {
          value = this.raw(node, null, "beforeRule");
        } else {
          value = this.raw(node, null, "beforeClose");
        }
        let buf = node.parent;
        let depth = 0;
        while (buf && buf.type !== "root") {
          depth += 1;
          buf = buf.parent;
        }
        if (value.includes("\n")) {
          let indent = this.raw(node, null, "indent");
          if (indent.length) {
            for (let step = 0; step < depth; step++) value += indent;
          }
        }
        return value;
      }
      block(node, start) {
        let between = this.raw(node, "between", "beforeOpen");
        this.builder(start + between + "{", node, "start");
        let after;
        if (node.nodes && node.nodes.length) {
          this.body(node);
          after = this.raw(node, "after");
        } else {
          after = this.raw(node, "after", "emptyBody");
        }
        if (after) this.builder(after);
        this.builder("}", node, "end");
      }
      body(node) {
        let last = node.nodes.length - 1;
        while (last > 0) {
          if (node.nodes[last].type !== "comment") break;
          last -= 1;
        }
        let semicolon = this.raw(node, "semicolon");
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          let before = this.raw(child, "before");
          if (before) this.builder(before);
          this.stringify(child, last !== i || semicolon);
        }
      }
      comment(node) {
        let left = this.raw(node, "left", "commentLeft");
        let right = this.raw(node, "right", "commentRight");
        this.builder("/*" + left + node.text + right + "*/", node);
      }
      decl(node, semicolon) {
        let between = this.raw(node, "between", "colon");
        let string = node.prop + between + this.rawValue(node, "value");
        if (node.important) {
          string += node.raws.important || " !important";
        }
        if (semicolon) string += ";";
        this.builder(string, node);
      }
      document(node) {
        this.body(node);
      }
      raw(node, own, detect) {
        let value;
        if (!detect) detect = own;
        if (own) {
          value = node.raws[own];
          if (typeof value !== "undefined") return value;
        }
        let parent = node.parent;
        if (detect === "before") {
          if (!parent || parent.type === "root" && parent.first === node) {
            return "";
          }
          if (parent && parent.type === "document") {
            return "";
          }
        }
        if (!parent) return DEFAULT_RAW[detect];
        let root = node.root();
        if (!root.rawCache) root.rawCache = {};
        if (typeof root.rawCache[detect] !== "undefined") {
          return root.rawCache[detect];
        }
        if (detect === "before" || detect === "after") {
          return this.beforeAfter(node, detect);
        } else {
          let method = "raw" + capitalize(detect);
          if (this[method]) {
            value = this[method](root, node);
          } else {
            root.walk((i) => {
              value = i.raws[own];
              if (typeof value !== "undefined") return false;
            });
          }
        }
        if (typeof value === "undefined") value = DEFAULT_RAW[detect];
        root.rawCache[detect] = value;
        return value;
      }
      rawBeforeClose(root) {
        let value;
        root.walk((i) => {
          if (i.nodes && i.nodes.length > 0) {
            if (typeof i.raws.after !== "undefined") {
              value = i.raws.after;
              if (value.includes("\n")) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value) value = value.replace(/\S/g, "");
        return value;
      }
      rawBeforeComment(root, node) {
        let value;
        root.walkComments((i) => {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeDecl");
        } else if (value) {
          value = value.replace(/\S/g, "");
        }
        return value;
      }
      rawBeforeDecl(root, node) {
        let value;
        root.walkDecls((i) => {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeRule");
        } else if (value) {
          value = value.replace(/\S/g, "");
        }
        return value;
      }
      rawBeforeOpen(root) {
        let value;
        root.walk((i) => {
          if (i.type !== "decl") {
            value = i.raws.between;
            if (typeof value !== "undefined") return false;
          }
        });
        return value;
      }
      rawBeforeRule(root) {
        let value;
        root.walk((i) => {
          if (i.nodes && (i.parent !== root || root.first !== i)) {
            if (typeof i.raws.before !== "undefined") {
              value = i.raws.before;
              if (value.includes("\n")) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value) value = value.replace(/\S/g, "");
        return value;
      }
      rawColon(root) {
        let value;
        root.walkDecls((i) => {
          if (typeof i.raws.between !== "undefined") {
            value = i.raws.between.replace(/[^\s:]/g, "");
            return false;
          }
        });
        return value;
      }
      rawEmptyBody(root) {
        let value;
        root.walk((i) => {
          if (i.nodes && i.nodes.length === 0) {
            value = i.raws.after;
            if (typeof value !== "undefined") return false;
          }
        });
        return value;
      }
      rawIndent(root) {
        if (root.raws.indent) return root.raws.indent;
        let value;
        root.walk((i) => {
          let p = i.parent;
          if (p && p !== root && p.parent && p.parent === root) {
            if (typeof i.raws.before !== "undefined") {
              let parts = i.raws.before.split("\n");
              value = parts[parts.length - 1];
              value = value.replace(/\S/g, "");
              return false;
            }
          }
        });
        return value;
      }
      rawSemicolon(root) {
        let value;
        root.walk((i) => {
          if (i.nodes && i.nodes.length && i.last.type === "decl") {
            value = i.raws.semicolon;
            if (typeof value !== "undefined") return false;
          }
        });
        return value;
      }
      rawValue(node, prop) {
        let value = node[prop];
        let raw = node.raws[prop];
        if (raw && raw.value === value) {
          return raw.raw;
        }
        return value;
      }
      root(node) {
        this.body(node);
        if (node.raws.after) this.builder(node.raws.after);
      }
      rule(node) {
        this.block(node, this.rawValue(node, "selector"));
        if (node.raws.ownSemicolon) {
          this.builder(node.raws.ownSemicolon, node, "end");
        }
      }
      stringify(node, semicolon) {
        if (!this[node.type]) {
          throw new Error(
            "Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier."
          );
        }
        this[node.type](node, semicolon);
      }
    };
    module2.exports = Stringifier;
    Stringifier.default = Stringifier;
  }
});

// node_modules/postcss/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/postcss/lib/stringify.js"(exports2, module2) {
    "use strict";
    var Stringifier = require_stringifier();
    function stringify(node, builder) {
      let str = new Stringifier(builder);
      str.stringify(node);
    }
    module2.exports = stringify;
    stringify.default = stringify;
  }
});

// node_modules/postcss/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/postcss/lib/symbols.js"(exports2, module2) {
    "use strict";
    module2.exports.isClean = Symbol("isClean");
    module2.exports.my = Symbol("my");
  }
});

// node_modules/postcss/lib/node.js
var require_node = __commonJS({
  "node_modules/postcss/lib/node.js"(exports2, module2) {
    "use strict";
    var CssSyntaxError = require_css_syntax_error();
    var Stringifier = require_stringifier();
    var stringify = require_stringify();
    var { isClean, my } = require_symbols();
    function cloneNode(obj, parent) {
      let cloned = new obj.constructor();
      for (let i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)) {
          continue;
        }
        if (i === "proxyCache") continue;
        let value = obj[i];
        let type = typeof value;
        if (i === "parent" && type === "object") {
          if (parent) cloned[i] = parent;
        } else if (i === "source") {
          cloned[i] = value;
        } else if (Array.isArray(value)) {
          cloned[i] = value.map((j) => cloneNode(j, cloned));
        } else {
          if (type === "object" && value !== null) value = cloneNode(value);
          cloned[i] = value;
        }
      }
      return cloned;
    }
    var Node = class {
      constructor(defaults = {}) {
        this.raws = {};
        this[isClean] = false;
        this[my] = true;
        for (let name in defaults) {
          if (name === "nodes") {
            this.nodes = [];
            for (let node of defaults[name]) {
              if (typeof node.clone === "function") {
                this.append(node.clone());
              } else {
                this.append(node);
              }
            }
          } else {
            this[name] = defaults[name];
          }
        }
      }
      addToError(error) {
        error.postcssNode = this;
        if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
          let s = this.source;
          error.stack = error.stack.replace(
            /\n\s{4}at /,
            `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
          );
        }
        return error;
      }
      after(add) {
        this.parent.insertAfter(this, add);
        return this;
      }
      assign(overrides = {}) {
        for (let name in overrides) {
          this[name] = overrides[name];
        }
        return this;
      }
      before(add) {
        this.parent.insertBefore(this, add);
        return this;
      }
      cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween) delete this.raws.between;
      }
      clone(overrides = {}) {
        let cloned = cloneNode(this);
        for (let name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      }
      cloneAfter(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
      }
      cloneBefore(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
      }
      error(message, opts = {}) {
        if (this.source) {
          let { end, start } = this.rangeBy(opts);
          return this.source.input.error(
            message,
            { column: start.column, line: start.line },
            { column: end.column, line: end.line },
            opts
          );
        }
        return new CssSyntaxError(message);
      }
      getProxyProcessor() {
        return {
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else {
              return node[prop];
            }
          },
          set(node, prop, value) {
            if (node[prop] === value) return true;
            node[prop] = value;
            if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
            prop === "text") {
              node.markDirty();
            }
            return true;
          }
        };
      }
      /* c8 ignore next 3 */
      markClean() {
        this[isClean] = true;
      }
      markDirty() {
        if (this[isClean]) {
          this[isClean] = false;
          let next = this;
          while (next = next.parent) {
            next[isClean] = false;
          }
        }
      }
      next() {
        if (!this.parent) return void 0;
        let index = this.parent.index(this);
        return this.parent.nodes[index + 1];
      }
      positionBy(opts, stringRepresentation) {
        let pos = this.source.start;
        if (opts.index) {
          pos = this.positionInside(opts.index, stringRepresentation);
        } else if (opts.word) {
          stringRepresentation = this.toString();
          let index = stringRepresentation.indexOf(opts.word);
          if (index !== -1) pos = this.positionInside(index, stringRepresentation);
        }
        return pos;
      }
      positionInside(index, stringRepresentation) {
        let string = stringRepresentation || this.toString();
        let column = this.source.start.column;
        let line = this.source.start.line;
        for (let i = 0; i < index; i++) {
          if (string[i] === "\n") {
            column = 1;
            line += 1;
          } else {
            column += 1;
          }
        }
        return { column, line };
      }
      prev() {
        if (!this.parent) return void 0;
        let index = this.parent.index(this);
        return this.parent.nodes[index - 1];
      }
      rangeBy(opts) {
        let start = {
          column: this.source.start.column,
          line: this.source.start.line
        };
        let end = this.source.end ? {
          column: this.source.end.column + 1,
          line: this.source.end.line
        } : {
          column: start.column + 1,
          line: start.line
        };
        if (opts.word) {
          let stringRepresentation = this.toString();
          let index = stringRepresentation.indexOf(opts.word);
          if (index !== -1) {
            start = this.positionInside(index, stringRepresentation);
            end = this.positionInside(
              index + opts.word.length,
              stringRepresentation
            );
          }
        } else {
          if (opts.start) {
            start = {
              column: opts.start.column,
              line: opts.start.line
            };
          } else if (opts.index) {
            start = this.positionInside(opts.index);
          }
          if (opts.end) {
            end = {
              column: opts.end.column,
              line: opts.end.line
            };
          } else if (typeof opts.endIndex === "number") {
            end = this.positionInside(opts.endIndex);
          } else if (opts.index) {
            end = this.positionInside(opts.index + 1);
          }
        }
        if (end.line < start.line || end.line === start.line && end.column <= start.column) {
          end = { column: start.column + 1, line: start.line };
        }
        return { end, start };
      }
      raw(prop, defaultType) {
        let str = new Stringifier();
        return str.raw(this, prop, defaultType);
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      }
      replaceWith(...nodes) {
        if (this.parent) {
          let bookmark = this;
          let foundSelf = false;
          for (let node of nodes) {
            if (node === this) {
              foundSelf = true;
            } else if (foundSelf) {
              this.parent.insertAfter(bookmark, node);
              bookmark = node;
            } else {
              this.parent.insertBefore(bookmark, node);
            }
          }
          if (!foundSelf) {
            this.remove();
          }
        }
        return this;
      }
      root() {
        let result = this;
        while (result.parent && result.parent.type !== "document") {
          result = result.parent;
        }
        return result;
      }
      toJSON(_, inputs) {
        let fixed = {};
        let emitInputs = inputs == null;
        inputs = inputs || /* @__PURE__ */ new Map();
        let inputsNextIndex = 0;
        for (let name in this) {
          if (!Object.prototype.hasOwnProperty.call(this, name)) {
            continue;
          }
          if (name === "parent" || name === "proxyCache") continue;
          let value = this[name];
          if (Array.isArray(value)) {
            fixed[name] = value.map((i) => {
              if (typeof i === "object" && i.toJSON) {
                return i.toJSON(null, inputs);
              } else {
                return i;
              }
            });
          } else if (typeof value === "object" && value.toJSON) {
            fixed[name] = value.toJSON(null, inputs);
          } else if (name === "source") {
            let inputId = inputs.get(value.input);
            if (inputId == null) {
              inputId = inputsNextIndex;
              inputs.set(value.input, inputsNextIndex);
              inputsNextIndex++;
            }
            fixed[name] = {
              end: value.end,
              inputId,
              start: value.start
            };
          } else {
            fixed[name] = value;
          }
        }
        if (emitInputs) {
          fixed.inputs = [...inputs.keys()].map((input) => input.toJSON());
        }
        return fixed;
      }
      toProxy() {
        if (!this.proxyCache) {
          this.proxyCache = new Proxy(this, this.getProxyProcessor());
        }
        return this.proxyCache;
      }
      toString(stringifier = stringify) {
        if (stringifier.stringify) stringifier = stringifier.stringify;
        let result = "";
        stringifier(this, (i) => {
          result += i;
        });
        return result;
      }
      warn(result, text, opts) {
        let data = { node: this };
        for (let i in opts) data[i] = opts[i];
        return result.warn(text, data);
      }
      get proxyOf() {
        return this;
      }
    };
    module2.exports = Node;
    Node.default = Node;
  }
});

// node_modules/postcss/lib/comment.js
var require_comment = __commonJS({
  "node_modules/postcss/lib/comment.js"(exports2, module2) {
    "use strict";
    var Node = require_node();
    var Comment = class extends Node {
      constructor(defaults) {
        super(defaults);
        this.type = "comment";
      }
    };
    module2.exports = Comment;
    Comment.default = Comment;
  }
});

// node_modules/postcss/lib/declaration.js
var require_declaration = __commonJS({
  "node_modules/postcss/lib/declaration.js"(exports2, module2) {
    "use strict";
    var Node = require_node();
    var Declaration = class extends Node {
      constructor(defaults) {
        if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
          defaults = { ...defaults, value: String(defaults.value) };
        }
        super(defaults);
        this.type = "decl";
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
    module2.exports = Declaration;
    Declaration.default = Declaration;
  }
});

// node_modules/postcss/lib/container.js
var require_container = __commonJS({
  "node_modules/postcss/lib/container.js"(exports2, module2) {
    "use strict";
    var Comment = require_comment();
    var Declaration = require_declaration();
    var Node = require_node();
    var { isClean, my } = require_symbols();
    var AtRule;
    var parse;
    var Root;
    var Rule;
    function cleanSource(nodes) {
      return nodes.map((i) => {
        if (i.nodes) i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
      });
    }
    function markTreeDirty(node) {
      node[isClean] = false;
      if (node.proxyOf.nodes) {
        for (let i of node.proxyOf.nodes) {
          markTreeDirty(i);
        }
      }
    }
    var Container = class _Container extends Node {
      append(...children) {
        for (let child of children) {
          let nodes = this.normalize(child, this.last);
          for (let node of nodes) this.proxyOf.nodes.push(node);
        }
        this.markDirty();
        return this;
      }
      cleanRaws(keepBetween) {
        super.cleanRaws(keepBetween);
        if (this.nodes) {
          for (let node of this.nodes) node.cleanRaws(keepBetween);
        }
      }
      each(callback) {
        if (!this.proxyOf.nodes) return void 0;
        let iterator = this.getIterator();
        let index, result;
        while (this.indexes[iterator] < this.proxyOf.nodes.length) {
          index = this.indexes[iterator];
          result = callback(this.proxyOf.nodes[index], index);
          if (result === false) break;
          this.indexes[iterator] += 1;
        }
        delete this.indexes[iterator];
        return result;
      }
      every(condition) {
        return this.nodes.every(condition);
      }
      getIterator() {
        if (!this.lastEach) this.lastEach = 0;
        if (!this.indexes) this.indexes = {};
        this.lastEach += 1;
        let iterator = this.lastEach;
        this.indexes[iterator] = 0;
        return iterator;
      }
      getProxyProcessor() {
        return {
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (!node[prop]) {
              return node[prop];
            } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
              return (...args) => {
                return node[prop](
                  ...args.map((i) => {
                    if (typeof i === "function") {
                      return (child, index) => i(child.toProxy(), index);
                    } else {
                      return i;
                    }
                  })
                );
              };
            } else if (prop === "every" || prop === "some") {
              return (cb) => {
                return node[prop](
                  (child, ...other) => cb(child.toProxy(), ...other)
                );
              };
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else if (prop === "nodes") {
              return node.nodes.map((i) => i.toProxy());
            } else if (prop === "first" || prop === "last") {
              return node[prop].toProxy();
            } else {
              return node[prop];
            }
          },
          set(node, prop, value) {
            if (node[prop] === value) return true;
            node[prop] = value;
            if (prop === "name" || prop === "params" || prop === "selector") {
              node.markDirty();
            }
            return true;
          }
        };
      }
      index(child) {
        if (typeof child === "number") return child;
        if (child.proxyOf) child = child.proxyOf;
        return this.proxyOf.nodes.indexOf(child);
      }
      insertAfter(exist, add) {
        let existIndex = this.index(exist);
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
        existIndex = this.index(exist);
        for (let node of nodes) this.proxyOf.nodes.splice(existIndex + 1, 0, node);
        let index;
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (existIndex < index) {
            this.indexes[id] = index + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      insertBefore(exist, add) {
        let existIndex = this.index(exist);
        let type = existIndex === 0 ? "prepend" : false;
        let nodes = this.normalize(
          add,
          this.proxyOf.nodes[existIndex],
          type
        ).reverse();
        existIndex = this.index(exist);
        for (let node of nodes) this.proxyOf.nodes.splice(existIndex, 0, node);
        let index;
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (existIndex <= index) {
            this.indexes[id] = index + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      normalize(nodes, sample) {
        if (typeof nodes === "string") {
          nodes = cleanSource(parse(nodes).nodes);
        } else if (typeof nodes === "undefined") {
          nodes = [];
        } else if (Array.isArray(nodes)) {
          nodes = nodes.slice(0);
          for (let i of nodes) {
            if (i.parent) i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type === "root" && this.type !== "document") {
          nodes = nodes.nodes.slice(0);
          for (let i of nodes) {
            if (i.parent) i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type) {
          nodes = [nodes];
        } else if (nodes.prop) {
          if (typeof nodes.value === "undefined") {
            throw new Error("Value field is missed in node creation");
          } else if (typeof nodes.value !== "string") {
            nodes.value = String(nodes.value);
          }
          nodes = [new Declaration(nodes)];
        } else if (nodes.selector || nodes.selectors) {
          nodes = [new Rule(nodes)];
        } else if (nodes.name) {
          nodes = [new AtRule(nodes)];
        } else if (nodes.text) {
          nodes = [new Comment(nodes)];
        } else {
          throw new Error("Unknown node type in node creation");
        }
        let processed = nodes.map((i) => {
          if (!i[my]) _Container.rebuild(i);
          i = i.proxyOf;
          if (i.parent) i.parent.removeChild(i);
          if (i[isClean]) markTreeDirty(i);
          if (!i.raws) i.raws = {};
          if (typeof i.raws.before === "undefined") {
            if (sample && typeof sample.raws.before !== "undefined") {
              i.raws.before = sample.raws.before.replace(/\S/g, "");
            }
          }
          i.parent = this.proxyOf;
          return i;
        });
        return processed;
      }
      prepend(...children) {
        children = children.reverse();
        for (let child of children) {
          let nodes = this.normalize(child, this.first, "prepend").reverse();
          for (let node of nodes) this.proxyOf.nodes.unshift(node);
          for (let id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      push(child) {
        child.parent = this;
        this.proxyOf.nodes.push(child);
        return this;
      }
      removeAll() {
        for (let node of this.proxyOf.nodes) node.parent = void 0;
        this.proxyOf.nodes = [];
        this.markDirty();
        return this;
      }
      removeChild(child) {
        child = this.index(child);
        this.proxyOf.nodes[child].parent = void 0;
        this.proxyOf.nodes.splice(child, 1);
        let index;
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (index >= child) {
            this.indexes[id] = index - 1;
          }
        }
        this.markDirty();
        return this;
      }
      replaceValues(pattern, opts, callback) {
        if (!callback) {
          callback = opts;
          opts = {};
        }
        this.walkDecls((decl) => {
          if (opts.props && !opts.props.includes(decl.prop)) return;
          if (opts.fast && !decl.value.includes(opts.fast)) return;
          decl.value = decl.value.replace(pattern, callback);
        });
        this.markDirty();
        return this;
      }
      some(condition) {
        return this.nodes.some(condition);
      }
      walk(callback) {
        return this.each((child, i) => {
          let result;
          try {
            result = callback(child, i);
          } catch (e) {
            throw child.addToError(e);
          }
          if (result !== false && child.walk) {
            result = child.walk(callback);
          }
          return result;
        });
      }
      walkAtRules(name, callback) {
        if (!callback) {
          callback = name;
          return this.walk((child, i) => {
            if (child.type === "atrule") {
              return callback(child, i);
            }
          });
        }
        if (name instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "atrule" && name.test(child.name)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "atrule" && child.name === name) {
            return callback(child, i);
          }
        });
      }
      walkComments(callback) {
        return this.walk((child, i) => {
          if (child.type === "comment") {
            return callback(child, i);
          }
        });
      }
      walkDecls(prop, callback) {
        if (!callback) {
          callback = prop;
          return this.walk((child, i) => {
            if (child.type === "decl") {
              return callback(child, i);
            }
          });
        }
        if (prop instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "decl" && prop.test(child.prop)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "decl" && child.prop === prop) {
            return callback(child, i);
          }
        });
      }
      walkRules(selector, callback) {
        if (!callback) {
          callback = selector;
          return this.walk((child, i) => {
            if (child.type === "rule") {
              return callback(child, i);
            }
          });
        }
        if (selector instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "rule" && selector.test(child.selector)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "rule" && child.selector === selector) {
            return callback(child, i);
          }
        });
      }
      get first() {
        if (!this.proxyOf.nodes) return void 0;
        return this.proxyOf.nodes[0];
      }
      get last() {
        if (!this.proxyOf.nodes) return void 0;
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
    };
    Container.registerParse = (dependant) => {
      parse = dependant;
    };
    Container.registerRule = (dependant) => {
      Rule = dependant;
    };
    Container.registerAtRule = (dependant) => {
      AtRule = dependant;
    };
    Container.registerRoot = (dependant) => {
      Root = dependant;
    };
    module2.exports = Container;
    Container.default = Container;
    Container.rebuild = (node) => {
      if (node.type === "atrule") {
        Object.setPrototypeOf(node, AtRule.prototype);
      } else if (node.type === "rule") {
        Object.setPrototypeOf(node, Rule.prototype);
      } else if (node.type === "decl") {
        Object.setPrototypeOf(node, Declaration.prototype);
      } else if (node.type === "comment") {
        Object.setPrototypeOf(node, Comment.prototype);
      } else if (node.type === "root") {
        Object.setPrototypeOf(node, Root.prototype);
      }
      node[my] = true;
      if (node.nodes) {
        node.nodes.forEach((child) => {
          Container.rebuild(child);
        });
      }
    };
  }
});

// node_modules/postcss/lib/at-rule.js
var require_at_rule = __commonJS({
  "node_modules/postcss/lib/at-rule.js"(exports2, module2) {
    "use strict";
    var Container = require_container();
    var AtRule = class extends Container {
      constructor(defaults) {
        super(defaults);
        this.type = "atrule";
      }
      append(...children) {
        if (!this.proxyOf.nodes) this.nodes = [];
        return super.append(...children);
      }
      prepend(...children) {
        if (!this.proxyOf.nodes) this.nodes = [];
        return super.prepend(...children);
      }
    };
    module2.exports = AtRule;
    AtRule.default = AtRule;
    Container.registerAtRule(AtRule);
  }
});

// node_modules/postcss/lib/document.js
var require_document = __commonJS({
  "node_modules/postcss/lib/document.js"(exports2, module2) {
    "use strict";
    var Container = require_container();
    var LazyResult;
    var Processor;
    var Document = class extends Container {
      constructor(defaults) {
        super({ type: "document", ...defaults });
        if (!this.nodes) {
          this.nodes = [];
        }
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor(), this, opts);
        return lazy.stringify();
      }
    };
    Document.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Document.registerProcessor = (dependant) => {
      Processor = dependant;
    };
    module2.exports = Document;
    Document.default = Document;
  }
});

// node_modules/nanoid/non-secure/index.cjs
var require_non_secure = __commonJS({
  "node_modules/nanoid/non-secure/index.cjs"(exports2, module2) {
    var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    var customAlphabet = (alphabet, defaultSize = 21) => {
      return (size = defaultSize) => {
        let id = "";
        let i = size;
        while (i--) {
          id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
      };
    };
    var nanoid = (size = 21) => {
      let id = "";
      let i = size;
      while (i--) {
        id += urlAlphabet[Math.random() * 64 | 0];
      }
      return id;
    };
    module2.exports = { nanoid, customAlphabet };
  }
});

// node_modules/source-map-js/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/source-map-js/lib/base64.js"(exports2) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports2.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports2.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "node_modules/source-map-js/lib/base64-vlq.js"(exports2) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports2.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports2.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// node_modules/source-map-js/lib/util.js
var require_util = __commonJS({
  "node_modules/source-map-js/lib/util.js"(exports2) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports2.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports2.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports2.urlGenerate = urlGenerate;
    var MAX_CACHED_INPUTS = 32;
    function lruMemoize(f) {
      var cache = [];
      return function(input) {
        for (var i = 0; i < cache.length; i++) {
          if (cache[i].input === input) {
            var temp = cache[0];
            cache[0] = cache[i];
            cache[i] = temp;
            return cache[0].result;
          }
        }
        var result = f(input);
        cache.unshift({
          input,
          result
        });
        if (cache.length > MAX_CACHED_INPUTS) {
          cache.pop();
        }
        return result;
      };
    }
    var normalize = lruMemoize(function normalize2(aPath) {
      var path = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path = url.path;
      }
      var isAbsolute = exports2.isAbsolute(path);
      var parts = [];
      var start = 0;
      var i = 0;
      while (true) {
        start = i;
        i = path.indexOf("/", start);
        if (i === -1) {
          parts.push(path.slice(start));
          break;
        } else {
          parts.push(path.slice(start, i));
          while (i < path.length && path[i] === "/") {
            i++;
          }
        }
      }
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path = parts.join("/");
      if (path === "") {
        path = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path;
        return urlGenerate(url);
      }
      return path;
    });
    exports2.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports2.join = join;
    exports2.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports2.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports2.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports2.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByOriginalPositions = compareByOriginalPositions;
    function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
      var cmp;
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports2.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports2.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports2.computeSourceURL = computeSourceURL;
  }
});

// node_modules/source-map-js/lib/array-set.js
var require_array_set = __commonJS({
  "node_modules/source-map-js/lib/array-set.js"(exports2) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports2.ArraySet = ArraySet;
  }
});

// node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "node_modules/source-map-js/lib/mapping-list.js"(exports2) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports2.MappingList = MappingList;
  }
});

// node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "node_modules/source-map-js/lib/source-map-generator.js"(exports2) {
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
        file: aSourceMapConsumer.file,
        sourceRoot
      }));
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        if (this._validateMapping(generated, original, source, name) === false) {
          return;
        }
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
        if (this._ignoreInvalidMapping) {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message);
        }
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        var message = "Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        });
        if (this._ignoreInvalidMapping) {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message);
        }
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports2.SourceMapGenerator = SourceMapGenerator;
  }
});

// node_modules/source-map-js/lib/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/source-map-js/lib/binary-search.js"(exports2) {
    exports2.GREATEST_LOWER_BOUND = 1;
    exports2.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports2.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports2.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports2.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  }
});

// node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "node_modules/source-map-js/lib/quick-sort.js"(exports2) {
    function SortTemplate(comparator) {
      function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
      }
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      function doQuickSort(ary, comparator2, p, r) {
        if (p < r) {
          var pivotIndex = randomIntInRange(p, r);
          var i = p - 1;
          swap(ary, pivotIndex, r);
          var pivot = ary[r];
          for (var j = p; j < r; j++) {
            if (comparator2(ary[j], pivot, false) <= 0) {
              i += 1;
              swap(ary, i, j);
            }
          }
          swap(ary, i + 1, j);
          var q = i + 1;
          doQuickSort(ary, comparator2, p, q - 1);
          doQuickSort(ary, comparator2, q + 1, r);
        }
      }
      return doQuickSort;
    }
    function cloneSort(comparator) {
      let template = SortTemplate.toString();
      let templateFn = new Function(`return ${template}`)();
      return templateFn(comparator);
    }
    var sortCache = /* @__PURE__ */ new WeakMap();
    exports2.quickSort = function(ary, comparator, start = 0) {
      let doQuickSort = sortCache.get(comparator);
      if (doQuickSort === void 0) {
        doQuickSort = cloneSort(comparator);
        sortCache.set(comparator, doQuickSort);
      }
      doQuickSort(ary, comparator, start, ary.length - 1);
    };
  }
});

// node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "node_modules/source-map-js/lib/source-map-consumer.js"(exports2) {
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      var boundCallback = aCallback.bind(context);
      var names = this._names;
      var sources = this._sources;
      var sourceMapURL = this._sourceMapURL;
      for (var i = 0, n = mappings.length; i < n; i++) {
        var mapping = mappings[i];
        var source = mapping.source === null ? null : sources.at(mapping.source);
        if (source !== null) {
          source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
        }
        boundCallback({
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : names.at(mapping.name)
        });
      }
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    };
    exports2.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    var compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
    function sortGenerated(array, start) {
      let l = array.length;
      let n = array.length - start;
      if (n <= 1) {
        return;
      } else if (n == 2) {
        let a = array[start];
        let b = array[start + 1];
        if (compareGenerated(a, b) > 0) {
          array[start] = b;
          array[start + 1] = a;
        }
      } else if (n < 20) {
        for (let i = start; i < l; i++) {
          for (let j = i; j > start; j--) {
            let a = array[j - 1];
            let b = array[j];
            if (compareGenerated(a, b) <= 0) {
              break;
            }
            array[j - 1] = b;
            array[j] = a;
          }
        }
      } else {
        quickSort(array, compareGenerated, start);
      }
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      let subarrayStart = 0;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
          sortGenerated(generatedMappings, subarrayStart);
          subarrayStart = generatedMappings.length;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }
          if (segment.length === 2) {
            throw new Error("Found a source, but no line and column");
          }
          if (segment.length === 3) {
            throw new Error("Found a source and line, but no column");
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            let currentSource = mapping.source;
            while (originalMappings.length <= currentSource) {
              originalMappings.push(null);
            }
            if (originalMappings[currentSource] === null) {
              originalMappings[currentSource] = [];
            }
            originalMappings[currentSource].push(mapping);
          }
        }
      }
      sortGenerated(generatedMappings, subarrayStart);
      this.__generatedMappings = generatedMappings;
      for (var i = 0; i < originalMappings.length; i++) {
        if (originalMappings[i] != null) {
          quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
        }
      }
      this.__originalMappings = [].concat(...originalMappings);
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports2.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content || content === "") {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          if (source !== null) {
            source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          }
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };
    exports2.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// node_modules/source-map-js/lib/source-node.js
var require_source_node = __commonJS({
  "node_modules/source-map-js/lib/source-node.js"(exports2) {
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports2.SourceNode = SourceNode;
  }
});

// node_modules/source-map-js/source-map.js
var require_source_map = __commonJS({
  "node_modules/source-map-js/source-map.js"(exports2) {
    exports2.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports2.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports2.SourceNode = require_source_node().SourceNode;
  }
});

// node_modules/postcss/lib/previous-map.js
var require_previous_map = __commonJS({
  "node_modules/postcss/lib/previous-map.js"(exports2, module2) {
    "use strict";
    var { existsSync, readFileSync } = require("fs");
    var { dirname, join } = require("path");
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    function fromBase64(str) {
      if (Buffer) {
        return Buffer.from(str, "base64").toString();
      } else {
        return window.atob(str);
      }
    }
    var PreviousMap = class {
      constructor(css, opts) {
        if (opts.map === false) return;
        this.loadAnnotation(css);
        this.inline = this.startWith(this.annotation, "data:");
        let prev = opts.map ? opts.map.prev : void 0;
        let text = this.loadMap(opts.from, prev);
        if (!this.mapFile && opts.from) {
          this.mapFile = opts.from;
        }
        if (this.mapFile) this.root = dirname(this.mapFile);
        if (text) this.text = text;
      }
      consumer() {
        if (!this.consumerCache) {
          this.consumerCache = new SourceMapConsumer(this.text);
        }
        return this.consumerCache;
      }
      decodeInline(text) {
        let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
        let baseUri = /^data:application\/json;base64,/;
        let charsetUri = /^data:application\/json;charset=utf-?8,/;
        let uri = /^data:application\/json,/;
        let uriMatch = text.match(charsetUri) || text.match(uri);
        if (uriMatch) {
          return decodeURIComponent(text.substr(uriMatch[0].length));
        }
        let baseUriMatch = text.match(baseCharsetUri) || text.match(baseUri);
        if (baseUriMatch) {
          return fromBase64(text.substr(baseUriMatch[0].length));
        }
        let encoding = text.match(/data:application\/json;([^,]+),/)[1];
        throw new Error("Unsupported source map encoding " + encoding);
      }
      getAnnotationURL(sourceMapString) {
        return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
      }
      isMap(map) {
        if (typeof map !== "object") return false;
        return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
      }
      loadAnnotation(css) {
        let comments = css.match(/\/\*\s*# sourceMappingURL=/g);
        if (!comments) return;
        let start = css.lastIndexOf(comments.pop());
        let end = css.indexOf("*/", start);
        if (start > -1 && end > -1) {
          this.annotation = this.getAnnotationURL(css.substring(start, end));
        }
      }
      loadFile(path) {
        this.root = dirname(path);
        if (existsSync(path)) {
          this.mapFile = path;
          return readFileSync(path, "utf-8").toString().trim();
        }
      }
      loadMap(file, prev) {
        if (prev === false) return false;
        if (prev) {
          if (typeof prev === "string") {
            return prev;
          } else if (typeof prev === "function") {
            let prevPath = prev(file);
            if (prevPath) {
              let map = this.loadFile(prevPath);
              if (!map) {
                throw new Error(
                  "Unable to load previous source map: " + prevPath.toString()
                );
              }
              return map;
            }
          } else if (prev instanceof SourceMapConsumer) {
            return SourceMapGenerator.fromSourceMap(prev).toString();
          } else if (prev instanceof SourceMapGenerator) {
            return prev.toString();
          } else if (this.isMap(prev)) {
            return JSON.stringify(prev);
          } else {
            throw new Error(
              "Unsupported previous source map format: " + prev.toString()
            );
          }
        } else if (this.inline) {
          return this.decodeInline(this.annotation);
        } else if (this.annotation) {
          let map = this.annotation;
          if (file) map = join(dirname(file), map);
          return this.loadFile(map);
        }
      }
      startWith(string, start) {
        if (!string) return false;
        return string.substr(0, start.length) === start;
      }
      withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
      }
    };
    module2.exports = PreviousMap;
    PreviousMap.default = PreviousMap;
  }
});

// node_modules/postcss/lib/input.js
var require_input = __commonJS({
  "node_modules/postcss/lib/input.js"(exports2, module2) {
    "use strict";
    var { nanoid } = require_non_secure();
    var { isAbsolute, resolve } = require("path");
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { fileURLToPath, pathToFileURL } = require("url");
    var CssSyntaxError = require_css_syntax_error();
    var PreviousMap = require_previous_map();
    var terminalHighlight = require_terminal_highlight();
    var fromOffsetCache = Symbol("fromOffsetCache");
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(resolve && isAbsolute);
    var Input = class {
      constructor(css, opts = {}) {
        if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
          throw new Error(`PostCSS received ${css} instead of CSS string`);
        }
        this.css = css.toString();
        if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
          this.hasBOM = true;
          this.css = this.css.slice(1);
        } else {
          this.hasBOM = false;
        }
        if (opts.from) {
          if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
            this.file = opts.from;
          } else {
            this.file = resolve(opts.from);
          }
        }
        if (pathAvailable && sourceMapAvailable) {
          let map = new PreviousMap(this.css, opts);
          if (map.text) {
            this.map = map;
            let file = map.consumer().file;
            if (!this.file && file) this.file = this.mapResolve(file);
          }
        }
        if (!this.file) {
          this.id = "<input css " + nanoid(6) + ">";
        }
        if (this.map) this.map.file = this.from;
      }
      error(message, line, column, opts = {}) {
        let endColumn, endLine, result;
        if (line && typeof line === "object") {
          let start = line;
          let end = column;
          if (typeof start.offset === "number") {
            let pos = this.fromOffset(start.offset);
            line = pos.line;
            column = pos.col;
          } else {
            line = start.line;
            column = start.column;
          }
          if (typeof end.offset === "number") {
            let pos = this.fromOffset(end.offset);
            endLine = pos.line;
            endColumn = pos.col;
          } else {
            endLine = end.line;
            endColumn = end.column;
          }
        } else if (!column) {
          let pos = this.fromOffset(line);
          line = pos.line;
          column = pos.col;
        }
        let origin = this.origin(line, column, endLine, endColumn);
        if (origin) {
          result = new CssSyntaxError(
            message,
            origin.endLine === void 0 ? origin.line : { column: origin.column, line: origin.line },
            origin.endLine === void 0 ? origin.column : { column: origin.endColumn, line: origin.endLine },
            origin.source,
            origin.file,
            opts.plugin
          );
        } else {
          result = new CssSyntaxError(
            message,
            endLine === void 0 ? line : { column, line },
            endLine === void 0 ? column : { column: endColumn, line: endLine },
            this.css,
            this.file,
            opts.plugin
          );
        }
        result.input = { column, endColumn, endLine, line, source: this.css };
        if (this.file) {
          if (pathToFileURL) {
            result.input.url = pathToFileURL(this.file).toString();
          }
          result.input.file = this.file;
        }
        return result;
      }
      fromOffset(offset) {
        let lastLine, lineToIndex;
        if (!this[fromOffsetCache]) {
          let lines = this.css.split("\n");
          lineToIndex = new Array(lines.length);
          let prevIndex = 0;
          for (let i = 0, l = lines.length; i < l; i++) {
            lineToIndex[i] = prevIndex;
            prevIndex += lines[i].length + 1;
          }
          this[fromOffsetCache] = lineToIndex;
        } else {
          lineToIndex = this[fromOffsetCache];
        }
        lastLine = lineToIndex[lineToIndex.length - 1];
        let min = 0;
        if (offset >= lastLine) {
          min = lineToIndex.length - 1;
        } else {
          let max = lineToIndex.length - 2;
          let mid;
          while (min < max) {
            mid = min + (max - min >> 1);
            if (offset < lineToIndex[mid]) {
              max = mid - 1;
            } else if (offset >= lineToIndex[mid + 1]) {
              min = mid + 1;
            } else {
              min = mid;
              break;
            }
          }
        }
        return {
          col: offset - lineToIndex[min] + 1,
          line: min + 1
        };
      }
      mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
          return file;
        }
        return resolve(this.map.consumer().sourceRoot || this.map.root || ".", file);
      }
      origin(line, column, endLine, endColumn) {
        if (!this.map) return false;
        let consumer = this.map.consumer();
        let from = consumer.originalPositionFor({ column, line });
        if (!from.source) return false;
        let to;
        if (typeof endLine === "number") {
          to = consumer.originalPositionFor({ column: endColumn, line: endLine });
        }
        let fromUrl;
        if (isAbsolute(from.source)) {
          fromUrl = pathToFileURL(from.source);
        } else {
          fromUrl = new URL(
            from.source,
            this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
          );
        }
        let result = {
          column: from.column,
          endColumn: to && to.column,
          endLine: to && to.line,
          line: from.line,
          url: fromUrl.toString()
        };
        if (fromUrl.protocol === "file:") {
          if (fileURLToPath) {
            result.file = fileURLToPath(fromUrl);
          } else {
            throw new Error(`file: protocol is not available in this PostCSS build`);
          }
        }
        let source = consumer.sourceContentFor(from.source);
        if (source) result.source = source;
        return result;
      }
      toJSON() {
        let json = {};
        for (let name of ["hasBOM", "css", "file", "id"]) {
          if (this[name] != null) {
            json[name] = this[name];
          }
        }
        if (this.map) {
          json.map = { ...this.map };
          if (json.map.consumerCache) {
            json.map.consumerCache = void 0;
          }
        }
        return json;
      }
      get from() {
        return this.file || this.id;
      }
    };
    module2.exports = Input;
    Input.default = Input;
    if (terminalHighlight && terminalHighlight.registerInput) {
      terminalHighlight.registerInput(Input);
    }
  }
});

// node_modules/postcss/lib/root.js
var require_root = __commonJS({
  "node_modules/postcss/lib/root.js"(exports2, module2) {
    "use strict";
    var Container = require_container();
    var LazyResult;
    var Processor;
    var Root = class extends Container {
      constructor(defaults) {
        super(defaults);
        this.type = "root";
        if (!this.nodes) this.nodes = [];
      }
      normalize(child, sample, type) {
        let nodes = super.normalize(child);
        if (sample) {
          if (type === "prepend") {
            if (this.nodes.length > 1) {
              sample.raws.before = this.nodes[1].raws.before;
            } else {
              delete sample.raws.before;
            }
          } else if (this.first !== sample) {
            for (let node of nodes) {
              node.raws.before = sample.raws.before;
            }
          }
        }
        return nodes;
      }
      removeChild(child, ignore) {
        let index = this.index(child);
        if (!ignore && index === 0 && this.nodes.length > 1) {
          this.nodes[1].raws.before = this.nodes[index].raws.before;
        }
        return super.removeChild(child);
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor(), this, opts);
        return lazy.stringify();
      }
    };
    Root.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Root.registerProcessor = (dependant) => {
      Processor = dependant;
    };
    module2.exports = Root;
    Root.default = Root;
    Container.registerRoot(Root);
  }
});

// node_modules/postcss/lib/list.js
var require_list = __commonJS({
  "node_modules/postcss/lib/list.js"(exports2, module2) {
    "use strict";
    var list = {
      comma(string) {
        return list.split(string, [","], true);
      },
      space(string) {
        let spaces = [" ", "\n", "	"];
        return list.split(string, spaces);
      },
      split(string, separators, last) {
        let array = [];
        let current = "";
        let split = false;
        let func = 0;
        let inQuote = false;
        let prevQuote = "";
        let escape = false;
        for (let letter of string) {
          if (escape) {
            escape = false;
          } else if (letter === "\\") {
            escape = true;
          } else if (inQuote) {
            if (letter === prevQuote) {
              inQuote = false;
            }
          } else if (letter === '"' || letter === "'") {
            inQuote = true;
            prevQuote = letter;
          } else if (letter === "(") {
            func += 1;
          } else if (letter === ")") {
            if (func > 0) func -= 1;
          } else if (func === 0) {
            if (separators.includes(letter)) split = true;
          }
          if (split) {
            if (current !== "") array.push(current.trim());
            current = "";
            split = false;
          } else {
            current += letter;
          }
        }
        if (last || current !== "") array.push(current.trim());
        return array;
      }
    };
    module2.exports = list;
    list.default = list;
  }
});

// node_modules/postcss/lib/rule.js
var require_rule = __commonJS({
  "node_modules/postcss/lib/rule.js"(exports2, module2) {
    "use strict";
    var Container = require_container();
    var list = require_list();
    var Rule = class extends Container {
      constructor(defaults) {
        super(defaults);
        this.type = "rule";
        if (!this.nodes) this.nodes = [];
      }
      get selectors() {
        return list.comma(this.selector);
      }
      set selectors(values) {
        let match = this.selector ? this.selector.match(/,\s*/) : null;
        let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
        this.selector = values.join(sep);
      }
    };
    module2.exports = Rule;
    Rule.default = Rule;
    Container.registerRule(Rule);
  }
});

// node_modules/postcss/lib/fromJSON.js
var require_fromJSON = __commonJS({
  "node_modules/postcss/lib/fromJSON.js"(exports2, module2) {
    "use strict";
    var AtRule = require_at_rule();
    var Comment = require_comment();
    var Declaration = require_declaration();
    var Input = require_input();
    var PreviousMap = require_previous_map();
    var Root = require_root();
    var Rule = require_rule();
    function fromJSON(json, inputs) {
      if (Array.isArray(json)) return json.map((n) => fromJSON(n));
      let { inputs: ownInputs, ...defaults } = json;
      if (ownInputs) {
        inputs = [];
        for (let input of ownInputs) {
          let inputHydrated = { ...input, __proto__: Input.prototype };
          if (inputHydrated.map) {
            inputHydrated.map = {
              ...inputHydrated.map,
              __proto__: PreviousMap.prototype
            };
          }
          inputs.push(inputHydrated);
        }
      }
      if (defaults.nodes) {
        defaults.nodes = json.nodes.map((n) => fromJSON(n, inputs));
      }
      if (defaults.source) {
        let { inputId, ...source } = defaults.source;
        defaults.source = source;
        if (inputId != null) {
          defaults.source.input = inputs[inputId];
        }
      }
      if (defaults.type === "root") {
        return new Root(defaults);
      } else if (defaults.type === "decl") {
        return new Declaration(defaults);
      } else if (defaults.type === "rule") {
        return new Rule(defaults);
      } else if (defaults.type === "comment") {
        return new Comment(defaults);
      } else if (defaults.type === "atrule") {
        return new AtRule(defaults);
      } else {
        throw new Error("Unknown node type: " + json.type);
      }
    }
    module2.exports = fromJSON;
    fromJSON.default = fromJSON;
  }
});

// node_modules/postcss/lib/map-generator.js
var require_map_generator = __commonJS({
  "node_modules/postcss/lib/map-generator.js"(exports2, module2) {
    "use strict";
    var { dirname, relative, resolve, sep } = require("path");
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { pathToFileURL } = require("url");
    var Input = require_input();
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(dirname && resolve && relative && sep);
    var MapGenerator = class {
      constructor(stringify, root, opts, cssString) {
        this.stringify = stringify;
        this.mapOpts = opts.map || {};
        this.root = root;
        this.opts = opts;
        this.css = cssString;
        this.originalCSS = cssString;
        this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
        this.memoizedFileURLs = /* @__PURE__ */ new Map();
        this.memoizedPaths = /* @__PURE__ */ new Map();
        this.memoizedURLs = /* @__PURE__ */ new Map();
      }
      addAnnotation() {
        let content;
        if (this.isInline()) {
          content = "data:application/json;base64," + this.toBase64(this.map.toString());
        } else if (typeof this.mapOpts.annotation === "string") {
          content = this.mapOpts.annotation;
        } else if (typeof this.mapOpts.annotation === "function") {
          content = this.mapOpts.annotation(this.opts.to, this.root);
        } else {
          content = this.outputFile() + ".map";
        }
        let eol = "\n";
        if (this.css.includes("\r\n")) eol = "\r\n";
        this.css += eol + "/*# sourceMappingURL=" + content + " */";
      }
      applyPrevMaps() {
        for (let prev of this.previous()) {
          let from = this.toUrl(this.path(prev.file));
          let root = prev.root || dirname(prev.file);
          let map;
          if (this.mapOpts.sourcesContent === false) {
            map = new SourceMapConsumer(prev.text);
            if (map.sourcesContent) {
              map.sourcesContent = null;
            }
          } else {
            map = prev.consumer();
          }
          this.map.applySourceMap(map, from, this.toUrl(this.path(root)));
        }
      }
      clearAnnotation() {
        if (this.mapOpts.annotation === false) return;
        if (this.root) {
          let node;
          for (let i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type !== "comment") continue;
            if (node.text.startsWith("# sourceMappingURL=")) {
              this.root.removeChild(i);
            }
          }
        } else if (this.css) {
          this.css = this.css.replace(/\n*\/\*#[\S\s]*?\*\/$/gm, "");
        }
      }
      generate() {
        this.clearAnnotation();
        if (pathAvailable && sourceMapAvailable && this.isMap()) {
          return this.generateMap();
        } else {
          let result = "";
          this.stringify(this.root, (i) => {
            result += i;
          });
          return [result];
        }
      }
      generateMap() {
        if (this.root) {
          this.generateString();
        } else if (this.previous().length === 1) {
          let prev = this.previous()[0].consumer();
          prev.file = this.outputFile();
          this.map = SourceMapGenerator.fromSourceMap(prev, {
            ignoreInvalidMapping: true
          });
        } else {
          this.map = new SourceMapGenerator({
            file: this.outputFile(),
            ignoreInvalidMapping: true
          });
          this.map.addMapping({
            generated: { column: 0, line: 1 },
            original: { column: 0, line: 1 },
            source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>"
          });
        }
        if (this.isSourcesContent()) this.setSourcesContent();
        if (this.root && this.previous().length > 0) this.applyPrevMaps();
        if (this.isAnnotation()) this.addAnnotation();
        if (this.isInline()) {
          return [this.css];
        } else {
          return [this.css, this.map];
        }
      }
      generateString() {
        this.css = "";
        this.map = new SourceMapGenerator({
          file: this.outputFile(),
          ignoreInvalidMapping: true
        });
        let line = 1;
        let column = 1;
        let noSource = "<no source>";
        let mapping = {
          generated: { column: 0, line: 0 },
          original: { column: 0, line: 0 },
          source: ""
        };
        let last, lines;
        this.stringify(this.root, (str, node, type) => {
          this.css += str;
          if (node && type !== "end") {
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            if (node.source && node.source.start) {
              mapping.source = this.sourcePath(node);
              mapping.original.line = node.source.start.line;
              mapping.original.column = node.source.start.column - 1;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              this.map.addMapping(mapping);
            }
          }
          lines = str.match(/\n/g);
          if (lines) {
            line += lines.length;
            last = str.lastIndexOf("\n");
            column = str.length - last;
          } else {
            column += str.length;
          }
          if (node && type !== "start") {
            let p = node.parent || { raws: {} };
            let childless = node.type === "decl" || node.type === "atrule" && !node.nodes;
            if (!childless || node !== p.last || p.raws.semicolon) {
              if (node.source && node.source.end) {
                mapping.source = this.sourcePath(node);
                mapping.original.line = node.source.end.line;
                mapping.original.column = node.source.end.column - 1;
                mapping.generated.line = line;
                mapping.generated.column = column - 2;
                this.map.addMapping(mapping);
              } else {
                mapping.source = noSource;
                mapping.original.line = 1;
                mapping.original.column = 0;
                mapping.generated.line = line;
                mapping.generated.column = column - 1;
                this.map.addMapping(mapping);
              }
            }
          }
        });
      }
      isAnnotation() {
        if (this.isInline()) {
          return true;
        }
        if (typeof this.mapOpts.annotation !== "undefined") {
          return this.mapOpts.annotation;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.annotation);
        }
        return true;
      }
      isInline() {
        if (typeof this.mapOpts.inline !== "undefined") {
          return this.mapOpts.inline;
        }
        let annotation = this.mapOpts.annotation;
        if (typeof annotation !== "undefined" && annotation !== true) {
          return false;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.inline);
        }
        return true;
      }
      isMap() {
        if (typeof this.opts.map !== "undefined") {
          return !!this.opts.map;
        }
        return this.previous().length > 0;
      }
      isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent !== "undefined") {
          return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.withContent());
        }
        return true;
      }
      outputFile() {
        if (this.opts.to) {
          return this.path(this.opts.to);
        } else if (this.opts.from) {
          return this.path(this.opts.from);
        } else {
          return "to.css";
        }
      }
      path(file) {
        if (this.mapOpts.absolute) return file;
        if (file.charCodeAt(0) === 60) return file;
        if (/^\w+:\/\//.test(file)) return file;
        let cached = this.memoizedPaths.get(file);
        if (cached) return cached;
        let from = this.opts.to ? dirname(this.opts.to) : ".";
        if (typeof this.mapOpts.annotation === "string") {
          from = dirname(resolve(from, this.mapOpts.annotation));
        }
        let path = relative(from, file);
        this.memoizedPaths.set(file, path);
        return path;
      }
      previous() {
        if (!this.previousMaps) {
          this.previousMaps = [];
          if (this.root) {
            this.root.walk((node) => {
              if (node.source && node.source.input.map) {
                let map = node.source.input.map;
                if (!this.previousMaps.includes(map)) {
                  this.previousMaps.push(map);
                }
              }
            });
          } else {
            let input = new Input(this.originalCSS, this.opts);
            if (input.map) this.previousMaps.push(input.map);
          }
        }
        return this.previousMaps;
      }
      setSourcesContent() {
        let already = {};
        if (this.root) {
          this.root.walk((node) => {
            if (node.source) {
              let from = node.source.input.from;
              if (from && !already[from]) {
                already[from] = true;
                let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
                this.map.setSourceContent(fromUrl, node.source.input.css);
              }
            }
          });
        } else if (this.css) {
          let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
          this.map.setSourceContent(from, this.css);
        }
      }
      sourcePath(node) {
        if (this.mapOpts.from) {
          return this.toUrl(this.mapOpts.from);
        } else if (this.usesFileUrls) {
          return this.toFileUrl(node.source.input.from);
        } else {
          return this.toUrl(this.path(node.source.input.from));
        }
      }
      toBase64(str) {
        if (Buffer) {
          return Buffer.from(str).toString("base64");
        } else {
          return window.btoa(unescape(encodeURIComponent(str)));
        }
      }
      toFileUrl(path) {
        let cached = this.memoizedFileURLs.get(path);
        if (cached) return cached;
        if (pathToFileURL) {
          let fileURL = pathToFileURL(path).toString();
          this.memoizedFileURLs.set(path, fileURL);
          return fileURL;
        } else {
          throw new Error(
            "`map.absolute` option is not available in this PostCSS build"
          );
        }
      }
      toUrl(path) {
        let cached = this.memoizedURLs.get(path);
        if (cached) return cached;
        if (sep === "\\") {
          path = path.replace(/\\/g, "/");
        }
        let url = encodeURI(path).replace(/[#?]/g, encodeURIComponent);
        this.memoizedURLs.set(path, url);
        return url;
      }
    };
    module2.exports = MapGenerator;
  }
});

// node_modules/postcss/lib/parser.js
var require_parser = __commonJS({
  "node_modules/postcss/lib/parser.js"(exports2, module2) {
    "use strict";
    var AtRule = require_at_rule();
    var Comment = require_comment();
    var Declaration = require_declaration();
    var Root = require_root();
    var Rule = require_rule();
    var tokenizer = require_tokenize();
    var SAFE_COMMENT_NEIGHBOR = {
      empty: true,
      space: true
    };
    function findLastWithPosition(tokens) {
      for (let i = tokens.length - 1; i >= 0; i--) {
        let token = tokens[i];
        let pos = token[3] || token[2];
        if (pos) return pos;
      }
    }
    var Parser = class {
      constructor(input) {
        this.input = input;
        this.root = new Root();
        this.current = this.root;
        this.spaces = "";
        this.semicolon = false;
        this.createTokenizer();
        this.root.source = { input, start: { column: 1, line: 1, offset: 0 } };
      }
      atrule(token) {
        let node = new AtRule();
        node.name = token[1].slice(1);
        if (node.name === "") {
          this.unnamedAtrule(node, token);
        }
        this.init(node, token[2]);
        let type;
        let prev;
        let shift;
        let last = false;
        let open = false;
        let params = [];
        let brackets = [];
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          type = token[0];
          if (type === "(" || type === "[") {
            brackets.push(type === "(" ? ")" : "]");
          } else if (type === "{" && brackets.length > 0) {
            brackets.push("}");
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
          }
          if (brackets.length === 0) {
            if (type === ";") {
              node.source.end = this.getPosition(token[2]);
              node.source.end.offset++;
              this.semicolon = true;
              break;
            } else if (type === "{") {
              open = true;
              break;
            } else if (type === "}") {
              if (params.length > 0) {
                shift = params.length - 1;
                prev = params[shift];
                while (prev && prev[0] === "space") {
                  prev = params[--shift];
                }
                if (prev) {
                  node.source.end = this.getPosition(prev[3] || prev[2]);
                  node.source.end.offset++;
                }
              }
              this.end(token);
              break;
            } else {
              params.push(token);
            }
          } else {
            params.push(token);
          }
          if (this.tokenizer.endOfFile()) {
            last = true;
            break;
          }
        }
        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
          node.raws.afterName = this.spacesAndCommentsFromStart(params);
          this.raw(node, "params", params);
          if (last) {
            token = params[params.length - 1];
            node.source.end = this.getPosition(token[3] || token[2]);
            node.source.end.offset++;
            this.spaces = node.raws.between;
            node.raws.between = "";
          }
        } else {
          node.raws.afterName = "";
          node.params = "";
        }
        if (open) {
          node.nodes = [];
          this.current = node;
        }
      }
      checkMissedSemicolon(tokens) {
        let colon = this.colon(tokens);
        if (colon === false) return;
        let founded = 0;
        let token;
        for (let j = colon - 1; j >= 0; j--) {
          token = tokens[j];
          if (token[0] !== "space") {
            founded += 1;
            if (founded === 2) break;
          }
        }
        throw this.input.error(
          "Missed semicolon",
          token[0] === "word" ? token[3] + 1 : token[2]
        );
      }
      colon(tokens) {
        let brackets = 0;
        let prev, token, type;
        for (let [i, element] of tokens.entries()) {
          token = element;
          type = token[0];
          if (type === "(") {
            brackets += 1;
          }
          if (type === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i;
            }
          }
          prev = token;
        }
        return false;
      }
      comment(token) {
        let node = new Comment();
        this.init(node, token[2]);
        node.source.end = this.getPosition(token[3] || token[2]);
        node.source.end.offset++;
        let text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.right = match[3];
        }
      }
      createTokenizer() {
        this.tokenizer = tokenizer(this.input);
      }
      decl(tokens, customProperty) {
        let node = new Declaration();
        this.init(node, tokens[0][2]);
        let last = tokens[tokens.length - 1];
        if (last[0] === ";") {
          this.semicolon = true;
          tokens.pop();
        }
        node.source.end = this.getPosition(
          last[3] || last[2] || findLastWithPosition(tokens)
        );
        node.source.end.offset++;
        while (tokens[0][0] !== "word") {
          if (tokens.length === 1) this.unknownWord(tokens);
          node.raws.before += tokens.shift()[1];
        }
        node.source.start = this.getPosition(tokens[0][2]);
        node.prop = "";
        while (tokens.length) {
          let type = tokens[0][0];
          if (type === ":" || type === "space" || type === "comment") {
            break;
          }
          node.prop += tokens.shift()[1];
        }
        node.raws.between = "";
        let token;
        while (tokens.length) {
          token = tokens.shift();
          if (token[0] === ":") {
            node.raws.between += token[1];
            break;
          } else {
            if (token[0] === "word" && /\w/.test(token[1])) {
              this.unknownWord([token]);
            }
            node.raws.between += token[1];
          }
        }
        if (node.prop[0] === "_" || node.prop[0] === "*") {
          node.raws.before += node.prop[0];
          node.prop = node.prop.slice(1);
        }
        let firstSpaces = [];
        let next;
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment") break;
          firstSpaces.push(tokens.shift());
        }
        this.precheckMissedSemicolon(tokens);
        for (let i = tokens.length - 1; i >= 0; i--) {
          token = tokens[i];
          if (token[1].toLowerCase() === "!important") {
            node.important = true;
            let string = this.stringFrom(tokens, i);
            string = this.spacesFromEnd(tokens) + string;
            if (string !== " !important") node.raws.important = string;
            break;
          } else if (token[1].toLowerCase() === "important") {
            let cache = tokens.slice(0);
            let str = "";
            for (let j = i; j > 0; j--) {
              let type = cache[j][0];
              if (str.trim().startsWith("!") && type !== "space") {
                break;
              }
              str = cache.pop()[1] + str;
            }
            if (str.trim().startsWith("!")) {
              node.important = true;
              node.raws.important = str;
              tokens = cache;
            }
          }
          if (token[0] !== "space" && token[0] !== "comment") {
            break;
          }
        }
        let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
        if (hasWord) {
          node.raws.between += firstSpaces.map((i) => i[1]).join("");
          firstSpaces = [];
        }
        this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
        if (node.value.includes(":") && !customProperty) {
          this.checkMissedSemicolon(tokens);
        }
      }
      doubleColon(token) {
        throw this.input.error(
          "Double colon",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
      emptyRule(token) {
        let node = new Rule();
        this.init(node, token[2]);
        node.selector = "";
        node.raws.between = "";
        this.current = node;
      }
      end(token) {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.spaces = "";
        if (this.current.parent) {
          this.current.source.end = this.getPosition(token[2]);
          this.current.source.end.offset++;
          this.current = this.current.parent;
        } else {
          this.unexpectedClose(token);
        }
      }
      endFile() {
        if (this.current.parent) this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.root.source.end = this.getPosition(this.tokenizer.position());
      }
      freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
          let prev = this.current.nodes[this.current.nodes.length - 1];
          if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
            prev.raws.ownSemicolon = this.spaces;
            this.spaces = "";
          }
        }
      }
      // Helpers
      getPosition(offset) {
        let pos = this.input.fromOffset(offset);
        return {
          column: pos.col,
          line: pos.line,
          offset
        };
      }
      init(node, offset) {
        this.current.push(node);
        node.source = {
          input: this.input,
          start: this.getPosition(offset)
        };
        node.raws.before = this.spaces;
        this.spaces = "";
        if (node.type !== "comment") this.semicolon = false;
      }
      other(start) {
        let end = false;
        let type = null;
        let colon = false;
        let bracket = null;
        let brackets = [];
        let customProperty = start[1].startsWith("--");
        let tokens = [];
        let token = start;
        while (token) {
          type = token[0];
          tokens.push(token);
          if (type === "(" || type === "[") {
            if (!bracket) bracket = token;
            brackets.push(type === "(" ? ")" : "]");
          } else if (customProperty && colon && type === "{") {
            if (!bracket) bracket = token;
            brackets.push("}");
          } else if (brackets.length === 0) {
            if (type === ";") {
              if (colon) {
                this.decl(tokens, customProperty);
                return;
              } else {
                break;
              }
            } else if (type === "{") {
              this.rule(tokens);
              return;
            } else if (type === "}") {
              this.tokenizer.back(tokens.pop());
              end = true;
              break;
            } else if (type === ":") {
              colon = true;
            }
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
            if (brackets.length === 0) bracket = null;
          }
          token = this.tokenizer.nextToken();
        }
        if (this.tokenizer.endOfFile()) end = true;
        if (brackets.length > 0) this.unclosedBracket(bracket);
        if (end && colon) {
          if (!customProperty) {
            while (tokens.length) {
              token = tokens[tokens.length - 1][0];
              if (token !== "space" && token !== "comment") break;
              this.tokenizer.back(tokens.pop());
            }
          }
          this.decl(tokens, customProperty);
        } else {
          this.unknownWord(tokens);
        }
      }
      parse() {
        let token;
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          switch (token[0]) {
            case "space":
              this.spaces += token[1];
              break;
            case ";":
              this.freeSemicolon(token);
              break;
            case "}":
              this.end(token);
              break;
            case "comment":
              this.comment(token);
              break;
            case "at-word":
              this.atrule(token);
              break;
            case "{":
              this.emptyRule(token);
              break;
            default:
              this.other(token);
              break;
          }
        }
        this.endFile();
      }
      precheckMissedSemicolon() {
      }
      raw(node, prop, tokens, customProperty) {
        let token, type;
        let length = tokens.length;
        let value = "";
        let clean = true;
        let next, prev;
        for (let i = 0; i < length; i += 1) {
          token = tokens[i];
          type = token[0];
          if (type === "space" && i === length - 1 && !customProperty) {
            clean = false;
          } else if (type === "comment") {
            prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
            next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
            if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
              if (value.slice(-1) === ",") {
                clean = false;
              } else {
                value += token[1];
              }
            } else {
              clean = false;
            }
          } else {
            value += token[1];
          }
        }
        if (!clean) {
          let raw = tokens.reduce((all, i) => all + i[1], "");
          node.raws[prop] = { raw, value };
        }
        node[prop] = value;
      }
      rule(tokens) {
        tokens.pop();
        let node = new Rule();
        this.init(node, tokens[0][2]);
        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, "selector", tokens);
        this.current = node;
      }
      spacesAndCommentsFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space" && lastTokenType !== "comment") break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      // Errors
      spacesAndCommentsFromStart(tokens) {
        let next;
        let spaces = "";
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment") break;
          spaces += tokens.shift()[1];
        }
        return spaces;
      }
      spacesFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space") break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      stringFrom(tokens, from) {
        let result = "";
        for (let i = from; i < tokens.length; i++) {
          result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
      }
      unclosedBlock() {
        let pos = this.current.source.start;
        throw this.input.error("Unclosed block", pos.line, pos.column);
      }
      unclosedBracket(bracket) {
        throw this.input.error(
          "Unclosed bracket",
          { offset: bracket[2] },
          { offset: bracket[2] + 1 }
        );
      }
      unexpectedClose(token) {
        throw this.input.error(
          "Unexpected }",
          { offset: token[2] },
          { offset: token[2] + 1 }
        );
      }
      unknownWord(tokens) {
        throw this.input.error(
          "Unknown word",
          { offset: tokens[0][2] },
          { offset: tokens[0][2] + tokens[0][1].length }
        );
      }
      unnamedAtrule(node, token) {
        throw this.input.error(
          "At-rule without name",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
    };
    module2.exports = Parser;
  }
});

// node_modules/postcss/lib/parse.js
var require_parse = __commonJS({
  "node_modules/postcss/lib/parse.js"(exports2, module2) {
    "use strict";
    var Container = require_container();
    var Input = require_input();
    var Parser = require_parser();
    function parse(css, opts) {
      let input = new Input(css, opts);
      let parser = new Parser(input);
      try {
        parser.parse();
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          if (e.name === "CssSyntaxError" && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
              e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
            } else if (/\.sass/i.test(opts.from)) {
              e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
            } else if (/\.less$/i.test(opts.from)) {
              e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
            }
          }
        }
        throw e;
      }
      return parser.root;
    }
    module2.exports = parse;
    parse.default = parse;
    Container.registerParse(parse);
  }
});

// node_modules/postcss/lib/warning.js
var require_warning = __commonJS({
  "node_modules/postcss/lib/warning.js"(exports2, module2) {
    "use strict";
    var Warning = class {
      constructor(text, opts = {}) {
        this.type = "warning";
        this.text = text;
        if (opts.node && opts.node.source) {
          let range = opts.node.rangeBy(opts);
          this.line = range.start.line;
          this.column = range.start.column;
          this.endLine = range.end.line;
          this.endColumn = range.end.column;
        }
        for (let opt in opts) this[opt] = opts[opt];
      }
      toString() {
        if (this.node) {
          return this.node.error(this.text, {
            index: this.index,
            plugin: this.plugin,
            word: this.word
          }).message;
        }
        if (this.plugin) {
          return this.plugin + ": " + this.text;
        }
        return this.text;
      }
    };
    module2.exports = Warning;
    Warning.default = Warning;
  }
});

// node_modules/postcss/lib/result.js
var require_result = __commonJS({
  "node_modules/postcss/lib/result.js"(exports2, module2) {
    "use strict";
    var Warning = require_warning();
    var Result = class {
      constructor(processor, root, opts) {
        this.processor = processor;
        this.messages = [];
        this.root = root;
        this.opts = opts;
        this.css = void 0;
        this.map = void 0;
      }
      toString() {
        return this.css;
      }
      warn(text, opts = {}) {
        if (!opts.plugin) {
          if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
            opts.plugin = this.lastPlugin.postcssPlugin;
          }
        }
        let warning = new Warning(text, opts);
        this.messages.push(warning);
        return warning;
      }
      warnings() {
        return this.messages.filter((i) => i.type === "warning");
      }
      get content() {
        return this.css;
      }
    };
    module2.exports = Result;
    Result.default = Result;
  }
});

// node_modules/postcss/lib/warn-once.js
var require_warn_once = __commonJS({
  "node_modules/postcss/lib/warn-once.js"(exports2, module2) {
    "use strict";
    var printed = {};
    module2.exports = function warnOnce(message) {
      if (printed[message]) return;
      printed[message] = true;
      if (typeof console !== "undefined" && console.warn) {
        console.warn(message);
      }
    };
  }
});

// node_modules/postcss/lib/lazy-result.js
var require_lazy_result = __commonJS({
  "node_modules/postcss/lib/lazy-result.js"(exports2, module2) {
    "use strict";
    var Container = require_container();
    var Document = require_document();
    var MapGenerator = require_map_generator();
    var parse = require_parse();
    var Result = require_result();
    var Root = require_root();
    var stringify = require_stringify();
    var { isClean, my } = require_symbols();
    var warnOnce = require_warn_once();
    var TYPE_TO_CLASS_NAME = {
      atrule: "AtRule",
      comment: "Comment",
      decl: "Declaration",
      document: "Document",
      root: "Root",
      rule: "Rule"
    };
    var PLUGIN_PROPS = {
      AtRule: true,
      AtRuleExit: true,
      Comment: true,
      CommentExit: true,
      Declaration: true,
      DeclarationExit: true,
      Document: true,
      DocumentExit: true,
      Once: true,
      OnceExit: true,
      postcssPlugin: true,
      prepare: true,
      Root: true,
      RootExit: true,
      Rule: true,
      RuleExit: true
    };
    var NOT_VISITORS = {
      Once: true,
      postcssPlugin: true,
      prepare: true
    };
    var CHILDREN = 0;
    function isPromise(obj) {
      return typeof obj === "object" && typeof obj.then === "function";
    }
    function getEvents(node) {
      let key = false;
      let type = TYPE_TO_CLASS_NAME[node.type];
      if (node.type === "decl") {
        key = node.prop.toLowerCase();
      } else if (node.type === "atrule") {
        key = node.name.toLowerCase();
      }
      if (key && node.append) {
        return [
          type,
          type + "-" + key,
          CHILDREN,
          type + "Exit",
          type + "Exit-" + key
        ];
      } else if (key) {
        return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
      } else if (node.append) {
        return [type, CHILDREN, type + "Exit"];
      } else {
        return [type, type + "Exit"];
      }
    }
    function toStack(node) {
      let events;
      if (node.type === "document") {
        events = ["Document", CHILDREN, "DocumentExit"];
      } else if (node.type === "root") {
        events = ["Root", CHILDREN, "RootExit"];
      } else {
        events = getEvents(node);
      }
      return {
        eventIndex: 0,
        events,
        iterator: 0,
        node,
        visitorIndex: 0,
        visitors: []
      };
    }
    function cleanMarks(node) {
      node[isClean] = false;
      if (node.nodes) node.nodes.forEach((i) => cleanMarks(i));
      return node;
    }
    var postcss = {};
    var LazyResult = class _LazyResult {
      constructor(processor, css, opts) {
        this.stringified = false;
        this.processed = false;
        let root;
        if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
          root = cleanMarks(css);
        } else if (css instanceof _LazyResult || css instanceof Result) {
          root = cleanMarks(css.root);
          if (css.map) {
            if (typeof opts.map === "undefined") opts.map = {};
            if (!opts.map.inline) opts.map.inline = false;
            opts.map.prev = css.map;
          }
        } else {
          let parser = parse;
          if (opts.syntax) parser = opts.syntax.parse;
          if (opts.parser) parser = opts.parser;
          if (parser.parse) parser = parser.parse;
          try {
            root = parser(css, opts);
          } catch (error) {
            this.processed = true;
            this.error = error;
          }
          if (root && !root[my]) {
            Container.rebuild(root);
          }
        }
        this.result = new Result(processor, root, opts);
        this.helpers = { ...postcss, postcss, result: this.result };
        this.plugins = this.processor.plugins.map((plugin) => {
          if (typeof plugin === "object" && plugin.prepare) {
            return { ...plugin, ...plugin.prepare(this.result) };
          } else {
            return plugin;
          }
        });
      }
      async() {
        if (this.error) return Promise.reject(this.error);
        if (this.processed) return Promise.resolve(this.result);
        if (!this.processing) {
          this.processing = this.runAsync();
        }
        return this.processing;
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(error, node) {
        let plugin = this.result.lastPlugin;
        try {
          if (node) node.addToError(error);
          this.error = error;
          if (error.name === "CssSyntaxError" && !error.plugin) {
            error.plugin = plugin.postcssPlugin;
            error.setMessage();
          } else if (plugin.postcssVersion) {
            if (process.env.NODE_ENV !== "production") {
              let pluginName = plugin.postcssPlugin;
              let pluginVer = plugin.postcssVersion;
              let runtimeVer = this.result.processor.version;
              let a = pluginVer.split(".");
              let b = runtimeVer.split(".");
              if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                console.error(
                  "Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below."
                );
              }
            }
          }
        } catch (err) {
          if (console && console.error) console.error(err);
        }
        return error;
      }
      prepareVisitors() {
        this.listeners = {};
        let add = (plugin, type, cb) => {
          if (!this.listeners[type]) this.listeners[type] = [];
          this.listeners[type].push([plugin, cb]);
        };
        for (let plugin of this.plugins) {
          if (typeof plugin === "object") {
            for (let event in plugin) {
              if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
                throw new Error(
                  `Unknown event ${event} in ${plugin.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
                );
              }
              if (!NOT_VISITORS[event]) {
                if (typeof plugin[event] === "object") {
                  for (let filter in plugin[event]) {
                    if (filter === "*") {
                      add(plugin, event, plugin[event][filter]);
                    } else {
                      add(
                        plugin,
                        event + "-" + filter.toLowerCase(),
                        plugin[event][filter]
                      );
                    }
                  }
                } else if (typeof plugin[event] === "function") {
                  add(plugin, event, plugin[event]);
                }
              }
            }
          }
        }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      async runAsync() {
        this.plugin = 0;
        for (let i = 0; i < this.plugins.length; i++) {
          let plugin = this.plugins[i];
          let promise = this.runOnRoot(plugin);
          if (isPromise(promise)) {
            try {
              await promise;
            } catch (error) {
              throw this.handleError(error);
            }
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root = this.result.root;
          while (!root[isClean]) {
            root[isClean] = true;
            let stack = [toStack(root)];
            while (stack.length > 0) {
              let promise = this.visitTick(stack);
              if (isPromise(promise)) {
                try {
                  await promise;
                } catch (e) {
                  let node = stack[stack.length - 1].node;
                  throw this.handleError(e, node);
                }
              }
            }
          }
          if (this.listeners.OnceExit) {
            for (let [plugin, visitor] of this.listeners.OnceExit) {
              this.result.lastPlugin = plugin;
              try {
                if (root.type === "document") {
                  let roots = root.nodes.map(
                    (subRoot) => visitor(subRoot, this.helpers)
                  );
                  await Promise.all(roots);
                } else {
                  await visitor(root, this.helpers);
                }
              } catch (e) {
                throw this.handleError(e);
              }
            }
          }
        }
        this.processed = true;
        return this.stringify();
      }
      runOnRoot(plugin) {
        this.result.lastPlugin = plugin;
        try {
          if (typeof plugin === "object" && plugin.Once) {
            if (this.result.root.type === "document") {
              let roots = this.result.root.nodes.map(
                (root) => plugin.Once(root, this.helpers)
              );
              if (isPromise(roots[0])) {
                return Promise.all(roots);
              }
              return roots;
            }
            return plugin.Once(this.result.root, this.helpers);
          } else if (typeof plugin === "function") {
            return plugin(this.result.root, this.result);
          }
        } catch (error) {
          throw this.handleError(error);
        }
      }
      stringify() {
        if (this.error) throw this.error;
        if (this.stringified) return this.result;
        this.stringified = true;
        this.sync();
        let opts = this.result.opts;
        let str = stringify;
        if (opts.syntax) str = opts.syntax.stringify;
        if (opts.stringifier) str = opts.stringifier;
        if (str.stringify) str = str.stringify;
        let map = new MapGenerator(str, this.result.root, this.result.opts);
        let data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];
        return this.result;
      }
      sync() {
        if (this.error) throw this.error;
        if (this.processed) return this.result;
        this.processed = true;
        if (this.processing) {
          throw this.getAsyncError();
        }
        for (let plugin of this.plugins) {
          let promise = this.runOnRoot(plugin);
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root = this.result.root;
          while (!root[isClean]) {
            root[isClean] = true;
            this.walkSync(root);
          }
          if (this.listeners.OnceExit) {
            if (root.type === "document") {
              for (let subRoot of root.nodes) {
                this.visitSync(this.listeners.OnceExit, subRoot);
              }
            } else {
              this.visitSync(this.listeners.OnceExit, root);
            }
          }
        }
        return this.result;
      }
      then(onFulfilled, onRejected) {
        if (process.env.NODE_ENV !== "production") {
          if (!("from" in this.opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      toString() {
        return this.css;
      }
      visitSync(visitors, node) {
        for (let [plugin, visitor] of visitors) {
          this.result.lastPlugin = plugin;
          let promise;
          try {
            promise = visitor(node, this.helpers);
          } catch (e) {
            throw this.handleError(e, node.proxyOf);
          }
          if (node.type !== "root" && node.type !== "document" && !node.parent) {
            return true;
          }
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
      }
      visitTick(stack) {
        let visit = stack[stack.length - 1];
        let { node, visitors } = visit;
        if (node.type !== "root" && node.type !== "document" && !node.parent) {
          stack.pop();
          return;
        }
        if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
          let [plugin, visitor] = visitors[visit.visitorIndex];
          visit.visitorIndex += 1;
          if (visit.visitorIndex === visitors.length) {
            visit.visitors = [];
            visit.visitorIndex = 0;
          }
          this.result.lastPlugin = plugin;
          try {
            return visitor(node.toProxy(), this.helpers);
          } catch (e) {
            throw this.handleError(e, node);
          }
        }
        if (visit.iterator !== 0) {
          let iterator = visit.iterator;
          let child;
          while (child = node.nodes[node.indexes[iterator]]) {
            node.indexes[iterator] += 1;
            if (!child[isClean]) {
              child[isClean] = true;
              stack.push(toStack(child));
              return;
            }
          }
          visit.iterator = 0;
          delete node.indexes[iterator];
        }
        let events = visit.events;
        while (visit.eventIndex < events.length) {
          let event = events[visit.eventIndex];
          visit.eventIndex += 1;
          if (event === CHILDREN) {
            if (node.nodes && node.nodes.length) {
              node[isClean] = true;
              visit.iterator = node.getIterator();
            }
            return;
          } else if (this.listeners[event]) {
            visit.visitors = this.listeners[event];
            return;
          }
        }
        stack.pop();
      }
      walkSync(node) {
        node[isClean] = true;
        let events = getEvents(node);
        for (let event of events) {
          if (event === CHILDREN) {
            if (node.nodes) {
              node.each((child) => {
                if (!child[isClean]) this.walkSync(child);
              });
            }
          } else {
            let visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, node.toProxy())) return;
            }
          }
        }
      }
      warnings() {
        return this.sync().warnings();
      }
      get content() {
        return this.stringify().content;
      }
      get css() {
        return this.stringify().css;
      }
      get map() {
        return this.stringify().map;
      }
      get messages() {
        return this.sync().messages;
      }
      get opts() {
        return this.result.opts;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        return this.sync().root;
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
    };
    LazyResult.registerPostcss = (dependant) => {
      postcss = dependant;
    };
    module2.exports = LazyResult;
    LazyResult.default = LazyResult;
    Root.registerLazyResult(LazyResult);
    Document.registerLazyResult(LazyResult);
  }
});

// node_modules/postcss/lib/no-work-result.js
var require_no_work_result = __commonJS({
  "node_modules/postcss/lib/no-work-result.js"(exports2, module2) {
    "use strict";
    var MapGenerator = require_map_generator();
    var parse = require_parse();
    var Result = require_result();
    var stringify = require_stringify();
    var warnOnce = require_warn_once();
    var NoWorkResult = class {
      constructor(processor, css, opts) {
        css = css.toString();
        this.stringified = false;
        this._processor = processor;
        this._css = css;
        this._opts = opts;
        this._map = void 0;
        let root;
        let str = stringify;
        this.result = new Result(this._processor, root, this._opts);
        this.result.css = css;
        let self = this;
        Object.defineProperty(this.result, "root", {
          get() {
            return self.root;
          }
        });
        let map = new MapGenerator(str, root, this._opts, css);
        if (map.isMap()) {
          let [generatedCSS, generatedMap] = map.generate();
          if (generatedCSS) {
            this.result.css = generatedCSS;
          }
          if (generatedMap) {
            this.result.map = generatedMap;
          }
        } else {
          map.clearAnnotation();
          this.result.css = map.css;
        }
      }
      async() {
        if (this.error) return Promise.reject(this.error);
        return Promise.resolve(this.result);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      sync() {
        if (this.error) throw this.error;
        return this.result;
      }
      then(onFulfilled, onRejected) {
        if (process.env.NODE_ENV !== "production") {
          if (!("from" in this._opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      toString() {
        return this._css;
      }
      warnings() {
        return [];
      }
      get content() {
        return this.result.css;
      }
      get css() {
        return this.result.css;
      }
      get map() {
        return this.result.map;
      }
      get messages() {
        return [];
      }
      get opts() {
        return this.result.opts;
      }
      get processor() {
        return this.result.processor;
      }
      get root() {
        if (this._root) {
          return this._root;
        }
        let root;
        let parser = parse;
        try {
          root = parser(this._css, this._opts);
        } catch (error) {
          this.error = error;
        }
        if (this.error) {
          throw this.error;
        } else {
          this._root = root;
          return root;
        }
      }
      get [Symbol.toStringTag]() {
        return "NoWorkResult";
      }
    };
    module2.exports = NoWorkResult;
    NoWorkResult.default = NoWorkResult;
  }
});

// node_modules/postcss/lib/processor.js
var require_processor = __commonJS({
  "node_modules/postcss/lib/processor.js"(exports2, module2) {
    "use strict";
    var Document = require_document();
    var LazyResult = require_lazy_result();
    var NoWorkResult = require_no_work_result();
    var Root = require_root();
    var Processor = class {
      constructor(plugins = []) {
        this.version = "8.4.47";
        this.plugins = this.normalize(plugins);
      }
      normalize(plugins) {
        let normalized = [];
        for (let i of plugins) {
          if (i.postcss === true) {
            i = i();
          } else if (i.postcss) {
            i = i.postcss;
          }
          if (typeof i === "object" && Array.isArray(i.plugins)) {
            normalized = normalized.concat(i.plugins);
          } else if (typeof i === "object" && i.postcssPlugin) {
            normalized.push(i);
          } else if (typeof i === "function") {
            normalized.push(i);
          } else if (typeof i === "object" && (i.parse || i.stringify)) {
            if (process.env.NODE_ENV !== "production") {
              throw new Error(
                "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
              );
            }
          } else {
            throw new Error(i + " is not a PostCSS plugin");
          }
        }
        return normalized;
      }
      process(css, opts = {}) {
        if (!this.plugins.length && !opts.parser && !opts.stringifier && !opts.syntax) {
          return new NoWorkResult(this, css, opts);
        } else {
          return new LazyResult(this, css, opts);
        }
      }
      use(plugin) {
        this.plugins = this.plugins.concat(this.normalize([plugin]));
        return this;
      }
    };
    module2.exports = Processor;
    Processor.default = Processor;
    Root.registerProcessor(Processor);
    Document.registerProcessor(Processor);
  }
});

// node_modules/postcss/lib/postcss.js
var require_postcss = __commonJS({
  "node_modules/postcss/lib/postcss.js"(exports2, module2) {
    "use strict";
    var AtRule = require_at_rule();
    var Comment = require_comment();
    var Container = require_container();
    var CssSyntaxError = require_css_syntax_error();
    var Declaration = require_declaration();
    var Document = require_document();
    var fromJSON = require_fromJSON();
    var Input = require_input();
    var LazyResult = require_lazy_result();
    var list = require_list();
    var Node = require_node();
    var parse = require_parse();
    var Processor = require_processor();
    var Result = require_result();
    var Root = require_root();
    var Rule = require_rule();
    var stringify = require_stringify();
    var Warning = require_warning();
    function postcss(...plugins) {
      if (plugins.length === 1 && Array.isArray(plugins[0])) {
        plugins = plugins[0];
      }
      return new Processor(plugins);
    }
    postcss.plugin = function plugin(name, initializer) {
      let warningPrinted = false;
      function creator(...args) {
        if (console && console.warn && !warningPrinted) {
          warningPrinted = true;
          console.warn(
            name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
          );
          if (process.env.LANG && process.env.LANG.startsWith("cn")) {
            console.warn(
              name + ": \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:\nhttps://www.w3ctech.com/topic/2226"
            );
          }
        }
        let transformer = initializer(...args);
        transformer.postcssPlugin = name;
        transformer.postcssVersion = new Processor().version;
        return transformer;
      }
      let cache;
      Object.defineProperty(creator, "postcss", {
        get() {
          if (!cache) cache = creator();
          return cache;
        }
      });
      creator.process = function(css, processOpts, pluginOpts) {
        return postcss([creator(pluginOpts)]).process(css, processOpts);
      };
      return creator;
    };
    postcss.stringify = stringify;
    postcss.parse = parse;
    postcss.fromJSON = fromJSON;
    postcss.list = list;
    postcss.comment = (defaults) => new Comment(defaults);
    postcss.atRule = (defaults) => new AtRule(defaults);
    postcss.decl = (defaults) => new Declaration(defaults);
    postcss.rule = (defaults) => new Rule(defaults);
    postcss.root = (defaults) => new Root(defaults);
    postcss.document = (defaults) => new Document(defaults);
    postcss.CssSyntaxError = CssSyntaxError;
    postcss.Declaration = Declaration;
    postcss.Container = Container;
    postcss.Processor = Processor;
    postcss.Document = Document;
    postcss.Comment = Comment;
    postcss.Warning = Warning;
    postcss.AtRule = AtRule;
    postcss.Result = Result;
    postcss.Input = Input;
    postcss.Rule = Rule;
    postcss.Root = Root;
    postcss.Node = Node;
    LazyResult.registerPostcss(postcss);
    module2.exports = postcss;
    postcss.default = postcss;
  }
});

// node_modules/postcss-js/parser.js
var require_parser2 = __commonJS({
  "node_modules/postcss-js/parser.js"(exports2, module2) {
    var postcss = require_postcss();
    var IMPORTANT = /\s*!important\s*$/i;
    var UNITLESS = {
      "box-flex": true,
      "box-flex-group": true,
      "column-count": true,
      "flex": true,
      "flex-grow": true,
      "flex-positive": true,
      "flex-shrink": true,
      "flex-negative": true,
      "font-weight": true,
      "line-clamp": true,
      "line-height": true,
      "opacity": true,
      "order": true,
      "orphans": true,
      "tab-size": true,
      "widows": true,
      "z-index": true,
      "zoom": true,
      "fill-opacity": true,
      "stroke-dashoffset": true,
      "stroke-opacity": true,
      "stroke-width": true
    };
    function dashify(str) {
      return str.replace(/([A-Z])/g, "-$1").replace(/^ms-/, "-ms-").toLowerCase();
    }
    function decl(parent, name, value) {
      if (value === false || value === null) return;
      if (!name.startsWith("--")) {
        name = dashify(name);
      }
      if (typeof value === "number") {
        if (value === 0 || UNITLESS[name]) {
          value = value.toString();
        } else {
          value += "px";
        }
      }
      if (name === "css-float") name = "float";
      if (IMPORTANT.test(value)) {
        value = value.replace(IMPORTANT, "");
        parent.push(postcss.decl({ prop: name, value, important: true }));
      } else {
        parent.push(postcss.decl({ prop: name, value }));
      }
    }
    function atRule(parent, parts, value) {
      let node = postcss.atRule({ name: parts[1], params: parts[3] || "" });
      if (typeof value === "object") {
        node.nodes = [];
        parse(value, node);
      }
      parent.push(node);
    }
    function parse(obj, parent) {
      let name, value, node;
      for (name in obj) {
        value = obj[name];
        if (value === null || typeof value === "undefined") {
          continue;
        } else if (name[0] === "@") {
          let parts = name.match(/@(\S+)(\s+([\W\w]*)\s*)?/);
          if (Array.isArray(value)) {
            for (let i of value) {
              atRule(parent, parts, i);
            }
          } else {
            atRule(parent, parts, value);
          }
        } else if (Array.isArray(value)) {
          for (let i of value) {
            decl(parent, name, i);
          }
        } else if (typeof value === "object") {
          node = postcss.rule({ selector: name });
          parse(value, node);
          parent.push(node);
        } else {
          decl(parent, name, value);
        }
      }
    }
    module2.exports = function(obj) {
      let root = postcss.root();
      parse(obj, root);
      return root;
    };
  }
});

// node_modules/postcss-js/process-result.js
var require_process_result = __commonJS({
  "node_modules/postcss-js/process-result.js"(exports2, module2) {
    var objectify = require_objectifier();
    module2.exports = function processResult(result) {
      if (console && console.warn) {
        result.warnings().forEach((warn) => {
          let source = warn.plugin || "PostCSS";
          console.warn(source + ": " + warn.text);
        });
      }
      return objectify(result.root);
    };
  }
});

// node_modules/postcss-js/async.js
var require_async = __commonJS({
  "node_modules/postcss-js/async.js"(exports2, module2) {
    var postcss = require_postcss();
    var processResult = require_process_result();
    var parse = require_parser2();
    module2.exports = function async(plugins) {
      let processor = postcss(plugins);
      return async (input) => {
        let result = await processor.process(input, {
          parser: parse,
          from: void 0
        });
        return processResult(result);
      };
    };
  }
});

// node_modules/postcss-js/sync.js
var require_sync = __commonJS({
  "node_modules/postcss-js/sync.js"(exports2, module2) {
    var postcss = require_postcss();
    var processResult = require_process_result();
    var parse = require_parser2();
    module2.exports = function(plugins) {
      let processor = postcss(plugins);
      return (input) => {
        let result = processor.process(input, { parser: parse, from: void 0 });
        return processResult(result);
      };
    };
  }
});

// node_modules/postcss-js/index.js
var require_postcss_js = __commonJS({
  "node_modules/postcss-js/index.js"(exports2, module2) {
    var objectify = require_objectifier();
    var parse = require_parser2();
    var async = require_async();
    var sync = require_sync();
    module2.exports = {
      objectify,
      parse,
      async,
      sync
    };
  }
});

// node_modules/fastparse/lib/Parser.js
var require_Parser = __commonJS({
  "node_modules/fastparse/lib/Parser.js"(exports2, module2) {
    function ignoreFunction() {
    }
    function createReturningFunction(value) {
      return function() {
        return value;
      };
    }
    function Parser(states) {
      this.states = this.compileStates(states);
    }
    Parser.prototype.compileStates = function(states) {
      var result = {};
      Object.keys(states).forEach(function(name) {
        result[name] = this.compileState(states[name], states);
      }, this);
      return result;
    };
    Parser.prototype.compileState = function(state, states) {
      var regExps = [];
      function iterator(str, value) {
        regExps.push({
          groups: Parser.getGroupCount(str),
          regExp: str,
          value
        });
      }
      function processState(statePart) {
        if (Array.isArray(statePart)) {
          statePart.forEach(processState);
        } else if (typeof statePart === "object") {
          Object.keys(statePart).forEach(function(key) {
            iterator(key, statePart[key]);
          });
        } else if (typeof statePart === "string") {
          processState(states[statePart]);
        } else {
          throw new Error("Unexpected 'state' format");
        }
      }
      processState(state);
      var total = regExps.map(function(r) {
        return "(" + r.regExp + ")";
      }).join("|");
      var actions = [];
      var pos = 1;
      regExps.forEach(function(r) {
        var fn;
        if (typeof r.value === "function") {
          fn = r.value;
        } else if (typeof r.value === "string") {
          fn = createReturningFunction(r.value);
        } else {
          fn = ignoreFunction;
        }
        actions.push({
          name: r.regExp,
          fn,
          pos,
          pos2: pos + r.groups + 1
        });
        pos += r.groups + 1;
      });
      return {
        regExp: new RegExp(total, "g"),
        actions
      };
    };
    Parser.getGroupCount = function(regExpStr) {
      return new RegExp("(" + regExpStr + ")|^$").exec("").length - 2;
    };
    Parser.prototype.parse = function(initialState, string, context) {
      context = context || {};
      var currentState = initialState;
      var currentIndex = 0;
      for (; ; ) {
        var state = this.states[currentState];
        var regExp = state.regExp;
        regExp.lastIndex = currentIndex;
        var match = regExp.exec(string);
        if (!match) return context;
        var actions = state.actions;
        currentIndex = state.regExp.lastIndex;
        for (var i = 0; i < actions.length; i++) {
          var action = actions[i];
          if (match[action.pos]) {
            var ret = action.fn.apply(context, Array.prototype.slice.call(match, action.pos, action.pos2).concat([state.regExp.lastIndex - match[0].length, match[0].length]));
            if (ret) {
              if (!(ret in this.states))
                throw new Error("State '" + ret + "' doesn't exist");
              currentState = ret;
            }
            break;
          }
        }
      }
    };
    module2.exports = Parser;
  }
});

// node_modules/css-selector-tokenizer/lib/uni-regexp.js
var require_uni_regexp = __commonJS({
  "node_modules/css-selector-tokenizer/lib/uni-regexp.js"(exports2, module2) {
    module2.exports = {
      "typeMatchClass": "\\.((?:\\\\(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])|(?:[\\x2DA-Z_a-z\\xA0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))(?:\\\\(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])|(?:[\\x2D0-9A-Z_a-z\\xA0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))*)",
      "typeMatchId": "#((?:\\\\(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])|(?:[\\x2DA-Z_a-z\\xA0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))(?:\\\\(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])|(?:[\\x2D0-9A-Z_a-z\\xA0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))*)",
      "identifierEscapeRegexp": "(^[\\0-,\\.-@\\[-\\^`\\{-\\x9F]|^\\x2D\\x2D|[\\0-,\\.\\/:-@\\[-\\^`\\{-\\x9F])"
    };
  }
});

// node_modules/css-selector-tokenizer/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/css-selector-tokenizer/lib/parse.js"(exports2, module2) {
    "use strict";
    var Parser = require_Parser();
    var uniRegexp = require_uni_regexp();
    function unescape2(str) {
      return str.replace(/\\(.)/g, "$1");
    }
    function commentMatch(match, content) {
      this.selector.nodes.push({
        type: "comment",
        content
      });
    }
    function typeMatch(type) {
      return function(match, name) {
        this.selector.nodes.push({
          type,
          name: unescape2(name)
        });
      };
    }
    function pseudoClassStartMatch(match, name) {
      var newToken = {
        type: "pseudo-class",
        name: unescape2(name),
        content: ""
      };
      this.selector.nodes.push(newToken);
      this.token = newToken;
      this.brackets = 1;
      return "inBrackets";
    }
    function nestedPseudoClassStartMatch(match, name, after) {
      var newSelector = {
        type: "selector",
        nodes: []
      };
      var newToken = {
        type: "nested-pseudo-class",
        name: unescape2(name),
        nodes: [newSelector]
      };
      if (after) {
        newSelector.before = after;
      }
      this.selector.nodes.push(newToken);
      this.stack.push(this.root);
      this.root = newToken;
      this.selector = newSelector;
    }
    function nestedEnd(match, before) {
      if (this.stack.length > 0) {
        if (before) {
          this.selector.after = before;
        }
        this.root = this.stack.pop();
        this.selector = this.root.nodes[this.root.nodes.length - 1];
      } else {
        this.selector.nodes.push({
          type: "invalid",
          value: match
        });
      }
    }
    function operatorMatch(match, before, operator, after) {
      var token = {
        type: "operator",
        operator
      };
      if (before) {
        token.before = before;
      }
      if (after) {
        token.after = after;
      }
      this.selector.nodes.push(token);
    }
    function spacingMatch(match) {
      this.selector.nodes.push({
        type: "spacing",
        value: match
      });
    }
    function elementMatch(match, namespace, name) {
      var newToken = {
        type: "element",
        name: unescape2(name)
      };
      if (namespace) {
        newToken.namespace = unescape2(namespace.substr(0, namespace.length - 1));
      }
      this.selector.nodes.push(newToken);
    }
    function universalMatch(match, namespace) {
      var newToken = {
        type: "universal"
      };
      if (namespace) {
        newToken.namespace = unescape2(namespace.substr(0, namespace.length - 1));
      }
      this.selector.nodes.push(newToken);
    }
    function attributeMatch(match, content) {
      this.selector.nodes.push({
        type: "attribute",
        content
      });
    }
    function invalidMatch(match) {
      this.selector.nodes.push({
        type: "invalid",
        value: match
      });
    }
    function irrelevantSpacingStartMatch(match) {
      this.selector.before = match;
    }
    function irrelevantSpacingEndMatch(match) {
      this.selector.after = match;
    }
    function nextSelectorMatch(match, before, after) {
      var newSelector = {
        type: "selector",
        nodes: []
      };
      if (before) {
        this.selector.after = before;
      }
      if (after) {
        newSelector.before = after;
      }
      this.root.nodes.push(newSelector);
      this.selector = newSelector;
    }
    function addToCurrent(match) {
      this.token.content += match;
    }
    function bracketStart(match) {
      this.token.content += match;
      this.brackets++;
    }
    function bracketEnd(match) {
      if (--this.brackets === 0) {
        return "selector";
      }
      this.token.content += match;
    }
    function getSelectors() {
      var selectors = {
        "/\\*([\\s\\S]*?)\\*/": commentMatch
      };
      selectors[uniRegexp.typeMatchClass] = typeMatch("class");
      selectors[uniRegexp.typeMatchId] = typeMatch("id");
      var selectorsSecondHalf = {
        ":(not|any|-\\w+?-any|matches|is|where|has|local|global)\\((\\s*)": nestedPseudoClassStartMatch,
        ":((?:\\\\.|[A-Za-z_\\-0-9])+)\\(": pseudoClassStartMatch,
        ":((?:\\\\.|[A-Za-z_\\-0-9])+)": typeMatch("pseudo-class"),
        "::((?:\\\\.|[A-Za-z_\\-0-9])+)": typeMatch("pseudo-element"),
        "(\\*\\|)((?:\\\\.|[A-Za-z_\\-0-9])+)": elementMatch,
        "(\\*\\|)\\*": universalMatch,
        "((?:\\\\.|[A-Za-z_\\-0-9])*\\|)?\\*": universalMatch,
        "((?:\\\\.|[A-Za-z_\\-0-9])*\\|)?((?:\\\\.|[A-Za-z_\\-])(?:\\\\.|[A-Za-z_\\-0-9])*)": elementMatch,
        "\\[([^\\]]+)\\]": attributeMatch,
        "(\\s*)\\)": nestedEnd,
        "(\\s*)((?:\\|\\|)|(?:>>)|[>+~])(\\s*)": operatorMatch,
        "(\\s*),(\\s*)": nextSelectorMatch,
        "\\s+$": irrelevantSpacingEndMatch,
        "^\\s+": irrelevantSpacingStartMatch,
        "\\s+": spacingMatch,
        ".": invalidMatch
      };
      var selector;
      for (selector in selectorsSecondHalf) {
        if (Object.prototype.hasOwnProperty.call(selectorsSecondHalf, selector)) {
          selectors[selector] = selectorsSecondHalf[selector];
        }
      }
      return selectors;
    }
    var parser = new Parser({
      selector: getSelectors(),
      inBrackets: {
        "/\\*[\\s\\S]*?\\*/": addToCurrent,
        '"([^\\\\"]|\\\\.)*"': addToCurrent,
        "'([^\\\\']|\\\\.)*'": addToCurrent,
        "[^()'\"/]+": addToCurrent,
        "\\(": bracketStart,
        "\\)": bracketEnd,
        ".": addToCurrent
      }
    });
    function parse(str) {
      var selectorNode = {
        type: "selector",
        nodes: []
      };
      var rootNode = {
        type: "selectors",
        nodes: [
          selectorNode
        ]
      };
      parser.parse("selector", str, {
        stack: [],
        root: rootNode,
        selector: selectorNode
      });
      return rootNode;
    }
    module2.exports = parse;
  }
});

// node_modules/css-selector-tokenizer/lib/stringify.js
var require_stringify2 = __commonJS({
  "node_modules/css-selector-tokenizer/lib/stringify.js"(exports2, module2) {
    "use strict";
    var uniRegexp = require_uni_regexp();
    var identifierEscapeRegexp = new RegExp(uniRegexp.identifierEscapeRegexp, "g");
    function escape(str, identifier) {
      if (str === "*") {
        return "*";
      }
      if (identifier) {
        return str.replace(identifierEscapeRegexp, "\\$1");
      } else {
        return str.replace(/(^[^A-Za-z_\\-]|^--|[^A-Za-z_0-9\\-])/g, "\\$1");
      }
    }
    function stringifyWithoutBeforeAfter(tree) {
      switch (tree.type) {
        case "selectors":
          return tree.nodes.map(stringify).join(",");
        case "selector":
          return tree.nodes.map(stringify).join("");
        case "element":
          return (typeof tree.namespace === "string" ? escape(tree.namespace) + "|" : "") + escape(tree.name);
        case "class":
          return "." + escape(tree.name, true);
        case "id":
          return "#" + escape(tree.name, true);
        case "attribute":
          return "[" + tree.content + "]";
        case "spacing":
          return tree.value;
        case "pseudo-class":
          return ":" + escape(tree.name) + (typeof tree.content === "string" ? "(" + tree.content + ")" : "");
        case "nested-pseudo-class":
          return ":" + escape(tree.name) + "(" + tree.nodes.map(stringify).join(",") + ")";
        case "pseudo-element":
          return "::" + escape(tree.name);
        case "universal":
          return (typeof tree.namespace === "string" ? escape(tree.namespace) + "|" : "") + "*";
        case "operator":
          return tree.operator;
        case "comment":
          return "/*" + tree.content + "*/";
        case "invalid":
          return tree.value;
      }
    }
    function stringify(tree) {
      var str = stringifyWithoutBeforeAfter(tree);
      if (tree.before) {
        str = tree.before + str;
      }
      if (tree.after) {
        str = str + tree.after;
      }
      return str;
    }
    module2.exports = stringify;
  }
});

// node_modules/css-selector-tokenizer/lib/parseValues.js
var require_parseValues = __commonJS({
  "node_modules/css-selector-tokenizer/lib/parseValues.js"(exports2, module2) {
    "use strict";
    var Parser = require_Parser();
    function commentMatch(match, content) {
      this.value.nodes.push({
        type: "comment",
        content
      });
    }
    function spacingMatch(match) {
      var item = this.value.nodes[this.value.nodes.length - 1];
      item.after = (item.after || "") + match;
    }
    function initialSpacingMatch(match) {
      this.value.before = match;
    }
    function endSpacingMatch(match) {
      this.value.after = match;
    }
    function unescapeString(content) {
      return content.replace(/\\(?:([a-fA-F0-9]{1,6})|(.))/g, function(all, unicode, otherCharacter) {
        if (otherCharacter) {
          return otherCharacter;
        }
        var C = parseInt(unicode, 16);
        if (C < 65536) {
          return String.fromCharCode(C);
        } else {
          return String.fromCharCode(Math.floor((C - 65536) / 1024) + 55296) + String.fromCharCode((C - 65536) % 1024 + 56320);
        }
      });
    }
    function stringMatch(match, content) {
      var value = unescapeString(content);
      this.value.nodes.push({
        type: "string",
        value,
        stringType: match[0]
      });
    }
    function commaMatch(match, spacing) {
      var newValue = {
        type: "value",
        nodes: []
      };
      if (spacing) {
        newValue.before = spacing;
      }
      this.root.nodes.push(newValue);
      this.value = newValue;
    }
    function itemMatch(match) {
      this.value.nodes.push({
        type: "item",
        name: match
      });
    }
    function nestedItemMatch(match, name, spacing) {
      this.stack.push(this.root);
      this.root = {
        type: "nested-item",
        name,
        nodes: [
          { type: "value", nodes: [] }
        ]
      };
      if (spacing) {
        this.root.nodes[0].before = spacing;
      }
      this.value.nodes.push(this.root);
      this.value = this.root.nodes[0];
    }
    function nestedItemEndMatch(match, spacing, remaining) {
      if (this.stack.length === 0) {
        if (spacing) {
          var item = this.value.nodes[this.value.nodes.length - 1];
          item.after = (item.after || "") + spacing;
        }
        this.value.nodes.push({
          type: "invalid",
          value: remaining
        });
      } else {
        if (spacing) {
          this.value.after = spacing;
        }
        this.root = this.stack.pop();
        this.value = this.root.nodes[this.root.nodes.length - 1];
      }
    }
    function urlMatch(match, innerSpacingBefore, content, innerSpacingAfter) {
      var item = {
        type: "url"
      };
      if (innerSpacingBefore) {
        item.innerSpacingBefore = innerSpacingBefore;
      }
      if (innerSpacingAfter) {
        item.innerSpacingAfter = innerSpacingAfter;
      }
      switch (content[0]) {
        case '"':
          item.stringType = '"';
          item.url = unescapeString(content.substr(1, content.length - 2));
          break;
        case "'":
          item.stringType = "'";
          item.url = unescapeString(content.substr(1, content.length - 2));
          break;
        default:
          item.url = unescapeString(content);
          break;
      }
      this.value.nodes.push(item);
    }
    var parser = new Parser({
      decl: {
        "^\\s+": initialSpacingMatch,
        "/\\*([\\s\\S]*?)\\*/": commentMatch,
        '"((?:[^\\\\"]|\\\\.)*)"': stringMatch,
        "'((?:[^\\\\']|\\\\.)*)'": stringMatch,
        'url\\((\\s*)("(?:[^\\\\"]|\\\\.)*")(\\s*)\\)': urlMatch,
        "url\\((\\s*)('(?:[^\\\\']|\\\\.)*')(\\s*)\\)": urlMatch,
        "url\\((\\s*)((?:[^\\\\)'\"]|\\\\.)*)(\\s*)\\)": urlMatch,
        "([\\w-]+)\\((\\s*)": nestedItemMatch,
        "(\\s*)(\\))": nestedItemEndMatch,
        ",(\\s*)": commaMatch,
        "\\s+$": endSpacingMatch,
        "\\s+": spacingMatch,
        "[^\\s,)]+": itemMatch
      }
    });
    function parseValues(str) {
      var valueNode = {
        type: "value",
        nodes: []
      };
      var rootNode = {
        type: "values",
        nodes: [
          valueNode
        ]
      };
      parser.parse("decl", str, {
        stack: [],
        root: rootNode,
        value: valueNode
      });
      return rootNode;
    }
    module2.exports = parseValues;
  }
});

// node_modules/cssesc/cssesc.js
var require_cssesc = __commonJS({
  "node_modules/cssesc/cssesc.js"(exports2, module2) {
    "use strict";
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var merge = function merge2(options, defaults) {
      if (!options) {
        return defaults;
      }
      var result = {};
      for (var key in defaults) {
        result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
      }
      return result;
    };
    var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
    var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
    var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
    var cssesc = function cssesc2(string, options) {
      options = merge(options, cssesc2.options);
      if (options.quotes != "single" && options.quotes != "double") {
        options.quotes = "single";
      }
      var quote = options.quotes == "double" ? '"' : "'";
      var isIdentifier = options.isIdentifier;
      var firstChar = string.charAt(0);
      var output = "";
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var character = string.charAt(counter++);
        var codePoint = character.charCodeAt();
        var value = void 0;
        if (codePoint < 32 || codePoint > 126) {
          if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
            } else {
              counter--;
            }
          }
          value = "\\" + codePoint.toString(16).toUpperCase() + " ";
        } else {
          if (options.escapeEverything) {
            if (regexAnySingleEscape.test(character)) {
              value = "\\" + character;
            } else {
              value = "\\" + codePoint.toString(16).toUpperCase() + " ";
            }
          } else if (/[\t\n\f\r\x0B]/.test(character)) {
            value = "\\" + codePoint.toString(16).toUpperCase() + " ";
          } else if (character == "\\" || !isIdentifier && (character == '"' && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
            value = "\\" + character;
          } else {
            value = character;
          }
        }
        output += value;
      }
      if (isIdentifier) {
        if (/^-[-\d]/.test(output)) {
          output = "\\-" + output.slice(1);
        } else if (/\d/.test(firstChar)) {
          output = "\\3" + firstChar + " " + output.slice(1);
        }
      }
      output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
        if ($1 && $1.length % 2) {
          return $0;
        }
        return ($1 || "") + $2;
      });
      if (!isIdentifier && options.wrap) {
        return quote + output + quote;
      }
      return output;
    };
    cssesc.options = {
      "escapeEverything": false,
      "isIdentifier": false,
      "quotes": "single",
      "wrap": false
    };
    cssesc.version = "3.0.0";
    module2.exports = cssesc;
  }
});

// node_modules/css-selector-tokenizer/lib/stringifyValues.js
var require_stringifyValues = __commonJS({
  "node_modules/css-selector-tokenizer/lib/stringifyValues.js"(exports2, module2) {
    "use strict";
    var cssesc = require_cssesc();
    var stringify;
    function escape(str, stringType) {
      return cssesc(str, {
        quotes: stringType === '"' ? "double" : "single"
      });
    }
    function stringifyWithoutBeforeAfter(tree) {
      switch (tree.type) {
        case "values":
          return tree.nodes.map(stringify).join(",");
        case "value":
          return tree.nodes.map(stringify).join("");
        case "item":
          return tree.name;
        case "nested-item":
          return tree.name + "(" + tree.nodes.map(stringify).join(",") + ")";
        case "invalid":
          return tree.value;
        case "comment":
          return "/*" + tree.content + "*/";
        case "string":
          switch (tree.stringType) {
            case "'":
              return "'" + escape(tree.value, "'") + "'";
            case '"':
              return '"' + escape(tree.value, '"') + '"';
          }
          throw new Error("Invalid stringType");
        case "url":
          var start = "url(" + (tree.innerSpacingBefore || "");
          var end = (tree.innerSpacingAfter || "") + ")";
          switch (tree.stringType) {
            case "'":
              return start + "'" + tree.url.replace(/(\\)/g, "\\$1").replace(/'/g, "\\'") + "'" + end;
            case '"':
              return start + '"' + tree.url.replace(/(\\)/g, "\\$1").replace(/"/g, '\\"') + '"' + end;
            default:
              return start + tree.url.replace(/("|'|\)|\\)/g, "\\$1") + end;
          }
      }
    }
    stringify = function stringify2(tree) {
      var str = stringifyWithoutBeforeAfter(tree);
      if (tree.before) {
        str = tree.before + str;
      }
      if (tree.after) {
        str = str + tree.after;
      }
      return str;
    };
    module2.exports = stringify;
  }
});

// node_modules/css-selector-tokenizer/lib/index.js
var require_lib = __commonJS({
  "node_modules/css-selector-tokenizer/lib/index.js"(exports2) {
    exports2.parse = require_parse2();
    exports2.stringify = require_stringify2();
    exports2.parseValues = require_parseValues();
    exports2.stringifyValues = require_stringifyValues();
  }
});

// node_modules/daisyui/src/lib/addPrefix.js
var require_addPrefix = __commonJS({
  "node_modules/daisyui/src/lib/addPrefix.js"(exports2, module2) {
    var Tokenizer = require_lib();
    function itMatchesOne(arr, term) {
      return arr.some((i) => term.search(i) >= 0);
    }
    function parseAttrSelector(node) {
      const { content } = node;
      const regex = /(^class|^id)([*^?~|$=]*)+(?:("\s*)([^"\\]*?(?:\\.[^"\\]*)*?)(\s*")|('\s*)([^'\\]*?(?:\\.[^'\\]*)*?)(\s*'))/i;
      const [type, operator, head, classes, foot] = content.split(regex).filter((part) => part);
      return {
        type,
        operator,
        head,
        classes: classes ? classes.split(" ").map((c) => c.replace(/"|'/g, "")) : [],
        foot
      };
    }
    function attrStringify({ type, operator, head, classes, foot }) {
      return `${type}${operator || ""}${head || ""}${classes.join(" ")}${foot || ""}`;
    }
    function prefixNode(node, prefix) {
      if (["class", "id"].includes(node.type)) {
        return {
          ...node,
          name: `${prefix}${node.name}`
        };
      }
      if (["attribute"].includes(node.type) && node.content) {
        const { type, operator, head, classes, foot } = parseAttrSelector(node);
        if (!["class", "id"].includes(type)) return node;
        return {
          ...node,
          content: attrStringify({
            type,
            operator,
            head,
            classes: classes.map((cls) => `${prefix}${cls}`),
            foot
          })
        };
      }
      return node;
    }
    function iterateSelectorNodes(selector, options) {
      const { prefix, ignore } = options;
      return {
        ...selector,
        nodes: selector.nodes.map((node) => {
          if (["selector", "nested-pseudo-class"].includes(node.type)) {
            return iterateSelectorNodes(node, options);
          }
          if (itMatchesOne(ignore, Tokenizer.stringify(node))) return node;
          return prefixNode(node, prefix);
        })
      };
    }
    module2.exports = (opts = {}) => {
      const { prefix, ignore } = {
        prefix: "",
        ignore: [],
        ...opts
      };
      if (typeof prefix !== "string") {
        throw new Error("prefix option should be of type string.");
      }
      if (!Array.isArray(ignore)) {
        throw new Error("ignore options should be an Array.");
      }
      if (!prefix.length) return;
      return {
        postcssPlugin: "addprefix",
        Root(root, postcss) {
          root.walkRules((rule) => {
            const parsed = Tokenizer.parse(rule.selector);
            const selector = iterateSelectorNodes(parsed, { prefix, ignore });
            rule.selector = Tokenizer.stringify(selector);
          });
        }
      };
    };
    module2.exports.postcss = true;
  }
});

// node_modules/daisyui/package.json
var require_package = __commonJS({
  "node_modules/daisyui/package.json"(exports2, module2) {
    module2.exports = {
      name: "daisyui",
      version: "4.12.13",
      description: "daisyUI - Tailwind CSS Components",
      author: "Pouya Saadeghi",
      license: "MIT",
      homepage: "https://daisyui.com",
      repository: {
        type: "git",
        url: "git+https://github.com/saadeghi/daisyui.git"
      },
      funding: {
        type: "opencollective",
        url: "https://opencollective.com/daisyui"
      },
      bugs: {
        url: "https://github.com/saadeghi/daisyui/issues"
      },
      keywords: [
        "design-system",
        "tailwindcss",
        "components",
        "ui-library",
        "component",
        "framework",
        "tailwind",
        "daisyui",
        "theming",
        "postcss",
        "design",
        "css",
        "ui"
      ],
      main: "src/index.js",
      typings: "src/index.d.ts",
      types: "src/index.d.ts",
      files: [
        "src/lib/**/*.js",
        "dist/*.js",
        "dist/{themes,styled,unstyled,full}.css",
        "src/index.js",
        "src/theming/*.js",
        "src/theming/*.d.ts",
        "src/index.d.ts"
      ],
      engines: {
        node: ">=16.9.0"
      },
      browserslist: [
        "> 7%"
      ],
      publishConfig: {
        access: "public",
        branches: [
          "master"
        ]
      },
      scripts: {
        init: "npm install && npm run build && cd src/docs && npm install && npm run get-json --silent && cd src/experiments/playground && npm install",
        format: "biome format --write .",
        lint: "biome lint . --write",
        build: "node src/build",
        "build:skipfullcss": "node src/build --skipfullcss",
        dev: "cd src/docs && npm run dev",
        playground: "cd src/experiments/playground && npm run dev",
        release: "node src/release",
        "publish:alpha": "npm publish --tag=alpha",
        alpha: "npm run release -- --alpha && npm publish --tag=alpha"
      },
      devDependencies: {
        "@biomejs/biome": "^1.9.1",
        autoprefixer: "10.4.19",
        "commit-and-tag-version": "12.4.1",
        "postcss-cli": "11.0.0",
        "postcss-import": "16.1.0",
        "prejss-cli": "0.3.3",
        tailwindcss: "3.4.4"
      },
      dependencies: {
        "css-selector-tokenizer": "^0.8",
        culori: "^3",
        picocolors: "^1",
        "postcss-js": "^4"
      }
    };
  }
});

// node_modules/daisyui/dist/utilities.js
var require_utilities = __commonJS({
  "node_modules/daisyui/dist/utilities.js"(exports2, module2) {
    module2.exports = { ".glass,\n  .glass.btn-active": { "border": "none", "backdropFilter": "blur(var(--glass-blur, 40px))", "backgroundColor": "transparent", "backgroundImage": "linear-gradient(\n        135deg,\n        rgb(255 255 255 / var(--glass-opacity, 30%)) 0%,\n        rgb(0 0 0 / 0%) 100%\n      ),\n      linear-gradient(\n        var(--glass-reflex-degree, 100deg),\n        rgb(255 255 255 / var(--glass-reflex-opacity, 10%)) 25%,\n        rgb(0 0 0 / 0%) 25%\n      )", "boxShadow": "0 0 0 1px rgb(255 255 255 / var(--glass-border-opacity, 10%)) inset,\n      0 0 0 2px rgb(0 0 0 / 5%)", "textShadow": "0 1px rgb(0 0 0 / var(--glass-text-shadow-opacity, 5%))" }, "@media (hover: hover)": { ".glass.btn-active": { "border": "none", "backdropFilter": "blur(var(--glass-blur, 40px))", "backgroundColor": "transparent", "backgroundImage": "linear-gradient(\n          135deg,\n          rgb(255 255 255 / var(--glass-opacity, 30%)) 0%,\n          rgb(0 0 0 / 0%) 100%\n        ),\n        linear-gradient(\n          var(--glass-reflex-degree, 100deg),\n          rgb(255 255 255 / var(--glass-reflex-opacity, 10%)) 25%,\n          rgb(0 0 0 / 0%) 25%\n        )", "boxShadow": "0 0 0 1px rgb(255 255 255 / var(--glass-border-opacity, 10%)) inset,\n        0 0 0 2px rgb(0 0 0 / 5%)", "textShadow": "0 1px rgb(0 0 0 / var(--glass-text-shadow-opacity, 5%))" } }, ".no-animation": { "-BtnFocusScale": "1", "-AnimationBtn": "0", "-AnimationInput": "0" }, ".tab-border-none": { "-TabBorder": "0px" }, ".tab-border": { "-TabBorder": "1px" }, ".tab-border-2": { "-TabBorder": "2px" }, ".tab-border-3": { "-TabBorder": "3px" }, ".tab-rounded-none": { "-TabRadius": "0" }, ".tab-rounded-lg": { "-TabRadius": "0.5rem" } };
  }
});

// node_modules/daisyui/dist/base.js
var require_base = __commonJS({
  "node_modules/daisyui/dist/base.js"(exports2, module2) {
    module2.exports = { ":root,\n[data-theme]": { "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/1))", "color": "var(--fallback-bc,oklch(var(--bc)/1))" }, "@supports not (color: oklch(0% 0 0))": { ":root": { "colorScheme": "light", "-FallbackP": "#491eff", "-FallbackPc": "#d4dbff", "-FallbackS": "#ff41c7", "-FallbackSc": "#fff9fc", "-FallbackA": "#00cfbd", "-FallbackAc": "#00100d", "-FallbackN": "#2b3440", "-FallbackNc": "#d7dde4", "-FallbackB1": "#ffffff", "-FallbackB2": "#e5e6e6", "-FallbackB3": "#e5e6e6", "-FallbackBc": "#1f2937", "-FallbackIn": "#00b3f0", "-FallbackInc": "#000000", "-FallbackSu": "#00ca92", "-FallbackSuc": "#000000", "-FallbackWa": "#ffc22d", "-FallbackWac": "#000000", "-FallbackEr": "#ff6f70", "-FallbackErc": "#000000" }, "@media (prefers-color-scheme: dark)": { ":root": { "colorScheme": "dark", "-FallbackP": "#7582ff", "-FallbackPc": "#050617", "-FallbackS": "#ff71cf", "-FallbackSc": "#190211", "-FallbackA": "#00c7b5", "-FallbackAc": "#000e0c", "-FallbackN": "#2a323c", "-FallbackNc": "#a6adbb", "-FallbackB1": "#1d232a", "-FallbackB2": "#191e24", "-FallbackB3": "#15191e", "-FallbackBc": "#a6adbb", "-FallbackIn": "#00b3f0", "-FallbackInc": "#000000", "-FallbackSu": "#00ca92", "-FallbackSuc": "#000000", "-FallbackWa": "#ffc22d", "-FallbackWac": "#000000", "-FallbackEr": "#ff6f70", "-FallbackErc": "#000000" } } }, "html": { "WebkitTapHighlightColor": "transparent" }, "*": { "scrollbarColor": "color-mix(in oklch, currentColor 35%, transparent) transparent" }, "*:hover": { "scrollbarColor": "color-mix(in oklch, currentColor 60%, transparent) transparent" } };
  }
});

// node_modules/daisyui/dist/unstyled.js
var require_unstyled = __commonJS({
  "node_modules/daisyui/dist/unstyled.js"(exports2, module2) {
    module2.exports = { ".alert": { "display": "grid", "width": "100%", "gridAutoFlow": "row", "alignContent": "flex-start", "alignItems": "center", "justifyItems": "center", "gap": "1rem", "textAlign": "center" }, "@media (min-width: 640px)": { ".alert": { "gridAutoFlow": "column", "gridTemplateColumns": "auto minmax(auto,1fr)", "justifyItems": "start", "textAlign": "start" } }, ".artboard": { "width": "100%" }, ".avatar": { "position": "relative", "display": "inline-flex" }, ".avatar > div": { "display": "block", "aspectRatio": "1 / 1", "overflow": "hidden" }, ".avatar img": { "height": "100%", "width": "100%", "objectFit": "cover" }, ".avatar.placeholder > div": { "display": "flex", "alignItems": "center", "justifyContent": "center" }, ".badge": { "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms", "height": "1.25rem", "fontSize": "0.875rem", "lineHeight": "1.25rem", "width": "fit-content", "paddingLeft": "0.563rem", "paddingRight": "0.563rem" }, ".btm-nav": { "position": "fixed", "bottom": "0px", "left": "0px", "right": "0px", "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-around", "paddingBottom": "env(safe-area-inset-bottom)" }, ".btm-nav > *": { "position": "relative", "display": "flex", "height": "100%", "flexBasis": "100%", "cursor": "pointer", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "0.25rem" }, ".breadcrumbs": { "maxWidth": "100%", "overflowX": "auto" }, ".breadcrumbs > ul,\n  .breadcrumbs > ol": { "display": "flex", "alignItems": "center", "whiteSpace": "nowrap", "minHeight": "min-content" }, ".breadcrumbs > ul > li, .breadcrumbs > ol > li": { "display": "flex", "alignItems": "center" }, ".breadcrumbs > ul > li > a, .breadcrumbs > ol > li > a": { "display": "flex", "cursor": "pointer", "alignItems": "center" }, "@media (hover:hover)": [{ ".breadcrumbs > ul > li > a:hover, .breadcrumbs > ol > li > a:hover": { "textDecorationLine": "underline" } }, { ".link-hover:hover": { "textDecorationLine": "underline" } }], ".btn": { "display": "inline-flex", "height": "3rem", "minHeight": "3rem", "flexShrink": "0", "cursor": "pointer", "userSelect": "none", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "center", "borderRadius": "var(--rounded-btn, 0.5rem)", "borderColor": "transparent", "paddingLeft": "1rem", "paddingRight": "1rem", "textAlign": "center", "fontSize": "0.875rem", "lineHeight": "1em" }, ".btn-disabled,\n  .btn[disabled],\n  .btn:disabled": { "pointerEvents": "none" }, ".btn-square": { "height": "3rem", "width": "3rem", "padding": "0px" }, ".btn-circle": { "height": "3rem", "width": "3rem", "borderRadius": "9999px", "padding": "0px" }, ':where(.btn:is(input[type="checkbox"])),\n:where(.btn:is(input[type="radio"]))': { "width": "auto", "appearance": "none" }, '.btn:is(input[type="checkbox"]):after,\n.btn:is(input[type="radio"]):after': { "-TwContent": "attr(aria-label)", "content": "var(--tw-content)" }, ".card": { "position": "relative", "display": "flex", "flexDirection": "column" }, ".card:focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".card-body": { "display": "flex", "flex": "1 1 auto", "flexDirection": "column" }, ".card-body :where(p)": { "flexGrow": "1" }, ".card-actions": { "display": "flex", "flexWrap": "wrap", "alignItems": "flex-start", "gap": "0.5rem" }, ".card figure": { "display": "flex", "alignItems": "center", "justifyContent": "center" }, ".card.image-full": { "display": "grid" }, ".card.image-full:before": { "position": "relative", "content": '""' }, ".card.image-full:before,\n    .card.image-full > *": { "gridColumnStart": "1", "gridRowStart": "1" }, ".card.image-full > figure img": { "height": "100%", "objectFit": "cover" }, ".card.image-full > .card-body": { "position": "relative" }, ".carousel": { "display": "inline-flex", "overflowX": "scroll", "scrollSnapType": "x mandatory", "scrollBehavior": "smooth" }, ".carousel-vertical": { "flexDirection": "column", "overflowY": "scroll", "scrollSnapType": "y mandatory" }, ".carousel-item": { "boxSizing": "content-box", "display": "flex", "flex": "none", "scrollSnapAlign": "start" }, ".carousel-start .carousel-item": { "scrollSnapAlign": "start" }, ".carousel-center .carousel-item": { "scrollSnapAlign": "center" }, ".carousel-end .carousel-item": { "scrollSnapAlign": "end" }, ".chat": { "display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "columnGap": "0.75rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem" }, ".chat-image": { "gridRow": "span 2 / span 2", "alignSelf": "flex-end" }, ".chat-header": { "gridRowStart": "1", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".chat-footer": { "gridRowStart": "3", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".chat-bubble": { "position": "relative", "display": "block", "width": "fit-content", "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "maxWidth": "90%" }, ".chat-bubble:before": { "position": "absolute", "bottom": "0px", "height": "0.75rem", "width": "0.75rem", "backgroundColor": "inherit", "content": '""', "maskSize": "contain", "maskRepeat": "no-repeat", "maskPosition": "center" }, ".chat-start": { "placeItems": "start", "gridTemplateColumns": "auto 1fr" }, ".chat-start .chat-header": { "gridColumnStart": "2" }, ".chat-start .chat-footer": { "gridColumnStart": "2" }, ".chat-start .chat-image": { "gridColumnStart": "1" }, ".chat-start .chat-bubble": { "gridColumnStart": "2" }, ".chat-start .chat-bubble:before": { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e")` }, '[dir="rtl"] .chat-start .chat-bubble:before': { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e")` }, ".chat-end": { "placeItems": "end", "gridTemplateColumns": "1fr auto" }, ".chat-end .chat-header": { "gridColumnStart": "1" }, ".chat-end .chat-footer": { "gridColumnStart": "1" }, ".chat-end .chat-image": { "gridColumnStart": "2" }, ".chat-end .chat-bubble": { "gridColumnStart": "1" }, ".chat-end .chat-bubble:before": { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e")` }, '[dir="rtl"] .chat-end .chat-bubble:before': { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e")` }, ".checkbox": { "flexShrink": "0" }, ".collapse:not(td):not(tr):not(colgroup)": { "visibility": "visible" }, ".collapse": { "position": "relative", "display": "grid", "overflow": "hidden", "gridTemplateRows": "auto 0fr", "transition": "grid-template-rows 0.2s" }, '.collapse-title,\n.collapse > input[type="checkbox"],\n.collapse > input[type="radio"],\n.collapse-content': { "gridColumnStart": "1", "gridRowStart": "1" }, '.collapse > input[type="checkbox"],\n.collapse > input[type="radio"]': { "appearance": "none", "opacity": "0" }, ".collapse-content": { "visibility": "hidden", "gridColumnStart": "1", "gridRowStart": "2", "minHeight": "0px", "transition": "visibility 0.2s" }, ".collapse[open],\n.collapse-open,\n.collapse:focus:not(.collapse-close)": { "gridTemplateRows": "auto 1fr" }, '.collapse:not(.collapse-close):has(> input[type="checkbox"]:checked),\n.collapse:not(.collapse-close):has(> input[type="radio"]:checked)': { "gridTemplateRows": "auto 1fr" }, '.collapse[open] > .collapse-content,\n.collapse-open > .collapse-content,\n.collapse:focus:not(.collapse-close) > .collapse-content,\n.collapse:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-content,\n.collapse:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-content': { "visibility": "visible", "minHeight": "fit-content" }, ":root .countdown": { "lineHeight": "1em" }, ".countdown": { "display": "inline-flex" }, ".countdown > *": { "height": "1em", "display": "inline-block", "overflowY": "hidden" }, ".countdown > *:before": { "position": "relative", "content": '"00\\A 01\\A 02\\A 03\\A 04\\A 05\\A 06\\A 07\\A 08\\A 09\\A 10\\A 11\\A 12\\A 13\\A 14\\A 15\\A 16\\A 17\\A 18\\A 19\\A 20\\A 21\\A 22\\A 23\\A 24\\A 25\\A 26\\A 27\\A 28\\A 29\\A 30\\A 31\\A 32\\A 33\\A 34\\A 35\\A 36\\A 37\\A 38\\A 39\\A 40\\A 41\\A 42\\A 43\\A 44\\A 45\\A 46\\A 47\\A 48\\A 49\\A 50\\A 51\\A 52\\A 53\\A 54\\A 55\\A 56\\A 57\\A 58\\A 59\\A 60\\A 61\\A 62\\A 63\\A 64\\A 65\\A 66\\A 67\\A 68\\A 69\\A 70\\A 71\\A 72\\A 73\\A 74\\A 75\\A 76\\A 77\\A 78\\A 79\\A 80\\A 81\\A 82\\A 83\\A 84\\A 85\\A 86\\A 87\\A 88\\A 89\\A 90\\A 91\\A 92\\A 93\\A 94\\A 95\\A 96\\A 97\\A 98\\A 99\\A"', "whiteSpace": "pre", "top": "calc(var(--value) * -1em)" }, ".diff": { "position": "relative", "display": "grid", "width": "100%", "overflow": "hidden", "containerType": "inline-size", "gridTemplateColumns": "auto 1fr" }, ".diff-resizer": { "position": "relative", "top": "50%", "zIndex": "1", "height": "3rem", "width": "25rem", "minWidth": "1rem", "maxWidth": "calc(100cqi - 1rem)", "resize": "horizontal", "overflow": "hidden", "opacity": "0", "transformOrigin": "100% 100%", "scale": "4", "translate": "1.5rem -1.5rem", "clipPath": "inset(calc(100% - 0.75rem) 0 0 calc(100% - 0.75rem))" }, ".diff-resizer,\n.diff-item-1,\n.diff-item-2": { "position": "relative", "gridColumnStart": "1", "gridRowStart": "1" }, ".diff-item-1:after": { "pointerEvents": "none", "position": "absolute", "bottom": "0px", "right": "1px", "top": "50%", "zIndex": "1", "height": "2rem", "width": "2rem", "-TwContent": "''", "content": "var(--tw-content)", "translate": "50% -50%" }, ".diff-item-2": { "overflow": "hidden" }, ".diff-item-1 > *,\n.diff-item-2 > *": { "pointerEvents": "none", "position": "absolute", "bottom": "0px", "left": "0px", "top": "0px", "height": "100%", "width": "100cqi", "maxWidth": "none", "objectFit": "cover", "objectPosition": "center" }, ".divider": { "display": "flex", "flexDirection": "row", "alignItems": "center", "alignSelf": "stretch" }, ".divider:before,\n  .divider:after": { "height": "0.125rem", "width": "100%", "flexGrow": "1", "-TwContent": "''", "content": "var(--tw-content)" }, ".divider-start:before": { "display": "none" }, ".divider-end:after": { "display": "none" }, ".drawer": { "position": "relative", "display": "grid", "gridAutoColumns": "max-content auto" }, ".drawer-content": { "gridColumnStart": "2", "gridRowStart": "1", "minWidth": "0px" }, ".drawer-side": { "pointerEvents": "none", "position": "fixed", "insetInlineStart": "0px", "top": "0px", "gridColumnStart": "1", "gridRowStart": "1", "display": "grid", "width": "100%", "gridTemplateColumns": "repeat(1, minmax(0, 1fr))", "gridTemplateRows": "repeat(1, minmax(0, 1fr))", "alignItems": "flex-start", "justifyItems": "start", "overflowX": "hidden", "overflowY": "hidden", "overscrollBehavior": "contain", "height": ["100vh", "100dvh"] }, ".drawer-side > .drawer-overlay": { "position": "sticky", "top": "0px", "placeSelf": "stretch" }, ".drawer-side > *": { "gridColumnStart": "1", "gridRowStart": "1" }, ".drawer-side > *:not(.drawer-overlay)": { "transitionProperty": "transform", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "300ms", "willChange": "transform", "transform": "translateX(-100%)" }, '[dir="rtl"] .drawer-side > *:not(.drawer-overlay)': { "transform": "translateX(100%)" }, ".drawer-toggle": { "position": "fixed", "height": "0px", "width": "0px", "appearance": "none", "opacity": "0" }, ".drawer-toggle:checked ~ .drawer-side": { "pointerEvents": "auto", "visibility": "visible", "overflowY": "auto" }, ".drawer-toggle:checked ~ .drawer-side > *:not(.drawer-overlay)": { "transform": "translateX(0%)" }, ".drawer-end": { "gridAutoColumns": "auto max-content" }, ".drawer-end .drawer-toggle ~ .drawer-content": { "gridColumnStart": "1" }, ".drawer-end .drawer-toggle ~ .drawer-side": { "gridColumnStart": "2", "justifyItems": "end" }, ".drawer-end .drawer-toggle ~ .drawer-side > *:not(.drawer-overlay)": { "transform": "translateX(100%)" }, '[dir="rtl"] .drawer-end .drawer-toggle ~ .drawer-side > *:not(.drawer-overlay)': { "transform": "translateX(-100%)" }, ".drawer-end .drawer-toggle:checked ~ .drawer-side > *:not(.drawer-overlay)": { "transform": "translateX(0%)" }, ".dropdown": { "position": "relative", "display": "inline-block" }, ".dropdown > *:not(summary):focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".dropdown .dropdown-content": { "position": "absolute" }, ".dropdown:is(:not(details)) .dropdown-content": { "visibility": "hidden", "opacity": "0" }, ".dropdown-end .dropdown-content": { "insetInlineEnd": "0px" }, ".dropdown-left .dropdown-content": { "bottom": "auto", "insetInlineEnd": "100%", "top": "0px" }, ".dropdown-right .dropdown-content": { "bottom": "auto", "insetInlineStart": "100%", "top": "0px" }, ".dropdown-bottom .dropdown-content": { "bottom": "auto", "top": "100%" }, ".dropdown-top .dropdown-content": { "bottom": "100%", "top": "auto" }, ".dropdown-end.dropdown-right .dropdown-content": { "bottom": "0px", "top": "auto" }, ".dropdown-end.dropdown-left .dropdown-content": { "bottom": "0px", "top": "auto" }, ".dropdown.dropdown-open .dropdown-content,\n.dropdown:not(.dropdown-hover):focus .dropdown-content,\n.dropdown:focus-within .dropdown-content": { "visibility": "visible", "opacity": "1" }, "@media (hover: hover)": { ".dropdown.dropdown-hover:hover .dropdown-content": { "visibility": "visible", "opacity": "1" } }, ".dropdown:is(details) summary::-webkit-details-marker": { "display": "none" }, ".file-input": { "height": "3rem", "flexShrink": "1", "paddingInlineEnd": "1rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, ".file-input::file-selector-button": { "marginInlineEnd": "1rem", "display": "inline-flex", "height": "100%", "flexShrink": "0", "cursor": "pointer", "userSelect": "none", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "center", "paddingLeft": "1rem", "paddingRight": "1rem", "textAlign": "center", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "1em"], "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms" }, ".footer": { "display": "grid", "width": "100%", "gridAutoFlow": "row", "placeItems": "start" }, ".footer > *": { "display": "grid", "placeItems": "start" }, ".footer-center": { "placeItems": "center", "textAlign": "center" }, ".footer-center > *": { "placeItems": "center" }, "@media (min-width: 48rem)": { ".footer": { "gridAutoFlow": "column" }, ".footer-center": { "gridAutoFlow": "row dense" } }, ".form-control": { "display": "flex", "flexDirection": "column" }, ".label": { "display": "flex", "userSelect": "none", "alignItems": "center", "justifyContent": "space-between" }, ".hero": { "display": "grid", "width": "100%", "placeItems": "center", "backgroundSize": "cover", "backgroundPosition": "center" }, ".hero > *": { "gridColumnStart": "1", "gridRowStart": "1" }, ".hero-overlay": { "gridColumnStart": "1", "gridRowStart": "1", "height": "100%", "width": "100%" }, ".hero-content": { "zIndex": "0", "display": "flex", "alignItems": "center", "justifyContent": "center" }, ".indicator": { "position": "relative", "display": "inline-flex", "width": "max-content" }, ".indicator :where(.indicator-item)": { "zIndex": "1", "position": "absolute", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "whiteSpace": "nowrap" }, ".input": { "flexShrink": "1", "appearance": "none", "height": "3rem", "paddingLeft": "1rem", "paddingRight": "1rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, '.input[type="number"]::-webkit-inner-spin-button,\n.input-md[type="number"]::-webkit-inner-spin-button': { "marginTop": "-1rem", "marginBottom": "-1rem", "marginInlineEnd": "-1rem" }, '.input-xs[type="number"]::-webkit-inner-spin-button': { "marginTop": "-0.25rem", "marginBottom": "-0.25rem", "marginInlineEnd": "-0px" }, '.input-sm[type="number"]::-webkit-inner-spin-button': { "marginTop": "0px", "marginBottom": "0px", "marginInlineEnd": "-0px" }, '.input-lg[type="number"]::-webkit-inner-spin-button': { "marginTop": "-1.5rem", "marginBottom": "-1.5rem", "marginInlineEnd": "-1.5rem" }, ".join": { "display": "inline-flex", "alignItems": "stretch" }, ".join :where(.join-item)": { "borderStartEndRadius": "0", "borderEndEndRadius": "0", "borderEndStartRadius": "0", "borderStartStartRadius": "0" }, ".join .join-item:not(:first-child):not(:last-child),\n  .join *:not(:first-child):not(:last-child) .join-item": { "borderStartEndRadius": "0", "borderEndEndRadius": "0", "borderEndStartRadius": "0", "borderStartStartRadius": "0" }, ".join .join-item:first-child:not(:last-child),\n  .join *:first-child:not(:last-child) .join-item": { "borderStartEndRadius": "0", "borderEndEndRadius": "0" }, ".join .dropdown .join-item:first-child:not(:last-child),\n  .join *:first-child:not(:last-child) .dropdown .join-item": { "borderStartEndRadius": "inherit", "borderEndEndRadius": "inherit" }, ".join :where(.join-item:first-child:not(:last-child)),\n  .join :where(*:first-child:not(:last-child) .join-item)": { "borderEndStartRadius": "inherit", "borderStartStartRadius": "inherit" }, ".join .join-item:last-child:not(:first-child),\n  .join *:last-child:not(:first-child) .join-item": { "borderEndStartRadius": "0", "borderStartStartRadius": "0" }, ".join :where(.join-item:last-child:not(:first-child)),\n  .join :where(*:last-child:not(:first-child) .join-item)": { "borderStartEndRadius": "inherit", "borderEndEndRadius": "inherit" }, "@supports not selector(:has(*))": { ":where(.join *)": { "borderRadius": "inherit" } }, "@supports selector(:has(*))": { ":where(.join *:has(.join-item))": { "borderRadius": "inherit" } }, ".kbd": { "display": "inline-flex", "alignItems": "center", "justifyContent": "center" }, ".link": { "cursor": "pointer", "textDecorationLine": "underline" }, ".link-hover": { "textDecorationLine": "none" }, ".mask": { "maskSize": "contain", "maskRepeat": "no-repeat", "maskPosition": "center" }, ".mask-half-1": { "maskSize": "200%", "maskPosition": "left" }, '.mask-half-1:where([dir="rtl"], [dir="rtl"] *)': { "maskPosition": "right" }, ".mask-half-2": { "maskSize": "200%", "maskPosition": "right" }, '.mask-half-2:where([dir="rtl"], [dir="rtl"] *)': { "maskPosition": "left" }, ".menu": { "display": "flex", "flexDirection": "column", "flexWrap": "wrap", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".menu :where(li ul)": { "position": "relative", "whiteSpace": "nowrap" }, ".menu :where(li:not(.menu-title) > *:not(ul, details, .menu-title, .btn)), .menu :where(li:not(.menu-title) > details > summary:not(.menu-title))": { "display": "grid", "gridAutoFlow": "column", "alignContent": "flex-start", "alignItems": "center", "gap": "0.5rem", "gridAutoColumns": "minmax(auto, max-content) auto max-content", "userSelect": "none" }, ".menu li.disabled": { "cursor": "not-allowed", "userSelect": "none" }, ".menu :where(li > .menu-dropdown:not(.menu-dropdown-show))": { "display": "none" }, ":where(.menu li)": { "position": "relative", "display": "flex", "flexShrink": "0", "flexDirection": "column", "flexWrap": "wrap", "alignItems": "stretch" }, ":where(.menu li) .badge": { "justifySelf": "end" }, ".mockup-code": { "position": "relative", "overflow": "hidden", "overflowX": "auto" }, ".mockup-code pre[data-prefix]:before": { "content": "attr(data-prefix)", "display": "inline-block", "textAlign": "right" }, ".mockup-window": { "position": "relative", "overflow": "hidden", "overflowX": "auto" }, ".mockup-window pre[data-prefix]:before": { "content": "attr(data-prefix)", "display": "inline-block", "textAlign": "right" }, ".mockup-browser": { "position": "relative", "overflow": "hidden", "overflowX": "auto" }, ".mockup-browser pre[data-prefix]:before": { "content": "attr(data-prefix)", "display": "inline-block", "textAlign": "right" }, ".modal": { "pointerEvents": "none", "position": "fixed", "inset": "0px", "margin": "0px", "display": "grid", "height": "100%", "maxHeight": "none", "width": "100%", "maxWidth": "none", "justifyItems": "center", "padding": "0px", "opacity": "0", "overscrollBehavior": "contain", "zIndex": "999" }, ".modal-scroll": { "overscrollBehavior": "auto" }, ":where(.modal)": { "alignItems": "center" }, ".modal-box": { "maxHeight": "calc(100vh - 5em)" }, ".modal-open,\n.modal:target,\n.modal-toggle:checked + .modal,\n.modal[open]": { "pointerEvents": "auto", "visibility": "visible", "opacity": "1" }, ".modal-action": { "display": "flex" }, ".modal-toggle": { "position": "fixed", "height": "0px", "width": "0px", "appearance": "none", "opacity": "0" }, ":root:has(:is(.modal-open, .modal:target, .modal-toggle:checked + .modal, .modal[open]))": { "overflow": "hidden", "scrollbarGutter": "stable" }, ".navbar": { "display": "flex", "alignItems": "center" }, ":where(.navbar > *:not(script, style))": { "display": "inline-flex", "alignItems": "center" }, ".navbar-start": { "width": "50%", "justifyContent": "flex-start" }, ".navbar-center": { "flexShrink": "0" }, ".navbar-end": { "width": "50%", "justifyContent": "flex-end" }, ".progress": { "position": "relative", "width": "100%", "appearance": "none", "overflow": "hidden" }, ".radial-progress": { "position": "relative", "display": "inline-grid", "height": "var(--size)", "width": "var(--size)", "placeContent": "center", "borderRadius": "9999px", "backgroundColor": "transparent", "verticalAlign": "middle", "boxSizing": "content-box" }, ".radial-progress::-moz-progress-bar": { "appearance": "none", "backgroundColor": "transparent" }, ".radial-progress::-webkit-progress-value": { "appearance": "none", "backgroundColor": "transparent" }, ".radial-progress::-webkit-progress-bar": { "appearance": "none", "backgroundColor": "transparent" }, ".radial-progress:before,\n.radial-progress:after": { "position": "absolute", "borderRadius": "9999px", "content": '""' }, ".radial-progress:before": { "inset": "0px", "background": "radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness) var(--thickness)\n      no-repeat,\n    conic-gradient(currentColor calc(var(--value) * 1%), #0000 0)", "WebkitMask": "radial-gradient(\n    farthest-side,\n    #0000 calc(99% - var(--thickness)),\n    #000 calc(100% - var(--thickness))\n  )", "mask": "radial-gradient(\n    farthest-side,\n    #0000 calc(99% - var(--thickness)),\n    #000 calc(100% - var(--thickness))\n  )" }, ".radial-progress:after": { "inset": "calc(50% - var(--thickness) / 2)", "transform": "rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%))" }, ".radio": { "flexShrink": "0" }, ".range": { "height": "1.5rem", "width": "100%", "cursor": "pointer" }, ".range:focus": { "outline": "none" }, ".rating": { "position": "relative", "display": "inline-flex" }, ".rating :where(input)": { "cursor": "pointer", "borderRadius": "0px" }, ".select": { "display": "inline-flex", "cursor": "pointer", "userSelect": "none", "appearance": "none", "height": "3rem", "minHeight": "3rem", "paddingInlineStart": "1rem", "paddingInlineEnd": "2.5rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, ".select[multiple]": { "height": "auto" }, ".stack": { "display": "inline-grid" }, ".stack > *": { "gridColumnStart": "1", "gridRowStart": "1", "transform": "translateY(10%) scale(0.9)", "zIndex": "1" }, ".stack > *:nth-child(2)": { "transform": "translateY(5%) scale(0.95)", "zIndex": "2" }, ".stack > *:nth-child(1)": { "transform": "translateY(0) scale(1)", "zIndex": "3" }, ".stats": { "display": "inline-grid" }, ":where(.stats)": { "gridAutoFlow": "column" }, ".stat": { "display": "inline-grid", "width": "100%", "gridTemplateColumns": "repeat(1, 1fr)" }, ".stat-figure": { "gridColumnStart": "2", "gridRow": "span 3 / span 3", "gridRowStart": "1", "placeSelf": "center", "justifySelf": "end" }, ".stat-title": { "gridColumnStart": "1", "whiteSpace": "nowrap" }, ".stat-value": { "gridColumnStart": "1", "whiteSpace": "nowrap" }, ".stat-desc": { "gridColumnStart": "1", "whiteSpace": "nowrap" }, ".stat-actions": { "gridColumnStart": "1", "whiteSpace": "nowrap" }, ".steps": { "display": "inline-grid", "gridAutoFlow": "column", "overflow": "hidden", "overflowX": "auto", "counterReset": "step", "gridAutoColumns": "1fr" }, ".steps .step": { "display": "grid", "gridTemplateColumns": "repeat(1, minmax(0, 1fr))", "gridTemplateRows": "repeat(2, minmax(0, 1fr))", "placeItems": "center", "textAlign": "center" }, ".swap": { "position": "relative", "display": "inline-grid", "userSelect": "none", "placeContent": "center" }, ".swap > *": { "gridColumnStart": "1", "gridRowStart": "1" }, ".swap input": { "appearance": "none" }, ".swap .swap-on,\n.swap .swap-indeterminate,\n.swap input:indeterminate ~ .swap-on": { "opacity": "0" }, ".swap input:checked ~ .swap-off,\n.swap-active .swap-off,\n.swap input:indeterminate ~ .swap-off": { "opacity": "0" }, ".swap input:checked ~ .swap-on,\n.swap-active .swap-on,\n.swap input:indeterminate ~ .swap-indeterminate": { "opacity": "1" }, ".tabs": { "display": "grid", "alignItems": "flex-end" }, '.tabs-lifted:has(.tab-content[class^="rounded-"])\n    .tab:first-child:not(:is(.tab-active, [aria-selected="true"])), .tabs-lifted:has(.tab-content[class*=" rounded-"])\n    .tab:first-child:not(:is(.tab-active, [aria-selected="true"]))': { "borderBottomColor": "transparent" }, ".tab": { "position": "relative", "gridRowStart": "1", "display": "inline-flex", "height": "2rem", "cursor": "pointer", "userSelect": "none", "appearance": "none", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "center", "textAlign": "center", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"], "-TabPadding": "1rem" }, '.tab:is(input[type="radio"])': { "width": "auto", "borderBottomRightRadius": "0px", "borderBottomLeftRadius": "0px" }, '.tab:is(input[type="radio"]):after': { "-TwContent": "attr(aria-label)", "content": "var(--tw-content)" }, ".tab:not(input):empty": { "cursor": "default", "gridColumnStart": "span 9999" }, ".tab-content": { "gridColumnStart": "1", "gridColumnEnd": "span 9999", "gridRowStart": "2", "marginTop": "calc(var(--tab-border) * -1)", "display": "none", "borderColor": "transparent", "borderWidth": "var(--tab-border, 0)" }, ':checked + .tab-content:nth-child(2),\n  :is(.tab-active, [aria-selected="true"]) + .tab-content:nth-child(2)': { "borderStartStartRadius": "0px" }, 'input.tab:checked + .tab-content,\n:is(.tab-active, [aria-selected="true"]) + .tab-content': { "display": "block" }, ".table": { "position": "relative", "width": "100%" }, ".table :where(.table-pin-rows thead tr)": { "position": "sticky", "top": "0px", "zIndex": "1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".table :where(.table-pin-rows tfoot tr)": { "position": "sticky", "bottom": "0px", "zIndex": "1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".table :where(.table-pin-cols tr th)": { "position": "sticky", "left": "0px", "right": "0px", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".table-zebra tbody tr:nth-child(even) :where(.table-pin-cols tr th)": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))" }, ".textarea": { "minHeight": "3rem", "flexShrink": "1", "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, ".timeline": { "position": "relative", "display": "flex" }, ":where(.timeline > li)": { "position": "relative", "display": "grid", "flexShrink": "0", "alignItems": "center", "gridTemplateRows": "var(--timeline-row-start, minmax(0, 1fr)) auto var(\n      --timeline-row-end,\n      minmax(0, 1fr)\n    )", "gridTemplateColumns": "var(--timeline-col-start, minmax(0, 1fr)) auto var(\n      --timeline-col-end,\n      minmax(0, 1fr)\n    )" }, ".timeline > li > hr": { "width": "100%", "borderWidth": "0px" }, ":where(.timeline > li > hr):first-child": { "gridColumnStart": "1", "gridRowStart": "2" }, ":where(.timeline > li > hr):last-child": { "gridColumnStart": "3", "gridColumnEnd": "none", "gridRowStart": "2", "gridRowEnd": "auto" }, ".timeline-start": { "gridColumnStart": "1", "gridColumnEnd": "4", "gridRowStart": "1", "gridRowEnd": "2", "margin": "0.25rem", "alignSelf": "flex-end", "justifySelf": "center" }, ".timeline-middle": { "gridColumnStart": "2", "gridRowStart": "2" }, ".timeline-end": { "gridColumnStart": "1", "gridColumnEnd": "4", "gridRowStart": "3", "gridRowEnd": "4", "margin": "0.25rem", "alignSelf": "flex-start", "justifySelf": "center" }, ".toast": { "position": "fixed", "display": "flex", "minWidth": "fit-content", "flexDirection": "column", "whiteSpace": "nowrap" }, ".toggle": { "flexShrink": "0" } };
  }
});

// node_modules/daisyui/dist/styled.js
var require_styled = __commonJS({
  "node_modules/daisyui/dist/styled.js"(exports2, module2) {
    module2.exports = { ".alert": { "display": "grid", "width": "100%", "gridAutoFlow": "row", "alignContent": "flex-start", "alignItems": "center", "justifyItems": "center", "gap": "1rem", "textAlign": "center", "borderRadius": "var(--rounded-box, 1rem)", "borderWidth": "1px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))", "padding": "1rem", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-AlertBg": "var(--fallback-b2,oklch(var(--b2)/1))", "-AlertBgMix": "var(--fallback-b1,oklch(var(--b1)/1))", "backgroundColor": "var(--alert-bg)" }, "@media (min-width: 640px)": { ".alert": { "gridAutoFlow": "column", "gridTemplateColumns": "auto minmax(auto,1fr)", "justifyItems": "start", "textAlign": "start" } }, ".artboard": { "width": "100%" }, ".avatar": { "position": "relative", "display": "inline-flex" }, ".avatar > div": { "display": "block", "aspectRatio": "1 / 1", "overflow": "hidden" }, ".avatar img": { "height": "100%", "width": "100%", "objectFit": "cover" }, ".avatar.placeholder > div": { "display": "flex", "alignItems": "center", "justifyContent": "center" }, ".badge": { "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms", "height": "1.25rem", "fontSize": "0.875rem", "lineHeight": "1.25rem", "width": "fit-content", "paddingLeft": "0.563rem", "paddingRight": "0.563rem", "borderRadius": "var(--rounded-badge, 1.9rem)", "borderWidth": "1px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, ".btm-nav": { "position": "fixed", "bottom": "0px", "left": "0px", "right": "0px", "display": "flex", "width": "100%", "flexDirection": "row", "alignItems": "center", "justifyContent": "space-around", "paddingBottom": "env(safe-area-inset-bottom)", "height": "4rem", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "color": "currentColor" }, ".btm-nav > *": { "position": "relative", "display": "flex", "height": "100%", "flexBasis": "100%", "cursor": "pointer", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "gap": "0.25rem", "borderColor": "currentColor" }, ".breadcrumbs": { "maxWidth": "100%", "overflowX": "auto", "paddingTop": "0.5rem", "paddingBottom": "0.5rem" }, ".breadcrumbs > ul,\n  .breadcrumbs > ol": { "display": "flex", "alignItems": "center", "whiteSpace": "nowrap", "minHeight": "min-content" }, ".breadcrumbs > ul > li, .breadcrumbs > ol > li": { "display": "flex", "alignItems": "center" }, ".breadcrumbs > ul > li > a, .breadcrumbs > ol > li > a": { "display": "flex", "cursor": "pointer", "alignItems": "center" }, "@media (hover:hover)": [{ ".breadcrumbs > ul > li > a:hover, .breadcrumbs > ol > li > a:hover": { "textDecorationLine": "underline" } }, { ".link-hover:hover": { "textDecorationLine": "underline" } }, { ".checkbox-primary:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" } }, { ".checkbox-secondary:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" } }, { ".checkbox-accent:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" } }, { ".checkbox-success:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" } }, { ".checkbox-warning:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" } }, { ".checkbox-info:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" } }, { ".checkbox-error:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" } }, { ".label a:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" } }, { ".menu li > *:not(ul, .menu-title, details, .btn):active,\n.menu li > *:not(ul, .menu-title, details, .btn).active,\n.menu li > details > summary:active": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))" } }, { ".radio-primary:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" } }, { ".radio-secondary:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" } }, { ".radio-accent:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" } }, { ".radio-success:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" } }, { ".radio-warning:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" } }, { ".radio-info:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" } }, { ".radio-error:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" } }, { ".tab:hover": { "-TwTextOpacity": "1" } }, { '.tabs-boxed :is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]):hover, .tabs-boxed :is(input:checked):hover': { "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" } }, { ".table tr.hover:hover,\n  .table tr.hover:nth-child(even):hover": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))" } }, { ".table-zebra tr.hover:hover,\n  .table-zebra tr.hover:nth-child(even):hover": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))" } }], ".btn": { "display": "inline-flex", "height": "3rem", "minHeight": "3rem", "flexShrink": "0", "cursor": "pointer", "userSelect": "none", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "center", "borderRadius": "var(--rounded-btn, 0.5rem)", "borderColor": ["transparent", "oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity))"], "paddingLeft": "1rem", "paddingRight": "1rem", "textAlign": "center", "fontSize": "0.875rem", "lineHeight": "1em", "gap": "0.5rem", "fontWeight": "600", "textDecorationLine": ["none", "none"], "transitionDuration": "200ms", "transitionTimingFunction": "cubic-bezier(0, 0, 0.2, 1)", "borderWidth": "var(--border-btn, 1px)", "transitionProperty": "color, background-color, border-color, opacity, box-shadow, transform", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwShadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)", "-TwShadowColored": "0 1px 2px 0 var(--tw-shadow-color)", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/1))", "backgroundColor": "oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity))", "-TwBgOpacity": "1", "-TwBorderOpacity": "1" }, ".btn-disabled,\n  .btn[disabled],\n  .btn:disabled": { "pointerEvents": "none" }, ".btn-square": { "height": "3rem", "width": "3rem", "padding": "0px" }, ".btn-circle": { "height": "3rem", "width": "3rem", "borderRadius": "9999px", "padding": "0px" }, ':where(.btn:is(input[type="checkbox"])),\n:where(.btn:is(input[type="radio"]))': { "width": "auto", "appearance": "none" }, '.btn:is(input[type="checkbox"]):after,\n.btn:is(input[type="radio"]):after': { "-TwContent": "attr(aria-label)", "content": "var(--tw-content)" }, ".card": { "position": "relative", "display": "flex", "flexDirection": "column", "borderRadius": "var(--rounded-box, 1rem)" }, ".card:focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".card-body": { "display": ["flex", "flex"], "flex": "1 1 auto", "flexDirection": ["column", "column"], "padding": "var(--padding-card, 2rem)", "gap": "0.5rem" }, ".card-body :where(p)": { "flexGrow": "1" }, ".card-actions": { "display": "flex", "flexWrap": "wrap", "alignItems": "flex-start", "gap": "0.5rem" }, ".card figure": { "display": "flex", "alignItems": "center", "justifyContent": "center" }, ".card.image-full": { "display": "grid" }, ".card.image-full:before": { "position": "relative", "content": '""', "zIndex": "10", "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "opacity": "0.75" }, ".card.image-full:before,\n    .card.image-full > *": { "gridColumnStart": "1", "gridRowStart": "1" }, ".card.image-full > figure img": { "height": "100%", "objectFit": "cover" }, ".card.image-full > .card-body": { "position": "relative", "zIndex": "20", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))" }, ".carousel": { "display": "inline-flex", "overflowX": "scroll", "scrollSnapType": "x mandatory", "scrollBehavior": "smooth", "msOverflowStyle": "none", "scrollbarWidth": "none" }, ".carousel-vertical": { "flexDirection": "column", "overflowY": "scroll", "scrollSnapType": "y mandatory" }, ".carousel-item": { "boxSizing": "content-box", "display": "flex", "flex": "none", "scrollSnapAlign": "start" }, ".carousel-start .carousel-item": { "scrollSnapAlign": "start" }, ".carousel-center .carousel-item": { "scrollSnapAlign": "center" }, ".carousel-end .carousel-item": { "scrollSnapAlign": "end" }, ".chat": { "display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "columnGap": "0.75rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem" }, ".chat-image": { "gridRow": "span 2 / span 2", "alignSelf": "flex-end" }, ".chat-header": { "gridRowStart": "1", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".chat-footer": { "gridRowStart": "3", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".chat-bubble": { "position": "relative", "display": "block", "width": "fit-content", "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "maxWidth": "90%", "borderRadius": "var(--rounded-box, 1rem)", "minHeight": "2.75rem", "minWidth": "2.75rem", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))" }, ".chat-bubble:before": { "position": "absolute", "bottom": "0px", "height": "0.75rem", "width": "0.75rem", "backgroundColor": "inherit", "content": '""', "maskSize": "contain", "maskRepeat": "no-repeat", "maskPosition": "center" }, ".chat-start": { "placeItems": "start", "gridTemplateColumns": "auto 1fr" }, ".chat-start .chat-header": { "gridColumnStart": "2" }, ".chat-start .chat-footer": { "gridColumnStart": "2" }, ".chat-start .chat-image": { "gridColumnStart": "1" }, ".chat-start .chat-bubble": { "gridColumnStart": "2", "borderEndStartRadius": "0px" }, ".chat-start .chat-bubble:before": { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e")`, "insetInlineStart": "-0.749rem" }, '[dir="rtl"] .chat-start .chat-bubble:before': { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e")` }, ".chat-end": { "placeItems": "end", "gridTemplateColumns": "1fr auto" }, ".chat-end .chat-header": { "gridColumnStart": "1" }, ".chat-end .chat-footer": { "gridColumnStart": "1" }, ".chat-end .chat-image": { "gridColumnStart": "2" }, ".chat-end .chat-bubble": { "gridColumnStart": "1", "borderEndEndRadius": "0px" }, ".chat-end .chat-bubble:before": { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e")`, "insetInlineStart": "99.9%" }, '[dir="rtl"] .chat-end .chat-bubble:before': { "maskImage": `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e")` }, ".checkbox": { "flexShrink": "0", "-Chkbg": "var(--fallback-bc,oklch(var(--bc)/1))", "-Chkfg": "var(--fallback-b1,oklch(var(--b1)/1))", "height": "1.5rem", "width": "1.5rem", "cursor": "pointer", "appearance": "none", "borderRadius": "var(--rounded-btn, 0.5rem)", "borderWidth": "1px", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.2" }, ".collapse:not(td):not(tr):not(colgroup)": { "visibility": "visible" }, ".collapse": { "position": "relative", "display": "grid", "overflow": "hidden", "gridTemplateRows": "auto 0fr", "transition": "grid-template-rows 0.2s", "width": "100%", "borderRadius": "var(--rounded-box, 1rem)" }, '.collapse-title,\n.collapse > input[type="checkbox"],\n.collapse > input[type="radio"],\n.collapse-content': { "gridColumnStart": "1", "gridRowStart": "1" }, '.collapse > input[type="checkbox"],\n.collapse > input[type="radio"]': { "appearance": "none", "opacity": "0" }, ".collapse-content": { "visibility": "hidden", "gridColumnStart": "1", "gridRowStart": "2", "minHeight": "0px", "transition": ["visibility 0.2s", "padding 0.2s ease-out,\n    background-color 0.2s ease-out"], "paddingLeft": "1rem", "paddingRight": "1rem", "cursor": "unset" }, ".collapse[open],\n.collapse-open,\n.collapse:focus:not(.collapse-close)": { "gridTemplateRows": "auto 1fr" }, '.collapse:not(.collapse-close):has(> input[type="checkbox"]:checked),\n.collapse:not(.collapse-close):has(> input[type="radio"]:checked)': { "gridTemplateRows": "auto 1fr" }, '.collapse[open] > .collapse-content,\n.collapse-open > .collapse-content,\n.collapse:focus:not(.collapse-close) > .collapse-content,\n.collapse:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-content,\n.collapse:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-content': { "visibility": "visible", "minHeight": "fit-content" }, ":root .countdown": { "lineHeight": "1em" }, ".countdown": { "display": "inline-flex" }, ".countdown > *": { "height": "1em", "display": "inline-block", "overflowY": "hidden" }, ".countdown > *:before": { "position": "relative", "content": '"00\\A 01\\A 02\\A 03\\A 04\\A 05\\A 06\\A 07\\A 08\\A 09\\A 10\\A 11\\A 12\\A 13\\A 14\\A 15\\A 16\\A 17\\A 18\\A 19\\A 20\\A 21\\A 22\\A 23\\A 24\\A 25\\A 26\\A 27\\A 28\\A 29\\A 30\\A 31\\A 32\\A 33\\A 34\\A 35\\A 36\\A 37\\A 38\\A 39\\A 40\\A 41\\A 42\\A 43\\A 44\\A 45\\A 46\\A 47\\A 48\\A 49\\A 50\\A 51\\A 52\\A 53\\A 54\\A 55\\A 56\\A 57\\A 58\\A 59\\A 60\\A 61\\A 62\\A 63\\A 64\\A 65\\A 66\\A 67\\A 68\\A 69\\A 70\\A 71\\A 72\\A 73\\A 74\\A 75\\A 76\\A 77\\A 78\\A 79\\A 80\\A 81\\A 82\\A 83\\A 84\\A 85\\A 86\\A 87\\A 88\\A 89\\A 90\\A 91\\A 92\\A 93\\A 94\\A 95\\A 96\\A 97\\A 98\\A 99\\A"', "whiteSpace": "pre", "top": "calc(var(--value) * -1em)", "textAlign": "center", "transition": "all 1s cubic-bezier(1, 0, 0, 1)" }, ".diff": { "position": "relative", "display": "grid", "width": "100%", "overflow": "hidden", "containerType": "inline-size", "gridTemplateColumns": "auto 1fr" }, ".diff-resizer": { "position": "relative", "top": "50%", "zIndex": "1", "height": "3rem", "width": "25rem", "minWidth": "1rem", "maxWidth": "calc(100cqi - 1rem)", "resize": "horizontal", "overflow": "hidden", "opacity": "0", "transformOrigin": "100% 100%", "scale": "4", "translate": "1.5rem -1.5rem", "clipPath": "inset(calc(100% - 0.75rem) 0 0 calc(100% - 0.75rem))" }, ".diff-resizer,\n.diff-item-1,\n.diff-item-2": { "position": "relative", "gridColumnStart": "1", "gridRowStart": "1" }, ".diff-item-1:after": { "pointerEvents": "none", "position": "absolute", "bottom": "0px", "right": "1px", "top": "50%", "zIndex": "1", "height": "2rem", "width": "2rem", "-TwContent": "''", "content": "var(--tw-content)", "translate": ["50% -50%", "50% -50%"], "borderRadius": "9999px", "borderWidth": "2px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-border-opacity)))", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/0.5))", "-TwShadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)", "-TwShadowColored": "0 1px 2px 0 var(--tw-shadow-color)", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)", "outlineStyle": "solid", "outlineOffset": "-3px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/0.05))", "-TwBackdropBlur": "blur(8px)", "backdropFilter": "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)" }, ".diff-item-2": { "overflow": "hidden", "borderRightWidth": "2px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-border-opacity)))" }, ".diff-item-1 > *,\n.diff-item-2 > *": { "pointerEvents": "none", "position": "absolute", "bottom": "0px", "left": "0px", "top": "0px", "height": "100%", "width": "100cqi", "maxWidth": "none", "objectFit": "cover", "objectPosition": "center" }, ".divider": { "display": "flex", "flexDirection": "row", "alignItems": "center", "alignSelf": "stretch", "marginTop": "1rem", "marginBottom": "1rem", "height": "1rem", "whiteSpace": "nowrap" }, ".divider:before,\n  .divider:after": { "height": "0.125rem", "width": "100%", "flexGrow": "1", "-TwContent": "''", "content": "var(--tw-content)", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.1))" }, ".divider-start:before": { "display": "none" }, ".divider-end:after": { "display": "none" }, ".drawer": { "position": "relative", "display": "grid", "gridAutoColumns": "max-content auto", "width": "100%" }, ".drawer-content": { "gridColumnStart": "2", "gridRowStart": "1", "minWidth": "0px" }, ".drawer-side": { "pointerEvents": "none", "position": "fixed", "insetInlineStart": "0px", "top": "0px", "gridColumnStart": "1", "gridRowStart": "1", "display": "grid", "width": "100%", "gridTemplateColumns": "repeat(1, minmax(0, 1fr))", "gridTemplateRows": "repeat(1, minmax(0, 1fr))", "alignItems": "flex-start", "justifyItems": "start", "overflowX": "hidden", "overflowY": "hidden", "overscrollBehavior": "contain", "height": ["100vh", "100dvh"] }, ".drawer-side > .drawer-overlay": { "position": "sticky", "top": "0px", "placeSelf": "stretch", "cursor": "pointer", "backgroundColor": "transparent", "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms" }, ".drawer-side > *": { "gridColumnStart": "1", "gridRowStart": "1" }, ".drawer-side > *:not(.drawer-overlay)": { "transitionProperty": "transform", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "300ms", "willChange": "transform", "transform": "translateX(-100%)" }, '[dir="rtl"] .drawer-side > *:not(.drawer-overlay)': { "transform": "translateX(100%)" }, ".drawer-toggle": { "position": "fixed", "height": "0px", "width": "0px", "appearance": "none", "opacity": "0" }, ".drawer-toggle:checked ~ .drawer-side": { "pointerEvents": "auto", "visibility": "visible", "overflowY": "auto" }, ".drawer-toggle:checked ~ .drawer-side > *:not(.drawer-overlay)": { "transform": "translateX(0%)" }, ".drawer-end": { "gridAutoColumns": "auto max-content" }, ".drawer-end .drawer-toggle ~ .drawer-content": { "gridColumnStart": "1" }, ".drawer-end .drawer-toggle ~ .drawer-side": { "gridColumnStart": "2", "justifyItems": "end" }, ".drawer-end .drawer-toggle ~ .drawer-side > *:not(.drawer-overlay)": { "transform": "translateX(100%)" }, '[dir="rtl"] .drawer-end .drawer-toggle ~ .drawer-side > *:not(.drawer-overlay)': { "transform": "translateX(-100%)" }, ".drawer-end .drawer-toggle:checked ~ .drawer-side > *:not(.drawer-overlay)": { "transform": "translateX(0%)" }, ".dropdown": { "position": "relative", "display": "inline-block" }, ".dropdown > *:not(summary):focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".dropdown .dropdown-content": { "position": "absolute" }, ".dropdown:is(:not(details)) .dropdown-content": { "visibility": "hidden", "opacity": "0", "transformOrigin": "top", "-TwScaleX": ".95", "-TwScaleY": ".95", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms" }, ".dropdown-end .dropdown-content": { "insetInlineEnd": "0px" }, ".dropdown-left .dropdown-content": { "bottom": "auto", "insetInlineEnd": "100%", "top": "0px", "transformOrigin": "right" }, ".dropdown-right .dropdown-content": { "bottom": "auto", "insetInlineStart": "100%", "top": "0px", "transformOrigin": "left" }, ".dropdown-bottom .dropdown-content": { "bottom": "auto", "top": "100%", "transformOrigin": "top" }, ".dropdown-top .dropdown-content": { "bottom": "100%", "top": "auto", "transformOrigin": "bottom" }, ".dropdown-end.dropdown-right .dropdown-content": { "bottom": "0px", "top": "auto" }, ".dropdown-end.dropdown-left .dropdown-content": { "bottom": "0px", "top": "auto" }, ".dropdown.dropdown-open .dropdown-content,\n.dropdown:not(.dropdown-hover):focus .dropdown-content,\n.dropdown:focus-within .dropdown-content": { "visibility": "visible", "opacity": "1" }, "@media (hover: hover)": [{ ".dropdown.dropdown-hover:hover .dropdown-content": { "visibility": "visible", "opacity": "1" } }, { ".btm-nav > *.disabled:hover,\n      .btm-nav > *[disabled]:hover": { "pointerEvents": "none", "-TwBorderOpacity": "0", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwBgOpacity": "0.1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwTextOpacity": "0.2" } }, { ".btn:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn:hover": { "backgroundColor": "color-mix(\n            in oklab,\n            oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity, 1)) 90%,\n            black\n          )", "borderColor": "color-mix(\n            in oklab,\n            oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 90%,\n            black\n          )" } }, "@supports not (color: oklch(0% 0 0))": { ".btn:hover": { "backgroundColor": "var(--btn-color, var(--fallback-b2))", "borderColor": "var(--btn-color, var(--fallback-b2))" } } }, { ".btn.glass:hover": { "-GlassOpacity": "25%", "-GlassBorderOpacity": "15%" } }, { ".btn-ghost:hover": { "borderColor": "transparent" }, "@supports (color: oklch(0% 0 0))": { ".btn-ghost:hover": { "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" } } }, { ".btn-link:hover": { "borderColor": "transparent", "backgroundColor": "transparent", "textDecorationLine": "underline" } }, { ".btn-outline:hover": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-b1,oklch(var(--b1)/var(--tw-text-opacity)))" } }, { ".btn-outline.btn-primary:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn-outline.btn-primary:hover": { "backgroundColor": "color-mix(in oklab, var(--fallback-p,oklch(var(--p)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-p,oklch(var(--p)/1)) 90%, black)" } } }, { ".btn-outline.btn-secondary:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn-outline.btn-secondary:hover": { "backgroundColor": "color-mix(in oklab, var(--fallback-s,oklch(var(--s)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-s,oklch(var(--s)/1)) 90%, black)" } } }, { ".btn-outline.btn-accent:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn-outline.btn-accent:hover": { "backgroundColor": "color-mix(in oklab, var(--fallback-a,oklch(var(--a)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-a,oklch(var(--a)/1)) 90%, black)" } } }, { ".btn-outline.btn-success:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn-outline.btn-success:hover": { "backgroundColor": "color-mix(in oklab, var(--fallback-su,oklch(var(--su)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-su,oklch(var(--su)/1)) 90%, black)" } } }, { ".btn-outline.btn-info:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn-outline.btn-info:hover": { "backgroundColor": "color-mix(in oklab, var(--fallback-in,oklch(var(--in)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-in,oklch(var(--in)/1)) 90%, black)" } } }, { ".btn-outline.btn-warning:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn-outline.btn-warning:hover": { "backgroundColor": "color-mix(in oklab, var(--fallback-wa,oklch(var(--wa)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-wa,oklch(var(--wa)/1)) 90%, black)" } } }, { ".btn-outline.btn-error:hover": { "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, "@supports (color: color-mix(in oklab, black, black))": { ".btn-outline.btn-error:hover": { "backgroundColor": "color-mix(in oklab, var(--fallback-er,oklch(var(--er)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-er,oklch(var(--er)/1)) 90%, black)" } } }, { ".btn-disabled:hover,\n    .btn[disabled]:hover,\n    .btn:disabled:hover": { "-TwBorderOpacity": "0", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwBgOpacity": "0.2", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwTextOpacity": "0.2" } }, { "@supports (color: color-mix(in oklab, black, black))": { '.btn:is(input[type="checkbox"]:checked):hover, .btn:is(input[type="radio"]:checked):hover': { "backgroundColor": "color-mix(in oklab, var(--fallback-p,oklch(var(--p)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-p,oklch(var(--p)/1)) 90%, black)" } } }, { ".dropdown.dropdown-hover:hover .dropdown-content": { "-TwScaleX": "1", "-TwScaleY": "1", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" } }, { ":where(.menu li:not(.menu-title, .disabled) > *:not(ul, details, .menu-title)):not(.active, .btn):hover, :where(.menu li:not(.menu-title, .disabled) > details > summary:not(.menu-title)):not(.active, .btn):hover": { "cursor": "pointer", "outline": "2px solid transparent", "outlineOffset": "2px" }, "@supports (color: oklch(0% 0 0))": { ":where(.menu li:not(.menu-title, .disabled) > *:not(ul, details, .menu-title)):not(.active, .btn):hover, :where(.menu li:not(.menu-title, .disabled) > details > summary:not(.menu-title)):not(.active, .btn):hover": { "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.1))" } } }, { ".tab[disabled],\n    .tab[disabled]:hover": { "cursor": "not-allowed", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwTextOpacity": "0.2" } }], ".dropdown:is(details) summary::-webkit-details-marker": { "display": "none" }, ".file-input": { "height": "3rem", "flexShrink": "1", "paddingInlineEnd": "1rem", "fontSize": ["0.875rem", "1rem"], "lineHeight": ["1.25rem", "2", "1.5rem"], "overflow": "hidden", "borderRadius": "var(--rounded-btn, 0.5rem)", "borderWidth": "1px", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".file-input::file-selector-button": { "marginInlineEnd": "1rem", "display": "inline-flex", "height": "100%", "flexShrink": "0", "cursor": "pointer", "userSelect": "none", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "center", "paddingLeft": "1rem", "paddingRight": "1rem", "textAlign": "center", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "1em"], "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms", "borderStyle": "solid", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-n,oklch(var(--n)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "fontWeight": "600", "textTransform": "uppercase", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))", "textDecorationLine": "none", "borderWidth": "var(--border-btn, 1px)", "animation": "button-pop var(--animation-btn, 0.25s) ease-out" }, ".footer": { "display": "grid", "width": "100%", "gridAutoFlow": "row", "placeItems": "start", "columnGap": "1rem", "rowGap": "2.5rem", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".footer > *": { "display": "grid", "placeItems": "start", "gap": "0.5rem" }, ".footer-center": { "placeItems": "center", "textAlign": "center" }, ".footer-center > *": { "placeItems": "center" }, "@media (min-width: 48rem)": { ".footer": { "gridAutoFlow": "column" }, ".footer-center": { "gridAutoFlow": "row dense" } }, ".form-control": { "display": "flex", "flexDirection": "column" }, ".label": { "display": "flex", "userSelect": "none", "alignItems": "center", "justifyContent": "space-between", "paddingLeft": "0.25rem", "paddingRight": "0.25rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem" }, ".hero": { "display": "grid", "width": "100%", "placeItems": "center", "backgroundSize": "cover", "backgroundPosition": "center" }, ".hero > *": { "gridColumnStart": "1", "gridRowStart": "1" }, ".hero-overlay": { "gridColumnStart": "1", "gridRowStart": "1", "height": "100%", "width": "100%", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwBgOpacity": "0.5" }, ".hero-content": { "zIndex": "0", "display": "flex", "alignItems": "center", "justifyContent": "center", "maxWidth": "80rem", "gap": "1rem", "padding": "1rem" }, ".indicator": { "position": "relative", "display": "inline-flex", "width": "max-content" }, ".indicator :where(.indicator-item)": { "zIndex": "1", "position": "absolute", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "whiteSpace": "nowrap" }, ".input": { "flexShrink": "1", "appearance": "none", "height": "3rem", "paddingLeft": "1rem", "paddingRight": "1rem", "fontSize": ["0.875rem", "1rem"], "lineHeight": ["1.25rem", "2", "1.5rem"], "borderRadius": "var(--rounded-btn, 0.5rem)", "borderWidth": "1px", "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, '.input[type="number"]::-webkit-inner-spin-button,\n.input-md[type="number"]::-webkit-inner-spin-button': { "marginTop": "-1rem", "marginBottom": "-1rem", "marginInlineEnd": "-1rem" }, '.input-xs[type="number"]::-webkit-inner-spin-button': { "marginTop": "-0.25rem", "marginBottom": "-0.25rem", "marginInlineEnd": "-0px" }, '.input-sm[type="number"]::-webkit-inner-spin-button': { "marginTop": "0px", "marginBottom": "0px", "marginInlineEnd": "-0px" }, '.input-lg[type="number"]::-webkit-inner-spin-button': { "marginTop": "-1.5rem", "marginBottom": "-1.5rem", "marginInlineEnd": "-1.5rem" }, ".join": { "display": "inline-flex", "alignItems": "stretch", "borderRadius": "var(--rounded-btn, 0.5rem)" }, ".join :where(.join-item)": { "borderStartEndRadius": "0", "borderEndEndRadius": "0", "borderEndStartRadius": "0", "borderStartStartRadius": "0" }, ".join .join-item:not(:first-child):not(:last-child),\n  .join *:not(:first-child):not(:last-child) .join-item": { "borderStartEndRadius": "0", "borderEndEndRadius": "0", "borderEndStartRadius": "0", "borderStartStartRadius": "0" }, ".join .join-item:first-child:not(:last-child),\n  .join *:first-child:not(:last-child) .join-item": { "borderStartEndRadius": "0", "borderEndEndRadius": "0" }, ".join .dropdown .join-item:first-child:not(:last-child),\n  .join *:first-child:not(:last-child) .dropdown .join-item": { "borderStartEndRadius": "inherit", "borderEndEndRadius": "inherit" }, ".join :where(.join-item:first-child:not(:last-child)),\n  .join :where(*:first-child:not(:last-child) .join-item)": { "borderEndStartRadius": "inherit", "borderStartStartRadius": "inherit" }, ".join .join-item:last-child:not(:first-child),\n  .join *:last-child:not(:first-child) .join-item": { "borderEndStartRadius": "0", "borderStartStartRadius": "0" }, ".join :where(.join-item:last-child:not(:first-child)),\n  .join :where(*:last-child:not(:first-child) .join-item)": { "borderStartEndRadius": "inherit", "borderEndEndRadius": "inherit" }, "@supports not selector(:has(*))": { ":where(.join *)": { "borderRadius": "inherit" } }, "@supports selector(:has(*))": { ":where(.join *:has(.join-item))": { "borderRadius": "inherit" } }, ".kbd": { "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "borderRadius": "var(--rounded-btn, 0.5rem)", "borderWidth": "1px", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.2", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "borderBottomWidth": "2px", "minHeight": "2.2em", "minWidth": "2.2em" }, ".link": { "cursor": "pointer", "textDecorationLine": "underline" }, ".link-hover": { "textDecorationLine": "none" }, ".mask": { "maskSize": "contain", "maskRepeat": "no-repeat", "maskPosition": "center" }, ".mask-half-1": { "maskSize": "200%", "maskPosition": "left" }, '.mask-half-1:where([dir="rtl"], [dir="rtl"] *)': { "maskPosition": "right" }, ".mask-half-2": { "maskSize": "200%", "maskPosition": "right" }, '.mask-half-2:where([dir="rtl"], [dir="rtl"] *)': { "maskPosition": "left" }, ".menu": { "display": "flex", "flexDirection": "column", "flexWrap": "wrap", "fontSize": "0.875rem", "lineHeight": "1.25rem", "padding": "0.5rem" }, ".menu :where(li ul)": { "position": "relative", "whiteSpace": "nowrap", "marginInlineStart": "1rem", "paddingInlineStart": "0.5rem" }, ".menu :where(li:not(.menu-title) > *:not(ul, details, .menu-title, .btn)), .menu :where(li:not(.menu-title) > details > summary:not(.menu-title))": { "display": "grid", "gridAutoFlow": "column", "alignContent": "flex-start", "alignItems": "center", "gap": "0.5rem", "gridAutoColumns": "minmax(auto, max-content) auto max-content", "userSelect": "none" }, ".menu li.disabled": { "cursor": "not-allowed", "userSelect": "none", "color": "var(--fallback-bc,oklch(var(--bc)/0.3))" }, ".menu :where(li > .menu-dropdown:not(.menu-dropdown-show))": { "display": "none" }, ":where(.menu li)": { "position": "relative", "display": "flex", "flexShrink": "0", "flexDirection": "column", "flexWrap": "wrap", "alignItems": "stretch" }, ":where(.menu li) .badge": { "justifySelf": "end" }, ".mockup-code": { "position": "relative", "overflow": "hidden", "overflowX": "auto", "minWidth": "18rem", "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "paddingTop": "1.25rem", "paddingBottom": "1.25rem", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))", "direction": "ltr" }, ".mockup-code pre[data-prefix]:before": { "content": ["attr(data-prefix)", "attr(data-prefix)"], "display": "inline-block", "textAlign": "right", "width": "2rem", "opacity": "0.5" }, ".mockup-window": { "position": "relative", "overflow": "hidden", "overflowX": "auto", "display": "flex", "flexDirection": "column", "borderRadius": "var(--rounded-box, 1rem)", "paddingTop": "1.25rem" }, ".mockup-window pre[data-prefix]:before": { "content": "attr(data-prefix)", "display": "inline-block", "textAlign": "right" }, ".mockup-browser": { "position": "relative", "overflow": "hidden", "overflowX": "auto", "borderRadius": "var(--rounded-box, 1rem)" }, ".mockup-browser pre[data-prefix]:before": { "content": "attr(data-prefix)", "display": "inline-block", "textAlign": "right" }, ".modal": { "pointerEvents": "none", "position": "fixed", "inset": "0px", "margin": "0px", "display": "grid", "height": "100%", "maxHeight": "none", "width": "100%", "maxWidth": "none", "justifyItems": "center", "padding": "0px", "opacity": "0", "overscrollBehavior": ["contain", "contain"], "zIndex": "999", "backgroundColor": "transparent", "color": "inherit", "transitionDuration": "200ms", "transitionTimingFunction": "cubic-bezier(0, 0, 0.2, 1)", "transitionProperty": "transform, opacity, visibility", "overflowY": "hidden" }, ".modal-scroll": { "overscrollBehavior": "auto" }, ":where(.modal)": { "alignItems": "center" }, ".modal-box": { "maxHeight": "calc(100vh - 5em)", "gridColumnStart": "1", "gridRowStart": "1", "width": "91.666667%", "maxWidth": "32rem", "-TwScaleX": ".9", "-TwScaleY": ".9", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "borderBottomRightRadius": "var(--rounded-box, 1rem)", "borderBottomLeftRadius": "var(--rounded-box, 1rem)", "borderTopLeftRadius": "var(--rounded-box, 1rem)", "borderTopRightRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "padding": "1.5rem", "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms", "boxShadow": "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px", "overflowY": "auto", "overscrollBehavior": "contain" }, ".modal-open,\n.modal:target,\n.modal-toggle:checked + .modal,\n.modal[open]": { "pointerEvents": "auto", "visibility": "visible", "opacity": "1" }, ".modal-action": { "display": "flex", "marginTop": "1.5rem", "justifyContent": "flex-end" }, ".modal-toggle": { "position": "fixed", "height": "0px", "width": "0px", "appearance": "none", "opacity": "0" }, ":root:has(:is(.modal-open, .modal:target, .modal-toggle:checked + .modal, .modal[open]))": { "overflow": "hidden", "scrollbarGutter": "stable" }, ".navbar": { "display": "flex", "alignItems": "center", "padding": "var(--navbar-padding, 0.5rem)", "minHeight": "4rem", "width": "100%" }, ":where(.navbar > *:not(script, style))": { "display": "inline-flex", "alignItems": "center" }, ".navbar-start": { "width": "50%", "justifyContent": "flex-start" }, ".navbar-center": { "flexShrink": "0" }, ".navbar-end": { "width": "50%", "justifyContent": "flex-end" }, ".progress": { "position": "relative", "width": "100%", "appearance": "none", "overflow": "hidden", "height": "0.5rem", "borderRadius": "var(--rounded-box, 1rem)", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".radial-progress": { "position": "relative", "display": "inline-grid", "height": "var(--size)", "width": "var(--size)", "placeContent": "center", "borderRadius": "9999px", "backgroundColor": "transparent", "verticalAlign": "middle", "boxSizing": "content-box", "-Value": "0", "-Size": "5rem", "-Thickness": "calc(var(--size) / 10)" }, ".radial-progress::-moz-progress-bar": { "appearance": "none", "backgroundColor": "transparent" }, ".radial-progress::-webkit-progress-value": { "appearance": "none", "backgroundColor": "transparent" }, ".radial-progress::-webkit-progress-bar": { "appearance": "none", "backgroundColor": "transparent" }, ".radial-progress:before,\n.radial-progress:after": { "position": "absolute", "borderRadius": "9999px", "content": '""' }, ".radial-progress:before": { "inset": "0px", "background": "radial-gradient(farthest-side, currentColor 98%, #0000) top/var(--thickness) var(--thickness)\n      no-repeat,\n    conic-gradient(currentColor calc(var(--value) * 1%), #0000 0)", "WebkitMask": "radial-gradient(\n    farthest-side,\n    #0000 calc(99% - var(--thickness)),\n    #000 calc(100% - var(--thickness))\n  )", "mask": "radial-gradient(\n    farthest-side,\n    #0000 calc(99% - var(--thickness)),\n    #000 calc(100% - var(--thickness))\n  )" }, ".radial-progress:after": { "inset": "calc(50% - var(--thickness) / 2)", "transform": "rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%))", "backgroundColor": "currentColor" }, ".radio": { "flexShrink": "0", "-Chkbg": "var(--bc)", "height": "1.5rem", "width": "1.5rem", "cursor": "pointer", "appearance": "none", "borderRadius": "9999px", "borderWidth": "1px", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.2" }, ".range": { "height": "1.5rem", "width": "100%", "cursor": "pointer", "appearance": "none", "WebkitAppearance": "none", "-RangeShdw": "var(--fallback-bc,oklch(var(--bc)/1))", "overflow": "hidden", "borderRadius": "var(--rounded-box, 1rem)", "backgroundColor": "transparent" }, ".range:focus": { "outline": "none" }, ".rating": { "position": "relative", "display": "inline-flex" }, ".rating :where(input)": { "cursor": "pointer", "borderRadius": "0px", "animation": "rating-pop var(--animation-input, 0.25s) ease-out", "height": "1.5rem", "width": "1.5rem", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "-TwBgOpacity": "1" }, ".select": { "display": "inline-flex", "cursor": "pointer", "userSelect": "none", "appearance": "none", "height": "3rem", "minHeight": "3rem", "paddingInlineStart": "1rem", "paddingInlineEnd": ["2.5rem", "2.5rem"], "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"], "borderRadius": "var(--rounded-btn, 0.5rem)", "borderWidth": "1px", "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "backgroundImage": "linear-gradient(45deg, transparent 50%, currentColor 50%),\n    linear-gradient(135deg, currentColor 50%, transparent 50%)", "backgroundPosition": "calc(100% - 20px) calc(1px + 50%),\n    calc(100% - 16.1px) calc(1px + 50%)", "backgroundSize": "4px 4px,\n    4px 4px", "backgroundRepeat": "no-repeat" }, ".select[multiple]": { "height": "auto" }, ".stack": { "display": "inline-grid", "placeItems": "center", "alignItems": "flex-end" }, ".stack > *": { "gridColumnStart": "1", "gridRowStart": "1", "transform": "translateY(10%) scale(0.9)", "zIndex": "1", "width": "100%", "opacity": "0.6" }, ".stack > *:nth-child(2)": { "transform": "translateY(5%) scale(0.95)", "zIndex": "2", "opacity": "0.8" }, ".stack > *:nth-child(1)": { "transform": "translateY(0) scale(1)", "zIndex": "3", "opacity": "1" }, ".stats": { "display": "inline-grid", "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, ":where(.stats)": { "gridAutoFlow": "column", "overflowX": "auto" }, ".stat": { "display": "inline-grid", "width": "100%", "gridTemplateColumns": "repeat(1, 1fr)", "columnGap": "1rem", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "paddingLeft": "1.5rem", "paddingRight": "1.5rem", "paddingTop": "1rem", "paddingBottom": "1rem" }, ".stat-figure": { "gridColumnStart": "2", "gridRow": "span 3 / span 3", "gridRowStart": "1", "placeSelf": "center", "justifySelf": "end" }, ".stat-title": { "gridColumnStart": "1", "whiteSpace": "nowrap", "color": "var(--fallback-bc,oklch(var(--bc)/0.6))" }, ".stat-value": { "gridColumnStart": "1", "whiteSpace": "nowrap", "fontSize": "2.25rem", "lineHeight": "2.5rem", "fontWeight": "800" }, ".stat-desc": { "gridColumnStart": "1", "whiteSpace": "nowrap", "fontSize": "0.75rem", "lineHeight": "1rem", "color": "var(--fallback-bc,oklch(var(--bc)/0.6))" }, ".stat-actions": { "gridColumnStart": "1", "whiteSpace": "nowrap", "marginTop": "1rem" }, ".steps": { "display": "inline-grid", "gridAutoFlow": "column", "overflow": "hidden", "overflowX": "auto", "counterReset": "step", "gridAutoColumns": "1fr" }, ".steps .step": { "display": "grid", "gridTemplateColumns": ["repeat(1, minmax(0, 1fr))", "auto"], "gridTemplateRows": ["repeat(2, minmax(0, 1fr))", "40px 1fr"], "placeItems": "center", "textAlign": "center", "minWidth": "4rem" }, ".swap": { "position": "relative", "display": "inline-grid", "userSelect": "none", "placeContent": "center", "cursor": "pointer" }, ".swap > *": { "gridColumnStart": "1", "gridRowStart": "1", "transitionDuration": "300ms", "transitionTimingFunction": "cubic-bezier(0, 0, 0.2, 1)", "transitionProperty": "transform, opacity" }, ".swap input": { "appearance": "none" }, ".swap .swap-on,\n.swap .swap-indeterminate,\n.swap input:indeterminate ~ .swap-on": { "opacity": "0" }, ".swap input:checked ~ .swap-off,\n.swap-active .swap-off,\n.swap input:indeterminate ~ .swap-off": { "opacity": "0" }, ".swap input:checked ~ .swap-on,\n.swap-active .swap-on,\n.swap input:indeterminate ~ .swap-indeterminate": { "opacity": "1" }, ".tabs": { "display": "grid", "alignItems": "flex-end" }, '.tabs-lifted:has(.tab-content[class^="rounded-"])\n    .tab:first-child:not(:is(.tab-active, [aria-selected="true"])), .tabs-lifted:has(.tab-content[class*=" rounded-"])\n    .tab:first-child:not(:is(.tab-active, [aria-selected="true"]))': { "borderBottomColor": "transparent" }, ".tab": { "position": "relative", "gridRowStart": "1", "display": "inline-flex", "height": "2rem", "cursor": "pointer", "userSelect": "none", "appearance": "none", "flexWrap": "wrap", "alignItems": "center", "justifyContent": "center", "textAlign": "center", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"], "-TabPadding": "1rem", "-TwTextOpacity": "0.5", "-TabColor": "var(--fallback-bc,oklch(var(--bc)/1))", "-TabBg": "var(--fallback-b1,oklch(var(--b1)/1))", "-TabBorderColor": "var(--fallback-b3,oklch(var(--b3)/1))", "color": "var(--tab-color)", "paddingInlineStart": "var(--tab-padding, 1rem)", "paddingInlineEnd": "var(--tab-padding, 1rem)" }, '.tab:is(input[type="radio"])': { "width": "auto", "borderBottomRightRadius": "0px", "borderBottomLeftRadius": "0px" }, '.tab:is(input[type="radio"]):after': { "-TwContent": "attr(aria-label)", "content": "var(--tw-content)" }, ".tab:not(input):empty": { "cursor": "default", "gridColumnStart": "span 9999" }, ".tab-content": { "gridColumnStart": "1", "gridColumnEnd": "span 9999", "gridRowStart": "2", "marginTop": "calc(var(--tab-border) * -1)", "display": "none", "borderColor": "transparent", "borderWidth": "var(--tab-border, 0)" }, ':checked + .tab-content:nth-child(2),\n  :is(.tab-active, [aria-selected="true"]) + .tab-content:nth-child(2)': { "borderStartStartRadius": "0px" }, 'input.tab:checked + .tab-content,\n:is(.tab-active, [aria-selected="true"]) + .tab-content': { "display": "block" }, ".table": { "position": "relative", "width": "100%", "borderRadius": "var(--rounded-box, 1rem)", "textAlign": "left", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".table :where(.table-pin-rows thead tr)": { "position": "sticky", "top": "0px", "zIndex": "1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".table :where(.table-pin-rows tfoot tr)": { "position": "sticky", "bottom": "0px", "zIndex": "1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".table :where(.table-pin-cols tr th)": { "position": "sticky", "left": "0px", "right": "0px", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".table-zebra tbody tr:nth-child(even) :where(.table-pin-cols tr th)": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))" }, ".textarea": { "minHeight": "3rem", "flexShrink": "1", "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"], "borderRadius": "var(--rounded-btn, 0.5rem)", "borderWidth": "1px", "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".timeline": { "position": "relative", "display": "flex" }, ":where(.timeline > li)": { "position": "relative", "display": "grid", "flexShrink": "0", "alignItems": "center", "gridTemplateRows": "var(--timeline-row-start, minmax(0, 1fr)) auto var(\n      --timeline-row-end,\n      minmax(0, 1fr)\n    )", "gridTemplateColumns": "var(--timeline-col-start, minmax(0, 1fr)) auto var(\n      --timeline-col-end,\n      minmax(0, 1fr)\n    )" }, ".timeline > li > hr": { "width": "100%", "borderWidth": "0px" }, ":where(.timeline > li > hr):first-child": { "gridColumnStart": "1", "gridRowStart": "2" }, ":where(.timeline > li > hr):last-child": { "gridColumnStart": "3", "gridColumnEnd": "none", "gridRowStart": "2", "gridRowEnd": "auto" }, ".timeline-start": { "gridColumnStart": "1", "gridColumnEnd": "4", "gridRowStart": "1", "gridRowEnd": "2", "margin": "0.25rem", "alignSelf": "flex-end", "justifySelf": "center" }, ".timeline-middle": { "gridColumnStart": "2", "gridRowStart": "2" }, ".timeline-end": { "gridColumnStart": "1", "gridColumnEnd": "4", "gridRowStart": "3", "gridRowEnd": "4", "margin": "0.25rem", "alignSelf": "flex-start", "justifySelf": "center" }, ".toast": { "position": "fixed", "display": "flex", "minWidth": "fit-content", "flexDirection": "column", "whiteSpace": "nowrap", "gap": "0.5rem", "padding": "1rem" }, ".toggle": { "flexShrink": "0", "-Tglbg": "var(--fallback-b1,oklch(var(--b1)/1))", "-Handleoffset": "1.5rem", "-Handleoffsetcalculator": "calc(var(--handleoffset) * -1)", "-Togglehandleborder": "0 0", "height": "1.5rem", "width": "3rem", "cursor": "pointer", "appearance": "none", "borderRadius": "var(--rounded-badge, 1.9rem)", "borderWidth": "1px", "borderColor": "currentColor", "backgroundColor": "currentColor", "color": "var(--fallback-bc,oklch(var(--bc)/0.5))", "transition": "background,\n    box-shadow var(--animation-input, 0.2s) ease-out", "boxShadow": "var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,\n    0 0 0 2px var(--tglbg) inset,\n    var(--togglehandleborder)" }, ".alert-info": { "borderColor": "var(--fallback-in,oklch(var(--in)/0.2))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))", "-AlertBg": "var(--fallback-in,oklch(var(--in)/1))", "-AlertBgMix": "var(--fallback-b1,oklch(var(--b1)/1))" }, ".alert-success": { "borderColor": "var(--fallback-su,oklch(var(--su)/0.2))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))", "-AlertBg": "var(--fallback-su,oklch(var(--su)/1))", "-AlertBgMix": "var(--fallback-b1,oklch(var(--b1)/1))" }, ".alert-warning": { "borderColor": "var(--fallback-wa,oklch(var(--wa)/0.2))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))", "-AlertBg": "var(--fallback-wa,oklch(var(--wa)/1))", "-AlertBgMix": "var(--fallback-b1,oklch(var(--b1)/1))" }, ".alert-error": { "borderColor": "var(--fallback-er,oklch(var(--er)/0.2))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))", "-AlertBg": "var(--fallback-er,oklch(var(--er)/1))", "-AlertBgMix": "var(--fallback-b1,oklch(var(--b1)/1))" }, ".avatar-group": { "display": "flex", "overflow": "hidden" }, ".avatar-group :where(.avatar)": { "overflow": "hidden", "borderRadius": "9999px", "borderWidth": "4px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-border-opacity)))" }, ".badge-neutral": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-n,oklch(var(--n)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))" }, ".badge-primary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".badge-secondary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".badge-accent": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".badge-info": { "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".badge-success": { "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".badge-warning": { "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".badge-error": { "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, ".badge-ghost": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, ".badge-outline": { "borderColor": "currentColor", "-TwBorderOpacity": "0.5", "backgroundColor": "transparent", "color": "currentColor" }, ".badge-outline.badge-neutral": { "-TwTextOpacity": "1", "color": "var(--fallback-n,oklch(var(--n)/var(--tw-text-opacity)))" }, ".badge-outline.badge-primary": { "-TwTextOpacity": "1", "color": "var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))" }, ".badge-outline.badge-secondary": { "-TwTextOpacity": "1", "color": "var(--fallback-s,oklch(var(--s)/var(--tw-text-opacity)))" }, ".badge-outline.badge-accent": { "-TwTextOpacity": "1", "color": "var(--fallback-a,oklch(var(--a)/var(--tw-text-opacity)))" }, ".badge-outline.badge-info": { "-TwTextOpacity": "1", "color": "var(--fallback-in,oklch(var(--in)/var(--tw-text-opacity)))" }, ".badge-outline.badge-success": { "-TwTextOpacity": "1", "color": "var(--fallback-su,oklch(var(--su)/var(--tw-text-opacity)))" }, ".badge-outline.badge-warning": { "-TwTextOpacity": "1", "color": "var(--fallback-wa,oklch(var(--wa)/var(--tw-text-opacity)))" }, ".badge-outline.badge-error": { "-TwTextOpacity": "1", "color": "var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)))" }, ".btm-nav > *:not(.active)": { "paddingTop": "0.125rem" }, ".btm-nav > *:where(.active)": { "borderTopWidth": "2px", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))" }, ".btm-nav > *.disabled,\n    .btm-nav > *[disabled]": { "pointerEvents": "none", "-TwBorderOpacity": "0", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwBgOpacity": "0.1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwTextOpacity": "0.2" }, ".btm-nav > * .label": { "fontSize": "1rem", "lineHeight": "1.5rem" }, ".breadcrumbs > ul > li > a:focus, .breadcrumbs > ol > li > a:focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".breadcrumbs > ul > li > a:focus-visible, .breadcrumbs > ol > li > a:focus-visible": { "outline": "2px solid currentColor", "outlineOffset": "2px" }, ".breadcrumbs > ul > li + *:before, .breadcrumbs > ol > li + *:before": { "content": '""', "marginLeft": "0.5rem", "marginRight": "0.75rem", "display": "block", "height": "0.375rem", "width": "0.375rem", "-TwRotate": "45deg", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "opacity": "0.4", "borderTop": "1px solid", "borderRight": "1px solid", "backgroundColor": "transparent" }, '[dir="rtl"] .breadcrumbs > ul > li + *:before,\n[dir="rtl"] .breadcrumbs > ol > li + *:before': { "-TwRotate": "-135deg" }, "@media (prefers-reduced-motion: no-preference)": { ".btn": { "animation": "button-pop var(--animation-btn, 0.25s) ease-out" } }, ".btn:active:hover,\n  .btn:active:focus": { "animation": "button-pop 0s ease-out", "transform": "scale(var(--btn-focus-scale, 0.97))" }, "@supports not (color: oklch(0% 0 0))": [{ ".btn": { "backgroundColor": "var(--btn-color, var(--fallback-b2))", "borderColor": "var(--btn-color, var(--fallback-b2))" } }, { ".btn-primary": { "-BtnColor": "var(--fallback-p)" } }, { ".btn-secondary": { "-BtnColor": "var(--fallback-s)" } }, { ".btn-accent": { "-BtnColor": "var(--fallback-a)" } }, { ".btn-neutral": { "-BtnColor": "var(--fallback-n)" } }, { ".btn-info": { "-BtnColor": "var(--fallback-in)" } }, { ".btn-success": { "-BtnColor": "var(--fallback-su)" } }, { ".btn-warning": { "-BtnColor": "var(--fallback-wa)" } }, { ".btn-error": { "-BtnColor": "var(--fallback-er)" } }, { '.prose :where(code):not(:where([class~="not-prose"] *, pre *))': { "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/1))" } }], "@supports (color: color-mix(in oklab, black, black))": [{ ".btn-active": { "backgroundColor": "color-mix(\n          in oklab,\n          oklch(var(--btn-color, var(--b3)) / var(--tw-bg-opacity, 1)) 90%,\n          black\n        )", "borderColor": "color-mix(\n          in oklab,\n          oklch(var(--btn-color, var(--b3)) / var(--tw-border-opacity, 1)) 90%,\n          black\n        )" } }, { ".btn-outline.btn-primary.btn-active": { "backgroundColor": "color-mix(in oklab, var(--fallback-p,oklch(var(--p)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-p,oklch(var(--p)/1)) 90%, black)" } }, { ".btn-outline.btn-secondary.btn-active": { "backgroundColor": "color-mix(in oklab, var(--fallback-s,oklch(var(--s)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-s,oklch(var(--s)/1)) 90%, black)" } }, { ".btn-outline.btn-accent.btn-active": { "backgroundColor": "color-mix(in oklab, var(--fallback-a,oklch(var(--a)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-a,oklch(var(--a)/1)) 90%, black)" } }, { ".btn-outline.btn-success.btn-active": { "backgroundColor": "color-mix(in oklab, var(--fallback-su,oklch(var(--su)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-su,oklch(var(--su)/1)) 90%, black)" } }, { ".btn-outline.btn-info.btn-active": { "backgroundColor": "color-mix(in oklab, var(--fallback-in,oklch(var(--in)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-in,oklch(var(--in)/1)) 90%, black)" } }, { ".btn-outline.btn-warning.btn-active": { "backgroundColor": "color-mix(in oklab, var(--fallback-wa,oklch(var(--wa)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-wa,oklch(var(--wa)/1)) 90%, black)" } }, { ".btn-outline.btn-error.btn-active": { "backgroundColor": "color-mix(in oklab, var(--fallback-er,oklch(var(--er)/1)) 90%, black)", "borderColor": "color-mix(in oklab, var(--fallback-er,oklch(var(--er)/1)) 90%, black)" } }], ".btn:focus-visible": { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px" }, ".btn-primary": { "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, "@supports (color: oklch(0% 0 0))": [{ ".btn-primary": { "-BtnColor": "var(--p)" } }, { ".btn-secondary": { "-BtnColor": "var(--s)" } }, { ".btn-accent": { "-BtnColor": "var(--a)" } }, { ".btn-neutral": { "-BtnColor": "var(--n)" } }, { ".btn-info": { "-BtnColor": "var(--in)" } }, { ".btn-success": { "-BtnColor": "var(--su)" } }, { ".btn-warning": { "-BtnColor": "var(--wa)" } }, { ".btn-error": { "-BtnColor": "var(--er)" } }], ".btn-secondary": { "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, ".btn-accent": { "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, ".btn-neutral": { "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-n,oklch(var(--n)/1))" }, ".btn-info": { "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, ".btn-success": { "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, ".btn-warning": { "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, ".btn-error": { "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))", "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, ".btn.glass": { "-TwShadow": "0 0 #0000", "-TwShadowColored": "0 0 #0000", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)", "outlineColor": "currentColor" }, ".btn.glass.btn-active": { "-GlassOpacity": "25%", "-GlassBorderOpacity": "15%" }, ".btn-ghost": { "borderWidth": "1px", "borderColor": "transparent", "backgroundColor": "transparent", "color": "currentColor", "-TwShadow": "0 0 #0000", "-TwShadowColored": "0 0 #0000", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)", "outlineColor": "currentColor" }, ".btn-ghost.btn-active": { "borderColor": "transparent", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".btn-link": { "borderColor": "transparent", "backgroundColor": "transparent", "-TwTextOpacity": "1", "color": "var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))", "textDecorationLine": "underline", "-TwShadow": "0 0 #0000", "-TwShadowColored": "0 0 #0000", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)", "outlineColor": "currentColor" }, ".btn-link.btn-active": { "borderColor": "transparent", "backgroundColor": "transparent", "textDecorationLine": "underline" }, ".btn-outline": { "borderColor": "currentColor", "backgroundColor": "transparent", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwShadow": "0 0 #0000", "-TwShadowColored": "0 0 #0000", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)" }, ".btn-outline.btn-active": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-b1,oklch(var(--b1)/var(--tw-text-opacity)))" }, ".btn-outline.btn-primary": { "-TwTextOpacity": "1", "color": "var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))" }, ".btn-outline.btn-primary.btn-active": { "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".btn-outline.btn-secondary": { "-TwTextOpacity": "1", "color": "var(--fallback-s,oklch(var(--s)/var(--tw-text-opacity)))" }, ".btn-outline.btn-secondary.btn-active": { "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".btn-outline.btn-accent": { "-TwTextOpacity": "1", "color": "var(--fallback-a,oklch(var(--a)/var(--tw-text-opacity)))" }, ".btn-outline.btn-accent.btn-active": { "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".btn-outline.btn-success": { "-TwTextOpacity": "1", "color": "var(--fallback-su,oklch(var(--su)/var(--tw-text-opacity)))" }, ".btn-outline.btn-success.btn-active": { "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".btn-outline.btn-info": { "-TwTextOpacity": "1", "color": "var(--fallback-in,oklch(var(--in)/var(--tw-text-opacity)))" }, ".btn-outline.btn-info.btn-active": { "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".btn-outline.btn-warning": { "-TwTextOpacity": "1", "color": "var(--fallback-wa,oklch(var(--wa)/var(--tw-text-opacity)))" }, ".btn-outline.btn-warning.btn-active": { "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".btn-outline.btn-error": { "-TwTextOpacity": "1", "color": "var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)))" }, ".btn-outline.btn-error.btn-active": { "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, ".btn.btn-disabled,\n  .btn[disabled],\n  .btn:disabled": { "-TwBorderOpacity": "0", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwBgOpacity": "0.2", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwTextOpacity": "0.2" }, '.btn:is(input[type="checkbox"]:checked),\n.btn:is(input[type="radio"]:checked)': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, '.btn:is(input[type="checkbox"]:checked):focus-visible, .btn:is(input[type="radio"]:checked):focus-visible': { "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, "@keyframes button-pop": { "0%": { "transform": "scale(var(--btn-focus-scale, 0.98))" }, "40%": { "transform": "scale(1.02)" }, "100%": { "transform": "scale(1)" } }, ".card :where(figure:first-child)": { "overflow": "hidden", "borderStartStartRadius": "inherit", "borderStartEndRadius": "inherit", "borderEndStartRadius": "unset", "borderEndEndRadius": "unset" }, ".card :where(figure:last-child)": { "overflow": "hidden", "borderStartStartRadius": "unset", "borderStartEndRadius": "unset", "borderEndStartRadius": "inherit", "borderEndEndRadius": "inherit" }, ".card:focus-visible": { "outline": "2px solid currentColor", "outlineOffset": "2px" }, ".card.bordered": { "borderWidth": "1px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))" }, ".card-bordered": { "borderWidth": "1px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))" }, ".card.compact .card-body": { "padding": "1rem", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".card-title": { "display": "flex", "alignItems": "center", "gap": "0.5rem", "fontSize": "1.25rem", "lineHeight": "1.75rem", "fontWeight": "600" }, ".card.image-full :where(figure)": { "overflow": "hidden", "borderRadius": "inherit" }, ".carousel::-webkit-scrollbar": { "display": "none" }, ".chat-bubble-primary": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".chat-bubble-secondary": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".chat-bubble-accent": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".chat-bubble-info": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".chat-bubble-success": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".chat-bubble-warning": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".chat-bubble-error": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, ".checkbox:focus": { "boxShadow": "none" }, ".checkbox:focus-visible": { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/1))" }, ".checkbox:disabled": { "borderWidth": "0px", "cursor": "not-allowed", "borderColor": "transparent", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "opacity": "0.2" }, '.checkbox:checked,\n  .checkbox[aria-checked="true"]': { "backgroundRepeat": "no-repeat", "animation": "checkmark var(--animation-input, 0.2s) ease-out", "backgroundColor": "var(--chkbg)", "backgroundImage": "linear-gradient(-45deg, transparent 65%, var(--chkbg) 65.99%),\n      linear-gradient(45deg, transparent 75%, var(--chkbg) 75.99%),\n      linear-gradient(-45deg, var(--chkbg) 40%, transparent 40.99%),\n      linear-gradient(\n        45deg,\n        var(--chkbg) 30%,\n        var(--chkfg) 30.99%,\n        var(--chkfg) 40%,\n        transparent 40.99%\n      ),\n      linear-gradient(-45deg, var(--chkfg) 50%, var(--chkbg) 50.99%)" }, ".checkbox:indeterminate": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "backgroundRepeat": "no-repeat", "animation": "checkmark var(--animation-input, 0.2s) ease-out", "backgroundImage": "linear-gradient(90deg, transparent 80%, var(--chkbg) 80%),\n      linear-gradient(-90deg, transparent 80%, var(--chkbg) 80%),\n      linear-gradient(0deg, var(--chkbg) 43%, var(--chkfg) 43%, var(--chkfg) 57%, var(--chkbg) 57%)" }, ".checkbox-primary": { "-Chkbg": "var(--fallback-p,oklch(var(--p)/1))", "-Chkfg": "var(--fallback-pc,oklch(var(--pc)/1))", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" }, ".checkbox-primary:focus-visible": { "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, '.checkbox-primary:checked,\n    .checkbox-primary[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".checkbox-secondary": { "-Chkbg": "var(--fallback-s,oklch(var(--s)/1))", "-Chkfg": "var(--fallback-sc,oklch(var(--sc)/1))", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" }, ".checkbox-secondary:focus-visible": { "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, '.checkbox-secondary:checked,\n    .checkbox-secondary[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".checkbox-accent": { "-Chkbg": "var(--fallback-a,oklch(var(--a)/1))", "-Chkfg": "var(--fallback-ac,oklch(var(--ac)/1))", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" }, ".checkbox-accent:focus-visible": { "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, '.checkbox-accent:checked,\n    .checkbox-accent[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".checkbox-success": { "-Chkbg": "var(--fallback-su,oklch(var(--su)/1))", "-Chkfg": "var(--fallback-suc,oklch(var(--suc)/1))", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" }, ".checkbox-success:focus-visible": { "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, '.checkbox-success:checked,\n    .checkbox-success[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".checkbox-warning": { "-Chkbg": "var(--fallback-wa,oklch(var(--wa)/1))", "-Chkfg": "var(--fallback-wac,oklch(var(--wac)/1))", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" }, ".checkbox-warning:focus-visible": { "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, '.checkbox-warning:checked,\n    .checkbox-warning[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".checkbox-info": { "-Chkbg": "var(--fallback-in,oklch(var(--in)/1))", "-Chkfg": "var(--fallback-inc,oklch(var(--inc)/1))", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" }, ".checkbox-info:focus-visible": { "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, '.checkbox-info:checked,\n    .checkbox-info[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".checkbox-error": { "-Chkbg": "var(--fallback-er,oklch(var(--er)/1))", "-Chkfg": "var(--fallback-erc,oklch(var(--erc)/1))", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" }, ".checkbox-error:focus-visible": { "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, '.checkbox-error:checked,\n    .checkbox-error[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, "@keyframes checkmark": { "0%": { "backgroundPositionY": "5px" }, "50%": { "backgroundPositionY": "-2px" }, "100%": { "backgroundPositionY": "0" } }, ".checkbox-mark": { "display": "none" }, "details.collapse": { "width": "100%" }, "details.collapse summary": { "position": "relative", "display": "block", "outline": "2px solid transparent", "outlineOffset": "2px" }, "details.collapse summary::-webkit-details-marker": { "display": "none" }, ".collapse:focus-visible": { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/1))" }, '.collapse:has(.collapse-title:focus-visible),\n.collapse:has(> input[type="checkbox"]:focus-visible),\n.collapse:has(> input[type="radio"]:focus-visible)': { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/1))" }, ".collapse-arrow > .collapse-title:after": { "position": "absolute", "display": "block", "height": "0.5rem", "width": "0.5rem", "-TwTranslateY": "-100%", "-TwRotate": "45deg", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "transitionProperty": "all", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": ["150ms", "0.2s"], "top": "1.9rem", "insetInlineEnd": "1.4rem", "content": '""', "transformOrigin": "75% 75%", "boxShadow": "2px 2px", "pointerEvents": "none" }, ".collapse-plus > .collapse-title:after": { "position": "absolute", "display": "block", "height": "0.5rem", "width": "0.5rem", "transitionProperty": "all", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "300ms", "top": "0.9rem", "insetInlineEnd": "1.4rem", "content": '"+"', "pointerEvents": "none" }, '.collapse:not(.collapse-open):not(.collapse-close) > input[type="checkbox"],\n.collapse:not(.collapse-open):not(.collapse-close) > input[type="radio"]:not(:checked),\n.collapse:not(.collapse-open):not(.collapse-close) > .collapse-title': { "cursor": "pointer" }, ".collapse:focus:not(.collapse-open):not(.collapse-close):not(.collapse[open]) > .collapse-title": { "cursor": "unset" }, ".collapse-title": { "position": "relative" }, ':where(.collapse > input[type="checkbox"]),\n:where(.collapse > input[type="radio"])': { "zIndex": "1" }, '.collapse-title,\n:where(.collapse > input[type="checkbox"]),\n:where(.collapse > input[type="radio"])': { "width": "100%", "padding": "1rem", "paddingInlineEnd": "3rem", "minHeight": "3.75rem", "transition": "background-color 0.2s ease-out" }, '.collapse[open] > :where(.collapse-content),\n.collapse-open > :where(.collapse-content),\n.collapse:focus:not(.collapse-close) > :where(.collapse-content),\n.collapse:not(.collapse-close) > :where(input[type="checkbox"]:checked ~ .collapse-content),\n.collapse:not(.collapse-close) > :where(input[type="radio"]:checked ~ .collapse-content)': { "paddingBottom": "1rem", "transition": "padding 0.2s ease-out,\n    background-color 0.2s ease-out" }, '.collapse[open].collapse-arrow > .collapse-title:after,\n.collapse-open.collapse-arrow > .collapse-title:after,\n.collapse-arrow:focus:not(.collapse-close) > .collapse-title:after,\n.collapse-arrow:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title:after,\n.collapse-arrow:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-title:after': { "-TwTranslateY": "-50%", "-TwRotate": "225deg", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, '.collapse[open].collapse-plus > .collapse-title:after,\n.collapse-open.collapse-plus > .collapse-title:after,\n.collapse-plus:focus:not(.collapse-close) > .collapse-title:after,\n.collapse-plus:not(.collapse-close) > input[type="checkbox"]:checked ~ .collapse-title:after,\n.collapse-plus:not(.collapse-close) > input[type="radio"]:checked ~ .collapse-title:after': { "content": '"\u2212"' }, ".divider:not(:empty)": { "gap": "1rem" }, ".divider-neutral:before,\n  .divider-neutral:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))" }, ".divider-primary:before,\n  .divider-primary:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))" }, ".divider-secondary:before,\n  .divider-secondary:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))" }, ".divider-accent:before,\n  .divider-accent:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))" }, ".divider-success:before,\n  .divider-success:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))" }, ".divider-warning:before,\n  .divider-warning:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))" }, ".divider-info:before,\n  .divider-info:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))" }, ".divider-error:before,\n  .divider-error:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))" }, ".drawer-toggle:checked ~ .drawer-side > .drawer-overlay": { "backgroundColor": "#0006" }, ".drawer-toggle:focus-visible ~ .drawer-content label.drawer-button": { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px" }, ".dropdown.dropdown-open .dropdown-content,\n.dropdown:focus .dropdown-content,\n.dropdown:focus-within .dropdown-content": { "-TwScaleX": "1", "-TwScaleY": "1", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".file-input-bordered": { "-TwBorderOpacity": "0.2" }, ".file-input:focus": { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".file-input-ghost": { "-TwBgOpacity": "0.05" }, ".file-input-ghost:focus": { "-TwBgOpacity": "1", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "boxShadow": "none" }, ".file-input-ghost::file-selector-button": { "borderWidth": "1px", "borderColor": "transparent", "backgroundColor": "transparent", "color": "currentColor" }, ".file-input-primary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" }, ".file-input-primary:focus": { "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, ".file-input-primary::file-selector-button": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".file-input-secondary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" }, ".file-input-secondary:focus": { "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, ".file-input-secondary::file-selector-button": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".file-input-accent": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" }, ".file-input-accent:focus": { "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, ".file-input-accent::file-selector-button": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".file-input-info": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" }, ".file-input-info:focus": { "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, ".file-input-info::file-selector-button": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".file-input-success": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" }, ".file-input-success:focus": { "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, ".file-input-success::file-selector-button": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".file-input-warning": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" }, ".file-input-warning:focus": { "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, ".file-input-warning::file-selector-button": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".file-input-error": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" }, ".file-input-error:focus": { "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, ".file-input-error::file-selector-button": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, ".file-input-disabled,\n  .file-input[disabled]": { "cursor": "not-allowed", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "-TwTextOpacity": "0.2" }, ".file-input-disabled::placeholder,\n  .file-input[disabled]::placeholder": { "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)))", "-TwPlaceholderOpacity": "0.2" }, ".file-input-disabled::file-selector-button, .file-input[disabled]::file-selector-button": { "-TwBorderOpacity": "0", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwBgOpacity": "0.2", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwTextOpacity": "0.2" }, ".footer-title": { "marginBottom": "0.5rem", "fontWeight": "700", "textTransform": "uppercase", "opacity": "0.6" }, ".label-text": { "fontSize": "0.875rem", "lineHeight": "1.25rem", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, ".label-text-alt": { "fontSize": "0.75rem", "lineHeight": "1rem", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, ".input input": { "-TwBgOpacity": "1", "backgroundColor": ["var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "transparent"] }, ".input input:focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".input[list]::-webkit-calendar-picker-indicator": { "lineHeight": "1em" }, ".input-bordered": { "borderColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".input:focus,\n  .input:focus-within": { "boxShadow": "none", "borderColor": "var(--fallback-bc,oklch(var(--bc)/0.2))", "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".input-ghost": { "-TwBgOpacity": "0.05" }, ".input-ghost:focus,\n    .input-ghost:focus-within": { "-TwBgOpacity": "1", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "boxShadow": "none" }, ".input-primary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" }, ".input-primary:focus,\n    .input-primary:focus-within": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, ".input-secondary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" }, ".input-secondary:focus,\n    .input-secondary:focus-within": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, ".input-accent": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" }, ".input-accent:focus,\n    .input-accent:focus-within": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, ".input-info": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" }, ".input-info:focus,\n    .input-info:focus-within": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, ".input-success": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" }, ".input-success:focus,\n    .input-success:focus-within": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, ".input-warning": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" }, ".input-warning:focus,\n    .input-warning:focus-within": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, ".input-error": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" }, ".input-error:focus,\n    .input-error:focus-within": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, ".input:has(> input[disabled]),\n  .input-disabled,\n  .input:disabled,\n  .input[disabled]": { "cursor": "not-allowed", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "color": "var(--fallback-bc,oklch(var(--bc)/0.4))" }, ".input:has(> input[disabled])::placeholder,\n  .input-disabled::placeholder,\n  .input:disabled::placeholder,\n  .input[disabled]::placeholder": { "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)))", "-TwPlaceholderOpacity": "0.2" }, ".input:has(> input[disabled]) > input[disabled]": { "cursor": "not-allowed" }, ".input::-webkit-date-and-time-value": { "textAlign": "inherit" }, ".join > :where(*:not(:first-child))": { "marginTop": "0px", "marginBottom": "0px", "marginInlineStart": "-1px" }, ".join > :where(*:not(:first-child)):is(.btn)": { "marginInlineStart": "calc(var(--border-btn) * -1)" }, ".join-item:focus": { "isolation": "isolate" }, ".link-primary": { "-TwTextOpacity": "1", "color": "var(--fallback-p,oklch(var(--p)/var(--tw-text-opacity)))" }, "@supports (color:color-mix(in oklab,black,black))": [{ "@media (hover:hover)": { ".link-primary:hover": { "color": "color-mix(in oklab,var(--fallback-p,oklch(var(--p)/1)) 80%,black)" } } }, { "@media (hover:hover)": { ".link-secondary:hover": { "color": "color-mix(in oklab,var(--fallback-s,oklch(var(--s)/1)) 80%,black)" } } }, { "@media (hover:hover)": { ".link-accent:hover": { "color": "color-mix(in oklab,var(--fallback-a,oklch(var(--a)/1)) 80%,black)" } } }, { "@media (hover:hover)": { ".link-neutral:hover": { "color": "color-mix(in oklab,var(--fallback-n,oklch(var(--n)/1)) 80%,black)" } } }, { "@media (hover:hover)": { ".link-success:hover": { "color": "color-mix(in oklab,var(--fallback-su,oklch(var(--su)/1)) 80%,black)" } } }, { "@media (hover:hover)": { ".link-info:hover": { "color": "color-mix(in oklab,var(--fallback-in,oklch(var(--in)/1)) 80%,black)" } } }, { "@media (hover:hover)": { ".link-warning:hover": { "color": "color-mix(in oklab,var(--fallback-wa,oklch(var(--wa)/1)) 80%,black)" } } }, { "@media (hover:hover)": { ".link-error:hover": { "color": "color-mix(in oklab,var(--fallback-er,oklch(var(--er)/1)) 80%,black)" } } }], ".link-secondary": { "-TwTextOpacity": "1", "color": "var(--fallback-s,oklch(var(--s)/var(--tw-text-opacity)))" }, ".link-accent": { "-TwTextOpacity": "1", "color": "var(--fallback-a,oklch(var(--a)/var(--tw-text-opacity)))" }, ".link-neutral": { "-TwTextOpacity": "1", "color": "var(--fallback-n,oklch(var(--n)/var(--tw-text-opacity)))" }, ".link-success": { "-TwTextOpacity": "1", "color": "var(--fallback-su,oklch(var(--su)/var(--tw-text-opacity)))" }, ".link-info": { "-TwTextOpacity": "1", "color": "var(--fallback-in,oklch(var(--in)/var(--tw-text-opacity)))" }, ".link-warning": { "-TwTextOpacity": "1", "color": "var(--fallback-wa,oklch(var(--wa)/var(--tw-text-opacity)))" }, ".link-error": { "-TwTextOpacity": "1", "color": "var(--fallback-er,oklch(var(--er)/var(--tw-text-opacity)))" }, ".link:focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".link:focus-visible": { "outline": "2px solid currentColor", "outlineOffset": "2px" }, ".loading": { "pointerEvents": "none", "display": "inline-block", "aspectRatio": "1 / 1", "width": "1.5rem", "backgroundColor": "currentColor", "maskSize": "100%", "maskRepeat": "no-repeat", "maskPosition": "center", "maskImage": `url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E")` }, ".loading-spinner": { "maskImage": `url("data:image/svg+xml,%3Csvg width='24' height='24' stroke='%23000' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin:center;animation:spinner_zKoa 2s linear infinite%7D.spinner_V8m1 circle%7Bstroke-linecap:round;animation:spinner_YpZS 1.5s ease-out infinite%7D%40keyframes spinner_zKoa%7B100%25%7Btransform:rotate(360deg)%7D%7D%40keyframes spinner_YpZS%7B0%25%7Bstroke-dasharray:0 150;stroke-dashoffset:0%7D47.5%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-16%7D95%25%2C100%25%7Bstroke-dasharray:42 150;stroke-dashoffset:-59%7D%7D%3C%2Fstyle%3E%3Cg class='spinner_V8m1'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-width='3'%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E")` }, ".loading-dots": { "maskImage": `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_qM83%7Banimation:spinner_8HQG 1.05s infinite%7D.spinner_oXPr%7Banimation-delay:.1s%7D.spinner_ZTLf%7Banimation-delay:.2s%7D@keyframes spinner_8HQG%7B0%25,57.14%25%7Banimation-timing-function:cubic-bezier(0.33,.66,.66,1);transform:translate(0)%7D28.57%25%7Banimation-timing-function:cubic-bezier(0.33,0,.66,.33);transform:translateY(-6px)%7D100%25%7Btransform:translate(0)%7D%7D%3C/style%3E%3Ccircle class='spinner_qM83' cx='4' cy='12' r='3'/%3E%3Ccircle class='spinner_qM83 spinner_oXPr' cx='12' cy='12' r='3'/%3E%3Ccircle class='spinner_qM83 spinner_ZTLf' cx='20' cy='12' r='3'/%3E%3C/svg%3E")` }, ".loading-ring": { "maskImage": `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg' stroke='%23fff'%3E%3Cg fill='none' fill-rule='evenodd' stroke-width='2'%3E%3Ccircle cx='22' cy='22' r='1'%3E%3Canimate attributeName='r' begin='0s' dur='1.8s' values='1; 20' calcMode='spline' keyTimes='0; 1' keySplines='0.165, 0.84, 0.44, 1' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-opacity' begin='0s' dur='1.8s' values='1; 0' calcMode='spline' keyTimes='0; 1' keySplines='0.3, 0.61, 0.355, 1' repeatCount='indefinite' /%3E%3C/circle%3E%3Ccircle cx='22' cy='22' r='1'%3E%3Canimate attributeName='r' begin='-0.9s' dur='1.8s' values='1; 20' calcMode='spline' keyTimes='0; 1' keySplines='0.165, 0.84, 0.44, 1' repeatCount='indefinite' /%3E%3Canimate attributeName='stroke-opacity' begin='-0.9s' dur='1.8s' values='1; 0' calcMode='spline' keyTimes='0; 1' keySplines='0.3, 0.61, 0.355, 1' repeatCount='indefinite' /%3E%3C/circle%3E%3C/g%3E%3C/svg%3E")` }, ".loading-ball": { "maskImage": `url("data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_rXNP%7Banimation:spinner_YeBj .8s infinite%7D@keyframes spinner_YeBj%7B0%25%7Banimation-timing-function:cubic-bezier(0.33,0,.66,.33);cy:5px%7D46.875%25%7Bcy:20px;rx:4px;ry:4px%7D50%25%7Banimation-timing-function:cubic-bezier(0.33,.66,.66,1);cy:20.5px;rx:4.8px;ry:3px%7D53.125%25%7Brx:4px;ry:4px%7D100%25%7Bcy:5px%7D%7D%3C/style%3E%3Cellipse class='spinner_rXNP' cx='12' cy='5' rx='4' ry='4'/%3E%3C/svg%3E")` }, ".loading-bars": { "maskImage": `url("data:image/svg+xml,%0A%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.spinner_hzlK%7Banimation:spinner_vc4H .8s linear infinite;animation-delay:-.8s%7D.spinner_koGT%7Banimation-delay:-.65s%7D.spinner_YF1u%7Banimation-delay:-.5s%7D@keyframes spinner_vc4H%7B0%25%7By:1px;height:22px%7D93.75%25%7By:5px;height:14px;opacity:.2%7D%7D%3C/style%3E%3Crect class='spinner_hzlK' x='1' y='1' width='6' height='22'/%3E%3Crect class='spinner_hzlK spinner_koGT' x='9' y='1' width='6' height='22'/%3E%3Crect class='spinner_hzlK spinner_YF1u' x='17' y='1' width='6' height='22'/%3E%3C/svg%3E")` }, ".loading-infinity": { "maskImage": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='shape-rendering: auto;' width='200px' height='200px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Cpath fill='none' stroke='%230a0a0a' stroke-width='10' stroke-dasharray='205.271142578125 51.317785644531256' d='M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z' stroke-linecap='round' style='transform:scale(0.8);transform-origin:50px 50px'%3E%3Canimate attributeName='stroke-dashoffset' repeatCount='indefinite' dur='2s' keyTimes='0;1' values='0;256.58892822265625'%3E%3C/animate%3E%3C/path%3E%3C/svg%3E")` }, ".loading-xs": { "width": "1rem" }, ".loading-sm": { "width": "1.25rem" }, ".loading-md": { "width": "1.5rem" }, ".loading-lg": { "width": "2.5rem" }, ".mask-squircle": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 0C20 0 0 20 0 100s20 100 100 100 100-20 100-100S180 0 100 0Z'/%3e%3c/svg%3e")` }, ".mask-decagon": { "maskImage": `url("data:image/svg+xml,%3csvg width='192' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m96 0 58.779 19.098 36.327 50v61.804l-36.327 50L96 200l-58.779-19.098-36.327-50V69.098l36.327-50z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-diamond": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m100 0 100 100-100 100L0 100z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-heart": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='185' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M100 184.606a15.384 15.384 0 0 1-8.653-2.678C53.565 156.28 37.205 138.695 28.182 127.7 8.952 104.264-.254 80.202.005 54.146.308 24.287 24.264 0 53.406 0c21.192 0 35.869 11.937 44.416 21.879a2.884 2.884 0 0 0 4.356 0C110.725 11.927 125.402 0 146.594 0c29.142 0 53.098 24.287 53.4 54.151.26 26.061-8.956 50.122-28.176 73.554-9.023 10.994-25.383 28.58-63.165 54.228a15.384 15.384 0 0 1-8.653 2.673Z' fill='black' fill-rule='nonzero'/%3e%3c/svg%3e")` }, ".mask-hexagon": { "maskImage": `url("data:image/svg+xml,%3csvg width='182' height='201' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M.3 65.486c0-9.196 6.687-20.063 14.211-25.078l61.86-35.946c8.36-5.016 20.899-5.016 29.258 0l61.86 35.946c8.36 5.015 14.211 15.882 14.211 25.078v71.055c0 9.196-6.687 20.063-14.211 25.079l-61.86 35.945c-8.36 4.18-20.899 4.18-29.258 0L14.51 161.62C6.151 157.44.3 145.737.3 136.54V65.486Z' fill='black' fill-rule='nonzero'/%3e%3c/svg%3e")` }, ".mask-hexagon-2": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='182' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M64.786 181.4c-9.196 0-20.063-6.687-25.079-14.21L3.762 105.33c-5.016-8.36-5.016-20.9 0-29.259l35.945-61.86C44.723 5.851 55.59 0 64.786 0h71.055c9.196 0 20.063 6.688 25.079 14.211l35.945 61.86c4.18 8.36 4.18 20.899 0 29.258l-35.945 61.86c-4.18 8.36-15.883 14.211-25.079 14.211H64.786Z' fill='black' fill-rule='nonzero'/%3e%3c/svg%3e")` }, ".mask-circle": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle fill='black' cx='100' cy='100' r='100' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-parallelogram": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='154' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M46.154 0H200l-46.154 153.846H0z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-parallelogram-2": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='154' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M153.846 0H0l46.154 153.846H200z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-parallelogram-3": { "maskImage": `url("data:image/svg+xml,%3csvg width='154' height='201' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M.077 47.077v153.846l153.846-46.154V.923z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-parallelogram-4": { "maskImage": `url("data:image/svg+xml,%3csvg width='154' height='201' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M153.923 47.077v153.846L.077 154.77V.923z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-pentagon": { "maskImage": `url("data:image/svg+xml,%3csvg width='192' height='181' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m96 0 95.106 69.098-36.327 111.804H37.22L.894 69.098z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-square": { "maskImage": `url("data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M0 0h200v200H0z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-star": { "maskImage": `url("data:image/svg+xml,%3csvg width='192' height='180' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m96 137.263-58.779 42.024 22.163-68.389L.894 68.481l72.476-.243L96 0l22.63 68.238 72.476.243-58.49 42.417 22.163 68.389z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-star-2": { "maskImage": `url("data:image/svg+xml,%3csvg width='192' height='180' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m96 153.044-58.779 26.243 7.02-63.513L.894 68.481l63.117-13.01L96 0l31.989 55.472 63.117 13.01-43.347 47.292 7.02 63.513z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-triangle": { "maskImage": `url("data:image/svg+xml,%3csvg width='174' height='149' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m87 148.476-86.603.185L43.86 74.423 87 0l43.14 74.423 43.463 74.238z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-triangle-2": { "maskImage": `url("data:image/svg+xml,%3csvg width='174' height='150' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m87 .738 86.603-.184-43.463 74.238L87 149.214 43.86 74.792.397.554z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-triangle-3": { "maskImage": `url("data:image/svg+xml,%3csvg width='150' height='174' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m149.369 87.107.185 86.603-74.239-43.463L.893 87.107l74.422-43.14L149.554.505z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ".mask-triangle-4": { "maskImage": `url("data:image/svg+xml,%3csvg width='150' height='174' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M.631 87.107.446.505l74.239 43.462 74.422 43.14-74.422 43.14L.446 173.71z' fill-rule='evenodd'/%3e%3c/svg%3e")` }, ":where(.menu li:empty)": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "opacity": "0.1", "margin": "0.5rem 1rem", "height": "1px" }, ".menu :where(li ul):before": { "position": "absolute", "bottom": "0.75rem", "insetInlineStart": "0px", "top": "0.75rem", "width": "1px", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "opacity": "0.1", "content": '""' }, ".menu :where(li:not(.menu-title) > *:not(ul, details, .menu-title, .btn)),\n.menu :where(li:not(.menu-title) > details > summary:not(.menu-title))": { "borderRadius": "var(--rounded-btn, 0.5rem)", "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "textAlign": "start", "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "200ms", "textWrap": "balance" }, ":where(.menu li:not(.menu-title, .disabled) > *:not(ul, details, .menu-title)):not(summary, .active, .btn).focus, :where(.menu li:not(.menu-title, .disabled) > *:not(ul, details, .menu-title)):not(summary, .active, .btn):focus, :where(.menu li:not(.menu-title, .disabled) > *:not(ul, details, .menu-title)):is(summary):not(.active, .btn):focus-visible, :where(.menu li:not(.menu-title, .disabled) > details > summary:not(.menu-title)):not(summary, .active, .btn).focus, :where(.menu li:not(.menu-title, .disabled) > details > summary:not(.menu-title)):not(summary, .active, .btn):focus, :where(.menu li:not(.menu-title, .disabled) > details > summary:not(.menu-title)):is(summary):not(.active, .btn):focus-visible": { "cursor": "pointer", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.1))", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "outline": "2px solid transparent", "outlineOffset": "2px" }, ".menu li > *:not(ul, .menu-title, details, .btn):active,\n.menu li > *:not(ul, .menu-title, details, .btn).active,\n.menu li > details > summary:active": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))" }, ".menu :where(li > details > summary)::-webkit-details-marker": { "display": "none" }, ".menu :where(li > details > summary):after,\n.menu :where(li > .menu-dropdown-toggle):after": { "justifySelf": "end", "display": "block", "marginTop": "-0.5rem", "height": "0.5rem", "width": "0.5rem", "transform": "rotate(45deg)", "transitionProperty": "transform, margin-top", "transitionDuration": "0.3s", "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)", "content": '""', "transformOrigin": "75% 75%", "boxShadow": "2px 2px", "pointerEvents": "none" }, ".menu :where(li > details[open] > summary):after,\n.menu :where(li > .menu-dropdown-toggle.menu-dropdown-show):after": { "transform": "rotate(225deg)", "marginTop": "0" }, ".menu-title": { "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "fontSize": "0.875rem", "lineHeight": "1.25rem", "fontWeight": "700", "color": "var(--fallback-bc,oklch(var(--bc)/0.4))" }, ".mockup-code:before": { "content": '""', "marginBottom": "1rem", "display": "block", "height": "0.75rem", "width": "0.75rem", "borderRadius": "9999px", "opacity": "0.3", "boxShadow": "1.4em 0,\n        2.8em 0,\n        4.2em 0" }, ".mockup-code pre": { "paddingRight": "1.25rem" }, ".mockup-code pre:before": { "content": '""', "marginRight": "2ch" }, ".mockup-window:before": { "content": '""', "marginBottom": "1rem", "display": "block", "aspectRatio": "1 / 1", "height": "0.75rem", "flexShrink": "0", "alignSelf": "flex-start", "borderRadius": "9999px", "opacity": "0.3", "boxShadow": "1.4em 0,\n        2.8em 0,\n        4.2em 0" }, '.mockup-window:where([dir="rtl"], [dir="rtl"] *):before': { "alignSelf": "flex-end" }, ".mockup-phone": { "display": "inline-block", "border": "4px solid #444", "borderRadius": "50px", "backgroundColor": "#000", "padding": "10px", "margin": "0 auto", "overflow": "hidden" }, ".mockup-phone .camera": { "position": "relative", "top": "0px", "left": "0px", "background": "#000", "height": "25px", "width": "150px", "margin": "0 auto", "borderBottomLeftRadius": "17px", "borderBottomRightRadius": "17px", "zIndex": "11" }, ".mockup-phone .camera:before": { "content": '""', "position": "absolute", "top": "35%", "left": "50%", "width": "50px", "height": "4px", "borderRadius": "5px", "backgroundColor": "#0c0b0e", "transform": "translate(-50%, -50%)" }, ".mockup-phone .camera:after": { "content": '""', "position": "absolute", "top": "20%", "left": "70%", "width": "8px", "height": "8px", "borderRadius": "5px", "backgroundColor": "#0f0b25" }, ".mockup-phone .display": { "overflow": "hidden", "borderRadius": "40px", "marginTop": "-25px" }, ".mockup-browser .mockup-browser-toolbar": { "marginTop": "0.75rem", "marginBottom": "0.75rem", "display": "inline-flex", "width": "100%", "alignItems": "center", "paddingRight": "1.4em" }, '.mockup-browser .mockup-browser-toolbar:where([dir="rtl"], [dir="rtl"] *)': { "flexDirection": "row-reverse" }, ".mockup-browser .mockup-browser-toolbar:before": { "content": '""', "marginRight": "4.8rem", "display": "inline-block", "aspectRatio": "1 / 1", "height": "0.75rem", "borderRadius": "9999px", "opacity": "0.3", "boxShadow": "1.4em 0,\n          2.8em 0,\n          4.2em 0" }, ".mockup-browser .mockup-browser-toolbar .input": { "position": "relative", "marginLeft": "auto", "marginRight": "auto", "display": "block", "height": "1.75rem", "width": "24rem", "overflow": "hidden", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "paddingLeft": "2rem", "direction": "ltr" }, ".mockup-browser .mockup-browser-toolbar .input:before": { "content": '""', "position": "absolute", "left": "0.5rem", "top": "50%", "aspectRatio": "1 / 1", "height": "0.75rem", "-TwTranslateY": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "borderRadius": "9999px", "borderWidth": "2px", "borderColor": "currentColor", "opacity": "0.6" }, ".mockup-browser .mockup-browser-toolbar .input:after": { "content": '""', "position": "absolute", "left": "1.25rem", "top": "50%", "height": "0.5rem", "-TwTranslateY": "25%", "-TwRotate": "-45deg", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "borderRadius": "9999px", "borderWidth": "1px", "borderColor": "currentColor", "opacity": "0.6" }, ".modal:not(dialog:not(.modal-open)),\n  .modal::backdrop": { "backgroundColor": "#0006", "animation": "modal-pop 0.2s ease-out" }, ".modal-backdrop": { "zIndex": "-1", "gridColumnStart": "1", "gridRowStart": "1", "display": "grid", "alignSelf": "stretch", "justifySelf": "stretch", "color": "transparent" }, ".modal-open .modal-box,\n.modal-toggle:checked + .modal .modal-box,\n.modal:target .modal-box,\n.modal[open] .modal-box": { "-TwTranslateY": "0px", "-TwScaleX": "1", "-TwScaleY": "1", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".modal-action > :not([hidden]) ~ :not([hidden])": { "-TwSpaceXReverse": "0", "marginRight": "calc(0.5rem * var(--tw-space-x-reverse))", "marginLeft": "calc(0.5rem * calc(1 - var(--tw-space-x-reverse)))" }, "@keyframes modal-pop": { "0%": { "opacity": "0" } }, ".progress::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))" }, ".progress-primary::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))" }, ".progress-secondary::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))" }, ".progress-accent::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))" }, ".progress-info::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))" }, ".progress-success::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))" }, ".progress-warning::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))" }, ".progress-error::-moz-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))" }, ".progress:indeterminate": { "-ProgressColor": "var(--fallback-bc,oklch(var(--bc)/1))", "backgroundImage": "repeating-linear-gradient(\n    90deg,\n    var(--progress-color) -1%,\n    var(--progress-color) 10%,\n    transparent 10%,\n    transparent 90%\n  )", "backgroundSize": "200%", "backgroundPositionX": "15%", "animation": "progress-loading 5s ease-in-out infinite" }, ".progress-primary:indeterminate": { "-ProgressColor": "var(--fallback-p,oklch(var(--p)/1))" }, ".progress-secondary:indeterminate": { "-ProgressColor": "var(--fallback-s,oklch(var(--s)/1))" }, ".progress-accent:indeterminate": { "-ProgressColor": "var(--fallback-a,oklch(var(--a)/1))" }, ".progress-info:indeterminate": { "-ProgressColor": "var(--fallback-in,oklch(var(--in)/1))" }, ".progress-success:indeterminate": { "-ProgressColor": "var(--fallback-su,oklch(var(--su)/1))" }, ".progress-warning:indeterminate": { "-ProgressColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, ".progress-error:indeterminate": { "-ProgressColor": "var(--fallback-er,oklch(var(--er)/1))" }, ".progress::-webkit-progress-bar": { "borderRadius": "var(--rounded-box, 1rem)", "backgroundColor": "transparent" }, ".progress::-webkit-progress-value": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))" }, ".progress-primary::-webkit-progress-value": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))" }, ".progress-secondary::-webkit-progress-value": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))" }, ".progress-accent::-webkit-progress-value": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))" }, ".progress-info::-webkit-progress-value": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))" }, ".progress-success::-webkit-progress-value": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))" }, ".progress-warning::-webkit-progress-value": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))" }, ".progress-error::-webkit-progress-value": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))" }, ".progress:indeterminate::-moz-progress-bar": { "backgroundColor": "transparent", "backgroundImage": "repeating-linear-gradient(\n    90deg,\n    var(--progress-color) -1%,\n    var(--progress-color) 10%,\n    transparent 10%,\n    transparent 90%\n  )", "backgroundSize": "200%", "backgroundPositionX": "15%", "animation": "progress-loading 5s ease-in-out infinite" }, "@keyframes progress-loading": { "50%": { "backgroundPositionX": "-115%" } }, ".radio:focus": { "boxShadow": "none" }, ".radio:focus-visible": { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/1))" }, '.radio:checked,\n  .radio[aria-checked="true"]': { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-bg-opacity)))", "backgroundImage": "none", "animation": "radiomark var(--animation-input, 0.2s) ease-out", "boxShadow": "0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,\n      0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset" }, ".radio-primary": { "-Chkbg": "var(--p)", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" }, ".radio-primary:focus-visible": { "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, '.radio-primary:checked,\n    .radio-primary[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".radio-secondary": { "-Chkbg": "var(--s)", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" }, ".radio-secondary:focus-visible": { "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, '.radio-secondary:checked,\n    .radio-secondary[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".radio-accent": { "-Chkbg": "var(--a)", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" }, ".radio-accent:focus-visible": { "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, '.radio-accent:checked,\n    .radio-accent[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".radio-success": { "-Chkbg": "var(--su)", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" }, ".radio-success:focus-visible": { "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, '.radio-success:checked,\n    .radio-success[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".radio-warning": { "-Chkbg": "var(--wa)", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" }, ".radio-warning:focus-visible": { "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, '.radio-warning:checked,\n    .radio-warning[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".radio-info": { "-Chkbg": "var(--in)", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" }, ".radio-info:focus-visible": { "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, '.radio-info:checked,\n    .radio-info[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".radio-error": { "-Chkbg": "var(--er)", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" }, ".radio-error:focus-visible": { "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, '.radio-error:checked,\n    .radio-error[aria-checked="true"]': { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, ".radio:disabled": { "cursor": "not-allowed", "opacity": "0.2" }, "@keyframes radiomark": { "0%": { "boxShadow": "0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset,\n      0 0 0 12px var(--fallback-b1,oklch(var(--b1)/1)) inset" }, "50%": { "boxShadow": "0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset,\n      0 0 0 3px var(--fallback-b1,oklch(var(--b1)/1)) inset" }, "100%": { "boxShadow": "0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset,\n      0 0 0 4px var(--fallback-b1,oklch(var(--b1)/1)) inset" } }, ".radio-mark": { "display": "none" }, ".range:focus-visible::-webkit-slider-thumb": { "-FocusShadow": "0 0 0 6px var(--fallback-b1,oklch(var(--b1)/1)) inset, 0 0 0 2rem var(--range-shdw) inset" }, ".range:focus-visible::-moz-range-thumb": { "-FocusShadow": "0 0 0 6px var(--fallback-b1,oklch(var(--b1)/1)) inset, 0 0 0 2rem var(--range-shdw) inset" }, ".range::-webkit-slider-runnable-track": { "height": "0.5rem", "width": "100%", "borderRadius": "var(--rounded-box, 1rem)", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.1))" }, ".range::-moz-range-track": { "height": "0.5rem", "width": "100%", "borderRadius": "var(--rounded-box, 1rem)", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.1))" }, ".range::-webkit-slider-thumb": { "position": "relative", "height": "1.5rem", "width": "1.5rem", "borderRadius": "var(--rounded-box, 1rem)", "borderStyle": "none", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "appearance": "none", "WebkitAppearance": "none", "top": "50%", "color": "var(--range-shdw)", "transform": "translateY(-50%)", "-FillerSize": "100rem", "-FillerOffset": "0.6rem", "boxShadow": "0 0 0 3px var(--range-shdw) inset,\n      var(--focus-shadow, 0 0),\n      calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size)" }, ".range::-moz-range-thumb": { "position": "relative", "height": "1.5rem", "width": "1.5rem", "borderRadius": "var(--rounded-box, 1rem)", "borderStyle": "none", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "top": "50%", "color": "var(--range-shdw)", "-FillerSize": "100rem", "-FillerOffset": "0.5rem", "boxShadow": "0 0 0 3px var(--range-shdw) inset,\n      var(--focus-shadow, 0 0),\n      calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size)" }, ".range-primary": { "-RangeShdw": "var(--fallback-p,oklch(var(--p)/1))" }, ".range-secondary": { "-RangeShdw": "var(--fallback-s,oklch(var(--s)/1))" }, ".range-accent": { "-RangeShdw": "var(--fallback-a,oklch(var(--a)/1))" }, ".range-success": { "-RangeShdw": "var(--fallback-su,oklch(var(--su)/1))" }, ".range-warning": { "-RangeShdw": "var(--fallback-wa,oklch(var(--wa)/1))" }, ".range-info": { "-RangeShdw": "var(--fallback-in,oklch(var(--in)/1))" }, ".range-error": { "-RangeShdw": "var(--fallback-er,oklch(var(--er)/1))" }, ".rating input": { "appearance": "none", "WebkitAppearance": "none" }, ".rating .rating-hidden": { "width": "0.5rem", "backgroundColor": "transparent" }, '.rating input[type="radio"]:checked': { "backgroundImage": "none" }, '.rating input:checked ~ input,\n  .rating input[aria-checked="true"] ~ input': { "-TwBgOpacity": "0.2" }, ".rating input:focus-visible": { "transitionProperty": "transform", "transitionTimingFunction": ["cubic-bezier(0.4, 0, 0.2, 1)", "cubic-bezier(0, 0, 0.2, 1)"], "transitionDuration": "300ms", "transform": "translateY(-0.125em)" }, ".rating input:active:focus": { "animation": "none", "transform": "translateY(-0.125em)" }, ".rating-half :where(input:not(.rating-hidden))": { "width": "0.75rem" }, "@keyframes rating-pop": { "0%": { "transform": "translateY(-0.125em)" }, "40%": { "transform": "translateY(-0.125em)" }, "100%": { "transform": "translateY(0)" } }, ".select-bordered": { "borderColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".select:focus": { "boxShadow": "none", "borderColor": "var(--fallback-bc,oklch(var(--bc)/0.2))", "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".select-ghost": { "-TwBgOpacity": "0.05" }, ".select-ghost:focus": { "-TwBgOpacity": "1", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, ".select-primary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" }, ".select-primary:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, ".select-secondary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" }, ".select-secondary:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, ".select-accent": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" }, ".select-accent:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, ".select-info": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" }, ".select-info:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, ".select-success": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" }, ".select-success:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, ".select-warning": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" }, ".select-warning:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, ".select-error": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" }, ".select-error:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, ".select-disabled,\n  .select:disabled,\n  .select[disabled]": { "cursor": "not-allowed", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "color": "var(--fallback-bc,oklch(var(--bc)/0.4))" }, ".select-disabled::placeholder,\n  .select:disabled::placeholder,\n  .select[disabled]::placeholder": { "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)))", "-TwPlaceholderOpacity": "0.2" }, '.select-multiple,\n  .select[multiple],\n  .select[size].select:not([size="1"])': { "backgroundImage": "none", "paddingRight": "1rem" }, '[dir="rtl"] .select': { "backgroundPosition": "calc(0% + 12px) calc(1px + 50%),\n    calc(0% + 16px) calc(1px + 50%)" }, ".skeleton": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))", "willChange": "background-position", "animation": "skeleton 1.8s ease-in-out infinite", "backgroundImage": "linear-gradient(\n    105deg,\n    transparent 0%,\n    transparent 40%,\n    var(--fallback-b1,oklch(var(--b1)/1)) 50%,\n    transparent 60%,\n    transparent 100%\n  )", "backgroundSize": "200% auto", "backgroundRepeat": "no-repeat", "backgroundPositionX": "-50%" }, "@media (prefers-reduced-motion)": { ".skeleton": { "animationDuration": "15s" } }, "@keyframes skeleton": { "from": { "backgroundPosition": "150%" }, "to": { "backgroundPosition": "-50%" } }, ":where(.stats) > :not([hidden]) ~ :not([hidden])": { "-TwDivideXReverse": "0", "borderRightWidth": "calc(1px * var(--tw-divide-x-reverse))", "borderLeftWidth": "calc(1px * calc(1 - var(--tw-divide-x-reverse)))", "-TwDivideYReverse": "0", "borderTopWidth": "calc(0px * calc(1 - var(--tw-divide-y-reverse)))", "borderBottomWidth": "calc(0px * var(--tw-divide-y-reverse))" }, '[dir="rtl"] .stats > *:not([hidden]) ~ *:not([hidden])': { "-TwDivideXReverse": "1" }, ".steps .step:before": { "top": "0px", "gridColumnStart": "1", "gridRowStart": "1", "height": "0.5rem", "width": "100%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "content": '""', "marginInlineStart": "-100%" }, ".steps .step:after": { "content": "counter(step)", "counterIncrement": "step", "zIndex": "1", "position": "relative", "gridColumnStart": "1", "gridRowStart": "1", "display": "grid", "height": "2rem", "width": "2rem", "placeItems": "center", "placeSelf": "center", "borderRadius": "9999px", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, ".steps .step:first-child:before": { "content": "none" }, ".steps .step[data-content]:after": { "content": "attr(data-content)" }, ".steps .step-neutral + .step-neutral:before,\n  .steps .step-neutral:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-n,oklch(var(--n)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-nc,oklch(var(--nc)/var(--tw-text-opacity)))" }, ".steps .step-primary + .step-primary:before,\n  .steps .step-primary:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".steps .step-secondary + .step-secondary:before,\n  .steps .step-secondary:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".steps .step-accent + .step-accent:before,\n  .steps .step-accent:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".steps .step-info + .step-info:before": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))" }, ".steps .step-info:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".steps .step-success + .step-success:before": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))" }, ".steps .step-success:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".steps .step-warning + .step-warning:before": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))" }, ".steps .step-warning:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".steps .step-error + .step-error:before": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))" }, ".steps .step-error:after": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, ".swap-rotate .swap-on,\n.swap-rotate .swap-indeterminate,\n.swap-rotate input:indeterminate ~ .swap-on": { "-TwRotate": "45deg", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".swap-rotate input:checked ~ .swap-off,\n.swap-active:where(.swap-rotate) .swap-off,\n.swap-rotate input:indeterminate ~ .swap-off": { "-TwRotate": "-45deg", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".swap-rotate input:checked ~ .swap-on,\n.swap-active:where(.swap-rotate) .swap-on,\n.swap-rotate input:indeterminate ~ .swap-indeterminate": { "-TwRotate": "0deg", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".swap-flip": { "transformStyle": "preserve-3d", "perspective": "16em" }, ".swap-flip .swap-on,\n.swap-flip .swap-indeterminate,\n.swap-flip input:indeterminate ~ .swap-on": { "transform": "rotateY(180deg)", "backfaceVisibility": "hidden", "opacity": "1" }, ".swap-flip input:checked ~ .swap-off,\n.swap-active:where(.swap-flip) .swap-off,\n.swap-flip input:indeterminate ~ .swap-off": { "transform": "rotateY(-180deg)", "backfaceVisibility": "hidden", "opacity": "1" }, ".swap-flip input:checked ~ .swap-on,\n.swap-active:where(.swap-flip) .swap-on,\n.swap-flip input:indeterminate ~ .swap-indeterminate": { "transform": "rotateY(0deg)" }, ".tabs-lifted > .tab:focus-visible": { "borderEndEndRadius": "0", "borderEndStartRadius": "0" }, '.tab:is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]), .tab:is(input:checked)': { "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBorderOpacity": "1", "-TwTextOpacity": "1" }, ".tab:focus": { "outline": "2px solid transparent", "outlineOffset": "2px" }, ".tab:focus-visible": { "outline": "2px solid currentColor", "outlineOffset": "-5px" }, ".tab-disabled,\n  .tab[disabled]": { "cursor": "not-allowed", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "-TwTextOpacity": "0.2" }, ".tabs-bordered > .tab": { "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.2", "borderStyle": "solid", "borderBottomWidth": "calc(var(--tab-border, 1px) + 1px)" }, ".tabs-lifted > .tab": { "border": "var(--tab-border, 1px) solid transparent", "borderWidth": "0 0 var(--tab-border, 1px) 0", "borderStartStartRadius": "var(--tab-radius, 0.5rem)", "borderStartEndRadius": "var(--tab-radius, 0.5rem)", "borderBottomColor": "var(--tab-border-color)", "paddingInlineStart": "var(--tab-padding, 1rem)", "paddingInlineEnd": "var(--tab-padding, 1rem)", "paddingTop": "var(--tab-border, 1px)" }, '.tabs-lifted > .tab:is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]), .tabs-lifted > .tab:is(input:checked)': { "backgroundColor": "var(--tab-bg)", "borderWidth": "var(--tab-border, 1px) var(--tab-border, 1px) 0 var(--tab-border, 1px)", "borderInlineStartColor": "var(--tab-border-color)", "borderInlineEndColor": "var(--tab-border-color)", "borderTopColor": "var(--tab-border-color)", "paddingInlineStart": "calc(var(--tab-padding, 1rem) - var(--tab-border, 1px))", "paddingInlineEnd": "calc(var(--tab-padding, 1rem) - var(--tab-border, 1px))", "paddingBottom": "var(--tab-border, 1px)", "paddingTop": "0" }, '.tabs-lifted > .tab:is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]):before, .tabs-lifted > .tab:is(input:checked):before': { "zIndex": "1", "content": '""', "display": "block", "position": "absolute", "width": "calc(100% + var(--tab-radius, 0.5rem) * 2)", "height": "var(--tab-radius, 0.5rem)", "bottom": "0", "backgroundSize": "var(--tab-radius, 0.5rem)", "backgroundPosition": "top left,\n        top right", "backgroundRepeat": "no-repeat", "-TabGrad": "calc(69% - var(--tab-border, 1px))", "-RadiusStart": "radial-gradient(\n        circle at top left,\n        transparent var(--tab-grad),\n        var(--tab-border-color) calc(var(--tab-grad) + 0.25px),\n        var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)),\n        var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + 0.25px)\n      )", "-RadiusEnd": "radial-gradient(\n        circle at top right,\n        transparent var(--tab-grad),\n        var(--tab-border-color) calc(var(--tab-grad) + 0.25px),\n        var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)),\n        var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + 0.25px)\n      )", "backgroundImage": "var(--radius-start), var(--radius-end)" }, '.tabs-lifted > .tab:is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]):first-child:before, .tabs-lifted > .tab:is(input:checked):first-child:before': { "backgroundImage": "var(--radius-end)", "backgroundPosition": "top right" }, '[dir="rtl"] .tabs-lifted > .tab:is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]):first-child:before, [dir="rtl"] .tabs-lifted > .tab:is(input:checked):first-child:before': { "backgroundImage": "var(--radius-start)", "backgroundPosition": "top left" }, '.tabs-lifted > .tab:is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]):last-child:before, .tabs-lifted > .tab:is(input:checked):last-child:before': { "backgroundImage": "var(--radius-start)", "backgroundPosition": "top left" }, '[dir="rtl"] .tabs-lifted > .tab:is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]):last-child:before, [dir="rtl"] .tabs-lifted > .tab:is(input:checked):last-child:before': { "backgroundImage": "var(--radius-end)", "backgroundPosition": "top right" }, '.tabs-lifted\n  > :is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled])\n  + .tabs-lifted\n  :is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]):before, .tabs-lifted > .tab:is(input:checked) + .tabs-lifted .tab:is(input:checked):before': { "backgroundImage": "var(--radius-end)", "backgroundPosition": "top right" }, ".tabs-boxed": { "borderRadius": "var(--rounded-btn, 0.5rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "padding": "0.25rem" }, ".tabs-boxed .tab": { "borderRadius": "var(--rounded-btn, 0.5rem)" }, '.tabs-boxed :is(.tab-active, [aria-selected="true"]):not(.tab-disabled):not([disabled]), .tabs-boxed :is(input:checked)': { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, '.table:where([dir="rtl"], [dir="rtl"] *)': { "textAlign": "right" }, ".table :where(th, td)": { "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.75rem", "paddingBottom": "0.75rem", "verticalAlign": "middle" }, ".table tr.active,\n  .table tr.active:nth-child(even),\n  .table-zebra tbody tr:nth-child(even)": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))" }, ".table-zebra tr.active,\n    .table-zebra tr.active:nth-child(even),\n    .table-zebra-zebra tbody tr:nth-child(even)": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))" }, ".table :where(thead tr, tbody tr:not(:last-child), tbody tr:first-child:last-child)": { "borderBottomWidth": "1px", "-TwBorderOpacity": "1", "borderBottomColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))" }, ".table :where(thead, tfoot)": { "whiteSpace": "nowrap", "fontSize": "0.75rem", "lineHeight": "1rem", "fontWeight": "700", "color": "var(--fallback-bc,oklch(var(--bc)/0.6))" }, ".table :where(tfoot)": { "borderTopWidth": "1px", "-TwBorderOpacity": "1", "borderTopColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))" }, ".textarea-bordered": { "borderColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".textarea:focus": { "boxShadow": "none", "borderColor": "var(--fallback-bc,oklch(var(--bc)/0.2))", "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".textarea-ghost": { "-TwBgOpacity": "0.05" }, ".textarea-ghost:focus": { "-TwBgOpacity": "1", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "boxShadow": "none" }, ".textarea-primary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))" }, ".textarea-primary:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, ".textarea-secondary": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))" }, ".textarea-secondary:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, ".textarea-accent": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))" }, ".textarea-accent:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, ".textarea-info": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))" }, ".textarea-info:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, ".textarea-success": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))" }, ".textarea-success:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, ".textarea-warning": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))" }, ".textarea-warning:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, ".textarea-error": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))" }, ".textarea-error:focus": { "-TwBorderOpacity": "1", "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))", "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, ".textarea-disabled,\n  .textarea:disabled,\n  .textarea[disabled]": { "cursor": "not-allowed", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b2,oklch(var(--b2)/var(--tw-bg-opacity)))", "color": "var(--fallback-bc,oklch(var(--bc)/0.4))" }, ".textarea-disabled::placeholder,\n  .textarea:disabled::placeholder,\n  .textarea[disabled]::placeholder": { "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-placeholder-opacity)))", "-TwPlaceholderOpacity": "0.2" }, ".timeline hr": { "height": "0.25rem" }, ":where(.timeline hr)": { "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))" }, ":where(.timeline:has(.timeline-middle) hr):first-child": { "borderStartEndRadius": "var(--rounded-badge, 1.9rem)", "borderEndEndRadius": "var(--rounded-badge, 1.9rem)", "borderStartStartRadius": "0px", "borderEndStartRadius": "0px" }, ":where(.timeline:has(.timeline-middle) hr):last-child": { "borderStartStartRadius": "var(--rounded-badge, 1.9rem)", "borderEndStartRadius": "var(--rounded-badge, 1.9rem)", "borderStartEndRadius": "0px", "borderEndEndRadius": "0px" }, ":where(.timeline:not(:has(.timeline-middle)) :first-child hr:last-child)": { "borderStartStartRadius": "var(--rounded-badge, 1.9rem)", "borderEndStartRadius": "var(--rounded-badge, 1.9rem)", "borderStartEndRadius": "0px", "borderEndEndRadius": "0px" }, ":where(.timeline:not(:has(.timeline-middle)) :last-child hr:first-child)": { "borderStartEndRadius": "var(--rounded-badge, 1.9rem)", "borderEndEndRadius": "var(--rounded-badge, 1.9rem)", "borderStartStartRadius": "0px", "borderEndStartRadius": "0px" }, ".timeline-box": { "borderRadius": "var(--rounded-box, 1rem)", "borderWidth": "1px", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-border-opacity)))", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "-TwShadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)", "-TwShadowColored": "0 1px 2px 0 var(--tw-shadow-color)", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)" }, ".toast > *": { "animation": "toast-pop 0.25s ease-out" }, "@keyframes toast-pop": { "0%": { "transform": "scale(0.9)", "opacity": "0" }, "100%": { "transform": "scale(1)", "opacity": "1" } }, '[dir="rtl"] .toggle': { "-Handleoffsetcalculator": "calc(var(--handleoffset) * 1)" }, ".toggle:focus-visible": { "outlineStyle": "solid", "outlineWidth": "2px", "outlineOffset": "2px", "outlineColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, ".toggle:hover": { "backgroundColor": "currentColor" }, '.toggle:checked,\n  .toggle[aria-checked="true"]': { "backgroundImage": "none", "-Handleoffsetcalculator": "var(--handleoffset)", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))" }, '[dir="rtl"] .toggle:checked, [dir="rtl"] .toggle[aria-checked="true"]': { "-Handleoffsetcalculator": "calc(var(--handleoffset) * -1)" }, ".toggle:indeterminate": { "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "boxShadow": "calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,\n      calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,\n      0 0 0 2px var(--tglbg) inset" }, '[dir="rtl"] .toggle:indeterminate': { "boxShadow": "calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,\n        calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,\n        0 0 0 2px var(--tglbg) inset" }, ".toggle-primary:focus-visible": { "outlineColor": "var(--fallback-p,oklch(var(--p)/1))" }, '.toggle-primary:checked,\n    .toggle-primary[aria-checked="true"]': { "borderColor": "var(--fallback-p,oklch(var(--p)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-p,oklch(var(--p)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-pc,oklch(var(--pc)/var(--tw-text-opacity)))" }, ".toggle-secondary:focus-visible": { "outlineColor": "var(--fallback-s,oklch(var(--s)/1))" }, '.toggle-secondary:checked,\n    .toggle-secondary[aria-checked="true"]': { "borderColor": "var(--fallback-s,oklch(var(--s)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-s,oklch(var(--s)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-sc,oklch(var(--sc)/var(--tw-text-opacity)))" }, ".toggle-accent:focus-visible": { "outlineColor": "var(--fallback-a,oklch(var(--a)/1))" }, '.toggle-accent:checked,\n    .toggle-accent[aria-checked="true"]': { "borderColor": "var(--fallback-a,oklch(var(--a)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-a,oklch(var(--a)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-ac,oklch(var(--ac)/var(--tw-text-opacity)))" }, ".toggle-success:focus-visible": { "outlineColor": "var(--fallback-su,oklch(var(--su)/1))" }, '.toggle-success:checked,\n    .toggle-success[aria-checked="true"]': { "borderColor": "var(--fallback-su,oklch(var(--su)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-suc,oklch(var(--suc)/var(--tw-text-opacity)))" }, ".toggle-warning:focus-visible": { "outlineColor": "var(--fallback-wa,oklch(var(--wa)/1))" }, '.toggle-warning:checked,\n    .toggle-warning[aria-checked="true"]': { "borderColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-wa,oklch(var(--wa)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-wac,oklch(var(--wac)/var(--tw-text-opacity)))" }, ".toggle-info:focus-visible": { "outlineColor": "var(--fallback-in,oklch(var(--in)/1))" }, '.toggle-info:checked,\n    .toggle-info[aria-checked="true"]': { "borderColor": "var(--fallback-in,oklch(var(--in)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-in,oklch(var(--in)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-inc,oklch(var(--inc)/var(--tw-text-opacity)))" }, ".toggle-error:focus-visible": { "outlineColor": "var(--fallback-er,oklch(var(--er)/1))" }, '.toggle-error:checked,\n    .toggle-error[aria-checked="true"]': { "borderColor": "var(--fallback-er,oklch(var(--er)/var(--tw-border-opacity)))", "-TwBorderOpacity": "0.1", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-er,oklch(var(--er)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-erc,oklch(var(--erc)/var(--tw-text-opacity)))" }, ".toggle:disabled": { "cursor": "not-allowed", "-TwBorderOpacity": "1", "borderColor": "var(--fallback-bc,oklch(var(--bc)/var(--tw-border-opacity)))", "backgroundColor": "transparent", "opacity": "0.3", "-Togglehandleborder": "0 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset,\n      var(--handleoffsetcalculator) 0 0 3px var(--fallback-bc,oklch(var(--bc)/1)) inset" }, ".toggle-mark": { "display": "none" }, ":root .prose": { "-TwProseBody": "var(--fallback-bc,oklch(var(--bc)/0.8))", "-TwProseHeadings": "var(--fallback-bc,oklch(var(--bc)/1))", "-TwProseLead": "var(--fallback-bc,oklch(var(--bc)/1))", "-TwProseLinks": "var(--fallback-bc,oklch(var(--bc)/1))", "-TwProseBold": "var(--fallback-bc,oklch(var(--bc)/1))", "-TwProseCounters": "var(--fallback-bc,oklch(var(--bc)/1))", "-TwProseBullets": "var(--fallback-bc,oklch(var(--bc)/0.5))", "-TwProseHr": "var(--fallback-bc,oklch(var(--bc)/0.2))", "-TwProseQuotes": "var(--fallback-bc,oklch(var(--bc)/1))", "-TwProseQuoteBorders": "var(--fallback-bc,oklch(var(--bc)/0.2))", "-TwProseCaptions": "var(--fallback-bc,oklch(var(--bc)/0.5))", "-TwProseCode": "var(--fallback-bc,oklch(var(--bc)/1))", "-TwProsePreCode": "var(--fallback-nc,oklch(var(--nc)/1))", "-TwProsePreBg": "var(--fallback-n,oklch(var(--n)/1))", "-TwProseThBorders": "var(--fallback-bc,oklch(var(--bc)/0.5))", "-TwProseTdBorders": "var(--fallback-bc,oklch(var(--bc)/0.2))" }, '.prose :where(code):not(:where([class~="not-prose"] *, pre *))': { "padding": "1px 8px", "borderRadius": "var(--rounded-badge)", "fontWeight": "initial", "backgroundColor": "var(--fallback-bc,oklch(var(--bc)/0.1))" }, '.prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::before, .prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::after': { "display": "none" }, ".prose pre code": { "borderRadius": "0", "padding": "0" }, '.prose :where(tbody tr, thead):not(:where([class~="not-prose"] *))': { "borderBottomColor": "var(--fallback-bc,oklch(var(--bc)/0.2))" } };
  }
});

// node_modules/daisyui/dist/utilities-unstyled.js
var require_utilities_unstyled = __commonJS({
  "node_modules/daisyui/dist/utilities-unstyled.js"(exports2, module2) {
    module2.exports = { ".artboard-demo": { "display": "flex", "flex": "none", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" }, ".artboard.phone": { "width": "320px" }, ".artboard.phone-1": { "width": "320px", "height": "568px" }, ".artboard.phone-1.horizontal,\n      .artboard.phone-1.artboard-horizontal": { "width": "568px", "height": "320px" }, ".artboard.phone-2": { "width": "375px", "height": "667px" }, ".artboard.phone-2.horizontal,\n      .artboard.phone-2.artboard-horizontal": { "width": "667px", "height": "375px" }, ".artboard.phone-3": { "width": "414px", "height": "736px" }, ".artboard.phone-3.horizontal,\n      .artboard.phone-3.artboard-horizontal": { "width": "736px", "height": "414px" }, ".artboard.phone-4": { "width": "375px", "height": "812px" }, ".artboard.phone-4.horizontal,\n      .artboard.phone-4.artboard-horizontal": { "width": "812px", "height": "375px" }, ".artboard.phone-5": { "width": "414px", "height": "896px" }, ".artboard.phone-5.horizontal,\n      .artboard.phone-5.artboard-horizontal": { "width": "896px", "height": "414px" }, ".artboard.phone-6": { "width": "320px", "height": "1024px" }, ".artboard.phone-6.horizontal,\n      .artboard.phone-6.artboard-horizontal": { "width": "1024px", "height": "320px" }, ".badge-xs": { "height": "0.75rem", "fontSize": "0.75rem", "lineHeight": ".75rem", "paddingLeft": "0.313rem", "paddingRight": "0.313rem" }, ".badge-sm": { "height": "1rem", "fontSize": "0.75rem", "lineHeight": "1rem", "paddingLeft": "0.438rem", "paddingRight": "0.438rem" }, ".badge-md": { "height": "1.25rem", "fontSize": "0.875rem", "lineHeight": "1.25rem", "paddingLeft": "0.563rem", "paddingRight": "0.563rem" }, ".badge-lg": { "height": "1.5rem", "fontSize": "1rem", "lineHeight": "1.5rem", "paddingLeft": "0.688rem", "paddingRight": "0.688rem" }, ".btm-nav-xs": { "height": "2.5rem" }, ".btm-nav-xs > *:where(.active)": { "borderTopWidth": "1px" }, ".btm-nav-xs .btm-nav-label": { "fontSize": "0.75rem", "lineHeight": "1rem" }, ".btm-nav-sm": { "height": "3rem" }, ".btm-nav-sm > *:where(.active)": { "borderTopWidth": "2px" }, ".btm-nav-sm .btm-nav-label": { "fontSize": "0.75rem", "lineHeight": "1rem" }, ".btm-nav-md": { "height": "4rem" }, ".btm-nav-md > *:where(.active)": { "borderTopWidth": "2px" }, ".btm-nav-md .btm-nav-label": { "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".btm-nav-lg": { "height": "5rem" }, ".btm-nav-lg > *:where(.active)": { "borderTopWidth": "4px" }, ".btm-nav-lg .btm-nav-label": { "fontSize": "1rem", "lineHeight": "1.5rem" }, ".btn-xs": { "height": "1.5rem", "minHeight": "1.5rem", "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "fontSize": "0.75rem" }, ".btn-sm": { "height": "2rem", "minHeight": "2rem", "paddingLeft": "0.75rem", "paddingRight": "0.75rem", "fontSize": "0.875rem" }, ".btn-md": { "height": "3rem", "minHeight": "3rem", "paddingLeft": "1rem", "paddingRight": "1rem", "fontSize": "0.875rem" }, ".btn-lg": { "height": "4rem", "minHeight": "4rem", "paddingLeft": "1.5rem", "paddingRight": "1.5rem", "fontSize": "1.125rem" }, ".btn-wide": { "width": "16rem" }, ".btn-block": { "width": "100%" }, ".btn-square:where(.btn-xs)": { "height": "1.5rem", "width": "1.5rem", "padding": "0px" }, ".btn-square:where(.btn-sm)": { "height": "2rem", "width": "2rem", "padding": "0px" }, ".btn-square:where(.btn-md)": { "height": "3rem", "width": "3rem", "padding": "0px" }, ".btn-square:where(.btn-lg)": { "height": "4rem", "width": "4rem", "padding": "0px" }, ".btn-circle:where(.btn-xs)": { "height": "1.5rem", "width": "1.5rem", "borderRadius": "9999px", "padding": "0px" }, ".btn-circle:where(.btn-sm)": { "height": "2rem", "width": "2rem", "borderRadius": "9999px", "padding": "0px" }, ".btn-circle:where(.btn-md)": { "height": "3rem", "width": "3rem", "borderRadius": "9999px", "padding": "0px" }, ".btn-circle:where(.btn-lg)": { "height": "4rem", "width": "4rem", "borderRadius": "9999px", "padding": "0px" }, ".card-side": { "alignItems": "stretch", "flexDirection": "row" }, ".card-side :where(figure:first-child)": { "overflow": "hidden", "borderStartStartRadius": "inherit", "borderStartEndRadius": "unset", "borderEndStartRadius": "inherit", "borderEndEndRadius": "unset" }, ".card-side :where(figure:last-child)": { "overflow": "hidden", "borderStartStartRadius": "unset", "borderStartEndRadius": "inherit", "borderEndStartRadius": "unset", "borderEndEndRadius": "inherit" }, ".card-side figure > *": { "maxWidth": "unset" }, ":where(.card-side figure > *)": { "width": "100%", "height": "100%", "objectFit": "cover" }, '[type="checkbox"].checkbox-xs': { "height": "1rem", "width": "1rem" }, '[type="checkbox"].checkbox-sm': { "height": "1.25rem", "width": "1.25rem" }, '[type="checkbox"].checkbox-md': { "height": "1.5rem", "width": "1.5rem" }, '[type="checkbox"].checkbox-lg': { "height": "2rem", "width": "2rem" }, ".divider-horizontal": { "flexDirection": "column" }, ".divider-horizontal:before": { "height": "100%", "width": "0.125rem" }, ".divider-horizontal:after": { "height": "100%", "width": "0.125rem" }, ".divider-vertical": { "flexDirection": "row" }, ".divider-vertical:before": { "height": "0.125rem", "width": "100%" }, ".divider-vertical:after": { "height": "0.125rem", "width": "100%" }, ".drawer-open > .drawer-toggle": { "display": "none" }, ".drawer-open > .drawer-toggle ~ .drawer-side": { "pointerEvents": "auto", "visibility": "visible", "position": "sticky", "display": "block", "width": "auto", "overscrollBehavior": "auto" }, ".drawer-open > .drawer-toggle ~ .drawer-side > *:not(.drawer-overlay)": { "transform": "translateX(0%)" }, '[dir="rtl"] .drawer-open > .drawer-toggle ~ .drawer-side > *:not(.drawer-overlay)': { "transform": "translateX(0%)" }, ".drawer-open > .drawer-toggle:checked ~ .drawer-side": { "pointerEvents": "auto", "visibility": "visible" }, ".drawer-open > .drawer-side": { "overflowY": "auto" }, "html:has(.drawer-toggle:checked)": { "overflowY": "hidden", "scrollbarGutter": "stable" }, "html:has(.drawer-open.drawer-open)": { "overflowY": "auto", "scrollbarGutter": "auto" }, ".file-input-xs": { "height": "1.5rem", "paddingInlineEnd": "0.5rem", "fontSize": "0.75rem", "lineHeight": ["1rem", "1.625"] }, ".file-input-xs::file-selector-button": { "marginRight": "0.5rem", "fontSize": "0.75rem" }, ".file-input-sm": { "height": "2rem", "paddingInlineEnd": "0.75rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, ".file-input-sm::file-selector-button": { "marginRight": "0.75rem", "fontSize": "0.875rem" }, ".file-input-md": { "height": "3rem", "paddingInlineEnd": "1rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, ".file-input-md::file-selector-button": { "marginRight": "1rem", "fontSize": "0.875rem" }, ".file-input-lg": { "height": "4rem", "paddingInlineEnd": "1.5rem", "fontSize": "1.125rem", "lineHeight": ["1.75rem", "2"] }, ".file-input-lg::file-selector-button": { "marginRight": "1.5rem", "fontSize": "1.125rem" }, ".indicator :where(.indicator-item)": { "bottom": "auto", "insetInlineEnd": "0px", "insetInlineStart": "auto", "top": "0px", "-TwTranslateY": "-50%", "-TwTranslateX": "50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, '.indicator :where(.indicator-item):where([dir="rtl"], [dir="rtl"] *)': { "-TwTranslateX": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".indicator :where(.indicator-item.indicator-start)": { "insetInlineEnd": "auto", "insetInlineStart": "0px", "-TwTranslateX": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, '.indicator :where(.indicator-item.indicator-start):where([dir="rtl"], [dir="rtl"] *)': { "-TwTranslateX": "50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".indicator :where(.indicator-item.indicator-center)": { "insetInlineEnd": "50%", "insetInlineStart": "50%", "-TwTranslateX": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, '.indicator :where(.indicator-item.indicator-center):where([dir="rtl"], [dir="rtl"] *)': { "-TwTranslateX": "50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".indicator :where(.indicator-item.indicator-end)": { "insetInlineEnd": "0px", "insetInlineStart": "auto", "-TwTranslateX": "50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, '.indicator :where(.indicator-item.indicator-end):where([dir="rtl"], [dir="rtl"] *)': { "-TwTranslateX": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".indicator :where(.indicator-item.indicator-bottom)": { "bottom": "0px", "top": "auto", "-TwTranslateY": "50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".indicator :where(.indicator-item.indicator-middle)": { "bottom": "50%", "top": "50%", "-TwTranslateY": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".indicator :where(.indicator-item.indicator-top)": { "bottom": "auto", "top": "0px", "-TwTranslateY": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".input-xs": { "height": "1.5rem", "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "fontSize": "0.75rem", "lineHeight": ["1rem", "1.625"] }, ".input-md": { "height": "3rem", "paddingLeft": "1rem", "paddingRight": "1rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, ".input-lg": { "height": "4rem", "paddingLeft": "1.5rem", "paddingRight": "1.5rem", "fontSize": "1.125rem", "lineHeight": ["1.75rem", "2"] }, ".input-sm": { "height": "2rem", "paddingLeft": "0.75rem", "paddingRight": "0.75rem", "fontSize": "0.875rem", "lineHeight": "2rem" }, ".join.join-vertical": { "flexDirection": "column" }, ".join.join-vertical .join-item:first-child:not(:last-child),\n  .join.join-vertical *:first-child:not(:last-child) .join-item": { "borderEndStartRadius": "0", "borderEndEndRadius": "0", "borderStartStartRadius": "inherit", "borderStartEndRadius": "inherit" }, ".join.join-vertical .join-item:last-child:not(:first-child),\n  .join.join-vertical *:last-child:not(:first-child) .join-item": { "borderStartStartRadius": "0", "borderStartEndRadius": "0", "borderEndStartRadius": "inherit", "borderEndEndRadius": "inherit" }, ".join.join-horizontal": { "flexDirection": "row" }, ".join.join-horizontal .join-item:first-child:not(:last-child),\n  .join.join-horizontal *:first-child:not(:last-child) .join-item": { "borderEndEndRadius": "0", "borderStartEndRadius": "0", "borderEndStartRadius": "inherit", "borderStartStartRadius": "inherit" }, ".join.join-horizontal .join-item:last-child:not(:first-child),\n  .join.join-horizontal *:last-child:not(:first-child) .join-item": { "borderEndStartRadius": "0", "borderStartStartRadius": "0", "borderEndEndRadius": "inherit", "borderStartEndRadius": "inherit" }, ".kbd-xs": { "paddingLeft": "0.25rem", "paddingRight": "0.25rem", "fontSize": "0.75rem", "lineHeight": "1rem", "minHeight": "1.2em", "minWidth": "1.2em" }, ".kbd-sm": { "paddingLeft": "0.25rem", "paddingRight": "0.25rem", "fontSize": "0.875rem", "lineHeight": "1.25rem", "minHeight": "1.6em", "minWidth": "1.6em" }, ".kbd-md": { "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "fontSize": "1rem", "lineHeight": "1.5rem", "minHeight": "2.2em", "minWidth": "2.2em" }, ".kbd-lg": { "paddingLeft": "1rem", "paddingRight": "1rem", "fontSize": "1.125rem", "lineHeight": "1.75rem", "minHeight": "2.5em", "minWidth": "2.5em" }, ".menu-horizontal": { "display": "inline-flex", "flexDirection": "row" }, ".menu-horizontal > li:not(.menu-title) > details > ul": { "position": "absolute" }, ".menu-vertical": { "display": "flex", "flexDirection": "column" }, ".menu-vertical > li:not(.menu-title) > details > ul": { "position": "relative" }, ".modal-top": { "placeItems": "start" }, ".modal-middle": { "placeItems": "center" }, ".modal-bottom": { "placeItems": "end" }, '[type="radio"].radio-xs': { "height": "1rem", "width": "1rem" }, '[type="radio"].radio-sm': { "height": "1.25rem", "width": "1.25rem" }, '[type="radio"].radio-md': { "height": "1.5rem", "width": "1.5rem" }, '[type="radio"].radio-lg': { "height": "2rem", "width": "2rem" }, ".range-xs": { "height": "1rem" }, ".range-xs::-webkit-slider-runnable-track": { "height": "0.25rem" }, ".range-xs::-moz-range-track": { "height": "0.25rem" }, ".range-xs::-webkit-slider-thumb": { "height": "1rem", "width": "1rem", "-FillerOffset": "0.4rem" }, ".range-xs::-moz-range-thumb": { "height": "1rem", "width": "1rem", "-FillerOffset": "0.4rem" }, ".range-sm": { "height": "1.25rem" }, ".range-sm::-webkit-slider-runnable-track": { "height": "0.25rem" }, ".range-sm::-moz-range-track": { "height": "0.25rem" }, ".range-sm::-webkit-slider-thumb": { "height": "1.25rem", "width": "1.25rem", "-FillerOffset": "0.5rem" }, ".range-sm::-moz-range-thumb": { "height": "1.25rem", "width": "1.25rem", "-FillerOffset": "0.5rem" }, ".range-md": { "height": "1.5rem" }, ".range-md::-webkit-slider-runnable-track": { "height": "0.5rem" }, ".range-md::-moz-range-track": { "height": "0.5rem" }, ".range-md::-webkit-slider-thumb": { "height": "1.5rem", "width": "1.5rem", "-FillerOffset": "0.6rem" }, ".range-md::-moz-range-thumb": { "height": "1.5rem", "width": "1.5rem", "-FillerOffset": "0.6rem" }, ".range-lg": { "height": "2rem" }, ".range-lg::-webkit-slider-runnable-track": { "height": "1rem" }, ".range-lg::-moz-range-track": { "height": "1rem" }, ".range-lg::-webkit-slider-thumb": { "height": "2rem", "width": "2rem", "-FillerOffset": "1rem" }, ".range-lg::-moz-range-thumb": { "height": "2rem", "width": "2rem", "-FillerOffset": "1rem" }, ".rating-xs input": { "height": "0.75rem", "width": "0.75rem" }, ".rating-sm input": { "height": "1rem", "width": "1rem" }, ".rating-md input": { "height": "1.5rem", "width": "1.5rem" }, ".rating-lg input": { "height": "2.5rem", "width": "2.5rem" }, ".rating-half.rating-xs input:not(.rating-hidden)": { "width": "0.375rem" }, ".rating-half.rating-sm input:not(.rating-hidden)": { "width": "0.5rem" }, ".rating-half.rating-md input:not(.rating-hidden)": { "width": "0.75rem" }, ".rating-half.rating-lg input:not(.rating-hidden)": { "width": "1.25rem" }, ".select-md": { "height": "3rem", "minHeight": "3rem", "paddingLeft": "1rem", "paddingRight": "2.5rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, '[dir="rtl"] .select-md': { "paddingLeft": "2.5rem", "paddingRight": "1rem" }, ".select-lg": { "height": "4rem", "minHeight": "4rem", "paddingLeft": "1.5rem", "paddingRight": "2rem", "fontSize": "1.125rem", "lineHeight": ["1.75rem", "2"] }, '[dir="rtl"] .select-lg': { "paddingLeft": "2rem", "paddingRight": "1.5rem" }, ".select-sm": { "height": "2rem", "minHeight": "2rem", "paddingLeft": "0.75rem", "paddingRight": "2rem", "fontSize": "0.875rem", "lineHeight": "2rem" }, '[dir="rtl"] .select-sm': { "paddingLeft": "2rem", "paddingRight": "0.75rem" }, ".select-xs": { "height": "1.5rem", "minHeight": "1.5rem", "paddingLeft": "0.5rem", "paddingRight": "2rem", "fontSize": "0.75rem", "lineHeight": ["1rem", "1.625"] }, '[dir="rtl"] .select-xs': { "paddingLeft": "2rem", "paddingRight": "0.5rem" }, ".stats-horizontal": { "gridAutoFlow": "column" }, ".stats-vertical": { "gridAutoFlow": "row" }, ".steps-horizontal": { "gridAutoColumns": "1fr", "display": "inline-grid", "gridAutoFlow": "column", "overflow": "hidden", "overflowX": "auto" }, ".steps-horizontal .step": { "display": "grid", "gridTemplateColumns": "repeat(1, minmax(0, 1fr))", "gridTemplateRows": "repeat(2, minmax(0, 1fr))", "placeItems": "center", "textAlign": "center" }, ".steps-vertical": { "gridAutoRows": "1fr", "gridAutoFlow": "row" }, ".steps-vertical .step": { "display": "grid", "gridTemplateColumns": "repeat(2, minmax(0, 1fr))", "gridTemplateRows": "repeat(1, minmax(0, 1fr))" }, ".tabs-md :where(.tab)": { "height": "2rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"], "-TabPadding": "1rem" }, ".tabs-lg :where(.tab)": { "height": "3rem", "fontSize": "1.125rem", "lineHeight": ["1.75rem", "2"], "-TabPadding": "1.25rem" }, ".tabs-sm :where(.tab)": { "height": "1.5rem", "fontSize": "0.875rem", "lineHeight": ".75rem", "-TabPadding": "0.75rem" }, ".tabs-xs :where(.tab)": { "height": "1.25rem", "fontSize": "0.75rem", "lineHeight": ".75rem", "-TabPadding": "0.5rem" }, ".textarea-xs": { "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem", "fontSize": "0.75rem", "lineHeight": ["1rem", "1.625"] }, ".textarea-sm": { "paddingLeft": "0.75rem", "paddingRight": "0.75rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem", "fontSize": "0.875rem", "lineHeight": "2rem" }, ".textarea-md": { "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.75rem", "paddingBottom": "0.75rem", "fontSize": "0.875rem", "lineHeight": ["1.25rem", "2"] }, ".textarea-lg": { "paddingLeft": "1.5rem", "paddingRight": "1.5rem", "paddingTop": "1rem", "paddingBottom": "1rem", "fontSize": "1.125rem", "lineHeight": ["1.75rem", "2"] }, ".timeline-vertical": { "flexDirection": "column" }, ".timeline-compact,\n.timeline-horizontal.timeline-compact": { "-TimelineRowStart": "0" }, ".timeline-compact .timeline-start, .timeline-horizontal.timeline-compact .timeline-start": { "gridColumnStart": "1", "gridColumnEnd": "4", "gridRowStart": "3", "gridRowEnd": "4", "margin": "0.25rem", "alignSelf": "flex-start", "justifySelf": "center" }, ".timeline-compact li:has(.timeline-start) .timeline-end, .timeline-horizontal.timeline-compact li:has(.timeline-start) .timeline-end": { "gridColumnStart": "none", "gridRowStart": "auto" }, ".timeline-vertical.timeline-compact > li": { "-TimelineColStart": "0" }, ".timeline-vertical.timeline-compact .timeline-start": { "gridColumnStart": "3", "gridColumnEnd": "4", "gridRowStart": "1", "gridRowEnd": "4", "alignSelf": "center", "justifySelf": "start" }, ".timeline-vertical.timeline-compact li:has(.timeline-start) .timeline-end": { "gridColumnStart": "auto", "gridRowStart": "none" }, ":where(.timeline-vertical > li)": { "-TimelineRowStart": "minmax(0, 1fr)", "-TimelineRowEnd": "minmax(0, 1fr)", "justifyItems": "center" }, ".timeline-vertical > li > hr": { "height": "100%" }, ":where(.timeline-vertical > li > hr):first-child": { "gridColumnStart": "2", "gridRowStart": "1" }, ":where(.timeline-vertical > li > hr):last-child": { "gridColumnStart": "2", "gridColumnEnd": "auto", "gridRowStart": "3", "gridRowEnd": "none" }, ".timeline-vertical .timeline-start": { "gridColumnStart": "1", "gridColumnEnd": "2", "gridRowStart": "1", "gridRowEnd": "4", "alignSelf": "center", "justifySelf": "end" }, ".timeline-vertical .timeline-end": { "gridColumnStart": "3", "gridColumnEnd": "4", "gridRowStart": "1", "gridRowEnd": "4", "alignSelf": "center", "justifySelf": "start" }, ".timeline-vertical:where(.timeline-snap-icon) > li": { "-TimelineColStart": "minmax(0, 1fr)", "-TimelineRowStart": "0.5rem" }, ".timeline-horizontal": { "flexDirection": "row" }, ".timeline-horizontal > li > hr": { "width": "100%" }, ":where(.timeline-horizontal > li)": { "alignItems": "center" }, ":where(.timeline-horizontal > li > hr):first-child": { "gridColumnStart": "1", "gridRowStart": "2" }, ":where(.timeline-horizontal > li > hr):last-child": { "gridColumnStart": "3", "gridColumnEnd": "none", "gridRowStart": "2", "gridRowEnd": "auto" }, ".timeline-horizontal .timeline-start": { "gridColumnStart": "1", "gridColumnEnd": "4", "gridRowStart": "1", "gridRowEnd": "2", "alignSelf": "flex-end", "justifySelf": "center" }, ".timeline-horizontal .timeline-end": { "gridColumnStart": "1", "gridColumnEnd": "4", "gridRowStart": "3", "gridRowEnd": "4", "alignSelf": "flex-start", "justifySelf": "center" }, ":where(.timeline-snap-icon) > li,\n.timeline-horizontal:where(.timeline-snap-icon) > li": { "-TimelineColStart": "0.5rem", "-TimelineRowStart": "minmax(0, 1fr)" }, ":where(.toast)": { "bottom": "0px", "insetInlineEnd": "0px", "insetInlineStart": "auto", "top": "auto", "-TwTranslateX": "0px", "-TwTranslateY": "0px", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".toast:where(.toast-start)": { "insetInlineEnd": "auto", "insetInlineStart": "0px", "-TwTranslateX": "0px", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".toast:where(.toast-center)": { "insetInlineEnd": "50%", "insetInlineStart": "50%", "-TwTranslateX": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, '.toast:where(.toast-center):where([dir="rtl"], [dir="rtl"] *)': { "-TwTranslateX": "50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".toast:where(.toast-end)": { "insetInlineEnd": "0px", "insetInlineStart": "auto", "-TwTranslateX": "0px", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".toast:where(.toast-bottom)": { "bottom": "0px", "top": "auto", "-TwTranslateY": "0px", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".toast:where(.toast-middle)": { "bottom": "auto", "top": "50%", "-TwTranslateY": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".toast:where(.toast-top)": { "bottom": "auto", "top": "0px", "-TwTranslateY": "0px", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, '[type="checkbox"].toggle-xs': { "-Handleoffset": "0.5rem", "height": "1rem", "width": "1.5rem" }, '[type="checkbox"].toggle-sm': { "-Handleoffset": "0.75rem", "height": "1.25rem", "width": "2rem" }, '[type="checkbox"].toggle-md': { "-Handleoffset": "1.5rem", "height": "1.5rem", "width": "3rem" }, '[type="checkbox"].toggle-lg': { "-Handleoffset": "2rem", "height": "2rem", "width": "4rem" }, ".tooltip": { "position": "relative", "display": "inline-block", "-TooltipOffset": "calc(100% + 1px + var(--tooltip-tail, 0px))" }, ".tooltip:before": { "position": "absolute", "pointerEvents": "none", "zIndex": "1", "content": "var(--tw-content)", "-TwContent": "attr(data-tip)" }, ".tooltip:before, .tooltip-top:before": { "transform": "translateX(-50%)", "top": "auto", "left": "50%", "right": "auto", "bottom": "var(--tooltip-offset)" }, ".tooltip-bottom:before": { "transform": "translateX(-50%)", "top": "var(--tooltip-offset)", "left": "50%", "right": "auto", "bottom": "auto" }, ".tooltip-left:before": { "transform": "translateY(-50%)", "top": "50%", "left": "auto", "right": "var(--tooltip-offset)", "bottom": "auto" }, ".tooltip-right:before": { "transform": "translateY(-50%)", "top": "50%", "left": "var(--tooltip-offset)", "right": "auto", "bottom": "auto" } };
  }
});

// node_modules/daisyui/dist/utilities-styled.js
var require_utilities_styled = __commonJS({
  "node_modules/daisyui/dist/utilities-styled.js"(exports2, module2) {
    module2.exports = { ".artboard-demo": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))", "-TwTextOpacity": "1", "color": "var(--fallback-bc,oklch(var(--bc)/var(--tw-text-opacity)))", "boxShadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1),\n      0 1px 2px 0 rgba(0, 0, 0, 0.06)" }, ".avatar.online:before": { "content": '""', "position": "absolute", "zIndex": "10", "display": "block", "borderRadius": "9999px", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-su,oklch(var(--su)/var(--tw-bg-opacity)))", "outlineStyle": "solid", "outlineWidth": "2px", "outlineColor": "var(--fallback-b1,oklch(var(--b1)/1))", "width": "15%", "height": "15%", "top": "7%", "right": "7%" }, ".avatar.offline:before": { "content": '""', "position": "absolute", "zIndex": "10", "display": "block", "borderRadius": "9999px", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b3,oklch(var(--b3)/var(--tw-bg-opacity)))", "outlineStyle": "solid", "outlineWidth": "2px", "outlineColor": "var(--fallback-b1,oklch(var(--b1)/1))", "width": "15%", "height": "15%", "top": "7%", "right": "7%" }, ".card-compact .card-body": { "padding": "1rem", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".card-compact .card-title": { "marginBottom": "0.25rem" }, ".card-normal .card-body": { "padding": "var(--padding-card, 2rem)", "fontSize": "1rem", "lineHeight": "1.5rem" }, ".card-normal .card-title": { "marginBottom": "0.75rem" }, ".divider-horizontal": { "marginLeft": "1rem", "marginRight": "1rem", "marginTop": "0px", "marginBottom": "0px", "height": "auto", "width": "1rem" }, ".divider-vertical": { "marginLeft": "0px", "marginRight": "0px", "marginTop": "1rem", "marginBottom": "1rem", "height": "1rem", "width": "auto" }, ".drawer-open > .drawer-toggle ~ .drawer-side > .drawer-overlay": { "cursor": "default", "backgroundColor": "transparent" }, ".join.join-vertical > :where(*:not(:first-child))": { "marginLeft": "0px", "marginRight": "0px", "marginTop": "-1px" }, ".join.join-vertical > :where(*:not(:first-child)):is(.btn)": { "marginTop": "calc(var(--border-btn) * -1)" }, ".join.join-horizontal > :where(*:not(:first-child))": { "marginTop": "0px", "marginBottom": "0px", "marginInlineStart": "-1px" }, ".join.join-horizontal > :where(*:not(:first-child)):is(.btn)": { "marginInlineStart": "calc(var(--border-btn) * -1)", "marginTop": "0px" }, ".menu-horizontal > li:not(.menu-title) > details > ul": { "marginInlineStart": "0px", "marginTop": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "paddingInlineEnd": "0.5rem" }, ".menu-horizontal > li > details > ul:before": { "content": "none" }, ":where(.menu-horizontal > li:not(.menu-title) > details > ul)": { "borderRadius": "var(--rounded-box, 1rem)", "-TwBgOpacity": "1", "backgroundColor": "var(--fallback-b1,oklch(var(--b1)/var(--tw-bg-opacity)))", "-TwShadow": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", "-TwShadowColored": "0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)", "boxShadow": "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)" }, ".menu-vertical > li:not(.menu-title) > details > ul": { "marginInlineStart": "1rem", "marginTop": "0px", "paddingTop": "0px", "paddingBottom": "0px", "paddingInlineEnd": "0px" }, ".menu-xs :where(li:not(.menu-title) > *:not(ul, details, .menu-title)), .menu-xs :where(li:not(.menu-title) > details > summary:not(.menu-title))": { "borderRadius": "0.25rem", "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem", "fontSize": "0.75rem", "lineHeight": "1rem" }, ".menu-xs .menu-title": { "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem" }, ".menu-sm :where(li:not(.menu-title) > *:not(ul, details, .menu-title)), .menu-sm :where(li:not(.menu-title) > details > summary:not(.menu-title))": { "borderRadius": "var(--rounded-btn, 0.5rem)", "paddingLeft": "0.75rem", "paddingRight": "0.75rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".menu-sm .menu-title": { "paddingLeft": "0.75rem", "paddingRight": "0.75rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem" }, ".menu-md :where(li:not(.menu-title) > *:not(ul, details, .menu-title)), .menu-md :where(li:not(.menu-title) > details > summary:not(.menu-title))": { "borderRadius": "var(--rounded-btn, 0.5rem)", "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem", "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".menu-md .menu-title": { "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem" }, ".menu-lg :where(li:not(.menu-title) > *:not(ul, details, .menu-title)), .menu-lg :where(li:not(.menu-title) > details > summary:not(.menu-title))": { "borderRadius": "var(--rounded-btn, 0.5rem)", "paddingLeft": "1.5rem", "paddingRight": "1.5rem", "paddingTop": "0.75rem", "paddingBottom": "0.75rem", "fontSize": "1.125rem", "lineHeight": "1.75rem" }, ".menu-lg .menu-title": { "paddingLeft": "1.5rem", "paddingRight": "1.5rem", "paddingTop": "0.75rem", "paddingBottom": "0.75rem" }, ".modal-top :where(.modal-box)": { "width": "100%", "maxWidth": "none", "-TwTranslateY": "-2.5rem", "-TwScaleX": "1", "-TwScaleY": "1", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "borderBottomRightRadius": "var(--rounded-box, 1rem)", "borderBottomLeftRadius": "var(--rounded-box, 1rem)", "borderTopLeftRadius": "0px", "borderTopRightRadius": "0px" }, ".modal-middle :where(.modal-box)": { "width": "91.666667%", "maxWidth": "32rem", "-TwTranslateY": "0px", "-TwScaleX": ".9", "-TwScaleY": ".9", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "borderTopLeftRadius": "var(--rounded-box, 1rem)", "borderTopRightRadius": "var(--rounded-box, 1rem)", "borderBottomRightRadius": "var(--rounded-box, 1rem)", "borderBottomLeftRadius": "var(--rounded-box, 1rem)" }, ".modal-bottom :where(.modal-box)": { "width": "100%", "maxWidth": "none", "-TwTranslateY": "2.5rem", "-TwScaleX": "1", "-TwScaleY": "1", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "borderTopLeftRadius": "var(--rounded-box, 1rem)", "borderTopRightRadius": "var(--rounded-box, 1rem)", "borderBottomRightRadius": "0px", "borderBottomLeftRadius": "0px" }, ".stats-horizontal > :not([hidden]) ~ :not([hidden])": { "-TwDivideXReverse": "0", "borderRightWidth": "calc(1px * var(--tw-divide-x-reverse))", "borderLeftWidth": "calc(1px * calc(1 - var(--tw-divide-x-reverse)))", "-TwDivideYReverse": "0", "borderTopWidth": "calc(0px * calc(1 - var(--tw-divide-y-reverse)))", "borderBottomWidth": "calc(0px * var(--tw-divide-y-reverse))" }, ".stats-horizontal": { "overflowX": "auto" }, '.stats-horizontal:where([dir="rtl"], [dir="rtl"] *)': { "-TwDivideXReverse": "1" }, ".stats-vertical > :not([hidden]) ~ :not([hidden])": { "-TwDivideXReverse": "0", "borderRightWidth": "calc(0px * var(--tw-divide-x-reverse))", "borderLeftWidth": "calc(0px * calc(1 - var(--tw-divide-x-reverse)))", "-TwDivideYReverse": "0", "borderTopWidth": "calc(1px * calc(1 - var(--tw-divide-y-reverse)))", "borderBottomWidth": "calc(1px * var(--tw-divide-y-reverse))" }, ".stats-vertical": { "overflowY": "auto" }, ".steps-horizontal .step": { "gridTemplateRows": "40px 1fr", "gridTemplateColumns": "auto", "minWidth": "4rem" }, ".steps-horizontal .step:before": { "height": "0.5rem", "width": "100%", "-TwTranslateX": "0px", "-TwTranslateY": "0px", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "content": '""', "marginInlineStart": "-100%" }, '.steps-horizontal .step:where([dir="rtl"], [dir="rtl"] *):before': { "-TwTranslateX": "0px", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".steps-vertical .step": { "gap": "0.5rem", "gridTemplateColumns": "40px 1fr", "gridTemplateRows": "auto", "minHeight": "4rem", "justifyItems": "start" }, ".steps-vertical .step:before": { "height": "100%", "width": "0.5rem", "-TwTranslateX": "-50%", "-TwTranslateY": "-50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))", "marginInlineStart": "50%" }, '.steps-vertical .step:where([dir="rtl"], [dir="rtl"] *):before': { "-TwTranslateX": "50%", "transform": "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" }, ".table-xs :not(thead):not(tfoot) tr": { "fontSize": "0.75rem", "lineHeight": "1rem" }, ".table-xs :where(th, td)": { "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem" }, ".table-sm :not(thead):not(tfoot) tr": { "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".table-sm :where(th, td)": { "paddingLeft": "0.75rem", "paddingRight": "0.75rem", "paddingTop": "0.5rem", "paddingBottom": "0.5rem" }, ".table-md :not(thead):not(tfoot) tr": { "fontSize": "0.875rem", "lineHeight": "1.25rem" }, ".table-md :where(th, td)": { "paddingLeft": "1rem", "paddingRight": "1rem", "paddingTop": "0.75rem", "paddingBottom": "0.75rem" }, ".table-lg :not(thead):not(tfoot) tr": { "fontSize": "1rem", "lineHeight": "1.5rem" }, ".table-lg :where(th, td)": { "paddingLeft": "1.5rem", "paddingRight": "1.5rem", "paddingTop": "1rem", "paddingBottom": "1rem" }, ".timeline-vertical > li > hr": { "width": "0.25rem" }, ":where(.timeline-vertical:has(.timeline-middle) > li > hr):first-child": { "borderBottomRightRadius": "var(--rounded-badge, 1.9rem)", "borderBottomLeftRadius": "var(--rounded-badge, 1.9rem)", "borderTopLeftRadius": "0px", "borderTopRightRadius": "0px" }, ":where(.timeline-vertical:has(.timeline-middle) > li > hr):last-child": { "borderTopLeftRadius": "var(--rounded-badge, 1.9rem)", "borderTopRightRadius": "var(--rounded-badge, 1.9rem)", "borderBottomRightRadius": "0px", "borderBottomLeftRadius": "0px" }, ":where(.timeline-vertical:not(:has(.timeline-middle)) :first-child > hr:last-child)": { "borderTopLeftRadius": "var(--rounded-badge, 1.9rem)", "borderTopRightRadius": "var(--rounded-badge, 1.9rem)", "borderBottomRightRadius": "0px", "borderBottomLeftRadius": "0px" }, ":where(.timeline-vertical:not(:has(.timeline-middle)) :last-child > hr:first-child)": { "borderBottomRightRadius": "var(--rounded-badge, 1.9rem)", "borderBottomLeftRadius": "var(--rounded-badge, 1.9rem)", "borderTopLeftRadius": "0px", "borderTopRightRadius": "0px" }, ".timeline-horizontal > li > hr": { "height": "0.25rem" }, ":where(.timeline-horizontal:has(.timeline-middle) > li > hr):first-child": { "borderStartEndRadius": "var(--rounded-badge, 1.9rem)", "borderEndEndRadius": "var(--rounded-badge, 1.9rem)", "borderStartStartRadius": "0px", "borderEndStartRadius": "0px" }, ":where(.timeline-horizontal:has(.timeline-middle) > li > hr):last-child": { "borderStartStartRadius": "var(--rounded-badge, 1.9rem)", "borderEndStartRadius": "var(--rounded-badge, 1.9rem)", "borderStartEndRadius": "0px", "borderEndEndRadius": "0px" }, ":where(.timeline-horizontal:not(:has(.timeline-middle)) :first-child > hr:last-child)": { "borderStartStartRadius": "var(--rounded-badge, 1.9rem)", "borderEndStartRadius": "var(--rounded-badge, 1.9rem)", "borderStartEndRadius": "0px", "borderEndEndRadius": "0px" }, ":where(.timeline-horizontal:not(:has(.timeline-middle)) :last-child > hr:first-child)": { "borderStartEndRadius": "var(--rounded-badge, 1.9rem)", "borderEndEndRadius": "var(--rounded-badge, 1.9rem)", "borderStartStartRadius": "0px", "borderEndStartRadius": "0px" }, ".tooltip": { "position": "relative", "display": "inline-block", "textAlign": "center", "-TooltipTail": "0.1875rem", "-TooltipColor": "var(--fallback-n,oklch(var(--n)/1))", "-TooltipTextColor": "var(--fallback-nc,oklch(var(--nc)/1))", "-TooltipTailOffset": "calc(100% + 0.0625rem - var(--tooltip-tail))" }, ".tooltip:before,\n.tooltip:after": { "opacity": "0", "transitionProperty": "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", "transitionDelay": "100ms", "transitionDuration": "200ms", "transitionTimingFunction": "cubic-bezier(0.4, 0, 0.2, 1)" }, ".tooltip:after": { "position": ["absolute", "absolute"], "content": '""', "borderStyle": "solid", "borderWidth": "var(--tooltip-tail, 0)", "width": "0", "height": "0", "display": "block" }, ".tooltip:before": { "maxWidth": "20rem", "whiteSpace": "normal", "borderRadius": "0.25rem", "paddingLeft": "0.5rem", "paddingRight": "0.5rem", "paddingTop": "0.25rem", "paddingBottom": "0.25rem", "fontSize": "0.875rem", "lineHeight": "1.25rem", "backgroundColor": "var(--tooltip-color)", "color": "var(--tooltip-text-color)", "width": "max-content" }, ".tooltip.tooltip-open:before": { "opacity": "1", "transitionDelay": "75ms" }, ".tooltip.tooltip-open:after": { "opacity": "1", "transitionDelay": "75ms" }, ".tooltip:hover:before": { "opacity": "1", "transitionDelay": "75ms" }, ".tooltip:hover:after": { "opacity": "1", "transitionDelay": "75ms" }, ".tooltip:has(:focus-visible):after,\n.tooltip:has(:focus-visible):before": { "opacity": "1", "transitionDelay": "75ms" }, ".tooltip:not([data-tip]):hover:before,\n.tooltip:not([data-tip]):hover:after": { "visibility": "hidden", "opacity": "0" }, ".tooltip:after, .tooltip-top:after": { "transform": "translateX(-50%)", "borderColor": "var(--tooltip-color) transparent transparent transparent", "top": "auto", "left": "50%", "right": "auto", "bottom": "var(--tooltip-tail-offset)" }, ".tooltip-bottom:after": { "transform": "translateX(-50%)", "borderColor": "transparent transparent var(--tooltip-color) transparent", "top": "var(--tooltip-tail-offset)", "left": "50%", "right": "auto", "bottom": "auto" }, ".tooltip-left:after": { "transform": "translateY(-50%)", "borderColor": "transparent transparent transparent var(--tooltip-color)", "top": "50%", "left": "auto", "right": "calc(var(--tooltip-tail-offset) + 0.0625rem)", "bottom": "auto" }, ".tooltip-right:after": { "transform": "translateY(-50%)", "borderColor": "transparent var(--tooltip-color) transparent transparent", "top": "50%", "left": "calc(var(--tooltip-tail-offset) + 0.0625rem)", "right": "auto", "bottom": "auto" }, ".tooltip-primary": { "-TooltipColor": "var(--fallback-p,oklch(var(--p)/1))", "-TooltipTextColor": "var(--fallback-pc,oklch(var(--pc)/1))" }, ".tooltip-secondary": { "-TooltipColor": "var(--fallback-s,oklch(var(--s)/1))", "-TooltipTextColor": "var(--fallback-sc,oklch(var(--sc)/1))" }, ".tooltip-accent": { "-TooltipColor": "var(--fallback-a,oklch(var(--a)/1))", "-TooltipTextColor": "var(--fallback-ac,oklch(var(--ac)/1))" }, ".tooltip-info": { "-TooltipColor": "var(--fallback-in,oklch(var(--in)/1))", "-TooltipTextColor": "var(--fallback-inc,oklch(var(--inc)/1))" }, ".tooltip-success": { "-TooltipColor": "var(--fallback-su,oklch(var(--su)/1))", "-TooltipTextColor": "var(--fallback-suc,oklch(var(--suc)/1))" }, ".tooltip-warning": { "-TooltipColor": "var(--fallback-wa,oklch(var(--wa)/1))", "-TooltipTextColor": "var(--fallback-wac,oklch(var(--wac)/1))" }, ".tooltip-error": { "-TooltipColor": "var(--fallback-er,oklch(var(--er)/1))", "-TooltipTextColor": "var(--fallback-erc,oklch(var(--erc)/1))" } };
  }
});

// node_modules/daisyui/src/theming/themes.js
var require_themes = __commonJS({
  "node_modules/daisyui/src/theming/themes.js"(exports2, module2) {
    module2.exports = {
      aqua: {
        "color-scheme": "dark",
        "primary": "#09ecf3",
        "primary-content": "#005355",
        "secondary": "#966fb3",
        "accent": "#ffe999",
        "neutral": "#3b8ac4",
        "base-100": "#345da7",
        "info": "#2563eb",
        "success": "#16a34a",
        "warning": "#d97706",
        "error": "oklch(73.95% 0.19 27.33)"
      },
      black: {
        "color-scheme": "dark",
        "primary": "#373737",
        "secondary": "#373737",
        "accent": "#373737",
        "base-100": "#000000",
        "base-200": "#141414",
        "base-300": "#262626",
        "base-content": "#d6d6d6",
        "neutral": "#373737",
        "info": "#0000ff",
        "success": "#008000",
        "warning": "#ffff00",
        "error": "#ff0000",
        "--rounded-box": "0",
        "--rounded-btn": "0",
        "--rounded-badge": "0",
        "--animation-btn": "0",
        "--animation-input": "0",
        "--btn-focus-scale": "1",
        "--tab-radius": "0"
      },
      bumblebee: {
        "color-scheme": "light",
        "primary": "oklch(89.51% 0.2132 96.61)",
        "primary-content": "oklch(38.92% 0.046 96.61)",
        "secondary": "oklch(80.39% 0.194 70.76)",
        "secondary-content": "oklch(39.38% 0.068 70.76)",
        "accent": "oklch(81.27% 0.157 56.52)",
        "neutral": "oklch(12.75% 0.075 281.99)",
        "base-100": "oklch(100% 0 0)"
      },
      cmyk: {
        "color-scheme": "light",
        "primary": "#45AEEE",
        "secondary": "#E8488A",
        "accent": "#FFF232",
        "neutral": "#1a1a1a",
        "base-100": "oklch(100% 0 0)",
        "info": "#4AA8C0",
        "success": "#823290",
        "warning": "#EE8133",
        "error": "#E93F33"
      },
      corporate: {
        "color-scheme": "light",
        "primary": "oklch(60.39% 0.228 269.1)",
        "secondary": "#7b92b2",
        "accent": "#67cba0",
        "neutral": "#181a2a",
        "neutral-content": "#edf2f7",
        "base-100": "oklch(100% 0 0)",
        "base-content": "#181a2a",
        "--rounded-box": "0.25rem",
        "--rounded-btn": ".125rem",
        "--rounded-badge": ".125rem",
        "--tab-radius": "0.25rem",
        "--animation-btn": "0",
        "--animation-input": "0",
        "--btn-focus-scale": "1"
      },
      cupcake: {
        "color-scheme": "light",
        "primary": "#65c3c8",
        "secondary": "#ef9fbc",
        "accent": "#eeaf3a",
        "neutral": "#291334",
        "base-100": "#faf7f5",
        "base-200": "#efeae6",
        "base-300": "#e7e2df",
        "base-content": "#291334",
        "--rounded-btn": "1.9rem",
        "--tab-border": "2px",
        "--tab-radius": "0.7rem"
      },
      cyberpunk: {
        "color-scheme": "light",
        "fontFamily": "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
        "primary": "oklch(74.22% 0.209 6.35)",
        "secondary": "oklch(83.33% 0.184 204.72)",
        "accent": "oklch(71.86% 0.2176 310.43)",
        "neutral": "oklch(23.04% 0.065 269.31)",
        "neutral-content": "oklch(94.51% 0.179 104.32)",
        "base-100": "oklch(94.51% 0.179 104.32)",
        "--rounded-box": "0",
        "--rounded-btn": "0",
        "--rounded-badge": "0",
        "--tab-radius": "0"
      },
      dark: {
        "color-scheme": "dark",
        "primary": "oklch(65.69% 0.196 275.75)",
        "secondary": "oklch(74.8% 0.26 342.55)",
        "accent": "oklch(74.51% 0.167 183.61)",
        "neutral": "#2a323c",
        "neutral-content": "#A6ADBB",
        "base-100": "#1d232a",
        "base-200": "#191e24",
        "base-300": "#15191e",
        "base-content": "#A6ADBB"
      },
      dracula: {
        "color-scheme": "dark",
        "primary": "#ff79c6",
        "secondary": "#bd93f9",
        "accent": "#ffb86c",
        "neutral": "#414558",
        "base-100": "#282a36",
        "base-content": "#f8f8f2",
        "info": "#8be9fd",
        "success": "#50fa7b",
        "warning": "#f1fa8c",
        "error": "#ff5555"
      },
      emerald: {
        "color-scheme": "light",
        "primary": "#66cc8a",
        "primary-content": "#223D30",
        "secondary": "#377cfb",
        "secondary-content": "#fff",
        "accent": "#f68067",
        "accent-content": "#000",
        "neutral": "#333c4d",
        "neutral-content": "#f9fafb",
        "base-100": "oklch(100% 0 0)",
        "base-content": "#333c4d",
        "--animation-btn": "0",
        "--animation-input": "0",
        "--btn-focus-scale": "1"
      },
      fantasy: {
        "color-scheme": "light",
        "primary": "oklch(37.45% 0.189 325.02)",
        "secondary": "oklch(53.92% 0.162 241.36)",
        "accent": "oklch(75.98% 0.204 56.72)",
        "neutral": "#1f2937",
        "base-100": "oklch(100% 0 0)",
        "base-content": "#1f2937"
      },
      forest: {
        "color-scheme": "dark",
        "primary": "#1eb854",
        "primary-content": "#000000",
        "secondary": "#1DB88E",
        "accent": "#1DB8AB",
        "neutral": "#19362D",
        "base-100": "#171212",
        "--rounded-btn": "1.9rem"
      },
      garden: {
        "color-scheme": "light",
        "primary": "oklch(62.45% 0.278 3.8363600743192197)",
        "primary-content": "#fff",
        "secondary": "#8E4162",
        "accent": "#5c7f67",
        "neutral": "#291E00",
        "neutral-content": "#e9e7e7",
        "base-100": "#e9e7e7",
        "base-content": "#100f0f"
      },
      halloween: {
        "color-scheme": "dark",
        "primary": "oklch(77.48% 0.204 60.62)",
        "primary-content": "#131616",
        "secondary": "oklch(45.98% 0.248 305.03)",
        "accent": "oklch(64.8% 0.223 136.07347934356451)",
        "accent-content": "#000000",
        "neutral": "#2F1B05",
        "base-100": "#212121",
        "info": "#2563eb",
        "success": "#16a34a",
        "warning": "#d97706",
        "error": "oklch(65.72% 0.199 27.33)"
      },
      light: {
        "color-scheme": "light",
        "primary": "oklch(49.12% 0.3096 275.75)",
        "secondary": "oklch(69.71% 0.329 342.55)",
        "secondary-content": "oklch(98.71% 0.0106 342.55)",
        "accent": "oklch(76.76% 0.184 183.61)",
        "neutral": "#2B3440",
        "neutral-content": "#D7DDE4",
        "base-100": "oklch(100% 0 0)",
        "base-200": "#F2F2F2",
        "base-300": "#E5E6E6",
        "base-content": "#1f2937"
      },
      lofi: {
        "color-scheme": "light",
        "primary": "#0D0D0D",
        "primary-content": "oklch(100% 0 0)",
        "secondary": "#1A1919",
        "secondary-content": "oklch(100% 0 0)",
        "accent": "#262626",
        "accent-content": "oklch(100% 0 0)",
        "neutral": "#000000",
        "neutral-content": "oklch(100% 0 0)",
        "base-100": "oklch(100% 0 0)",
        "base-200": "#F2F2F2",
        "base-300": "#E6E5E5",
        "base-content": "#000000",
        "info": "oklch(79.54% 0.103 205.9)",
        "success": "oklch(90.13% 0.153 164.14)",
        "warning": "oklch(88.37% 0.135 79.94)",
        "error": "oklch(78.66% 0.15 28.47)",
        "--rounded-box": "0.25rem",
        "--rounded-btn": "0.125rem",
        "--rounded-badge": "0.125rem",
        "--tab-radius": "0.125rem",
        "--animation-btn": "0",
        "--animation-input": "0",
        "--btn-focus-scale": "1"
      },
      luxury: {
        "color-scheme": "dark",
        "primary": "oklch(100% 0 0)",
        "secondary": "#152747",
        "accent": "#513448",
        "neutral": "#331800",
        "neutral-content": "#FFE7A3",
        "base-100": "#09090b",
        "base-200": "#171618",
        "base-300": "#2e2d2f",
        "base-content": "#dca54c",
        "info": "#66c6ff",
        "success": "#87d039",
        "warning": "#e2d562",
        "error": "#ff6f6f"
      },
      pastel: {
        "color-scheme": "light",
        "primary": "#d1c1d7",
        "secondary": "#f6cbd1",
        "accent": "#b4e9d6",
        "neutral": "#70acc7",
        "base-100": "oklch(100% 0 0)",
        "base-200": "#f9fafb",
        "base-300": "#d1d5db",
        "--rounded-btn": "1.9rem",
        "--tab-radius": "0.7rem"
      },
      retro: {
        "color-scheme": "light",
        "primary": "#ef9995",
        "primary-content": "#282425",
        "secondary": "#a4cbb4",
        "secondary-content": "#282425",
        "accent": "#DC8850",
        "accent-content": "#282425",
        "neutral": "#2E282A",
        "neutral-content": "#EDE6D4",
        "base-100": "#ece3ca",
        "base-200": "#e4d8b4",
        "base-300": "#DBCA9A",
        "base-content": "#282425",
        "info": "#2563eb",
        "success": "#16a34a",
        "warning": "#d97706",
        "error": "oklch(65.72% 0.199 27.33)",
        "--rounded-box": "0.4rem",
        "--rounded-btn": "0.4rem",
        "--rounded-badge": "0.4rem",
        "--tab-radius": "0.4rem"
      },
      synthwave: {
        "color-scheme": "dark",
        "primary": "#e779c1",
        "secondary": "#58c7f3",
        "accent": "oklch(88.04% 0.206 93.72)",
        "neutral": "#221551",
        "neutral-content": "#f9f7fd",
        "base-100": "#1a103d",
        "base-content": "#f9f7fd",
        "info": "#53c0f3",
        "info-content": "#201047",
        "success": "#71ead2",
        "success-content": "#201047",
        "warning": "#eace6c",
        "warning-content": "#201047",
        "error": "#ec8c78",
        "error-content": "#201047"
      },
      valentine: {
        "color-scheme": "light",
        "primary": "#e96d7b",
        "secondary": "#a991f7",
        "accent": "#66b1b3",
        "neutral": "#af4670",
        "neutral-content": "#f0d6e8",
        "base-100": "#fae7f4",
        "base-content": "#632c3b",
        "info": "#2563eb",
        "success": "#16a34a",
        "warning": "#d97706",
        "error": "oklch(73.07% 0.207 27.33)",
        "--rounded-btn": "1.9rem",
        "--tab-radius": "0.7rem"
      },
      wireframe: {
        "color-scheme": "light",
        "fontFamily": "Chalkboard,comic sans ms,'sans-serif'",
        "primary": "#b8b8b8",
        "secondary": "#b8b8b8",
        "accent": "#b8b8b8",
        "neutral": "#ebebeb",
        "base-100": "oklch(100% 0 0)",
        "base-200": "#eeeeee",
        "base-300": "#dddddd",
        "info": "#0000ff",
        "success": "#008000",
        "warning": "#a6a659",
        "error": "#ff0000",
        "--rounded-box": "0.2rem",
        "--rounded-btn": "0.2rem",
        "--rounded-badge": "0.2rem",
        "--tab-radius": "0.2rem"
      },
      autumn: {
        "color-scheme": "light",
        "primary": "#8C0327",
        "secondary": "#D85251",
        "accent": "#D59B6A",
        "neutral": "#826A5C",
        "base-100": "#f1f1f1",
        "info": "#42ADBB",
        "success": "#499380",
        "warning": "#E97F14",
        "error": "oklch(53.07% 0.241 24.16)"
      },
      business: {
        "color-scheme": "dark",
        "primary": "#1C4E80",
        "secondary": "#7C909A",
        "accent": "#EA6947",
        "neutral": "#23282E",
        "base-100": "#202020",
        "info": "#0091D5",
        "success": "#6BB187",
        "warning": "#DBAE59",
        "error": "#AC3E31",
        "--rounded-box": "0.25rem",
        "--rounded-btn": ".125rem",
        "--rounded-badge": ".125rem"
      },
      acid: {
        "color-scheme": "light",
        "primary": "oklch(71.9% 0.357 330.7595734057481)",
        "secondary": "oklch(73.37% 0.224 48.25087840015526)",
        "accent": "oklch(92.78% 0.264 122.96295065960891)",
        "neutral": "oklch(21.31% 0.128 278.68)",
        "base-100": "#fafafa",
        "info": "oklch(60.72% 0.227 252.05)",
        "success": "oklch(85.72% 0.266 158.53)",
        "warning": "oklch(91.01% 0.212 100.5)",
        "error": "oklch(64.84% 0.293 29.34918758658804)",
        "--rounded-box": "1.25rem",
        "--rounded-btn": "1rem",
        "--rounded-badge": "1rem",
        "--tab-radius": "0.7rem"
      },
      lemonade: {
        "color-scheme": "light",
        "primary": "oklch(58.92% 0.199 134.6)",
        "secondary": "oklch(77.75% 0.196 111.09)",
        "accent": "oklch(85.39% 0.201 100.73)",
        "neutral": "oklch(30.98% 0.075 108.6)",
        "base-100": "oklch(98.71% 0.02 123.72)",
        "info": "oklch(86.19% 0.047 224.14)",
        "success": "oklch(86.19% 0.047 157.85)",
        "warning": "oklch(86.19% 0.047 102.15)",
        "error": "oklch(86.19% 0.047 25.85)"
      },
      night: {
        "color-scheme": "dark",
        "primary": "#38bdf8",
        "secondary": "#818CF8",
        "accent": "#F471B5",
        "neutral": "#1E293B",
        "base-100": "#0F172A",
        "info": "#0CA5E9",
        "info-content": "#000000",
        "success": "#2DD4BF",
        "warning": "#F4BF50",
        "error": "#FB7085"
      },
      coffee: {
        "color-scheme": "dark",
        "primary": "#DB924B",
        "secondary": "#263E3F",
        "accent": "#10576D",
        "neutral": "#120C12",
        "base-100": "#20161F",
        "base-content": "#c59f60",
        "info": "#8DCAC1",
        "success": "#9DB787",
        "warning": "#FFD25F",
        "error": "#FC9581"
      },
      winter: {
        "color-scheme": "light",
        "primary": "oklch(56.86% 0.255 257.57)",
        "secondary": "#463AA2",
        "accent": "#C148AC",
        "neutral": "#021431",
        "base-100": "oklch(100% 0 0)",
        "base-200": "#F2F7FF",
        "base-300": "#E3E9F4",
        "base-content": "#394E6A",
        "info": "#93E7FB",
        "success": "#81CFD1",
        "warning": "#EFD7BB",
        "error": "#E58B8B"
      },
      dim: {
        "color-scheme": "dark",
        "primary": "#9FE88D",
        "secondary": "#FF7D5C",
        "accent": "#C792E9",
        "neutral": "#1c212b",
        "neutral-content": "#B2CCD6",
        "base-100": "#2A303C",
        "base-200": "#242933",
        "base-300": "#20252E",
        "base-content": "#B2CCD6",
        "info": "#28ebff",
        "success": "#62efbd",
        "warning": "#efd057",
        "error": "#ffae9b"
      },
      nord: {
        "color-scheme": "light",
        "primary": "#5E81AC",
        "secondary": "#81A1C1",
        "accent": "#88C0D0",
        "neutral": "#4C566A",
        "neutral-content": "#D8DEE9",
        "base-100": "#ECEFF4",
        "base-200": "#E5E9F0",
        "base-300": "#D8DEE9",
        "base-content": "#2E3440",
        "info": "#B48EAD",
        "success": "#A3BE8C",
        "warning": "#EBCB8B",
        "error": "#BF616A",
        "--rounded-box": "0.4rem",
        "--rounded-btn": "0.2rem",
        "--rounded-badge": "0.4rem",
        "--tab-radius": "0.2rem"
      },
      sunset: {
        "color-scheme": "dark",
        "primary": "#FF865B",
        "secondary": "#FD6F9C",
        "accent": "#B387FA",
        "neutral": "oklch(26% 0.019 237.69)",
        "neutral-content": "oklch(70% 0.019 237.69)",
        "base-100": "oklch(22% 0.019 237.69)",
        "base-200": "oklch(20% 0.019 237.69)",
        "base-300": "oklch(18% 0.019 237.69)",
        "base-content": "#9fb9d0",
        "info": "#89e0eb",
        "success": "#addfad",
        "warning": "#f1c891",
        "error": "#ffbbbd",
        "--rounded-box": "1.2rem",
        "--rounded-btn": "0.8rem",
        "--rounded-badge": "0.4rem",
        "--tab-radius": "0.7rem"
      }
    };
  }
});

// node_modules/daisyui/src/theming/colorNames.js
var require_colorNames = __commonJS({
  "node_modules/daisyui/src/theming/colorNames.js"(exports2, module2) {
    module2.exports = {
      "primary": "--p",
      "primary-content": "--pc",
      "secondary": "--s",
      "secondary-content": "--sc",
      "accent": "--a",
      "accent-content": "--ac",
      "neutral": "--n",
      "neutral-content": "--nc",
      "base-100": "--b1",
      "base-200": "--b2",
      "base-300": "--b3",
      "base-content": "--bc",
      "info": "--in",
      "info-content": "--inc",
      "success": "--su",
      "success-content": "--suc",
      "warning": "--wa",
      "warning-content": "--wac",
      "error": "--er",
      "error-content": "--erc"
    };
  }
});

// node_modules/daisyui/src/theming/themeDefaults.js
var require_themeDefaults = __commonJS({
  "node_modules/daisyui/src/theming/themeDefaults.js"(exports2, module2) {
    module2.exports = {
      themeOrder: [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset"
      ],
      variables: {
        "--rounded-box": "1rem",
        "--rounded-btn": "0.5rem",
        "--rounded-badge": "1.9rem",
        "--animation-btn": "0.25s",
        "--animation-input": ".2s",
        "--btn-focus-scale": "0.95",
        "--border-btn": "1px",
        "--tab-border": "1px",
        "--tab-radius": "0.5rem"
      }
    };
  }
});

// node_modules/culori/bundled/culori.cjs
var require_culori = __commonJS({
  "node_modules/culori/bundled/culori.cjs"(exports2, module2) {
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);
    var src_exports = {};
    __export(src_exports, {
      a98: () => a98,
      average: () => average,
      averageAngle: () => averageAngle,
      averageNumber: () => averageNumber,
      blend: () => blend_default,
      blerp: () => blerp,
      clampChroma: () => clampChroma,
      clampGamut: () => clampGamut,
      clampRgb: () => clampRgb,
      colorsNamed: () => named_default,
      convertA98ToXyz65: () => convertA98ToXyz65_default,
      convertCubehelixToRgb: () => convertCubehelixToRgb_default,
      convertDlchToLab65: () => convertDlchToLab65_default,
      convertHsiToRgb: () => convertHsiToRgb,
      convertHslToRgb: () => convertHslToRgb,
      convertHsvToRgb: () => convertHsvToRgb,
      convertHwbToRgb: () => convertHwbToRgb,
      convertJabToJch: () => convertJabToJch_default,
      convertJabToRgb: () => convertJabToRgb_default,
      convertJabToXyz65: () => convertJabToXyz65_default,
      convertJchToJab: () => convertJchToJab_default,
      convertLab65ToDlch: () => convertLab65ToDlch_default,
      convertLab65ToRgb: () => convertLab65ToRgb_default,
      convertLab65ToXyz65: () => convertLab65ToXyz65_default,
      convertLabToLch: () => convertLabToLch_default,
      convertLabToRgb: () => convertLabToRgb_default,
      convertLabToXyz50: () => convertLabToXyz50_default,
      convertLchToLab: () => convertLchToLab_default,
      convertLchuvToLuv: () => convertLchuvToLuv_default,
      convertLrgbToOklab: () => convertLrgbToOklab_default,
      convertLrgbToRgb: () => convertLrgbToRgb_default,
      convertLuvToLchuv: () => convertLuvToLchuv_default,
      convertLuvToXyz50: () => convertLuvToXyz50_default,
      convertOkhslToOklab: () => convertOkhslToOklab,
      convertOkhsvToOklab: () => convertOkhsvToOklab,
      convertOklabToLrgb: () => convertOklabToLrgb_default,
      convertOklabToOkhsl: () => convertOklabToOkhsl,
      convertOklabToOkhsv: () => convertOklabToOkhsv,
      convertOklabToRgb: () => convertOklabToRgb_default,
      convertP3ToXyz65: () => convertP3ToXyz65_default,
      convertProphotoToXyz50: () => convertProphotoToXyz50_default,
      convertRec2020ToXyz65: () => convertRec2020ToXyz65_default,
      convertRgbToCubehelix: () => convertRgbToCubehelix_default,
      convertRgbToHsi: () => convertRgbToHsi,
      convertRgbToHsl: () => convertRgbToHsl,
      convertRgbToHsv: () => convertRgbToHsv,
      convertRgbToHwb: () => convertRgbToHwb,
      convertRgbToJab: () => convertRgbToJab_default,
      convertRgbToLab: () => convertRgbToLab_default,
      convertRgbToLab65: () => convertRgbToLab65_default,
      convertRgbToLrgb: () => convertRgbToLrgb_default,
      convertRgbToOklab: () => convertRgbToOklab_default,
      convertRgbToXyb: () => convertRgbToXyb_default,
      convertRgbToXyz50: () => convertRgbToXyz50_default,
      convertRgbToXyz65: () => convertRgbToXyz65_default,
      convertRgbToYiq: () => convertRgbToYiq_default,
      convertXybToRgb: () => convertXybToRgb_default,
      convertXyz50ToLab: () => convertXyz50ToLab_default,
      convertXyz50ToLuv: () => convertXyz50ToLuv_default,
      convertXyz50ToProphoto: () => convertXyz50ToProphoto_default,
      convertXyz50ToRgb: () => convertXyz50ToRgb_default,
      convertXyz50ToXyz65: () => convertXyz50ToXyz65_default,
      convertXyz65ToA98: () => convertXyz65ToA98_default,
      convertXyz65ToJab: () => convertXyz65ToJab_default,
      convertXyz65ToLab65: () => convertXyz65ToLab65_default,
      convertXyz65ToP3: () => convertXyz65ToP3_default,
      convertXyz65ToRec2020: () => convertXyz65ToRec2020_default,
      convertXyz65ToRgb: () => convertXyz65ToRgb_default,
      convertXyz65ToXyz50: () => convertXyz65ToXyz50_default,
      convertYiqToRgb: () => convertYiqToRgb_default,
      converter: () => converter_default,
      cubehelix: () => cubehelix,
      differenceCie76: () => differenceCie76,
      differenceCie94: () => differenceCie94,
      differenceCiede2000: () => differenceCiede2000,
      differenceCmc: () => differenceCmc,
      differenceEuclidean: () => differenceEuclidean,
      differenceHueChroma: () => differenceHueChroma,
      differenceHueNaive: () => differenceHueNaive,
      differenceHueSaturation: () => differenceHueSaturation,
      differenceHyab: () => differenceHyab,
      differenceKotsarenkoRamos: () => differenceKotsarenkoRamos,
      displayable: () => displayable,
      dlab: () => dlab,
      dlch: () => dlch,
      easingGamma: () => gamma_default,
      easingInOutSine: () => inOutSine_default,
      easingMidpoint: () => midpoint_default,
      easingSmootherstep: () => smootherstep_default,
      easingSmoothstep: () => easingSmoothstep,
      easingSmoothstepInverse: () => easingSmoothstepInverse,
      filterBrightness: () => filterBrightness,
      filterContrast: () => filterContrast,
      filterDeficiencyDeuter: () => filterDeficiencyDeuter,
      filterDeficiencyProt: () => filterDeficiencyProt,
      filterDeficiencyTrit: () => filterDeficiencyTrit,
      filterGrayscale: () => filterGrayscale,
      filterHueRotate: () => filterHueRotate,
      filterInvert: () => filterInvert,
      filterSaturate: () => filterSaturate,
      filterSepia: () => filterSepia,
      fixupAlpha: () => fixupAlpha,
      fixupHueDecreasing: () => fixupHueDecreasing,
      fixupHueIncreasing: () => fixupHueIncreasing,
      fixupHueLonger: () => fixupHueLonger,
      fixupHueShorter: () => fixupHueShorter,
      formatCss: () => formatCss,
      formatHex: () => formatHex,
      formatHex8: () => formatHex8,
      formatHsl: () => formatHsl,
      formatRgb: () => formatRgb,
      getMode: () => getMode,
      hsi: () => hsi,
      hsl: () => hsl,
      hsv: () => hsv,
      hwb: () => hwb,
      inGamut: () => inGamut,
      interpolate: () => interpolate,
      interpolateWith: () => interpolateWith,
      interpolateWithPremultipliedAlpha: () => interpolateWithPremultipliedAlpha,
      interpolatorLinear: () => interpolatorLinear,
      interpolatorPiecewise: () => interpolatorPiecewise,
      interpolatorSplineBasis: () => interpolatorSplineBasis,
      interpolatorSplineBasisClosed: () => interpolatorSplineBasisClosed,
      interpolatorSplineMonotone: () => interpolatorSplineMonotone,
      interpolatorSplineMonotone2: () => interpolatorSplineMonotone2,
      interpolatorSplineMonotoneClosed: () => interpolatorSplineMonotoneClosed,
      interpolatorSplineNatural: () => interpolatorSplineNatural,
      interpolatorSplineNaturalClosed: () => interpolatorSplineNaturalClosed,
      jab: () => jab,
      jch: () => jch,
      lab: () => lab,
      lab65: () => lab65,
      lch: () => lch,
      lch65: () => lch65,
      lchuv: () => lchuv,
      lerp: () => lerp,
      lrgb: () => lrgb,
      luv: () => luv,
      mapAlphaDivide: () => mapAlphaDivide,
      mapAlphaMultiply: () => mapAlphaMultiply,
      mapTransferGamma: () => mapTransferGamma,
      mapTransferLinear: () => mapTransferLinear,
      mapper: () => mapper,
      modeA98: () => definition_default2,
      modeCubehelix: () => definition_default3,
      modeDlab: () => definition_default4,
      modeDlch: () => definition_default5,
      modeHsi: () => definition_default6,
      modeHsl: () => definition_default7,
      modeHsv: () => definition_default8,
      modeHwb: () => definition_default9,
      modeJab: () => definition_default10,
      modeJch: () => definition_default11,
      modeLab: () => definition_default12,
      modeLab65: () => definition_default13,
      modeLch: () => definition_default14,
      modeLch65: () => definition_default15,
      modeLchuv: () => definition_default16,
      modeLrgb: () => definition_default17,
      modeLuv: () => definition_default18,
      modeOkhsl: () => modeOkhsl_default,
      modeOkhsv: () => modeOkhsv_default,
      modeOklab: () => definition_default19,
      modeOklch: () => definition_default20,
      modeP3: () => definition_default21,
      modeProphoto: () => definition_default22,
      modeRec2020: () => definition_default23,
      modeRgb: () => definition_default,
      modeXyb: () => definition_default24,
      modeXyz50: () => definition_default25,
      modeXyz65: () => definition_default26,
      modeYiq: () => definition_default27,
      nearest: () => nearest_default,
      okhsl: () => okhsl,
      okhsv: () => okhsv,
      oklab: () => oklab,
      oklch: () => oklch,
      p3: () => p3,
      parse: () => parse_default,
      parseHex: () => parseHex_default,
      parseHsl: () => parseHsl_default,
      parseHslLegacy: () => parseHslLegacy_default,
      parseHwb: () => parseHwb_default,
      parseLab: () => parseLab_default,
      parseLch: () => parseLch_default,
      parseNamed: () => parseNamed_default,
      parseOklab: () => parseOklab_default,
      parseOklch: () => parseOklch_default,
      parseRgb: () => parseRgb_default,
      parseRgbLegacy: () => parseRgbLegacy_default,
      parseTransparent: () => parseTransparent_default,
      prophoto: () => prophoto,
      random: () => random_default,
      rec2020: () => rec2020,
      removeParser: () => removeParser,
      rgb: () => rgb3,
      round: () => round_default,
      samples: () => samples_default,
      serializeHex: () => serializeHex,
      serializeHex8: () => serializeHex8,
      serializeHsl: () => serializeHsl,
      serializeRgb: () => serializeRgb,
      toGamut: () => toGamut,
      trilerp: () => trilerp,
      unlerp: () => unlerp,
      useMode: () => useMode,
      useParser: () => useParser,
      wcagContrast: () => contrast,
      wcagLuminance: () => luminance,
      xyb: () => xyb,
      xyz50: () => xyz50,
      xyz65: () => xyz65,
      yiq: () => yiq
    });
    module2.exports = __toCommonJS(src_exports);
    var parseNumber = (color, len) => {
      if (typeof color !== "number")
        return;
      if (len === 3) {
        return {
          mode: "rgb",
          r: (color >> 8 & 15 | color >> 4 & 240) / 255,
          g: (color >> 4 & 15 | color & 240) / 255,
          b: (color & 15 | color << 4 & 240) / 255
        };
      }
      if (len === 4) {
        return {
          mode: "rgb",
          r: (color >> 12 & 15 | color >> 8 & 240) / 255,
          g: (color >> 8 & 15 | color >> 4 & 240) / 255,
          b: (color >> 4 & 15 | color & 240) / 255,
          alpha: (color & 15 | color << 4 & 240) / 255
        };
      }
      if (len === 6) {
        return {
          mode: "rgb",
          r: (color >> 16 & 255) / 255,
          g: (color >> 8 & 255) / 255,
          b: (color & 255) / 255
        };
      }
      if (len === 8) {
        return {
          mode: "rgb",
          r: (color >> 24 & 255) / 255,
          g: (color >> 16 & 255) / 255,
          b: (color >> 8 & 255) / 255,
          alpha: (color & 255) / 255
        };
      }
    };
    var parseNumber_default = parseNumber;
    var named = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      // Added in CSS Colors Level 4:
      // https://drafts.csswg.org/css-color/#changes-from-3
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };
    var named_default = named;
    var parseNamed = (color) => {
      return parseNumber_default(named_default[color.toLowerCase()], 6);
    };
    var parseNamed_default = parseNamed;
    var hex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
    var parseHex = (color) => {
      let match;
      return (match = color.match(hex)) ? parseNumber_default(parseInt(match[1], 16), match[1].length) : void 0;
    };
    var parseHex_default = parseHex;
    var num = "([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)";
    var num_none = `(?:${num}|none)`;
    var per = `${num}%`;
    var per_none = `(?:${num}%|none)`;
    var num_per = `(?:${num}%|${num})`;
    var num_per_none = `(?:${num}%|${num}|none)`;
    var hue = `(?:${num}(deg|grad|rad|turn)|${num})`;
    var hue_none = `(?:${num}(deg|grad|rad|turn)|${num}|none)`;
    var c = `\\s*,\\s*`;
    var rx_num_per_none = new RegExp("^" + num_per_none + "$");
    var rgb_num_old = new RegExp(
      `^rgba?\\(\\s*${num}${c}${num}${c}${num}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
    );
    var rgb_per_old = new RegExp(
      `^rgba?\\(\\s*${per}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
    );
    var parseRgbLegacy = (color) => {
      let res = { mode: "rgb" };
      let match;
      if (match = color.match(rgb_num_old)) {
        if (match[1] !== void 0) {
          res.r = match[1] / 255;
        }
        if (match[2] !== void 0) {
          res.g = match[2] / 255;
        }
        if (match[3] !== void 0) {
          res.b = match[3] / 255;
        }
      } else if (match = color.match(rgb_per_old)) {
        if (match[1] !== void 0) {
          res.r = match[1] / 100;
        }
        if (match[2] !== void 0) {
          res.g = match[2] / 100;
        }
        if (match[3] !== void 0) {
          res.b = match[3] / 100;
        }
      } else {
        return void 0;
      }
      if (match[4] !== void 0) {
        res.alpha = match[4] / 100;
      } else if (match[5] !== void 0) {
        res.alpha = +match[5];
      }
      return res;
    };
    var parseRgbLegacy_default = parseRgbLegacy;
    var prepare = (color, mode) => color === void 0 ? void 0 : typeof color !== "object" ? parse_default(color) : color.mode !== void 0 ? color : mode ? { ...color, mode } : void 0;
    var prepare_default = prepare;
    var converter = (target_mode = "rgb") => (color) => (color = prepare_default(color, target_mode)) !== void 0 ? (
      // if the color's mode corresponds to our target mode
      color.mode === target_mode ? (
        // then just return the color
        color
      ) : (
        // otherwise check to see if we have a dedicated
        // converter for the target mode
        converters[color.mode][target_mode] ? (
          // and return its result...
          converters[color.mode][target_mode](color)
        ) : (
          // ...otherwise pass through RGB as an intermediary step.
          // if the target mode is RGB...
          target_mode === "rgb" ? (
            // just return the RGB
            converters[color.mode].rgb(color)
          ) : (
            // otherwise convert color.mode -> RGB -> target_mode
            converters.rgb[target_mode](converters[color.mode].rgb(color))
          )
        )
      )
    ) : void 0;
    var converter_default = converter;
    var converters = {};
    var modes = {};
    var parsers = [];
    var colorProfiles = {};
    var identity = (v) => v;
    var useMode = (definition28) => {
      converters[definition28.mode] = {
        ...converters[definition28.mode],
        ...definition28.toMode
      };
      Object.keys(definition28.fromMode || {}).forEach((k4) => {
        if (!converters[k4]) {
          converters[k4] = {};
        }
        converters[k4][definition28.mode] = definition28.fromMode[k4];
      });
      if (!definition28.ranges) {
        definition28.ranges = {};
      }
      if (!definition28.difference) {
        definition28.difference = {};
      }
      definition28.channels.forEach((channel) => {
        if (definition28.ranges[channel] === void 0) {
          definition28.ranges[channel] = [0, 1];
        }
        if (!definition28.interpolate[channel]) {
          throw new Error(`Missing interpolator for: ${channel}`);
        }
        if (typeof definition28.interpolate[channel] === "function") {
          definition28.interpolate[channel] = {
            use: definition28.interpolate[channel]
          };
        }
        if (!definition28.interpolate[channel].fixup) {
          definition28.interpolate[channel].fixup = identity;
        }
      });
      modes[definition28.mode] = definition28;
      (definition28.parse || []).forEach((parser) => {
        useParser(parser, definition28.mode);
      });
      return converter_default(definition28.mode);
    };
    var getMode = (mode) => modes[mode];
    var useParser = (parser, mode) => {
      if (typeof parser === "string") {
        if (!mode) {
          throw new Error(`'mode' required when 'parser' is a string`);
        }
        colorProfiles[parser] = mode;
      } else if (typeof parser === "function") {
        if (parsers.indexOf(parser) < 0) {
          parsers.push(parser);
        }
      }
    };
    var removeParser = (parser) => {
      if (typeof parser === "string") {
        delete colorProfiles[parser];
      } else if (typeof parser === "function") {
        const idx = parsers.indexOf(parser);
        if (idx > 0) {
          parsers.splice(idx, 1);
        }
      }
    };
    var IdentStartCodePoint = /[^\x00-\x7F]|[a-zA-Z_]/;
    var IdentCodePoint = /[^\x00-\x7F]|[-\w]/;
    var Tok = {
      Function: "function",
      Ident: "ident",
      Number: "number",
      Percentage: "percentage",
      ParenClose: ")",
      None: "none",
      Hue: "hue",
      Alpha: "alpha"
    };
    var _i = 0;
    function is_num(chars) {
      let ch = chars[_i];
      let ch1 = chars[_i + 1];
      if (ch === "-" || ch === "+") {
        return /\d/.test(ch1) || ch1 === "." && /\d/.test(chars[_i + 2]);
      }
      if (ch === ".") {
        return /\d/.test(ch1);
      }
      return /\d/.test(ch);
    }
    function is_ident(chars) {
      if (_i >= chars.length) {
        return false;
      }
      let ch = chars[_i];
      if (IdentStartCodePoint.test(ch)) {
        return true;
      }
      if (ch === "-") {
        if (chars.length - _i < 2) {
          return false;
        }
        let ch1 = chars[_i + 1];
        if (ch1 === "-" || IdentStartCodePoint.test(ch1)) {
          return true;
        }
        return false;
      }
      return false;
    }
    var huenits = {
      deg: 1,
      rad: 180 / Math.PI,
      grad: 9 / 10,
      turn: 360
    };
    function num2(chars) {
      let value = "";
      if (chars[_i] === "-" || chars[_i] === "+") {
        value += chars[_i++];
      }
      value += digits(chars);
      if (chars[_i] === "." && /\d/.test(chars[_i + 1])) {
        value += chars[_i++] + digits(chars);
      }
      if (chars[_i] === "e" || chars[_i] === "E") {
        if ((chars[_i + 1] === "-" || chars[_i + 1] === "+") && /\d/.test(chars[_i + 2])) {
          value += chars[_i++] + chars[_i++] + digits(chars);
        } else if (/\d/.test(chars[_i + 1])) {
          value += chars[_i++] + digits(chars);
        }
      }
      if (is_ident(chars)) {
        let id = ident(chars);
        if (id === "deg" || id === "rad" || id === "turn" || id === "grad") {
          return { type: Tok.Hue, value: value * huenits[id] };
        }
        return void 0;
      }
      if (chars[_i] === "%") {
        _i++;
        return { type: Tok.Percentage, value: +value };
      }
      return { type: Tok.Number, value: +value };
    }
    function digits(chars) {
      let v = "";
      while (/\d/.test(chars[_i])) {
        v += chars[_i++];
      }
      return v;
    }
    function ident(chars) {
      let v = "";
      while (_i < chars.length && IdentCodePoint.test(chars[_i])) {
        v += chars[_i++];
      }
      return v;
    }
    function identlike(chars) {
      let v = ident(chars);
      if (chars[_i] === "(") {
        _i++;
        return { type: Tok.Function, value: v };
      }
      if (v === "none") {
        return { type: Tok.None, value: void 0 };
      }
      return { type: Tok.Ident, value: v };
    }
    function tokenize(str = "") {
      let chars = str.trim();
      let tokens = [];
      let ch;
      _i = 0;
      while (_i < chars.length) {
        ch = chars[_i++];
        if (ch === "\n" || ch === "	" || ch === " ") {
          while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
            _i++;
          }
          continue;
        }
        if (ch === ",") {
          return void 0;
        }
        if (ch === ")") {
          tokens.push({ type: Tok.ParenClose });
          continue;
        }
        if (ch === "+") {
          _i--;
          if (is_num(chars)) {
            tokens.push(num2(chars));
            continue;
          }
          return void 0;
        }
        if (ch === "-") {
          _i--;
          if (is_num(chars)) {
            tokens.push(num2(chars));
            continue;
          }
          if (is_ident(chars)) {
            tokens.push({ type: Tok.Ident, value: ident(chars) });
            continue;
          }
          return void 0;
        }
        if (ch === ".") {
          _i--;
          if (is_num(chars)) {
            tokens.push(num2(chars));
            continue;
          }
          return void 0;
        }
        if (ch === "/") {
          while (_i < chars.length && (chars[_i] === "\n" || chars[_i] === "	" || chars[_i] === " ")) {
            _i++;
          }
          let alpha;
          if (is_num(chars)) {
            alpha = num2(chars);
            if (alpha.type !== Tok.Hue) {
              tokens.push({ type: Tok.Alpha, value: alpha });
              continue;
            }
          }
          if (is_ident(chars)) {
            if (ident(chars) === "none") {
              tokens.push({
                type: Tok.Alpha,
                value: { type: Tok.None, value: void 0 }
              });
              continue;
            }
          }
          return void 0;
        }
        if (/\d/.test(ch)) {
          _i--;
          tokens.push(num2(chars));
          continue;
        }
        if (IdentStartCodePoint.test(ch)) {
          _i--;
          tokens.push(identlike(chars));
          continue;
        }
        return void 0;
      }
      return tokens;
    }
    function parseColorSyntax(tokens) {
      tokens._i = 0;
      let token = tokens[tokens._i++];
      if (!token || token.type !== Tok.Function || token.value !== "color") {
        return void 0;
      }
      token = tokens[tokens._i++];
      if (token.type !== Tok.Ident) {
        return void 0;
      }
      const mode = colorProfiles[token.value];
      if (!mode) {
        return void 0;
      }
      const res = { mode };
      const coords = consumeCoords(tokens, false);
      if (!coords) {
        return void 0;
      }
      const channels = getMode(mode).channels;
      for (let ii = 0, c4; ii < channels.length; ii++) {
        c4 = coords[ii];
        if (c4.type !== Tok.None) {
          res[channels[ii]] = c4.type === Tok.Number ? c4.value : c4.value / 100;
        }
      }
      return res;
    }
    function consumeCoords(tokens, includeHue) {
      const coords = [];
      let token;
      while (tokens._i < tokens.length) {
        token = tokens[tokens._i++];
        if (token.type === Tok.None || token.type === Tok.Number || token.type === Tok.Alpha || token.type === Tok.Percentage || includeHue && token.type === Tok.Hue) {
          coords.push(token);
          continue;
        }
        if (token.type === Tok.ParenClose) {
          if (tokens._i < tokens.length) {
            return void 0;
          }
          continue;
        }
        return void 0;
      }
      if (coords.length < 3 || coords.length > 4) {
        return void 0;
      }
      if (coords.length === 4) {
        if (coords[3].type !== Tok.Alpha) {
          return void 0;
        }
        coords[3] = coords[3].value;
      }
      if (coords.length === 3) {
        coords.push({ type: Tok.None, value: void 0 });
      }
      return coords.every((c4) => c4.type !== Tok.Alpha) ? coords : void 0;
    }
    function parseModernSyntax(tokens, includeHue) {
      tokens._i = 0;
      let token = tokens[tokens._i++];
      if (!token || token.type !== Tok.Function) {
        return void 0;
      }
      let coords = consumeCoords(tokens, includeHue);
      if (!coords) {
        return void 0;
      }
      coords.unshift(token.value);
      return coords;
    }
    var parse = (color) => {
      if (typeof color !== "string") {
        return void 0;
      }
      const tokens = tokenize(color);
      const parsed = tokens ? parseModernSyntax(tokens, true) : void 0;
      let result = void 0;
      let i = 0;
      let len = parsers.length;
      while (i < len) {
        if ((result = parsers[i++](color, parsed)) !== void 0) {
          return result;
        }
      }
      return tokens ? parseColorSyntax(tokens) : void 0;
    };
    var parse_default = parse;
    function parseRgb(color, parsed) {
      if (!parsed || parsed[0] !== "rgb" && parsed[0] !== "rgba") {
        return void 0;
      }
      const res = { mode: "rgb" };
      const [, r2, g, b, alpha] = parsed;
      if (r2.type === Tok.Hue || g.type === Tok.Hue || b.type === Tok.Hue) {
        return void 0;
      }
      if (r2.type !== Tok.None) {
        res.r = r2.type === Tok.Number ? r2.value / 255 : r2.value / 100;
      }
      if (g.type !== Tok.None) {
        res.g = g.type === Tok.Number ? g.value / 255 : g.value / 100;
      }
      if (b.type !== Tok.None) {
        res.b = b.type === Tok.Number ? b.value / 255 : b.value / 100;
      }
      if (alpha.type !== Tok.None) {
        res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
      }
      return res;
    }
    var parseRgb_default = parseRgb;
    var parseTransparent = (c4) => c4 === "transparent" ? { mode: "rgb", r: 0, g: 0, b: 0, alpha: 0 } : void 0;
    var parseTransparent_default = parseTransparent;
    var lerp = (a, b, t) => a + t * (b - a);
    var unlerp = (a, b, v) => (v - a) / (b - a);
    var blerp = (a00, a01, a10, a11, tx, ty) => {
      return lerp(lerp(a00, a01, tx), lerp(a10, a11, tx), ty);
    };
    var trilerp = (a000, a010, a100, a110, a001, a011, a101, a111, tx, ty, tz) => {
      return lerp(
        blerp(a000, a010, a100, a110, tx, ty),
        blerp(a001, a011, a101, a111, tx, ty),
        tz
      );
    };
    var get_classes = (arr) => {
      let classes = [];
      for (let i = 0; i < arr.length - 1; i++) {
        let a = arr[i];
        let b = arr[i + 1];
        if (a === void 0 && b === void 0) {
          classes.push(void 0);
        } else if (a !== void 0 && b !== void 0) {
          classes.push([a, b]);
        } else {
          classes.push(a !== void 0 ? [a, a] : [b, b]);
        }
      }
      return classes;
    };
    var interpolatorPiecewise = (interpolator2) => (arr) => {
      let classes = get_classes(arr);
      return (t) => {
        let cls = t * classes.length;
        let idx = t >= 1 ? classes.length - 1 : Math.max(Math.floor(cls), 0);
        let pair = classes[idx];
        return pair === void 0 ? void 0 : interpolator2(pair[0], pair[1], cls - idx);
      };
    };
    var interpolatorLinear = interpolatorPiecewise(lerp);
    var fixupAlpha = (arr) => {
      let some_defined = false;
      let res = arr.map((v) => {
        if (v !== void 0) {
          some_defined = true;
          return v;
        }
        return 1;
      });
      return some_defined ? res : arr;
    };
    var definition = {
      mode: "rgb",
      channels: ["r", "g", "b", "alpha"],
      parse: [
        parseRgb_default,
        parseHex_default,
        parseRgbLegacy_default,
        parseNamed_default,
        parseTransparent_default,
        "srgb"
      ],
      serialize: "srgb",
      interpolate: {
        r: interpolatorLinear,
        g: interpolatorLinear,
        b: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      gamut: true
    };
    var definition_default = definition;
    var linearize = (v) => Math.pow(Math.abs(v), 563 / 256) * Math.sign(v);
    var convertA98ToXyz65 = (a982) => {
      let r2 = linearize(a982.r);
      let g = linearize(a982.g);
      let b = linearize(a982.b);
      let res = {
        mode: "xyz65",
        x: 0.5766690429101305 * r2 + 0.1855582379065463 * g + 0.1882286462349947 * b,
        y: 0.297344975250536 * r2 + 0.6273635662554661 * g + 0.0752914584939979 * b,
        z: 0.0270313613864123 * r2 + 0.0706888525358272 * g + 0.9913375368376386 * b
      };
      if (a982.alpha !== void 0) {
        res.alpha = a982.alpha;
      }
      return res;
    };
    var convertA98ToXyz65_default = convertA98ToXyz65;
    var gamma = (v) => Math.pow(Math.abs(v), 256 / 563) * Math.sign(v);
    var convertXyz65ToA98 = ({ x, y, z, alpha }) => {
      let res = {
        mode: "a98",
        r: gamma(
          x * 2.0415879038107465 - y * 0.5650069742788597 - 0.3447313507783297 * z
        ),
        g: gamma(
          x * -0.9692436362808798 + y * 1.8759675015077206 + 0.0415550574071756 * z
        ),
        b: gamma(
          x * 0.0134442806320312 - y * 0.1183623922310184 + 1.0151749943912058 * z
        )
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz65ToA98_default = convertXyz65ToA98;
    var fn = (c4) => {
      const abs3 = Math.abs(c4);
      if (abs3 <= 0.04045) {
        return c4 / 12.92;
      }
      return (Math.sign(c4) || 1) * Math.pow((abs3 + 0.055) / 1.055, 2.4);
    };
    var convertRgbToLrgb = ({ r: r2, g, b, alpha }) => {
      let res = {
        mode: "lrgb",
        r: fn(r2),
        g: fn(g),
        b: fn(b)
      };
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertRgbToLrgb_default = convertRgbToLrgb;
    var convertRgbToXyz65 = (rgb4) => {
      let { r: r2, g, b, alpha } = convertRgbToLrgb_default(rgb4);
      let res = {
        mode: "xyz65",
        x: 0.4123907992659593 * r2 + 0.357584339383878 * g + 0.1804807884018343 * b,
        y: 0.2126390058715102 * r2 + 0.715168678767756 * g + 0.0721923153607337 * b,
        z: 0.0193308187155918 * r2 + 0.119194779794626 * g + 0.9505321522496607 * b
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertRgbToXyz65_default = convertRgbToXyz65;
    var fn2 = (c4) => {
      const abs3 = Math.abs(c4);
      if (abs3 > 31308e-7) {
        return (Math.sign(c4) || 1) * (1.055 * Math.pow(abs3, 1 / 2.4) - 0.055);
      }
      return c4 * 12.92;
    };
    var convertLrgbToRgb = ({ r: r2, g, b, alpha }, mode = "rgb") => {
      let res = {
        mode,
        r: fn2(r2),
        g: fn2(g),
        b: fn2(b)
      };
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertLrgbToRgb_default = convertLrgbToRgb;
    var convertXyz65ToRgb = ({ x, y, z, alpha }) => {
      let res = convertLrgbToRgb_default({
        r: x * 3.2409699419045226 - y * 1.537383177570094 - 0.4986107602930034 * z,
        g: x * -0.9692436362808796 + y * 1.8759675015077204 + 0.0415550574071756 * z,
        b: x * 0.0556300796969936 - y * 0.2039769588889765 + 1.0569715142428784 * z
      });
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz65ToRgb_default = convertXyz65ToRgb;
    var definition2 = {
      ...definition_default,
      mode: "a98",
      parse: ["a98-rgb"],
      serialize: "a98-rgb",
      fromMode: {
        rgb: (color) => convertXyz65ToA98_default(convertRgbToXyz65_default(color)),
        xyz65: convertXyz65ToA98_default
      },
      toMode: {
        rgb: (color) => convertXyz65ToRgb_default(convertA98ToXyz65_default(color)),
        xyz65: convertA98ToXyz65_default
      }
    };
    var definition_default2 = definition2;
    var normalizeHue = (hue3) => (hue3 = hue3 % 360) < 0 ? hue3 + 360 : hue3;
    var normalizeHue_default = normalizeHue;
    var hue2 = (hues, fn5) => {
      return hues.map((hue3, idx, arr) => {
        if (hue3 === void 0) {
          return hue3;
        }
        let normalized = normalizeHue_default(hue3);
        if (idx === 0 || hues[idx - 1] === void 0) {
          return normalized;
        }
        return fn5(normalized - normalizeHue_default(arr[idx - 1]));
      }).reduce((acc, curr) => {
        if (!acc.length || curr === void 0 || acc[acc.length - 1] === void 0) {
          acc.push(curr);
          return acc;
        }
        acc.push(curr + acc[acc.length - 1]);
        return acc;
      }, []);
    };
    var fixupHueShorter = (arr) => hue2(arr, (d) => Math.abs(d) <= 180 ? d : d - 360 * Math.sign(d));
    var fixupHueLonger = (arr) => hue2(arr, (d) => Math.abs(d) >= 180 || d === 0 ? d : d - 360 * Math.sign(d));
    var fixupHueIncreasing = (arr) => hue2(arr, (d) => d >= 0 ? d : d + 360);
    var fixupHueDecreasing = (arr) => hue2(arr, (d) => d <= 0 ? d : d - 360);
    var M = [-0.14861, 1.78277, -0.29227, -0.90649, 1.97294, 0];
    var degToRad = Math.PI / 180;
    var radToDeg = 180 / Math.PI;
    var DE = M[3] * M[4];
    var BE = M[1] * M[4];
    var BCAD = M[1] * M[2] - M[0] * M[3];
    var convertRgbToCubehelix = ({ r: r2, g, b, alpha }) => {
      let l = (BCAD * b + r2 * DE - g * BE) / (BCAD + DE - BE);
      let x = b - l;
      let y = (M[4] * (g - l) - M[2] * x) / M[3];
      let res = {
        mode: "cubehelix",
        l,
        s: l === 0 || l === 1 ? void 0 : Math.sqrt(x * x + y * y) / (M[4] * l * (1 - l))
      };
      if (res.s)
        res.h = Math.atan2(y, x) * radToDeg - 120;
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertRgbToCubehelix_default = convertRgbToCubehelix;
    var convertCubehelixToRgb = ({ h, s, l, alpha }) => {
      let res = { mode: "rgb" };
      h = (h === void 0 ? 0 : h + 120) * degToRad;
      let amp = s === void 0 ? 0 : s * l * (1 - l);
      let cosh = Math.cos(h);
      let sinh = Math.sin(h);
      res.r = l + amp * (M[0] * cosh + M[1] * sinh);
      res.g = l + amp * (M[2] * cosh + M[3] * sinh);
      res.b = l + amp * (M[4] * cosh + M[5] * sinh);
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertCubehelixToRgb_default = convertCubehelixToRgb;
    var differenceHueSaturation = (std, smp) => {
      if (std.h === void 0 || smp.h === void 0 || !std.s || !smp.s) {
        return 0;
      }
      let std_h = normalizeHue_default(std.h);
      let smp_h = normalizeHue_default(smp.h);
      let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
      return 2 * Math.sqrt(std.s * smp.s) * dH;
    };
    var differenceHueNaive = (std, smp) => {
      if (std.h === void 0 || smp.h === void 0) {
        return 0;
      }
      let std_h = normalizeHue_default(std.h);
      let smp_h = normalizeHue_default(smp.h);
      if (Math.abs(smp_h - std_h) > 180) {
        return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
      }
      return smp_h - std_h;
    };
    var differenceHueChroma = (std, smp) => {
      if (std.h === void 0 || smp.h === void 0 || !std.c || !smp.c) {
        return 0;
      }
      let std_h = normalizeHue_default(std.h);
      let smp_h = normalizeHue_default(smp.h);
      let dH = Math.sin((smp_h - std_h + 360) / 2 * Math.PI / 180);
      return 2 * Math.sqrt(std.c * smp.c) * dH;
    };
    var differenceEuclidean = (mode = "rgb", weights = [1, 1, 1, 0]) => {
      let def = getMode(mode);
      let channels = def.channels;
      let diffs = def.difference;
      let conv = converter_default(mode);
      return (std, smp) => {
        let ConvStd = conv(std);
        let ConvSmp = conv(smp);
        return Math.sqrt(
          channels.reduce((sum, k4, idx) => {
            let delta = diffs[k4] ? diffs[k4](ConvStd, ConvSmp) : ConvStd[k4] - ConvSmp[k4];
            return sum + (weights[idx] || 0) * Math.pow(isNaN(delta) ? 0 : delta, 2);
          }, 0)
        );
      };
    };
    var differenceCie76 = () => differenceEuclidean("lab65");
    var differenceCie94 = (kL = 1, K1 = 0.045, K2 = 0.015) => {
      let lab2 = converter_default("lab65");
      return (std, smp) => {
        let LabStd = lab2(std);
        let LabSmp = lab2(smp);
        let lStd = LabStd.l;
        let aStd = LabStd.a;
        let bStd = LabStd.b;
        let cStd = Math.sqrt(aStd * aStd + bStd * bStd);
        let lSmp = LabSmp.l;
        let aSmp = LabSmp.a;
        let bSmp = LabSmp.b;
        let cSmp = Math.sqrt(aSmp * aSmp + bSmp * bSmp);
        let dL2 = Math.pow(lStd - lSmp, 2);
        let dC2 = Math.pow(cStd - cSmp, 2);
        let dH2 = Math.pow(aStd - aSmp, 2) + Math.pow(bStd - bSmp, 2) - dC2;
        return Math.sqrt(
          dL2 / Math.pow(kL, 2) + dC2 / Math.pow(1 + K1 * cStd, 2) + dH2 / Math.pow(1 + K2 * cStd, 2)
        );
      };
    };
    var differenceCiede2000 = (Kl = 1, Kc = 1, Kh = 1) => {
      let lab2 = converter_default("lab65");
      return (std, smp) => {
        let LabStd = lab2(std);
        let LabSmp = lab2(smp);
        let lStd = LabStd.l;
        let aStd = LabStd.a;
        let bStd = LabStd.b;
        let cStd = Math.sqrt(aStd * aStd + bStd * bStd);
        let lSmp = LabSmp.l;
        let aSmp = LabSmp.a;
        let bSmp = LabSmp.b;
        let cSmp = Math.sqrt(aSmp * aSmp + bSmp * bSmp);
        let cAvg = (cStd + cSmp) / 2;
        let G = 0.5 * (1 - Math.sqrt(
          Math.pow(cAvg, 7) / (Math.pow(cAvg, 7) + Math.pow(25, 7))
        ));
        let apStd = aStd * (1 + G);
        let apSmp = aSmp * (1 + G);
        let cpStd = Math.sqrt(apStd * apStd + bStd * bStd);
        let cpSmp = Math.sqrt(apSmp * apSmp + bSmp * bSmp);
        let hpStd = Math.abs(apStd) + Math.abs(bStd) === 0 ? 0 : Math.atan2(bStd, apStd);
        hpStd += (hpStd < 0) * 2 * Math.PI;
        let hpSmp = Math.abs(apSmp) + Math.abs(bSmp) === 0 ? 0 : Math.atan2(bSmp, apSmp);
        hpSmp += (hpSmp < 0) * 2 * Math.PI;
        let dL = lSmp - lStd;
        let dC = cpSmp - cpStd;
        let dhp = cpStd * cpSmp === 0 ? 0 : hpSmp - hpStd;
        dhp -= (dhp > Math.PI) * 2 * Math.PI;
        dhp += (dhp < -Math.PI) * 2 * Math.PI;
        let dH = 2 * Math.sqrt(cpStd * cpSmp) * Math.sin(dhp / 2);
        let Lp = (lStd + lSmp) / 2;
        let Cp = (cpStd + cpSmp) / 2;
        let hp;
        if (cpStd * cpSmp === 0) {
          hp = hpStd + hpSmp;
        } else {
          hp = (hpStd + hpSmp) / 2;
          hp -= (Math.abs(hpStd - hpSmp) > Math.PI) * Math.PI;
          hp += (hp < 0) * 2 * Math.PI;
        }
        let Lpm50 = Math.pow(Lp - 50, 2);
        let T = 1 - 0.17 * Math.cos(hp - Math.PI / 6) + 0.24 * Math.cos(2 * hp) + 0.32 * Math.cos(3 * hp + Math.PI / 30) - 0.2 * Math.cos(4 * hp - 63 * Math.PI / 180);
        let Sl = 1 + 0.015 * Lpm50 / Math.sqrt(20 + Lpm50);
        let Sc = 1 + 0.045 * Cp;
        let Sh = 1 + 0.015 * Cp * T;
        let deltaTheta = 30 * Math.PI / 180 * Math.exp(-1 * Math.pow((180 / Math.PI * hp - 275) / 25, 2));
        let Rc = 2 * Math.sqrt(Math.pow(Cp, 7) / (Math.pow(Cp, 7) + Math.pow(25, 7)));
        let Rt = -1 * Math.sin(2 * deltaTheta) * Rc;
        return Math.sqrt(
          Math.pow(dL / (Kl * Sl), 2) + Math.pow(dC / (Kc * Sc), 2) + Math.pow(dH / (Kh * Sh), 2) + Rt * dC / (Kc * Sc) * dH / (Kh * Sh)
        );
      };
    };
    var differenceCmc = (l = 1, c4 = 1) => {
      let lab2 = converter_default("lab65");
      return (std, smp) => {
        let LabStd = lab2(std);
        let lStd = LabStd.l;
        let aStd = LabStd.a;
        let bStd = LabStd.b;
        let cStd = Math.sqrt(aStd * aStd + bStd * bStd);
        let hStd = Math.atan2(bStd, aStd);
        hStd = hStd + 2 * Math.PI * (hStd < 0);
        let LabSmp = lab2(smp);
        let lSmp = LabSmp.l;
        let aSmp = LabSmp.a;
        let bSmp = LabSmp.b;
        let cSmp = Math.sqrt(aSmp * aSmp + bSmp * bSmp);
        let dL2 = Math.pow(lStd - lSmp, 2);
        let dC2 = Math.pow(cStd - cSmp, 2);
        let dH2 = Math.pow(aStd - aSmp, 2) + Math.pow(bStd - bSmp, 2) - dC2;
        let F = Math.sqrt(Math.pow(cStd, 4) / (Math.pow(cStd, 4) + 1900));
        let T = hStd >= 164 / 180 * Math.PI && hStd <= 345 / 180 * Math.PI ? 0.56 + Math.abs(0.2 * Math.cos(hStd + 168 / 180 * Math.PI)) : 0.36 + Math.abs(0.4 * Math.cos(hStd + 35 / 180 * Math.PI));
        let Sl = lStd < 16 ? 0.511 : 0.040975 * lStd / (1 + 0.01765 * lStd);
        let Sc = 0.0638 * cStd / (1 + 0.0131 * cStd) + 0.638;
        let Sh = Sc * (F * T + 1 - F);
        return Math.sqrt(
          dL2 / Math.pow(l * Sl, 2) + dC2 / Math.pow(c4 * Sc, 2) + dH2 / Math.pow(Sh, 2)
        );
      };
    };
    var differenceHyab = () => {
      let lab2 = converter_default("lab65");
      return (std, smp) => {
        let LabStd = lab2(std);
        let LabSmp = lab2(smp);
        let dL = LabStd.l - LabSmp.l;
        let dA = LabStd.a - LabSmp.a;
        let dB = LabStd.b - LabSmp.b;
        return Math.abs(dL) + Math.sqrt(dA * dA + dB * dB);
      };
    };
    var differenceKotsarenkoRamos = () => differenceEuclidean("yiq", [0.5053, 0.299, 0.1957]);
    var averageAngle = (val) => {
      let sum = val.reduce(
        (sum2, val2) => {
          if (val2 !== void 0) {
            let rad = val2 * Math.PI / 180;
            sum2.sin += Math.sin(rad);
            sum2.cos += Math.cos(rad);
          }
          return sum2;
        },
        { sin: 0, cos: 0 }
      );
      return Math.atan2(sum.sin, sum.cos) * 180 / Math.PI;
    };
    var averageNumber = (val) => {
      let a = val.filter((v) => v !== void 0);
      return a.length ? a.reduce((sum, v) => sum + v, 0) / a.length : void 0;
    };
    var isfn = (o) => typeof o === "function";
    function average(colors, mode = "rgb", overrides) {
      let def = getMode(mode);
      let cc = colors.map(converter_default(mode));
      return def.channels.reduce(
        (res, ch) => {
          let arr = cc.map((c4) => c4[ch]).filter((val) => val !== void 0);
          if (arr.length) {
            let fn5;
            if (isfn(overrides)) {
              fn5 = overrides;
            } else if (overrides && isfn(overrides[ch])) {
              fn5 = overrides[ch];
            } else if (def.average && isfn(def.average[ch])) {
              fn5 = def.average[ch];
            } else {
              fn5 = averageNumber;
            }
            res[ch] = fn5(arr, ch);
          }
          return res;
        },
        { mode }
      );
    }
    var definition3 = {
      mode: "cubehelix",
      channels: ["h", "s", "l", "alpha"],
      parse: ["--cubehelix"],
      serialize: "--cubehelix",
      ranges: {
        h: [0, 360],
        s: [0, 4.614],
        l: [0, 1]
      },
      fromMode: {
        rgb: convertRgbToCubehelix_default
      },
      toMode: {
        rgb: convertCubehelixToRgb_default
      },
      interpolate: {
        h: {
          use: interpolatorLinear,
          fixup: fixupHueShorter
        },
        s: interpolatorLinear,
        l: interpolatorLinear,
        alpha: {
          use: interpolatorLinear,
          fixup: fixupAlpha
        }
      },
      difference: {
        h: differenceHueSaturation
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default3 = definition3;
    var convertLabToLch = ({ l, a, b, alpha }, mode = "lch") => {
      let c4 = Math.sqrt(a * a + b * b);
      let res = { mode, l, c: c4 };
      if (c4)
        res.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertLabToLch_default = convertLabToLch;
    var convertLchToLab = ({ l, c: c4, h, alpha }, mode = "lab") => {
      let res = {
        mode,
        l,
        a: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
        b: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
      };
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertLchToLab_default = convertLchToLab;
    var k = Math.pow(29, 3) / Math.pow(3, 3);
    var e = Math.pow(6, 3) / Math.pow(29, 3);
    var D50 = {
      X: 0.3457 / 0.3585,
      Y: 1,
      Z: (1 - 0.3457 - 0.3585) / 0.3585
    };
    var D65 = {
      X: 0.3127 / 0.329,
      Y: 1,
      Z: (1 - 0.3127 - 0.329) / 0.329
    };
    var k2 = Math.pow(29, 3) / Math.pow(3, 3);
    var e2 = Math.pow(6, 3) / Math.pow(29, 3);
    var fn3 = (v) => Math.pow(v, 3) > e ? Math.pow(v, 3) : (116 * v - 16) / k;
    var convertLab65ToXyz65 = ({ l, a, b, alpha }) => {
      let fy = (l + 16) / 116;
      let fx = a / 500 + fy;
      let fz = fy - b / 200;
      let res = {
        mode: "xyz65",
        x: fn3(fx) * D65.X,
        y: fn3(fy) * D65.Y,
        z: fn3(fz) * D65.Z
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertLab65ToXyz65_default = convertLab65ToXyz65;
    var convertLab65ToRgb = (lab2) => convertXyz65ToRgb_default(convertLab65ToXyz65_default(lab2));
    var convertLab65ToRgb_default = convertLab65ToRgb;
    var f = (value) => value > e ? Math.cbrt(value) : (k * value + 16) / 116;
    var convertXyz65ToLab65 = ({ x, y, z, alpha }) => {
      let f0 = f(x / D65.X);
      let f1 = f(y / D65.Y);
      let f22 = f(z / D65.Z);
      let res = {
        mode: "lab65",
        l: 116 * f1 - 16,
        a: 500 * (f0 - f1),
        b: 200 * (f1 - f22)
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz65ToLab65_default = convertXyz65ToLab65;
    var convertRgbToLab65 = (rgb4) => {
      let res = convertXyz65ToLab65_default(convertRgbToXyz65_default(rgb4));
      if (rgb4.r === rgb4.b && rgb4.b === rgb4.g) {
        res.a = res.b = 0;
      }
      return res;
    };
    var convertRgbToLab65_default = convertRgbToLab65;
    var kE = 1;
    var kCH = 1;
    var \u03B8 = 26 / 180 * Math.PI;
    var cos\u03B8 = Math.cos(\u03B8);
    var sin\u03B8 = Math.sin(\u03B8);
    var factor = 100 / Math.log(139 / 100);
    var convertDlchToLab65 = ({ l, c: c4, h, alpha }) => {
      let res = {
        mode: "lab65",
        l: (Math.exp(l * kE / factor) - 1) / 39e-4
      };
      if (h === void 0) {
        res.a = res.b = 0;
      } else {
        let G = (Math.exp(0.0435 * c4 * kCH * kE) - 1) / 0.075;
        let e4 = G * Math.cos(h / 180 * Math.PI - \u03B8);
        let f3 = G * Math.sin(h / 180 * Math.PI - \u03B8);
        res.a = e4 * cos\u03B8 - f3 / 0.83 * sin\u03B8;
        res.b = e4 * sin\u03B8 + f3 / 0.83 * cos\u03B8;
      }
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertDlchToLab65_default = convertDlchToLab65;
    var convertLab65ToDlch = ({ l, a, b, alpha }) => {
      let e4 = a * cos\u03B8 + b * sin\u03B8;
      let f3 = 0.83 * (b * cos\u03B8 - a * sin\u03B8);
      let G = Math.sqrt(e4 * e4 + f3 * f3);
      let res = {
        mode: "dlch",
        l: factor / kE * Math.log(1 + 39e-4 * l),
        c: Math.log(1 + 0.075 * G) / (0.0435 * kCH * kE)
      };
      if (res.c) {
        res.h = normalizeHue_default((Math.atan2(f3, e4) + \u03B8) / Math.PI * 180);
      }
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertLab65ToDlch_default = convertLab65ToDlch;
    var convertDlabToLab65 = (c4) => convertDlchToLab65_default(convertLabToLch_default(c4, "dlch"));
    var convertLab65ToDlab = (c4) => convertLchToLab_default(convertLab65ToDlch_default(c4), "dlab");
    var definition4 = {
      mode: "dlab",
      parse: ["--din99o-lab"],
      serialize: "--din99o-lab",
      toMode: {
        lab65: convertDlabToLab65,
        rgb: (c4) => convertLab65ToRgb_default(convertDlabToLab65(c4))
      },
      fromMode: {
        lab65: convertLab65ToDlab,
        rgb: (c4) => convertLab65ToDlab(convertRgbToLab65_default(c4))
      },
      channels: ["l", "a", "b", "alpha"],
      ranges: {
        l: [0, 100],
        a: [-40.09, 45.501],
        b: [-40.469, 44.344]
      },
      interpolate: {
        l: interpolatorLinear,
        a: interpolatorLinear,
        b: interpolatorLinear,
        alpha: {
          use: interpolatorLinear,
          fixup: fixupAlpha
        }
      }
    };
    var definition_default4 = definition4;
    var definition5 = {
      mode: "dlch",
      parse: ["--din99o-lch"],
      serialize: "--din99o-lch",
      toMode: {
        lab65: convertDlchToLab65_default,
        dlab: (c4) => convertLchToLab_default(c4, "dlab"),
        rgb: (c4) => convertLab65ToRgb_default(convertDlchToLab65_default(c4))
      },
      fromMode: {
        lab65: convertLab65ToDlch_default,
        dlab: (c4) => convertLabToLch_default(c4, "dlch"),
        rgb: (c4) => convertLab65ToDlch_default(convertRgbToLab65_default(c4))
      },
      channels: ["l", "c", "h", "alpha"],
      ranges: {
        l: [0, 100],
        c: [0, 51.484],
        h: [0, 360]
      },
      interpolate: {
        l: interpolatorLinear,
        c: interpolatorLinear,
        h: {
          use: interpolatorLinear,
          fixup: fixupHueShorter
        },
        alpha: {
          use: interpolatorLinear,
          fixup: fixupAlpha
        }
      },
      difference: {
        h: differenceHueChroma
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default5 = definition5;
    function convertHsiToRgb({ h, s, i, alpha }) {
      h = normalizeHue_default(h);
      let f3 = Math.abs(h / 60 % 2 - 1);
      let res;
      switch (Math.floor(h / 60)) {
        case 0:
          res = {
            r: i * (1 + s * (3 / (2 - f3) - 1)),
            g: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
            b: i * (1 - s)
          };
          break;
        case 1:
          res = {
            r: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
            g: i * (1 + s * (3 / (2 - f3) - 1)),
            b: i * (1 - s)
          };
          break;
        case 2:
          res = {
            r: i * (1 - s),
            g: i * (1 + s * (3 / (2 - f3) - 1)),
            b: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1))
          };
          break;
        case 3:
          res = {
            r: i * (1 - s),
            g: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
            b: i * (1 + s * (3 / (2 - f3) - 1))
          };
          break;
        case 4:
          res = {
            r: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1)),
            g: i * (1 - s),
            b: i * (1 + s * (3 / (2 - f3) - 1))
          };
          break;
        case 5:
          res = {
            r: i * (1 + s * (3 / (2 - f3) - 1)),
            g: i * (1 - s),
            b: i * (1 + s * (3 * (1 - f3) / (2 - f3) - 1))
          };
          break;
        default:
          res = { r: i * (1 - s), g: i * (1 - s), b: i * (1 - s) };
      }
      res.mode = "rgb";
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    }
    function convertRgbToHsi({ r: r2, g, b, alpha }) {
      let M2 = Math.max(r2, g, b), m = Math.min(r2, g, b);
      let res = {
        mode: "hsi",
        s: r2 + g + b === 0 ? 0 : 1 - 3 * m / (r2 + g + b),
        i: (r2 + g + b) / 3
      };
      if (M2 - m !== 0)
        res.h = (M2 === r2 ? (g - b) / (M2 - m) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m) + 2 : (r2 - g) / (M2 - m) + 4) * 60;
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    }
    var definition6 = {
      mode: "hsi",
      toMode: {
        rgb: convertHsiToRgb
      },
      parse: ["--hsi"],
      serialize: "--hsi",
      fromMode: {
        rgb: convertRgbToHsi
      },
      channels: ["h", "s", "i", "alpha"],
      ranges: {
        h: [0, 360]
      },
      gamut: "rgb",
      interpolate: {
        h: { use: interpolatorLinear, fixup: fixupHueShorter },
        s: interpolatorLinear,
        i: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      difference: {
        h: differenceHueSaturation
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default6 = definition6;
    function convertHslToRgb({ h, s, l, alpha }) {
      h = normalizeHue_default(h);
      let m1 = l + s * (l < 0.5 ? l : 1 - l);
      let m2 = m1 - (m1 - l) * 2 * Math.abs(h / 60 % 2 - 1);
      let res;
      switch (Math.floor(h / 60)) {
        case 0:
          res = { r: m1, g: m2, b: 2 * l - m1 };
          break;
        case 1:
          res = { r: m2, g: m1, b: 2 * l - m1 };
          break;
        case 2:
          res = { r: 2 * l - m1, g: m1, b: m2 };
          break;
        case 3:
          res = { r: 2 * l - m1, g: m2, b: m1 };
          break;
        case 4:
          res = { r: m2, g: 2 * l - m1, b: m1 };
          break;
        case 5:
          res = { r: m1, g: 2 * l - m1, b: m2 };
          break;
        default:
          res = { r: 2 * l - m1, g: 2 * l - m1, b: 2 * l - m1 };
      }
      res.mode = "rgb";
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    }
    function convertRgbToHsl({ r: r2, g, b, alpha }) {
      let M2 = Math.max(r2, g, b), m = Math.min(r2, g, b);
      let res = {
        mode: "hsl",
        s: M2 === m ? 0 : (M2 - m) / (1 - Math.abs(M2 + m - 1)),
        l: 0.5 * (M2 + m)
      };
      if (M2 - m !== 0)
        res.h = (M2 === r2 ? (g - b) / (M2 - m) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m) + 2 : (r2 - g) / (M2 - m) + 4) * 60;
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    }
    var hueToDeg = (val, unit) => {
      switch (unit) {
        case "deg":
          return +val;
        case "rad":
          return val / Math.PI * 180;
        case "grad":
          return val / 10 * 9;
        case "turn":
          return val * 360;
      }
    };
    var hue_default = hueToDeg;
    var hsl_old = new RegExp(
      `^hsla?\\(\\s*${hue}${c}${per}${c}${per}\\s*(?:,\\s*${num_per}\\s*)?\\)$`
    );
    var parseHslLegacy = (color) => {
      let match = color.match(hsl_old);
      if (!match)
        return;
      let res = { mode: "hsl" };
      if (match[3] !== void 0) {
        res.h = +match[3];
      } else if (match[1] !== void 0 && match[2] !== void 0) {
        res.h = hue_default(match[1], match[2]);
      }
      if (match[4] !== void 0) {
        res.s = Math.min(Math.max(0, match[4] / 100), 1);
      }
      if (match[5] !== void 0) {
        res.l = Math.min(Math.max(0, match[5] / 100), 1);
      }
      if (match[6] !== void 0) {
        res.alpha = match[6] / 100;
      } else if (match[7] !== void 0) {
        res.alpha = +match[7];
      }
      return res;
    };
    var parseHslLegacy_default = parseHslLegacy;
    function parseHsl(color, parsed) {
      if (!parsed || parsed[0] !== "hsl" && parsed[0] !== "hsla") {
        return void 0;
      }
      const res = { mode: "hsl" };
      const [, h, s, l, alpha] = parsed;
      if (h.type !== Tok.None) {
        if (h.type === Tok.Percentage) {
          return void 0;
        }
        res.h = h.value;
      }
      if (s.type !== Tok.None) {
        if (s.type === Tok.Hue) {
          return void 0;
        }
        res.s = s.type === Tok.Number ? s.value : s.value / 100;
      }
      if (l.type !== Tok.None) {
        if (l.type === Tok.Hue) {
          return void 0;
        }
        res.l = l.type === Tok.Number ? l.value : l.value / 100;
      }
      if (alpha.type !== Tok.None) {
        res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
      }
      return res;
    }
    var parseHsl_default = parseHsl;
    var definition7 = {
      mode: "hsl",
      toMode: {
        rgb: convertHslToRgb
      },
      fromMode: {
        rgb: convertRgbToHsl
      },
      channels: ["h", "s", "l", "alpha"],
      ranges: {
        h: [0, 360]
      },
      gamut: "rgb",
      parse: [parseHsl_default, parseHslLegacy_default],
      serialize: (c4) => `hsl(${c4.h || 0} ${c4.s !== void 0 ? c4.s * 100 + "%" : "none"} ${c4.l !== void 0 ? c4.l * 100 + "%" : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
      interpolate: {
        h: { use: interpolatorLinear, fixup: fixupHueShorter },
        s: interpolatorLinear,
        l: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      difference: {
        h: differenceHueSaturation
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default7 = definition7;
    function convertHsvToRgb({ h, s, v, alpha }) {
      h = normalizeHue_default(h);
      let f3 = Math.abs(h / 60 % 2 - 1);
      let res;
      switch (Math.floor(h / 60)) {
        case 0:
          res = { r: v, g: v * (1 - s * f3), b: v * (1 - s) };
          break;
        case 1:
          res = { r: v * (1 - s * f3), g: v, b: v * (1 - s) };
          break;
        case 2:
          res = { r: v * (1 - s), g: v, b: v * (1 - s * f3) };
          break;
        case 3:
          res = { r: v * (1 - s), g: v * (1 - s * f3), b: v };
          break;
        case 4:
          res = { r: v * (1 - s * f3), g: v * (1 - s), b: v };
          break;
        case 5:
          res = { r: v, g: v * (1 - s), b: v * (1 - s * f3) };
          break;
        default:
          res = { r: v * (1 - s), g: v * (1 - s), b: v * (1 - s) };
      }
      res.mode = "rgb";
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    }
    function convertRgbToHsv({ r: r2, g, b, alpha }) {
      let M2 = Math.max(r2, g, b), m = Math.min(r2, g, b);
      let res = {
        mode: "hsv",
        s: M2 === 0 ? 0 : 1 - m / M2,
        v: M2
      };
      if (M2 - m !== 0)
        res.h = (M2 === r2 ? (g - b) / (M2 - m) + (g < b) * 6 : M2 === g ? (b - r2) / (M2 - m) + 2 : (r2 - g) / (M2 - m) + 4) * 60;
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    }
    var definition8 = {
      mode: "hsv",
      toMode: {
        rgb: convertHsvToRgb
      },
      parse: ["--hsv"],
      serialize: "--hsv",
      fromMode: {
        rgb: convertRgbToHsv
      },
      channels: ["h", "s", "v", "alpha"],
      ranges: {
        h: [0, 360]
      },
      gamut: "rgb",
      interpolate: {
        h: { use: interpolatorLinear, fixup: fixupHueShorter },
        s: interpolatorLinear,
        v: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      difference: {
        h: differenceHueSaturation
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default8 = definition8;
    function convertHwbToRgb({ h, w, b, alpha }) {
      if (w + b > 1) {
        let s = w + b;
        w /= s;
        b /= s;
      }
      return convertHsvToRgb({
        h,
        s: b === 1 ? 1 : 1 - w / (1 - b),
        v: 1 - b,
        alpha
      });
    }
    function convertRgbToHwb(rgba) {
      let hsv2 = convertRgbToHsv(rgba);
      if (hsv2 === void 0)
        return void 0;
      let res = {
        mode: "hwb",
        w: (1 - hsv2.s) * hsv2.v,
        b: 1 - hsv2.v
      };
      if (hsv2.h !== void 0)
        res.h = hsv2.h;
      if (hsv2.alpha !== void 0)
        res.alpha = hsv2.alpha;
      return res;
    }
    function ParseHwb(color, parsed) {
      if (!parsed || parsed[0] !== "hwb") {
        return void 0;
      }
      const res = { mode: "hwb" };
      const [, h, w, b, alpha] = parsed;
      if (h.type !== Tok.None) {
        if (h.type === Tok.Percentage) {
          return void 0;
        }
        res.h = h.value;
      }
      if (w.type !== Tok.None) {
        if (w.type === Tok.Hue) {
          return void 0;
        }
        res.w = w.type === Tok.Number ? w.value : w.value / 100;
      }
      if (b.type !== Tok.None) {
        if (b.type === Tok.Hue) {
          return void 0;
        }
        res.b = b.type === Tok.Number ? b.value : b.value / 100;
      }
      if (alpha.type !== Tok.None) {
        res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
      }
      return res;
    }
    var parseHwb_default = ParseHwb;
    var definition9 = {
      mode: "hwb",
      toMode: {
        rgb: convertHwbToRgb
      },
      fromMode: {
        rgb: convertRgbToHwb
      },
      channels: ["h", "w", "b", "alpha"],
      ranges: {
        h: [0, 360]
      },
      gamut: "rgb",
      parse: [parseHwb_default],
      serialize: (c4) => `hwb(${c4.h || 0} ${c4.w * 100}% ${c4.b * 100}%${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
      interpolate: {
        h: { use: interpolatorLinear, fixup: fixupHueShorter },
        w: interpolatorLinear,
        b: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      difference: {
        h: differenceHueNaive
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default9 = definition9;
    var n = 0.1593017578125;
    var p = 134.03437499999998;
    var c1 = 0.8359375;
    var c2 = 18.8515625;
    var c3 = 18.6875;
    var d0 = 16295499532821565e-27;
    var pq = (v) => {
      let vn3 = Math.pow(v / 1e4, n);
      return Math.pow((c1 + c2 * vn3) / (1 + c3 * vn3), p) || 0;
    };
    var abs = (v) => Math.max(v * 203, 0);
    var convertXyz65ToJab = ({ x, y, z, alpha }) => {
      x = abs(x);
      y = abs(y);
      z = abs(z);
      let xp = 1.15 * x - 0.15 * z;
      let yp = 0.66 * y + 0.34 * x;
      let l = pq(0.41478972 * xp + 0.579999 * yp + 0.014648 * z);
      let m = pq(-0.20151 * xp + 1.120649 * yp + 0.0531008 * z);
      let s = pq(-0.0166008 * xp + 0.2648 * yp + 0.6684799 * z);
      let i = (l + m) / 2;
      let res = {
        mode: "jab",
        j: 0.44 * i / (1 - 0.56 * i) - d0,
        a: 3.524 * l - 4.066708 * m + 0.542708 * s,
        b: 0.199076 * l + 1.096799 * m - 1.295875 * s
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz65ToJab_default = convertXyz65ToJab;
    var n2 = 0.1593017578125;
    var p2 = 134.03437499999998;
    var c12 = 0.8359375;
    var c22 = 18.8515625;
    var c32 = 18.6875;
    var d02 = 16295499532821565e-27;
    var pq_inv = (v) => {
      let vp = Math.pow(v, 1 / p2);
      return 1e4 * Math.pow((c12 - vp) / (c32 * vp - c22), 1 / n2) || 0;
    };
    var rel = (v) => v / 203;
    var convertJabToXyz65 = ({ j, a, b, alpha }) => {
      let i = (j + d02) / (0.44 + 0.56 * (j + d02));
      let l = pq_inv(i + 0.13860504 * a + 0.058047316 * b);
      let m = pq_inv(i - 0.13860504 * a - 0.058047316 * b);
      let s = pq_inv(i - 0.096019242 * a - 0.8118919 * b);
      let res = {
        mode: "xyz65",
        x: rel(
          1.661373024652174 * l - 0.914523081304348 * m + 0.23136208173913045 * s
        ),
        y: rel(
          -0.3250758611844533 * l + 1.571847026732543 * m - 0.21825383453227928 * s
        ),
        z: rel(-0.090982811 * l - 0.31272829 * m + 1.5227666 * s)
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertJabToXyz65_default = convertJabToXyz65;
    var convertRgbToJab = (rgb4) => {
      let res = convertXyz65ToJab_default(convertRgbToXyz65_default(rgb4));
      if (rgb4.r === rgb4.b && rgb4.b === rgb4.g) {
        res.a = res.b = 0;
      }
      return res;
    };
    var convertRgbToJab_default = convertRgbToJab;
    var convertJabToRgb = (color) => convertXyz65ToRgb_default(convertJabToXyz65_default(color));
    var convertJabToRgb_default = convertJabToRgb;
    var definition10 = {
      mode: "jab",
      channels: ["j", "a", "b", "alpha"],
      parse: ["--jzazbz"],
      serialize: "--jzazbz",
      fromMode: {
        rgb: convertRgbToJab_default,
        xyz65: convertXyz65ToJab_default
      },
      toMode: {
        rgb: convertJabToRgb_default,
        xyz65: convertJabToXyz65_default
      },
      ranges: {
        j: [0, 0.222],
        a: [-0.109, 0.129],
        b: [-0.185, 0.134]
      },
      interpolate: {
        j: interpolatorLinear,
        a: interpolatorLinear,
        b: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      }
    };
    var definition_default10 = definition10;
    var convertJabToJch = ({ j, a, b, alpha }) => {
      let c4 = Math.sqrt(a * a + b * b);
      let res = {
        mode: "jch",
        j,
        c: c4
      };
      if (c4) {
        res.h = normalizeHue_default(Math.atan2(b, a) * 180 / Math.PI);
      }
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertJabToJch_default = convertJabToJch;
    var convertJchToJab = ({ j, c: c4, h, alpha }) => {
      let res = {
        mode: "jab",
        j,
        a: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
        b: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
      };
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertJchToJab_default = convertJchToJab;
    var definition11 = {
      mode: "jch",
      parse: ["--jzczhz"],
      serialize: "--jzczhz",
      toMode: {
        jab: convertJchToJab_default,
        rgb: (c4) => convertJabToRgb_default(convertJchToJab_default(c4))
      },
      fromMode: {
        rgb: (c4) => convertJabToJch_default(convertRgbToJab_default(c4)),
        jab: convertJabToJch_default
      },
      channels: ["j", "c", "h", "alpha"],
      ranges: {
        j: [0, 0.221],
        c: [0, 0.19],
        h: [0, 360]
      },
      interpolate: {
        h: { use: interpolatorLinear, fixup: fixupHueShorter },
        c: interpolatorLinear,
        j: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      difference: {
        h: differenceHueChroma
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default11 = definition11;
    var k3 = Math.pow(29, 3) / Math.pow(3, 3);
    var e3 = Math.pow(6, 3) / Math.pow(29, 3);
    var fn4 = (v) => Math.pow(v, 3) > e3 ? Math.pow(v, 3) : (116 * v - 16) / k3;
    var convertLabToXyz50 = ({ l, a, b, alpha }) => {
      let fy = (l + 16) / 116;
      let fx = a / 500 + fy;
      let fz = fy - b / 200;
      let res = {
        mode: "xyz50",
        x: fn4(fx) * D50.X,
        y: fn4(fy) * D50.Y,
        z: fn4(fz) * D50.Z
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertLabToXyz50_default = convertLabToXyz50;
    var convertXyz50ToRgb = ({ x, y, z, alpha }) => {
      let res = convertLrgbToRgb_default({
        r: x * 3.1341359569958707 - y * 1.6173863321612538 - 0.4906619460083532 * z,
        g: x * -0.978795502912089 + y * 1.916254567259524 + 0.03344273116131949 * z,
        b: x * 0.07195537988411677 - y * 0.2289768264158322 + 1.405386058324125 * z
      });
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz50ToRgb_default = convertXyz50ToRgb;
    var convertLabToRgb = (lab2) => convertXyz50ToRgb_default(convertLabToXyz50_default(lab2));
    var convertLabToRgb_default = convertLabToRgb;
    var convertRgbToXyz50 = (rgb4) => {
      let { r: r2, g, b, alpha } = convertRgbToLrgb_default(rgb4);
      let res = {
        mode: "xyz50",
        x: 0.436065742824811 * r2 + 0.3851514688337912 * g + 0.14307845442264197 * b,
        y: 0.22249319175623702 * r2 + 0.7168870538238823 * g + 0.06061979053616537 * b,
        z: 0.013923904500943465 * r2 + 0.09708128566574634 * g + 0.7140993584005155 * b
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertRgbToXyz50_default = convertRgbToXyz50;
    var f2 = (value) => value > e3 ? Math.cbrt(value) : (k3 * value + 16) / 116;
    var convertXyz50ToLab = ({ x, y, z, alpha }) => {
      let f0 = f2(x / D50.X);
      let f1 = f2(y / D50.Y);
      let f22 = f2(z / D50.Z);
      let res = {
        mode: "lab",
        l: 116 * f1 - 16,
        a: 500 * (f0 - f1),
        b: 200 * (f1 - f22)
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz50ToLab_default = convertXyz50ToLab;
    var convertRgbToLab = (rgb4) => {
      let res = convertXyz50ToLab_default(convertRgbToXyz50_default(rgb4));
      if (rgb4.r === rgb4.b && rgb4.b === rgb4.g) {
        res.a = res.b = 0;
      }
      return res;
    };
    var convertRgbToLab_default = convertRgbToLab;
    function parseLab(color, parsed) {
      if (!parsed || parsed[0] !== "lab") {
        return void 0;
      }
      const res = { mode: "lab" };
      const [, l, a, b, alpha] = parsed;
      if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
        return void 0;
      }
      if (l.type !== Tok.None) {
        res.l = l.value;
      }
      if (a.type !== Tok.None) {
        res.a = a.type === Tok.Number ? a.value : a.value * 125 / 100;
      }
      if (b.type !== Tok.None) {
        res.b = b.type === Tok.Number ? b.value : b.value * 125 / 100;
      }
      if (alpha.type !== Tok.None) {
        res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
      }
      return res;
    }
    var parseLab_default = parseLab;
    var definition12 = {
      mode: "lab",
      toMode: {
        xyz50: convertLabToXyz50_default,
        rgb: convertLabToRgb_default
      },
      fromMode: {
        xyz50: convertXyz50ToLab_default,
        rgb: convertRgbToLab_default
      },
      channels: ["l", "a", "b", "alpha"],
      ranges: {
        l: [0, 100],
        a: [-100, 100],
        b: [-100, 100]
      },
      parse: [parseLab_default],
      serialize: (c4) => `lab(${c4.l !== void 0 ? c4.l : "none"} ${c4.a !== void 0 ? c4.a : "none"} ${c4.b !== void 0 ? c4.b : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
      interpolate: {
        l: interpolatorLinear,
        a: interpolatorLinear,
        b: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      }
    };
    var definition_default12 = definition12;
    var definition13 = {
      ...definition_default12,
      mode: "lab65",
      parse: ["--lab-d65"],
      serialize: "--lab-d65",
      toMode: {
        xyz65: convertLab65ToXyz65_default,
        rgb: convertLab65ToRgb_default
      },
      fromMode: {
        xyz65: convertXyz65ToLab65_default,
        rgb: convertRgbToLab65_default
      },
      ranges: {
        l: [0, 100],
        a: [-86.182, 98.234],
        b: [-107.86, 94.477]
      }
    };
    var definition_default13 = definition13;
    function parseLch(color, parsed) {
      if (!parsed || parsed[0] !== "lch") {
        return void 0;
      }
      const res = { mode: "lch" };
      const [, l, c4, h, alpha] = parsed;
      if (l.type !== Tok.None) {
        if (l.type === Tok.Hue) {
          return void 0;
        }
        res.l = l.value;
      }
      if (c4.type !== Tok.None) {
        res.c = Math.max(
          0,
          c4.type === Tok.Number ? c4.value : c4.value * 150 / 100
        );
      }
      if (h.type !== Tok.None) {
        if (h.type === Tok.Percentage) {
          return void 0;
        }
        res.h = h.value;
      }
      if (alpha.type !== Tok.None) {
        res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
      }
      return res;
    }
    var parseLch_default = parseLch;
    var definition14 = {
      mode: "lch",
      toMode: {
        lab: convertLchToLab_default,
        rgb: (c4) => convertLabToRgb_default(convertLchToLab_default(c4))
      },
      fromMode: {
        rgb: (c4) => convertLabToLch_default(convertRgbToLab_default(c4)),
        lab: convertLabToLch_default
      },
      channels: ["l", "c", "h", "alpha"],
      ranges: {
        l: [0, 100],
        c: [0, 150],
        h: [0, 360]
      },
      parse: [parseLch_default],
      serialize: (c4) => `lch(${c4.l !== void 0 ? c4.l : "none"} ${c4.c !== void 0 ? c4.c : "none"} ${c4.h || 0}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
      interpolate: {
        h: { use: interpolatorLinear, fixup: fixupHueShorter },
        c: interpolatorLinear,
        l: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      difference: {
        h: differenceHueChroma
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default14 = definition14;
    var definition15 = {
      ...definition_default14,
      mode: "lch65",
      parse: ["--lch-d65"],
      serialize: "--lch-d65",
      toMode: {
        lab65: (c4) => convertLchToLab_default(c4, "lab65"),
        rgb: (c4) => convertLab65ToRgb_default(convertLchToLab_default(c4, "lab65"))
      },
      fromMode: {
        rgb: (c4) => convertLabToLch_default(convertRgbToLab65_default(c4), "lch65"),
        lab65: (c4) => convertLabToLch_default(c4, "lch65")
      },
      ranges: {
        l: [0, 100],
        c: [0, 133.807],
        h: [0, 360]
      }
    };
    var definition_default15 = definition15;
    var convertLuvToLchuv = ({ l, u, v, alpha }) => {
      let c4 = Math.sqrt(u * u + v * v);
      let res = {
        mode: "lchuv",
        l,
        c: c4
      };
      if (c4) {
        res.h = normalizeHue_default(Math.atan2(v, u) * 180 / Math.PI);
      }
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertLuvToLchuv_default = convertLuvToLchuv;
    var convertLchuvToLuv = ({ l, c: c4, h, alpha }) => {
      let res = {
        mode: "luv",
        l,
        u: c4 ? c4 * Math.cos(h / 180 * Math.PI) : 0,
        v: c4 ? c4 * Math.sin(h / 180 * Math.PI) : 0
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertLchuvToLuv_default = convertLchuvToLuv;
    var u_fn = (x, y, z) => 4 * x / (x + 15 * y + 3 * z);
    var v_fn = (x, y, z) => 9 * y / (x + 15 * y + 3 * z);
    var un = u_fn(D50.X, D50.Y, D50.Z);
    var vn = v_fn(D50.X, D50.Y, D50.Z);
    var l_fn = (value) => value <= e3 ? k3 * value : 116 * Math.cbrt(value) - 16;
    var convertXyz50ToLuv = ({ x, y, z, alpha }) => {
      let l = l_fn(y / D50.Y);
      let u = u_fn(x, y, z);
      let v = v_fn(x, y, z);
      if (!isFinite(u) || !isFinite(v)) {
        l = u = v = 0;
      } else {
        u = 13 * l * (u - un);
        v = 13 * l * (v - vn);
      }
      let res = {
        mode: "luv",
        l,
        u,
        v
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz50ToLuv_default = convertXyz50ToLuv;
    var u_fn2 = (x, y, z) => 4 * x / (x + 15 * y + 3 * z);
    var v_fn2 = (x, y, z) => 9 * y / (x + 15 * y + 3 * z);
    var un2 = u_fn2(D50.X, D50.Y, D50.Z);
    var vn2 = v_fn2(D50.X, D50.Y, D50.Z);
    var convertLuvToXyz50 = ({ l, u, v, alpha }) => {
      let up = u / (13 * l) + un2;
      let vp = v / (13 * l) + vn2;
      let y = D50.Y * (l <= 8 ? l / k3 : Math.pow((l + 16) / 116, 3));
      let x = y * (9 * up) / (4 * vp);
      let z = y * (12 - 3 * up - 20 * vp) / (4 * vp);
      let res = { mode: "xyz50", x, y, z };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertLuvToXyz50_default = convertLuvToXyz50;
    var convertRgbToLchuv = (rgb4) => convertLuvToLchuv_default(convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb4)));
    var convertLchuvToRgb = (lchuv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(convertLchuvToLuv_default(lchuv2)));
    var definition16 = {
      mode: "lchuv",
      toMode: {
        luv: convertLchuvToLuv_default,
        rgb: convertLchuvToRgb
      },
      fromMode: {
        rgb: convertRgbToLchuv,
        luv: convertLuvToLchuv_default
      },
      channels: ["l", "c", "h", "alpha"],
      parse: ["--lchuv"],
      serialize: "--lchuv",
      ranges: {
        l: [0, 100],
        c: [0, 176.956],
        h: [0, 360]
      },
      interpolate: {
        h: { use: interpolatorLinear, fixup: fixupHueShorter },
        c: interpolatorLinear,
        l: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      },
      difference: {
        h: differenceHueChroma
      },
      average: {
        h: averageAngle
      }
    };
    var definition_default16 = definition16;
    var definition17 = {
      ...definition_default,
      mode: "lrgb",
      toMode: {
        rgb: convertLrgbToRgb_default
      },
      fromMode: {
        rgb: convertRgbToLrgb_default
      },
      parse: ["srgb-linear"],
      serialize: "srgb-linear"
    };
    var definition_default17 = definition17;
    var definition18 = {
      mode: "luv",
      toMode: {
        xyz50: convertLuvToXyz50_default,
        rgb: (luv2) => convertXyz50ToRgb_default(convertLuvToXyz50_default(luv2))
      },
      fromMode: {
        xyz50: convertXyz50ToLuv_default,
        rgb: (rgb4) => convertXyz50ToLuv_default(convertRgbToXyz50_default(rgb4))
      },
      channels: ["l", "u", "v", "alpha"],
      parse: ["--luv"],
      serialize: "--luv",
      ranges: {
        l: [0, 100],
        u: [-84.936, 175.042],
        v: [-125.882, 87.243]
      },
      interpolate: {
        l: interpolatorLinear,
        u: interpolatorLinear,
        v: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      }
    };
    var definition_default18 = definition18;
    var convertLrgbToOklab = ({ r: r2, g, b, alpha }) => {
      let L = Math.cbrt(
        0.41222147079999993 * r2 + 0.5363325363 * g + 0.0514459929 * b
      );
      let M2 = Math.cbrt(
        0.2119034981999999 * r2 + 0.6806995450999999 * g + 0.1073969566 * b
      );
      let S = Math.cbrt(
        0.08830246189999998 * r2 + 0.2817188376 * g + 0.6299787005000002 * b
      );
      let res = {
        mode: "oklab",
        l: 0.2104542553 * L + 0.793617785 * M2 - 0.0040720468 * S,
        a: 1.9779984951 * L - 2.428592205 * M2 + 0.4505937099 * S,
        b: 0.0259040371 * L + 0.7827717662 * M2 - 0.808675766 * S
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertLrgbToOklab_default = convertLrgbToOklab;
    var convertRgbToOklab = (rgb4) => {
      let res = convertLrgbToOklab_default(convertRgbToLrgb_default(rgb4));
      if (rgb4.r === rgb4.b && rgb4.b === rgb4.g) {
        res.a = res.b = 0;
      }
      return res;
    };
    var convertRgbToOklab_default = convertRgbToOklab;
    var convertOklabToLrgb = ({ l, a, b, alpha }) => {
      let L = Math.pow(
        l * 0.9999999984505198 + 0.39633779217376786 * a + 0.2158037580607588 * b,
        3
      );
      let M2 = Math.pow(
        l * 1.0000000088817609 - 0.10556134232365635 * a - 0.06385417477170591 * b,
        3
      );
      let S = Math.pow(
        l * 1.0000000546724108 - 0.08948418209496575 * a - 1.2914855378640917 * b,
        3
      );
      let res = {
        mode: "lrgb",
        r: 4.076741661347994 * L - 3.307711590408193 * M2 + 0.230969928729428 * S,
        g: -1.2684380040921763 * L + 2.6097574006633715 * M2 - 0.3413193963102197 * S,
        b: -0.004196086541837188 * L - 0.7034186144594493 * M2 + 1.7076147009309444 * S
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertOklabToLrgb_default = convertOklabToLrgb;
    var convertOklabToRgb = (c4) => convertLrgbToRgb_default(convertOklabToLrgb_default(c4));
    var convertOklabToRgb_default = convertOklabToRgb;
    function toe(x) {
      const k_1 = 0.206;
      const k_2 = 0.03;
      const k_3 = (1 + k_1) / (1 + k_2);
      return 0.5 * (k_3 * x - k_1 + Math.sqrt((k_3 * x - k_1) * (k_3 * x - k_1) + 4 * k_2 * k_3 * x));
    }
    function toe_inv(x) {
      const k_1 = 0.206;
      const k_2 = 0.03;
      const k_3 = (1 + k_1) / (1 + k_2);
      return (x * x + k_1 * x) / (k_3 * (x + k_2));
    }
    function compute_max_saturation(a, b) {
      let k0, k1, k22, k32, k4, wl, wm, ws;
      if (-1.88170328 * a - 0.80936493 * b > 1) {
        k0 = 1.19086277;
        k1 = 1.76576728;
        k22 = 0.59662641;
        k32 = 0.75515197;
        k4 = 0.56771245;
        wl = 4.0767416621;
        wm = -3.3077115913;
        ws = 0.2309699292;
      } else if (1.81444104 * a - 1.19445276 * b > 1) {
        k0 = 0.73956515;
        k1 = -0.45954404;
        k22 = 0.08285427;
        k32 = 0.1254107;
        k4 = 0.14503204;
        wl = -1.2684380046;
        wm = 2.6097574011;
        ws = -0.3413193965;
      } else {
        k0 = 1.35733652;
        k1 = -915799e-8;
        k22 = -1.1513021;
        k32 = -0.50559606;
        k4 = 692167e-8;
        wl = -0.0041960863;
        wm = -0.7034186147;
        ws = 1.707614701;
      }
      let S = k0 + k1 * a + k22 * b + k32 * a * a + k4 * a * b;
      let k_l = 0.3963377774 * a + 0.2158037573 * b;
      let k_m = -0.1055613458 * a - 0.0638541728 * b;
      let k_s = -0.0894841775 * a - 1.291485548 * b;
      {
        let l_ = 1 + S * k_l;
        let m_ = 1 + S * k_m;
        let s_ = 1 + S * k_s;
        let l = l_ * l_ * l_;
        let m = m_ * m_ * m_;
        let s = s_ * s_ * s_;
        let l_dS = 3 * k_l * l_ * l_;
        let m_dS = 3 * k_m * m_ * m_;
        let s_dS = 3 * k_s * s_ * s_;
        let l_dS2 = 6 * k_l * k_l * l_;
        let m_dS2 = 6 * k_m * k_m * m_;
        let s_dS2 = 6 * k_s * k_s * s_;
        let f3 = wl * l + wm * m + ws * s;
        let f1 = wl * l_dS + wm * m_dS + ws * s_dS;
        let f22 = wl * l_dS2 + wm * m_dS2 + ws * s_dS2;
        S = S - f3 * f1 / (f1 * f1 - 0.5 * f3 * f22);
      }
      return S;
    }
    function find_cusp(a, b) {
      let S_cusp = compute_max_saturation(a, b);
      let rgb4 = convertOklabToLrgb_default({ l: 1, a: S_cusp * a, b: S_cusp * b });
      let L_cusp = Math.cbrt(1 / Math.max(rgb4.r, rgb4.g, rgb4.b));
      let C_cusp = L_cusp * S_cusp;
      return [L_cusp, C_cusp];
    }
    function find_gamut_intersection(a, b, L1, C1, L0, cusp = null) {
      if (!cusp) {
        cusp = find_cusp(a, b);
      }
      let t;
      if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0) {
        t = cusp[1] * L0 / (C1 * cusp[0] + cusp[1] * (L0 - L1));
      } else {
        t = cusp[1] * (L0 - 1) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1));
        {
          let dL = L1 - L0;
          let dC = C1;
          let k_l = 0.3963377774 * a + 0.2158037573 * b;
          let k_m = -0.1055613458 * a - 0.0638541728 * b;
          let k_s = -0.0894841775 * a - 1.291485548 * b;
          let l_dt = dL + dC * k_l;
          let m_dt = dL + dC * k_m;
          let s_dt = dL + dC * k_s;
          {
            let L = L0 * (1 - t) + t * L1;
            let C = t * C1;
            let l_ = L + C * k_l;
            let m_ = L + C * k_m;
            let s_ = L + C * k_s;
            let l = l_ * l_ * l_;
            let m = m_ * m_ * m_;
            let s = s_ * s_ * s_;
            let ldt = 3 * l_dt * l_ * l_;
            let mdt = 3 * m_dt * m_ * m_;
            let sdt = 3 * s_dt * s_ * s_;
            let ldt2 = 6 * l_dt * l_dt * l_;
            let mdt2 = 6 * m_dt * m_dt * m_;
            let sdt2 = 6 * s_dt * s_dt * s_;
            let r2 = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1;
            let r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
            let r22 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;
            let u_r = r1 / (r1 * r1 - 0.5 * r2 * r22);
            let t_r = -r2 * u_r;
            let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1;
            let g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
            let g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;
            let u_g = g1 / (g1 * g1 - 0.5 * g * g2);
            let t_g = -g * u_g;
            let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s - 1;
            let b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt;
            let b22 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2;
            let u_b = b1 / (b1 * b1 - 0.5 * b2 * b22);
            let t_b = -b2 * u_b;
            t_r = u_r >= 0 ? t_r : 1e6;
            t_g = u_g >= 0 ? t_g : 1e6;
            t_b = u_b >= 0 ? t_b : 1e6;
            t += Math.min(t_r, Math.min(t_g, t_b));
          }
        }
      }
      return t;
    }
    function get_ST_max(a_, b_, cusp = null) {
      if (!cusp) {
        cusp = find_cusp(a_, b_);
      }
      let L = cusp[0];
      let C = cusp[1];
      return [C / L, C / (1 - L)];
    }
    function get_Cs(L, a_, b_) {
      let cusp = find_cusp(a_, b_);
      let C_max = find_gamut_intersection(a_, b_, L, 1, L, cusp);
      let ST_max = get_ST_max(a_, b_, cusp);
      let S_mid = 0.11516993 + 1 / (7.4477897 + 4.1590124 * b_ + a_ * (-2.19557347 + 1.75198401 * b_ + a_ * (-2.13704948 - 10.02301043 * b_ + a_ * (-4.24894561 + 5.38770819 * b_ + 4.69891013 * a_))));
      let T_mid = 0.11239642 + 1 / (1.6132032 - 0.68124379 * b_ + a_ * (0.40370612 + 0.90148123 * b_ + a_ * (-0.27087943 + 0.6122399 * b_ + a_ * (299215e-8 - 0.45399568 * b_ - 0.14661872 * a_))));
      let k4 = C_max / Math.min(L * ST_max[0], (1 - L) * ST_max[1]);
      let C_a = L * S_mid;
      let C_b = (1 - L) * T_mid;
      let C_mid = 0.9 * k4 * Math.sqrt(
        Math.sqrt(
          1 / (1 / (C_a * C_a * C_a * C_a) + 1 / (C_b * C_b * C_b * C_b))
        )
      );
      C_a = L * 0.4;
      C_b = (1 - L) * 0.8;
      let C_0 = Math.sqrt(1 / (1 / (C_a * C_a) + 1 / (C_b * C_b)));
      return [C_0, C_mid, C_max];
    }
    function convertOklabToOkhsl(lab2) {
      const ret = { mode: "okhsl", l: toe(lab2.l) };
      if (lab2.alpha !== void 0) {
        ret.alpha = lab2.alpha;
      }
      let c4 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
      if (!c4) {
        ret.s = 0;
        return ret;
      }
      let [C_0, C_mid, C_max] = get_Cs(lab2.l, lab2.a / c4, lab2.b / c4);
      let s;
      if (c4 < C_mid) {
        let k_0 = 0;
        let k_1 = 0.8 * C_0;
        let k_2 = 1 - k_1 / C_mid;
        let t = (c4 - k_0) / (k_1 + k_2 * (c4 - k_0));
        s = t * 0.8;
      } else {
        let k_0 = C_mid;
        let k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
        let k_2 = 1 - k_1 / (C_max - C_mid);
        let t = (c4 - k_0) / (k_1 + k_2 * (c4 - k_0));
        s = 0.8 + 0.2 * t;
      }
      if (s) {
        ret.s = s;
        ret.h = normalizeHue_default(Math.atan2(lab2.b, lab2.a) * 180 / Math.PI);
      }
      return ret;
    }
    function convertOkhslToOklab(hsl2) {
      let l = toe_inv(hsl2.l);
      const ret = { mode: "oklab", l };
      if (hsl2.alpha !== void 0) {
        ret.alpha = hsl2.alpha;
      }
      if (!hsl2.s || hsl2.l === 1) {
        ret.a = ret.b = 0;
        return ret;
      }
      let a_ = Math.cos(hsl2.h / 180 * Math.PI);
      let b_ = Math.sin(hsl2.h / 180 * Math.PI);
      let [C_0, C_mid, C_max] = get_Cs(l, a_, b_);
      let t, k_0, k_1, k_2;
      if (hsl2.s < 0.8) {
        t = 1.25 * hsl2.s;
        k_0 = 0;
        k_1 = 0.8 * C_0;
        k_2 = 1 - k_1 / C_mid;
      } else {
        t = 5 * (hsl2.s - 0.8);
        k_0 = C_mid;
        k_1 = 0.2 * C_mid * C_mid * 1.25 * 1.25 / C_0;
        k_2 = 1 - k_1 / (C_max - C_mid);
      }
      let C = k_0 + t * k_1 / (1 - k_2 * t);
      ret.a = C * a_;
      ret.b = C * b_;
      return ret;
    }
    var modeOkhsl = {
      ...definition_default7,
      mode: "okhsl",
      channels: ["h", "s", "l", "alpha"],
      parse: ["--okhsl"],
      serialize: "--okhsl",
      fromMode: {
        oklab: convertOklabToOkhsl,
        rgb: (c4) => convertOklabToOkhsl(convertRgbToOklab_default(c4))
      },
      toMode: {
        oklab: convertOkhslToOklab,
        rgb: (c4) => convertOklabToRgb_default(convertOkhslToOklab(c4))
      }
    };
    var modeOkhsl_default = modeOkhsl;
    function convertOklabToOkhsv(lab2) {
      let c4 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
      let l = lab2.l;
      let a_ = c4 ? lab2.a / c4 : 1;
      let b_ = c4 ? lab2.b / c4 : 1;
      let [S_max, T] = get_ST_max(a_, b_);
      let S_0 = 0.5;
      let k4 = 1 - S_0 / S_max;
      let t = T / (c4 + l * T);
      let L_v = t * l;
      let C_v = t * c4;
      let L_vt = toe_inv(L_v);
      let C_vt = C_v * L_vt / L_v;
      let rgb_scale = convertOklabToLrgb_default({ l: L_vt, a: a_ * C_vt, b: b_ * C_vt });
      let scale_L = Math.cbrt(
        1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
      );
      l = l / scale_L;
      c4 = c4 / scale_L * toe(l) / l;
      l = toe(l);
      const ret = {
        mode: "okhsv",
        s: c4 ? (S_0 + T) * C_v / (T * S_0 + T * k4 * C_v) : 0,
        v: l ? l / L_v : 0
      };
      if (ret.s) {
        ret.h = normalizeHue_default(Math.atan2(lab2.b, lab2.a) * 180 / Math.PI);
      }
      if (lab2.alpha !== void 0) {
        ret.alpha = lab2.alpha;
      }
      return ret;
    }
    function convertOkhsvToOklab(hsv2) {
      const ret = { mode: "oklab" };
      if (hsv2.alpha !== void 0) {
        ret.alpha = hsv2.alpha;
      }
      const h = hsv2.h || 0;
      const a_ = Math.cos(h / 180 * Math.PI);
      const b_ = Math.sin(h / 180 * Math.PI);
      const [S_max, T] = get_ST_max(a_, b_);
      const S_0 = 0.5;
      const k4 = 1 - S_0 / S_max;
      const L_v = 1 - hsv2.s * S_0 / (S_0 + T - T * k4 * hsv2.s);
      const C_v = hsv2.s * T * S_0 / (S_0 + T - T * k4 * hsv2.s);
      const L_vt = toe_inv(L_v);
      const C_vt = C_v * L_vt / L_v;
      const rgb_scale = convertOklabToLrgb_default({
        l: L_vt,
        a: a_ * C_vt,
        b: b_ * C_vt
      });
      const scale_L = Math.cbrt(
        1 / Math.max(rgb_scale.r, rgb_scale.g, rgb_scale.b, 0)
      );
      const L_new = toe_inv(hsv2.v * L_v);
      const C = C_v * L_new / L_v;
      ret.l = L_new * scale_L;
      ret.a = C * a_ * scale_L;
      ret.b = C * b_ * scale_L;
      return ret;
    }
    var modeOkhsv = {
      ...definition_default8,
      mode: "okhsv",
      channels: ["h", "s", "v", "alpha"],
      parse: ["--okhsv"],
      serialize: "--okhsv",
      fromMode: {
        oklab: convertOklabToOkhsv,
        rgb: (c4) => convertOklabToOkhsv(convertRgbToOklab_default(c4))
      },
      toMode: {
        oklab: convertOkhsvToOklab,
        rgb: (c4) => convertOklabToRgb_default(convertOkhsvToOklab(c4))
      }
    };
    var modeOkhsv_default = modeOkhsv;
    function parseOklab(color, parsed) {
      if (!parsed || parsed[0] !== "oklab") {
        return void 0;
      }
      const res = { mode: "oklab" };
      const [, l, a, b, alpha] = parsed;
      if (l.type === Tok.Hue || a.type === Tok.Hue || b.type === Tok.Hue) {
        return void 0;
      }
      if (l.type !== Tok.None) {
        res.l = l.type === Tok.Number ? l.value : l.value / 100;
      }
      if (a.type !== Tok.None) {
        res.a = a.type === Tok.Number ? a.value : a.value * 0.4 / 100;
      }
      if (b.type !== Tok.None) {
        res.b = b.type === Tok.Number ? b.value : b.value * 0.4 / 100;
      }
      if (alpha.type !== Tok.None) {
        res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
      }
      return res;
    }
    var parseOklab_default = parseOklab;
    var definition19 = {
      ...definition_default12,
      mode: "oklab",
      toMode: {
        lrgb: convertOklabToLrgb_default,
        rgb: convertOklabToRgb_default
      },
      fromMode: {
        lrgb: convertLrgbToOklab_default,
        rgb: convertRgbToOklab_default
      },
      ranges: {
        l: [0, 1],
        a: [-0.4, 0.4],
        b: [-0.4, 0.4]
      },
      parse: [parseOklab_default],
      serialize: (c4) => `oklab(${c4.l !== void 0 ? c4.l : "none"} ${c4.a !== void 0 ? c4.a : "none"} ${c4.b !== void 0 ? c4.b : "none"}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`
    };
    var definition_default19 = definition19;
    function parseOklch(color, parsed) {
      if (!parsed || parsed[0] !== "oklch") {
        return void 0;
      }
      const res = { mode: "oklch" };
      const [, l, c4, h, alpha] = parsed;
      if (l.type !== Tok.None) {
        if (l.type === Tok.Hue) {
          return void 0;
        }
        res.l = l.type === Tok.Number ? l.value : l.value / 100;
      }
      if (c4.type !== Tok.None) {
        res.c = Math.max(
          0,
          c4.type === Tok.Number ? c4.value : c4.value * 0.4 / 100
        );
      }
      if (h.type !== Tok.None) {
        if (h.type === Tok.Percentage) {
          return void 0;
        }
        res.h = h.value;
      }
      if (alpha.type !== Tok.None) {
        res.alpha = alpha.type === Tok.Number ? alpha.value : alpha.value / 100;
      }
      return res;
    }
    var parseOklch_default = parseOklch;
    var definition20 = {
      ...definition_default14,
      mode: "oklch",
      toMode: {
        oklab: (c4) => convertLchToLab_default(c4, "oklab"),
        rgb: (c4) => convertOklabToRgb_default(convertLchToLab_default(c4, "oklab"))
      },
      fromMode: {
        rgb: (c4) => convertLabToLch_default(convertRgbToOklab_default(c4), "oklch"),
        oklab: (c4) => convertLabToLch_default(c4, "oklch")
      },
      parse: [parseOklch_default],
      serialize: (c4) => `oklch(${c4.l !== void 0 ? c4.l : "none"} ${c4.c !== void 0 ? c4.c : "none"} ${c4.h || 0}${c4.alpha < 1 ? ` / ${c4.alpha}` : ""})`,
      ranges: {
        l: [0, 1],
        c: [0, 0.4],
        h: [0, 360]
      }
    };
    var definition_default20 = definition20;
    var convertP3ToXyz65 = (rgb4) => {
      let { r: r2, g, b, alpha } = convertRgbToLrgb_default(rgb4);
      let res = {
        mode: "xyz65",
        x: 0.486570948648216 * r2 + 0.265667693169093 * g + 0.1982172852343625 * b,
        y: 0.2289745640697487 * r2 + 0.6917385218365062 * g + 0.079286914093745 * b,
        z: 0 * r2 + 0.0451133818589026 * g + 1.043944368900976 * b
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertP3ToXyz65_default = convertP3ToXyz65;
    var convertXyz65ToP3 = ({ x, y, z, alpha }) => {
      let res = convertLrgbToRgb_default(
        {
          r: x * 2.4934969119414263 - y * 0.9313836179191242 - 0.402710784450717 * z,
          g: x * -0.8294889695615749 + y * 1.7626640603183465 + 0.0236246858419436 * z,
          b: x * 0.0358458302437845 - y * 0.0761723892680418 + 0.9568845240076871 * z
        },
        "p3"
      );
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz65ToP3_default = convertXyz65ToP3;
    var definition21 = {
      ...definition_default,
      mode: "p3",
      parse: ["display-p3"],
      serialize: "display-p3",
      fromMode: {
        rgb: (color) => convertXyz65ToP3_default(convertRgbToXyz65_default(color)),
        xyz65: convertXyz65ToP3_default
      },
      toMode: {
        rgb: (color) => convertXyz65ToRgb_default(convertP3ToXyz65_default(color)),
        xyz65: convertP3ToXyz65_default
      }
    };
    var definition_default21 = definition21;
    var gamma2 = (v) => {
      let abs3 = Math.abs(v);
      if (abs3 >= 1 / 512) {
        return Math.sign(v) * Math.pow(abs3, 1 / 1.8);
      }
      return 16 * v;
    };
    var convertXyz50ToProphoto = ({ x, y, z, alpha }) => {
      let res = {
        mode: "prophoto",
        r: gamma2(
          x * 1.3457868816471585 - y * 0.2555720873797946 - 0.0511018649755453 * z
        ),
        g: gamma2(
          x * -0.5446307051249019 + y * 1.5082477428451466 + 0.0205274474364214 * z
        ),
        b: gamma2(x * 0 + y * 0 + 1.2119675456389452 * z)
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz50ToProphoto_default = convertXyz50ToProphoto;
    var linearize2 = (v) => {
      let abs3 = Math.abs(v);
      if (abs3 >= 16 / 512) {
        return Math.sign(v) * Math.pow(abs3, 1.8);
      }
      return v / 16;
    };
    var convertProphotoToXyz50 = (prophoto2) => {
      let r2 = linearize2(prophoto2.r);
      let g = linearize2(prophoto2.g);
      let b = linearize2(prophoto2.b);
      let res = {
        mode: "xyz50",
        x: 0.7977666449006423 * r2 + 0.1351812974005331 * g + 0.0313477341283922 * b,
        y: 0.2880748288194013 * r2 + 0.7118352342418731 * g + 899369387256e-16 * b,
        z: 0 * r2 + 0 * g + 0.8251046025104602 * b
      };
      if (prophoto2.alpha !== void 0) {
        res.alpha = prophoto2.alpha;
      }
      return res;
    };
    var convertProphotoToXyz50_default = convertProphotoToXyz50;
    var definition22 = {
      ...definition_default,
      mode: "prophoto",
      parse: ["prophoto-rgb"],
      serialize: "prophoto-rgb",
      fromMode: {
        xyz50: convertXyz50ToProphoto_default,
        rgb: (color) => convertXyz50ToProphoto_default(convertRgbToXyz50_default(color))
      },
      toMode: {
        xyz50: convertProphotoToXyz50_default,
        rgb: (color) => convertXyz50ToRgb_default(convertProphotoToXyz50_default(color))
      }
    };
    var definition_default22 = definition22;
    var \u03B1 = 1.09929682680944;
    var \u03B2 = 0.018053968510807;
    var gamma3 = (v) => {
      const abs3 = Math.abs(v);
      if (abs3 > \u03B2) {
        return (Math.sign(v) || 1) * (\u03B1 * Math.pow(abs3, 0.45) - (\u03B1 - 1));
      }
      return 4.5 * v;
    };
    var convertXyz65ToRec2020 = ({ x, y, z, alpha }) => {
      let res = {
        mode: "rec2020",
        r: gamma3(
          x * 1.7166511879712683 - y * 0.3556707837763925 - 0.2533662813736599 * z
        ),
        g: gamma3(
          x * -0.6666843518324893 + y * 1.6164812366349395 + 0.0157685458139111 * z
        ),
        b: gamma3(
          x * 0.0176398574453108 - y * 0.0427706132578085 + 0.9421031212354739 * z
        )
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz65ToRec2020_default = convertXyz65ToRec2020;
    var \u03B12 = 1.09929682680944;
    var \u03B22 = 0.018053968510807;
    var linearize3 = (v) => {
      let abs3 = Math.abs(v);
      if (abs3 < \u03B22 * 4.5) {
        return v / 4.5;
      }
      return (Math.sign(v) || 1) * Math.pow((abs3 + \u03B12 - 1) / \u03B12, 1 / 0.45);
    };
    var convertRec2020ToXyz65 = (rec20202) => {
      let r2 = linearize3(rec20202.r);
      let g = linearize3(rec20202.g);
      let b = linearize3(rec20202.b);
      let res = {
        mode: "xyz65",
        x: 0.6369580483012911 * r2 + 0.1446169035862083 * g + 0.1688809751641721 * b,
        y: 0.262700212011267 * r2 + 0.6779980715188708 * g + 0.059301716469862 * b,
        z: 0 * r2 + 0.0280726930490874 * g + 1.0609850577107909 * b
      };
      if (rec20202.alpha !== void 0) {
        res.alpha = rec20202.alpha;
      }
      return res;
    };
    var convertRec2020ToXyz65_default = convertRec2020ToXyz65;
    var definition23 = {
      ...definition_default,
      mode: "rec2020",
      fromMode: {
        xyz65: convertXyz65ToRec2020_default,
        rgb: (color) => convertXyz65ToRec2020_default(convertRgbToXyz65_default(color))
      },
      toMode: {
        xyz65: convertRec2020ToXyz65_default,
        rgb: (color) => convertXyz65ToRgb_default(convertRec2020ToXyz65_default(color))
      },
      parse: ["rec2020"],
      serialize: "rec2020"
    };
    var definition_default23 = definition23;
    var bias = 0.0037930732552754493;
    var bias_cbrt = Math.cbrt(bias);
    var transfer = (v) => Math.cbrt(v) - bias_cbrt;
    var convertRgbToXyb = (color) => {
      const { r: r2, g, b, alpha } = convertRgbToLrgb_default(color);
      const l = transfer(0.3 * r2 + 0.622 * g + 0.078 * b + bias);
      const m = transfer(0.23 * r2 + 0.692 * g + 0.078 * b + bias);
      const s = transfer(
        0.2434226892454782 * r2 + 0.2047674442449682 * g + 0.5518098665095535 * b + bias
      );
      const res = {
        mode: "xyb",
        x: (l - m) / 2,
        y: (l + m) / 2,
        /* Apply default chroma from luma (subtract Y from B) */
        b: s - (l + m) / 2
      };
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertRgbToXyb_default = convertRgbToXyb;
    var transfer2 = (v) => Math.pow(v + bias_cbrt, 3);
    var convertXybToRgb = ({ x, y, b, alpha }) => {
      const l = transfer2(x + y) - bias;
      const m = transfer2(y - x) - bias;
      const s = transfer2(b + y) - bias;
      const res = convertLrgbToRgb_default({
        r: 11.031566904639861 * l - 9.866943908131562 * m - 0.16462299650829934 * s,
        g: -3.2541473810744237 * l + 4.418770377582723 * m - 0.16462299650829934 * s,
        b: -3.6588512867136815 * l + 2.7129230459360922 * m + 1.9459282407775895 * s
      });
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertXybToRgb_default = convertXybToRgb;
    var definition24 = {
      mode: "xyb",
      channels: ["x", "y", "b", "alpha"],
      parse: ["--xyb"],
      serialize: "--xyb",
      toMode: {
        rgb: convertXybToRgb_default
      },
      fromMode: {
        rgb: convertRgbToXyb_default
      },
      ranges: {
        x: [-0.0154, 0.0281],
        y: [0, 0.8453],
        b: [-0.2778, 0.388]
      },
      interpolate: {
        x: interpolatorLinear,
        y: interpolatorLinear,
        b: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      }
    };
    var definition_default24 = definition24;
    var definition25 = {
      mode: "xyz50",
      parse: ["xyz-d50"],
      serialize: "xyz-d50",
      toMode: {
        rgb: convertXyz50ToRgb_default,
        lab: convertXyz50ToLab_default
      },
      fromMode: {
        rgb: convertRgbToXyz50_default,
        lab: convertLabToXyz50_default
      },
      channels: ["x", "y", "z", "alpha"],
      ranges: {
        x: [0, 0.964],
        y: [0, 0.999],
        z: [0, 0.825]
      },
      interpolate: {
        x: interpolatorLinear,
        y: interpolatorLinear,
        z: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      }
    };
    var definition_default25 = definition25;
    var convertXyz65ToXyz50 = (xyz652) => {
      let { x, y, z, alpha } = xyz652;
      let res = {
        mode: "xyz50",
        x: 1.0479298208405488 * x + 0.0229467933410191 * y - 0.0501922295431356 * z,
        y: 0.0296278156881593 * x + 0.990434484573249 * y - 0.0170738250293851 * z,
        z: -0.0092430581525912 * x + 0.0150551448965779 * y + 0.7518742899580008 * z
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz65ToXyz50_default = convertXyz65ToXyz50;
    var convertXyz50ToXyz65 = (xyz502) => {
      let { x, y, z, alpha } = xyz502;
      let res = {
        mode: "xyz65",
        x: 0.9554734527042182 * x - 0.0230985368742614 * y + 0.0632593086610217 * z,
        y: -0.0283697069632081 * x + 1.0099954580058226 * y + 0.021041398966943 * z,
        z: 0.0123140016883199 * x - 0.0205076964334779 * y + 1.3303659366080753 * z
      };
      if (alpha !== void 0) {
        res.alpha = alpha;
      }
      return res;
    };
    var convertXyz50ToXyz65_default = convertXyz50ToXyz65;
    var definition26 = {
      mode: "xyz65",
      toMode: {
        rgb: convertXyz65ToRgb_default,
        xyz50: convertXyz65ToXyz50_default
      },
      fromMode: {
        rgb: convertRgbToXyz65_default,
        xyz50: convertXyz50ToXyz65_default
      },
      ranges: {
        x: [0, 0.95],
        y: [0, 1],
        z: [0, 1.088]
      },
      channels: ["x", "y", "z", "alpha"],
      parse: ["xyz", "xyz-d65"],
      serialize: "xyz-d65",
      interpolate: {
        x: interpolatorLinear,
        y: interpolatorLinear,
        z: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      }
    };
    var definition_default26 = definition26;
    var convertRgbToYiq = ({ r: r2, g, b, alpha }) => {
      const res = {
        mode: "yiq",
        y: 0.29889531 * r2 + 0.58662247 * g + 0.11448223 * b,
        i: 0.59597799 * r2 - 0.2741761 * g - 0.32180189 * b,
        q: 0.21147017 * r2 - 0.52261711 * g + 0.31114694 * b
      };
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertRgbToYiq_default = convertRgbToYiq;
    var convertYiqToRgb = ({ y, i, q, alpha }) => {
      const res = {
        mode: "rgb",
        r: y + 0.95608445 * i + 0.6208885 * q,
        g: y - 0.27137664 * i - 0.6486059 * q,
        b: y - 1.10561724 * i + 1.70250126 * q
      };
      if (alpha !== void 0)
        res.alpha = alpha;
      return res;
    };
    var convertYiqToRgb_default = convertYiqToRgb;
    var definition27 = {
      mode: "yiq",
      toMode: {
        rgb: convertYiqToRgb_default
      },
      fromMode: {
        rgb: convertRgbToYiq_default
      },
      channels: ["y", "i", "q", "alpha"],
      parse: ["--yiq"],
      serialize: "--yiq",
      ranges: {
        i: [-0.595, 0.595],
        q: [-0.522, 0.522]
      },
      interpolate: {
        y: interpolatorLinear,
        i: interpolatorLinear,
        q: interpolatorLinear,
        alpha: { use: interpolatorLinear, fixup: fixupAlpha }
      }
    };
    var definition_default27 = definition27;
    var r = (value, precision) => Math.round(value * (precision = Math.pow(10, precision))) / precision;
    var round = (precision = 4) => (value) => typeof value === "number" ? r(value, precision) : value;
    var round_default = round;
    var twoDecimals = round_default(2);
    var clamp = (value) => Math.max(0, Math.min(1, value));
    var fixup = (value) => Math.round(clamp(value) * 255);
    var serializeHex = (color) => {
      if (color === void 0) {
        return void 0;
      }
      let r2 = fixup(color.r);
      let g = fixup(color.g);
      let b = fixup(color.b);
      return "#" + (1 << 24 | r2 << 16 | g << 8 | b).toString(16).slice(1);
    };
    var serializeHex8 = (color) => {
      if (color === void 0) {
        return void 0;
      }
      let a = fixup(color.alpha !== void 0 ? color.alpha : 1);
      return serializeHex(color) + (1 << 8 | a).toString(16).slice(1);
    };
    var serializeRgb = (color) => {
      if (color === void 0) {
        return void 0;
      }
      let r2 = color.r !== void 0 ? fixup(color.r) : "none";
      let g = color.g !== void 0 ? fixup(color.g) : "none";
      let b = color.b !== void 0 ? fixup(color.b) : "none";
      if (color.alpha === void 0 || color.alpha === 1) {
        return `rgb(${r2}, ${g}, ${b})`;
      } else {
        return `rgba(${r2}, ${g}, ${b}, ${twoDecimals(clamp(color.alpha))})`;
      }
    };
    var serializeHsl = (color) => {
      if (color === void 0) {
        return void 0;
      }
      const h = twoDecimals(color.h || 0);
      const s = color.s !== void 0 ? twoDecimals(clamp(color.s) * 100) + "%" : "none";
      const l = color.l !== void 0 ? twoDecimals(clamp(color.l) * 100) + "%" : "none";
      if (color.alpha === void 0 || color.alpha === 1) {
        return `hsl(${h}, ${s}, ${l})`;
      } else {
        return `hsla(${h}, ${s}, ${l}, ${twoDecimals(clamp(color.alpha))})`;
      }
    };
    var formatCss = (c4) => {
      const color = prepare_default(c4);
      if (!color) {
        return void 0;
      }
      const def = getMode(color.mode);
      if (!def.serialize || typeof def.serialize === "string") {
        let res = `color(${def.serialize || `--${color.mode}`} `;
        def.channels.forEach((ch, i) => {
          if (ch !== "alpha") {
            res += (i ? " " : "") + (color[ch] !== void 0 ? color[ch] : "none");
          }
        });
        if (color.alpha !== void 0 && color.alpha < 1) {
          res += ` / ${color.alpha}`;
        }
        return res + ")";
      }
      if (typeof def.serialize === "function") {
        return def.serialize(color);
      }
      return void 0;
    };
    var formatHex = (c4) => serializeHex(converter_default("rgb")(c4));
    var formatHex8 = (c4) => serializeHex8(converter_default("rgb")(c4));
    var formatRgb = (c4) => serializeRgb(converter_default("rgb")(c4));
    var formatHsl = (c4) => serializeHsl(converter_default("hsl")(c4));
    var BLENDS = {
      normal: (b, s) => s,
      multiply: (b, s) => b * s,
      screen: (b, s) => b + s - b * s,
      "hard-light": (b, s) => s < 0.5 ? b * 2 * s : 2 * s * (1 - b) - 1,
      overlay: (b, s) => b < 0.5 ? s * 2 * b : 2 * b * (1 - s) - 1,
      darken: (b, s) => Math.min(b, s),
      lighten: (b, s) => Math.max(b, s),
      "color-dodge": (b, s) => b === 0 ? 0 : s === 1 ? 1 : Math.min(1, b / (1 - s)),
      "color-burn": (b, s) => b === 1 ? 1 : s === 0 ? 0 : 1 - Math.min(1, (1 - b) / s),
      "soft-light": (b, s) => s < 0.5 ? b - (1 - 2 * s) * b * (1 - b) : b + (2 * s - 1) * ((b < 0.25 ? ((16 * b - 12) * b + 4) * b : Math.sqrt(b)) - b),
      difference: (b, s) => Math.abs(b - s),
      exclusion: (b, s) => b + s - 2 * b * s
    };
    var blend = (colors, type = "normal", mode = "rgb") => {
      let fn5 = typeof type === "function" ? type : BLENDS[type];
      let conv = converter_default(mode);
      let channels = getMode(mode).channels;
      let converted = colors.map((c4) => {
        let cc = conv(c4);
        if (cc.alpha === void 0) {
          cc.alpha = 1;
        }
        return cc;
      });
      return converted.reduce((b, s) => {
        if (b === void 0)
          return s;
        let alpha = s.alpha + b.alpha * (1 - s.alpha);
        return channels.reduce(
          (res, ch) => {
            if (ch !== "alpha") {
              if (alpha === 0) {
                res[ch] = 0;
              } else {
                res[ch] = s.alpha * (1 - b.alpha) * s[ch] + s.alpha * b.alpha * fn5(b[ch], s[ch]) + (1 - s.alpha) * b.alpha * b[ch];
                res[ch] = Math.max(0, Math.min(1, res[ch] / alpha));
              }
            }
            return res;
          },
          { mode, alpha }
        );
      });
    };
    var blend_default = blend;
    var rand = ([min2, max]) => min2 + Math.random() * (max - min2);
    var to_intervals = (constraints) => Object.keys(constraints).reduce((o, k4) => {
      let v = constraints[k4];
      o[k4] = Array.isArray(v) ? v : [v, v];
      return o;
    }, {});
    var random = (mode = "rgb", constraints = {}) => {
      let def = getMode(mode);
      let limits = to_intervals(constraints);
      return def.channels.reduce(
        (res, ch) => {
          if (limits.alpha || ch !== "alpha") {
            res[ch] = rand(limits[ch] || def.ranges[ch]);
          }
          return res;
        },
        { mode }
      );
    };
    var random_default = random;
    var mapper = (fn5, mode = "rgb", preserve_mode = false) => {
      let channels = mode ? getMode(mode).channels : null;
      let conv = mode ? converter_default(mode) : prepare_default;
      return (color) => {
        let conv_color = conv(color);
        if (!conv_color) {
          return void 0;
        }
        let res = (channels || getMode(conv_color.mode).channels).reduce(
          (res2, ch) => {
            let v = fn5(conv_color[ch], ch, conv_color, mode);
            if (v !== void 0 && !isNaN(v)) {
              res2[ch] = v;
            }
            return res2;
          },
          { mode: conv_color.mode }
        );
        if (!preserve_mode) {
          return res;
        }
        let prep = prepare_default(color);
        if (prep && prep.mode !== res.mode) {
          return converter_default(prep.mode)(res);
        }
        return res;
      };
    };
    var mapAlphaMultiply = (v, ch, c4) => {
      if (ch !== "alpha") {
        return (v || 0) * (c4.alpha !== void 0 ? c4.alpha : 1);
      }
      return v;
    };
    var mapAlphaDivide = (v, ch, c4) => {
      if (ch !== "alpha" && c4.alpha !== 0) {
        return (v || 0) / (c4.alpha !== void 0 ? c4.alpha : 1);
      }
      return v;
    };
    var mapTransferLinear = (slope = 1, intercept = 0) => (v, ch) => {
      if (ch !== "alpha") {
        return v * slope + intercept;
      }
      return v;
    };
    var mapTransferGamma = (amplitude = 1, exponent = 1, offset = 0) => (v, ch) => {
      if (ch !== "alpha") {
        return amplitude * Math.pow(v, exponent) + offset;
      }
      return v;
    };
    var normalizePositions = (arr) => {
      if (arr[0] === void 0) {
        arr[0] = 0;
      }
      if (arr[arr.length - 1] === void 0) {
        arr[arr.length - 1] = 1;
      }
      let i = 1;
      let j;
      let from_idx;
      let from_pos;
      let inc;
      while (i < arr.length) {
        if (arr[i] === void 0) {
          from_idx = i;
          from_pos = arr[i - 1];
          j = i;
          while (arr[j] === void 0)
            j++;
          inc = (arr[j] - from_pos) / (j - i + 1);
          while (i < j) {
            arr[i] = from_pos + (i + 1 - from_idx) * inc;
            i++;
          }
        } else if (arr[i] < arr[i - 1]) {
          arr[i] = arr[i - 1];
        }
        i++;
      }
      return arr;
    };
    var normalizePositions_default = normalizePositions;
    var midpoint = (H = 0.5) => (t) => H <= 0 ? 1 : H >= 1 ? 0 : Math.pow(t, Math.log(0.5) / Math.log(H));
    var midpoint_default = midpoint;
    var isfn2 = (o) => typeof o === "function";
    var isobj = (o) => o && typeof o === "object";
    var isnum = (o) => typeof o === "number";
    var interpolate_fn = (colors, mode = "rgb", overrides, premap) => {
      let def = getMode(mode);
      let conv = converter_default(mode);
      let conv_colors = [];
      let positions = [];
      let fns = {};
      colors.forEach((val) => {
        if (Array.isArray(val)) {
          conv_colors.push(conv(val[0]));
          positions.push(val[1]);
        } else if (isnum(val) || isfn2(val)) {
          fns[positions.length] = val;
        } else {
          conv_colors.push(conv(val));
          positions.push(void 0);
        }
      });
      normalizePositions_default(positions);
      let fixed = def.channels.reduce((res, ch) => {
        let ffn;
        if (isobj(overrides) && isobj(overrides[ch]) && overrides[ch].fixup) {
          ffn = overrides[ch].fixup;
        } else if (isobj(def.interpolate[ch]) && def.interpolate[ch].fixup) {
          ffn = def.interpolate[ch].fixup;
        } else {
          ffn = (v) => v;
        }
        res[ch] = ffn(conv_colors.map((color) => color[ch]));
        return res;
      }, {});
      if (premap) {
        let ccolors = conv_colors.map((color, idx) => {
          return def.channels.reduce(
            (c4, ch) => {
              c4[ch] = fixed[ch][idx];
              return c4;
            },
            { mode }
          );
        });
        fixed = def.channels.reduce((res, ch) => {
          res[ch] = ccolors.map((c4) => {
            let v = premap(c4[ch], ch, c4, mode);
            return isNaN(v) ? void 0 : v;
          });
          return res;
        }, {});
      }
      let interpolators = def.channels.reduce((res, ch) => {
        let ifn;
        if (isfn2(overrides)) {
          ifn = overrides;
        } else if (isobj(overrides) && isfn2(overrides[ch])) {
          ifn = overrides[ch];
        } else if (isobj(overrides) && isobj(overrides[ch]) && overrides[ch].use) {
          ifn = overrides[ch].use;
        } else if (isfn2(def.interpolate[ch])) {
          ifn = def.interpolate[ch];
        } else if (isobj(def.interpolate[ch])) {
          ifn = def.interpolate[ch].use;
        }
        res[ch] = ifn(fixed[ch]);
        return res;
      }, {});
      let n3 = conv_colors.length - 1;
      return (t) => {
        t = Math.min(Math.max(0, t), 1);
        if (t <= positions[0]) {
          return conv_colors[0];
        }
        if (t > positions[n3]) {
          return conv_colors[n3];
        }
        let idx = 0;
        while (positions[idx] < t)
          idx++;
        let start = positions[idx - 1];
        let delta = positions[idx] - start;
        let P = (t - start) / delta;
        let fn5 = fns[idx] || fns[0];
        if (fn5 !== void 0) {
          if (isnum(fn5)) {
            fn5 = midpoint_default((fn5 - start) / delta);
          }
          P = fn5(P);
        }
        let t0 = (idx - 1 + P) / n3;
        return def.channels.reduce(
          (res, channel) => {
            let val = interpolators[channel](t0);
            if (val !== void 0) {
              res[channel] = val;
            }
            return res;
          },
          { mode }
        );
      };
    };
    var interpolate = (colors, mode = "rgb", overrides) => interpolate_fn(colors, mode, overrides);
    var interpolateWith = (premap, postmap) => (colors, mode = "rgb", overrides) => {
      let post = postmap ? mapper(postmap, mode) : void 0;
      let it = interpolate_fn(colors, mode, overrides, premap);
      return post ? (t) => post(it(t)) : it;
    };
    var interpolateWithPremultipliedAlpha = interpolateWith(
      mapAlphaMultiply,
      mapAlphaDivide
    );
    var mod = (v, l) => (v + l) % l;
    var bspline = (Vim2, Vim1, Vi, Vip1, t) => {
      let t2 = t * t;
      let t3 = t2 * t;
      return ((1 - 3 * t + 3 * t2 - t3) * Vim2 + (4 - 6 * t2 + 3 * t3) * Vim1 + (1 + 3 * t + 3 * t2 - 3 * t3) * Vi + t3 * Vip1) / 6;
    };
    var interpolatorSplineBasis = (arr) => (t) => {
      let classes = arr.length - 1;
      let i = t >= 1 ? classes - 1 : Math.max(0, Math.floor(t * classes));
      return bspline(
        i > 0 ? arr[i - 1] : 2 * arr[i] - arr[i + 1],
        arr[i],
        arr[i + 1],
        i < classes - 1 ? arr[i + 2] : 2 * arr[i + 1] - arr[i],
        (t - i / classes) * classes
      );
    };
    var interpolatorSplineBasisClosed = (arr) => (t) => {
      const classes = arr.length - 1;
      const i = Math.floor(t * classes);
      return bspline(
        arr[mod(i - 1, arr.length)],
        arr[mod(i, arr.length)],
        arr[mod(i + 1, arr.length)],
        arr[mod(i + 2, arr.length)],
        (t - i / classes) * classes
      );
    };
    var solve = (v) => {
      let i;
      let n3 = v.length - 1;
      let c4 = new Array(n3);
      let _v = new Array(n3);
      let sol = new Array(n3);
      c4[1] = 1 / 4;
      _v[1] = (6 * v[1] - v[0]) / 4;
      for (i = 2; i < n3; ++i) {
        c4[i] = 1 / (4 - c4[i - 1]);
        _v[i] = (6 * v[i] - (i == n3 - 1 ? v[n3] : 0) - _v[i - 1]) * c4[i];
      }
      sol[0] = v[0];
      sol[n3] = v[n3];
      if (n3 - 1 > 0) {
        sol[n3 - 1] = _v[n3 - 1];
      }
      for (i = n3 - 2; i > 0; --i) {
        sol[i] = _v[i] - c4[i] * sol[i + 1];
      }
      return sol;
    };
    var interpolatorSplineNatural = (arr) => interpolatorSplineBasis(solve(arr));
    var interpolatorSplineNaturalClosed = (arr) => interpolatorSplineBasisClosed(solve(arr));
    var sgn = Math.sign;
    var min = Math.min;
    var abs2 = Math.abs;
    var mono = (arr) => {
      let n3 = arr.length - 1;
      let s = [];
      let p4 = [];
      let yp = [];
      for (let i = 0; i < n3; i++) {
        s.push((arr[i + 1] - arr[i]) * n3);
        p4.push(i > 0 ? 0.5 * (arr[i + 1] - arr[i - 1]) * n3 : void 0);
        yp.push(
          i > 0 ? (sgn(s[i - 1]) + sgn(s[i])) * min(abs2(s[i - 1]), abs2(s[i]), 0.5 * abs2(p4[i])) : void 0
        );
      }
      return [s, p4, yp];
    };
    var interpolator = (arr, yp, s) => {
      let n3 = arr.length - 1;
      let n22 = n3 * n3;
      return (t) => {
        let i;
        if (t >= 1) {
          i = n3 - 1;
        } else {
          i = Math.max(0, Math.floor(t * n3));
        }
        let t1 = t - i / n3;
        let t2 = t1 * t1;
        let t3 = t2 * t1;
        return (yp[i] + yp[i + 1] - 2 * s[i]) * n22 * t3 + (3 * s[i] - 2 * yp[i] - yp[i + 1]) * n3 * t2 + yp[i] * t1 + arr[i];
      };
    };
    var interpolatorSplineMonotone = (arr) => {
      if (arr.length < 3) {
        return interpolatorLinear(arr);
      }
      let n3 = arr.length - 1;
      let [s, , yp] = mono(arr);
      yp[0] = s[0];
      yp[n3] = s[n3 - 1];
      return interpolator(arr, yp, s);
    };
    var interpolatorSplineMonotone2 = (arr) => {
      if (arr.length < 3) {
        return interpolatorLinear(arr);
      }
      let n3 = arr.length - 1;
      let [s, p4, yp] = mono(arr);
      p4[0] = (arr[1] * 2 - arr[0] * 1.5 - arr[2] * 0.5) * n3;
      p4[n3] = (arr[n3] * 1.5 - arr[n3 - 1] * 2 + arr[n3 - 2] * 0.5) * n3;
      yp[0] = p4[0] * s[0] <= 0 ? 0 : abs2(p4[0]) > 2 * abs2(s[0]) ? 2 * s[0] : p4[0];
      yp[n3] = p4[n3] * s[n3 - 1] <= 0 ? 0 : abs2(p4[n3]) > 2 * abs2(s[n3 - 1]) ? 2 * s[n3 - 1] : p4[n3];
      return interpolator(arr, yp, s);
    };
    var interpolatorSplineMonotoneClosed = (arr) => {
      let n3 = arr.length - 1;
      let [s, p4, yp] = mono(arr);
      p4[0] = 0.5 * (arr[1] - arr[n3]) * n3;
      p4[n3] = 0.5 * (arr[0] - arr[n3 - 1]) * n3;
      let s_m1 = (arr[0] - arr[n3]) * n3;
      let s_n = s_m1;
      yp[0] = (sgn(s_m1) + sgn(s[0])) * min(abs2(s_m1), abs2(s[0]), 0.5 * abs2(p4[0]));
      yp[n3] = (sgn(s[n3 - 1]) + sgn(s_n)) * min(abs2(s[n3 - 1]), abs2(s_n), 0.5 * abs2(p4[n3]));
      return interpolator(arr, yp, s);
    };
    var gamma4 = (\u03B3 = 1) => \u03B3 === 1 ? (t) => t : (t) => Math.pow(t, \u03B3);
    var gamma_default = gamma4;
    var samples = (n3 = 2, \u03B3 = 1) => {
      let ease = gamma_default(\u03B3);
      if (n3 < 2) {
        return n3 < 1 ? [] : [ease(0.5)];
      }
      let res = [];
      for (let i = 0; i < n3; i++) {
        res.push(ease(i / (n3 - 1)));
      }
      return res;
    };
    var samples_default = samples;
    var rgb = converter_default("rgb");
    var fixup_rgb = (c4) => {
      const res = {
        mode: c4.mode,
        r: Math.max(0, Math.min(c4.r, 1)),
        g: Math.max(0, Math.min(c4.g, 1)),
        b: Math.max(0, Math.min(c4.b, 1))
      };
      if (c4.alpha !== void 0) {
        res.alpha = c4.alpha;
      }
      return res;
    };
    var to_displayable_srgb = (c4) => fixup_rgb(rgb(c4));
    var inrange_rgb = (c4) => {
      return c4 !== void 0 && c4.r >= 0 && c4.r <= 1 && c4.g >= 0 && c4.g <= 1 && c4.b >= 0 && c4.b <= 1;
    };
    function displayable(color) {
      return inrange_rgb(rgb(color));
    }
    function inGamut(mode = "rgb") {
      const { gamut } = getMode(mode);
      if (!gamut) {
        return (color) => true;
      }
      const conv = converter_default(typeof gamut === "string" ? gamut : mode);
      return (color) => inrange_rgb(conv(color));
    }
    function clampRgb(color) {
      color = prepare_default(color);
      if (color === void 0 || displayable(color))
        return color;
      let conv = converter_default(color.mode);
      return conv(to_displayable_srgb(color));
    }
    function clampGamut(mode = "rgb") {
      const { gamut } = getMode(mode);
      if (!gamut) {
        return (color) => prepare_default(color);
      }
      const destMode = typeof gamut === "string" ? gamut : mode;
      const destConv = converter_default(destMode);
      const inDestGamut = inGamut(destMode);
      return (color) => {
        const original = prepare_default(color);
        if (!original) {
          return void 0;
        }
        const converted = destConv(original);
        if (inDestGamut(converted)) {
          return original;
        }
        const clamped = fixup_rgb(converted);
        if (original.mode === clamped.mode) {
          return clamped;
        }
        return converter_default(original.mode)(clamped);
      };
    }
    function clampChroma(color, mode = "lch", rgbGamut = "rgb") {
      color = prepare_default(color);
      let inDestinationGamut = rgbGamut === "rgb" ? displayable : inGamut(rgbGamut);
      let clipToGamut = rgbGamut === "rgb" ? to_displayable_srgb : clampGamut(rgbGamut);
      if (color === void 0 || inDestinationGamut(color))
        return color;
      let conv = converter_default(color.mode);
      color = converter_default(mode)(color);
      let clamped = { ...color, c: 0 };
      if (!inDestinationGamut(clamped)) {
        return conv(clipToGamut(clamped));
      }
      let start = 0;
      let end = color.c;
      let range = getMode(mode).ranges.c;
      let resolution = (range[1] - range[0]) / Math.pow(2, 13);
      let _last_good_c;
      while (end - start > resolution) {
        clamped.c = start + (end - start) * 0.5;
        if (inDestinationGamut(clamped)) {
          _last_good_c = clamped.c;
          start = clamped.c;
        } else {
          end = clamped.c;
        }
      }
      return conv(
        inDestinationGamut(clamped) ? clamped : { ...clamped, c: _last_good_c }
      );
    }
    function toGamut(dest = "rgb", mode = "oklch", delta = differenceEuclidean("oklch"), jnd = 0.02) {
      const destConv = converter_default(dest);
      if (!getMode(dest).gamut) {
        return (color) => destConv(color);
      }
      const inDestinationGamut = inGamut(dest);
      const clipToGamut = clampGamut(dest);
      const ucs = converter_default(mode);
      const { ranges } = getMode(mode);
      const White = destConv("white");
      const Black = destConv("black");
      return (color) => {
        color = prepare_default(color);
        if (color === void 0) {
          return void 0;
        }
        const candidate = { ...ucs(color) };
        if (candidate.l >= ranges.l[1]) {
          const res = { ...White };
          if (color.alpha !== void 0) {
            res.alpha = color.alpha;
          }
          return res;
        }
        if (candidate.l <= ranges.l[0]) {
          const res = { ...Black };
          if (color.alpha !== void 0) {
            res.alpha = color.alpha;
          }
          return res;
        }
        if (inDestinationGamut(candidate)) {
          return destConv(candidate);
        }
        let start = 0;
        let end = candidate.c;
        let epsilon = (ranges.c[1] - ranges.c[0]) / 4e3;
        let clipped = clipToGamut(candidate);
        while (end - start > epsilon) {
          candidate.c = (start + end) * 0.5;
          clipped = clipToGamut(candidate);
          if (inDestinationGamut(candidate) || delta && jnd > 0 && delta(candidate, clipped) <= jnd) {
            start = candidate.c;
          } else {
            end = candidate.c;
          }
        }
        return destConv(inDestinationGamut(candidate) ? candidate : clipped);
      };
    }
    var nearest = (colors, metric = differenceEuclidean(), accessor = (d) => d) => {
      let arr = colors.map((c4, idx) => ({ color: accessor(c4), i: idx }));
      return (color, n3 = 1, \u03C4 = Infinity) => {
        if (isFinite(n3)) {
          n3 = Math.max(1, Math.min(n3, arr.length - 1));
        }
        arr.forEach((c4) => {
          c4.d = metric(color, c4.color);
        });
        return arr.sort((a, b) => a.d - b.d).slice(0, n3).filter((c4) => c4.d < \u03C4).map((c4) => colors[c4.i]);
      };
    };
    var nearest_default = nearest;
    var minzero = (v) => Math.max(v, 0);
    var clamp2 = (v) => Math.max(Math.min(v, 1), 0);
    var lerp2 = (a, b, t) => a === void 0 || b === void 0 ? void 0 : a + t * (b - a);
    var matrixSepia = (amount) => {
      let a = 1 - clamp2(amount);
      return [
        0.393 + 0.607 * a,
        0.769 - 0.769 * a,
        0.189 - 0.189 * a,
        0,
        0.349 - 0.349 * a,
        0.686 + 0.314 * a,
        0.168 - 0.168 * a,
        0,
        0.272 - 0.272 * a,
        0.534 - 0.534 * a,
        0.131 + 0.869 * a,
        0,
        0,
        0,
        0,
        1
      ];
    };
    var matrixSaturate = (sat) => {
      let s = minzero(sat);
      return [
        0.213 + 0.787 * s,
        0.715 - 0.715 * s,
        0.072 - 0.072 * s,
        0,
        0.213 - 0.213 * s,
        0.715 + 0.285 * s,
        0.072 - 0.072 * s,
        0,
        0.213 - 0.213 * s,
        0.715 - 0.715 * s,
        0.072 + 0.928 * s,
        0,
        0,
        0,
        0,
        1
      ];
    };
    var matrixGrayscale = (amount) => {
      let a = 1 - clamp2(amount);
      return [
        0.2126 + 0.7874 * a,
        0.7152 - 0.7152 * a,
        0.0722 - 0.0722 * a,
        0,
        0.2126 - 0.2126 * a,
        0.7152 + 0.2848 * a,
        0.0722 - 0.0722 * a,
        0,
        0.2126 - 0.2126 * a,
        0.7152 - 0.7152 * a,
        0.0722 + 0.9278 * a,
        0,
        0,
        0,
        0,
        1
      ];
    };
    var matrixHueRotate = (degrees) => {
      let rad = Math.PI * degrees / 180;
      let c4 = Math.cos(rad);
      let s = Math.sin(rad);
      return [
        0.213 + c4 * 0.787 - s * 0.213,
        0.715 - c4 * 0.715 - s * 0.715,
        0.072 - c4 * 0.072 + s * 0.928,
        0,
        0.213 - c4 * 0.213 + s * 0.143,
        0.715 + c4 * 0.285 + s * 0.14,
        0.072 - c4 * 0.072 - s * 0.283,
        0,
        0.213 - c4 * 0.213 - s * 0.787,
        0.715 - c4 * 0.715 + s * 0.715,
        0.072 + c4 * 0.928 + s * 0.072,
        0,
        0,
        0,
        0,
        1
      ];
    };
    var matrix = (values, mode, preserve_mode = false) => {
      let conv = converter_default(mode);
      let channels = getMode(mode).channels;
      return (color) => {
        let c4 = conv(color);
        if (!c4) {
          return void 0;
        }
        let res = { mode };
        let ch;
        let count = channels.length;
        for (let i = 0; i < values.length; i++) {
          ch = channels[Math.floor(i / count)];
          if (c4[ch] === void 0) {
            continue;
          }
          res[ch] = (res[ch] || 0) + values[i] * (c4[channels[i % count]] || 0);
        }
        if (!preserve_mode) {
          return res;
        }
        let prep = prepare_default(color);
        return prep && res.mode !== prep.mode ? converter_default(prep.mode)(res) : res;
      };
    };
    var filterBrightness = (amt = 1, mode = "rgb") => {
      let a = minzero(amt);
      return mapper(mapTransferLinear(a), mode, true);
    };
    var filterContrast = (amt = 1, mode = "rgb") => {
      let a = minzero(amt);
      return mapper(mapTransferLinear(a, (1 - a) / 2), mode, true);
    };
    var filterSepia = (amt = 1, mode = "rgb") => matrix(matrixSepia(amt), mode, true);
    var filterSaturate = (amt = 1, mode = "rgb") => matrix(matrixSaturate(amt), mode, true);
    var filterGrayscale = (amt = 1, mode = "rgb") => matrix(matrixGrayscale(amt), mode, true);
    var filterInvert = (amt = 1, mode = "rgb") => {
      let a = clamp2(amt);
      return mapper(
        (v, ch) => ch === "alpha" ? v : lerp2(a, 1 - a, v),
        mode,
        true
      );
    };
    var filterHueRotate = (deg = 0, mode = "rgb") => matrix(matrixHueRotate(deg), mode, true);
    var rgb2 = converter_default("rgb");
    var PROT = [
      [1, 0, -0, 0, 1, 0, -0, -0, 1],
      [
        0.856167,
        0.182038,
        -0.038205,
        0.029342,
        0.955115,
        0.015544,
        -288e-5,
        -1563e-6,
        1.004443
      ],
      [
        0.734766,
        0.334872,
        -0.069637,
        0.05184,
        0.919198,
        0.028963,
        -4928e-6,
        -4209e-6,
        1.009137
      ],
      [
        0.630323,
        0.465641,
        -0.095964,
        0.069181,
        0.890046,
        0.040773,
        -6308e-6,
        -7724e-6,
        1.014032
      ],
      [
        0.539009,
        0.579343,
        -0.118352,
        0.082546,
        0.866121,
        0.051332,
        -7136e-6,
        -0.011959,
        1.019095
      ],
      [
        0.458064,
        0.679578,
        -0.137642,
        0.092785,
        0.846313,
        0.060902,
        -7494e-6,
        -0.016807,
        1.024301
      ],
      [
        0.38545,
        0.769005,
        -0.154455,
        0.100526,
        0.829802,
        0.069673,
        -7442e-6,
        -0.02219,
        1.029632
      ],
      [
        0.319627,
        0.849633,
        -0.169261,
        0.106241,
        0.815969,
        0.07779,
        -7025e-6,
        -0.028051,
        1.035076
      ],
      [
        0.259411,
        0.923008,
        -0.18242,
        0.110296,
        0.80434,
        0.085364,
        -6276e-6,
        -0.034346,
        1.040622
      ],
      [
        0.203876,
        0.990338,
        -0.194214,
        0.112975,
        0.794542,
        0.092483,
        -5222e-6,
        -0.041043,
        1.046265
      ],
      [
        0.152286,
        1.052583,
        -0.204868,
        0.114503,
        0.786281,
        0.099216,
        -3882e-6,
        -0.048116,
        1.051998
      ]
    ];
    var DEUTER = [
      [1, 0, -0, 0, 1, 0, -0, -0, 1],
      [
        0.866435,
        0.177704,
        -0.044139,
        0.049567,
        0.939063,
        0.01137,
        -3453e-6,
        7233e-6,
        0.99622
      ],
      [
        0.760729,
        0.319078,
        -0.079807,
        0.090568,
        0.889315,
        0.020117,
        -6027e-6,
        0.013325,
        0.992702
      ],
      [
        0.675425,
        0.43385,
        -0.109275,
        0.125303,
        0.847755,
        0.026942,
        -795e-5,
        0.018572,
        0.989378
      ],
      [
        0.605511,
        0.52856,
        -0.134071,
        0.155318,
        0.812366,
        0.032316,
        -9376e-6,
        0.023176,
        0.9862
      ],
      [
        0.547494,
        0.607765,
        -0.155259,
        0.181692,
        0.781742,
        0.036566,
        -0.01041,
        0.027275,
        0.983136
      ],
      [
        0.498864,
        0.674741,
        -0.173604,
        0.205199,
        0.754872,
        0.039929,
        -0.011131,
        0.030969,
        0.980162
      ],
      [
        0.457771,
        0.731899,
        -0.18967,
        0.226409,
        0.731012,
        0.042579,
        -0.011595,
        0.034333,
        0.977261
      ],
      [
        0.422823,
        0.781057,
        -0.203881,
        0.245752,
        0.709602,
        0.044646,
        -0.011843,
        0.037423,
        0.974421
      ],
      [
        0.392952,
        0.82361,
        -0.216562,
        0.263559,
        0.69021,
        0.046232,
        -0.01191,
        0.040281,
        0.97163
      ],
      [
        0.367322,
        0.860646,
        -0.227968,
        0.280085,
        0.672501,
        0.047413,
        -0.01182,
        0.04294,
        0.968881
      ]
    ];
    var TRIT = [
      [1, 0, -0, 0, 1, 0, -0, -0, 1],
      [
        0.92667,
        0.092514,
        -0.019184,
        0.021191,
        0.964503,
        0.014306,
        8437e-6,
        0.054813,
        0.93675
      ],
      [
        0.89572,
        0.13333,
        -0.02905,
        0.029997,
        0.9454,
        0.024603,
        0.013027,
        0.104707,
        0.882266
      ],
      [
        0.905871,
        0.127791,
        -0.033662,
        0.026856,
        0.941251,
        0.031893,
        0.01341,
        0.148296,
        0.838294
      ],
      [
        0.948035,
        0.08949,
        -0.037526,
        0.014364,
        0.946792,
        0.038844,
        0.010853,
        0.193991,
        0.795156
      ],
      [
        1.017277,
        0.027029,
        -0.044306,
        -6113e-6,
        0.958479,
        0.047634,
        6379e-6,
        0.248708,
        0.744913
      ],
      [
        1.104996,
        -0.046633,
        -0.058363,
        -0.032137,
        0.971635,
        0.060503,
        1336e-6,
        0.317922,
        0.680742
      ],
      [
        1.193214,
        -0.109812,
        -0.083402,
        -0.058496,
        0.97941,
        0.079086,
        -2346e-6,
        0.403492,
        0.598854
      ],
      [
        1.257728,
        -0.139648,
        -0.118081,
        -0.078003,
        0.975409,
        0.102594,
        -3316e-6,
        0.501214,
        0.502102
      ],
      [
        1.278864,
        -0.125333,
        -0.153531,
        -0.084748,
        0.957674,
        0.127074,
        -989e-6,
        0.601151,
        0.399838
      ],
      [
        1.255528,
        -0.076749,
        -0.178779,
        -0.078411,
        0.930809,
        0.147602,
        4733e-6,
        0.691367,
        0.3039
      ]
    ];
    var deficiency = (lut, t) => {
      let tt = Math.max(0, Math.min(1, t));
      let i = Math.round(tt / 0.1);
      let w = Math.round(tt % 0.1);
      let arr = lut[i];
      if (w > 0 && i < lut.length - 1) {
        let arr_2 = lut[i + 1];
        arr = arr.map((v, idx) => lerp(arr[idx], arr_2[idx], w));
      }
      return (color) => {
        let c4 = prepare_default(color);
        if (c4 === void 0) {
          return void 0;
        }
        let { r: r2, g, b } = rgb2(c4);
        let ret = {
          mode: "rgb",
          r: arr[0] * r2 + arr[1] * g + arr[2] * b,
          g: arr[3] * r2 + arr[4] * g + arr[5] * b,
          b: arr[6] * r2 + arr[7] * g + arr[8] * b
        };
        if (c4.alpha !== void 0) {
          ret.alpha = c4.alpha;
        }
        return converter_default(c4.mode)(ret);
      };
    };
    var filterDeficiencyProt = (severity = 1) => deficiency(PROT, severity);
    var filterDeficiencyDeuter = (severity = 1) => deficiency(DEUTER, severity);
    var filterDeficiencyTrit = (severity = 1) => deficiency(TRIT, severity);
    var easingSmoothstep = (t) => t * t * (3 - 2 * t);
    var easingSmoothstepInverse = (t) => 0.5 - Math.sin(Math.asin(1 - 2 * t) / 3);
    var smootherstep = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    var smootherstep_default = smootherstep;
    var inOutSine = (t) => (1 - Math.cos(t * Math.PI)) / 2;
    var inOutSine_default = inOutSine;
    function luminance(color) {
      let c4 = converter_default("lrgb")(color);
      return 0.2126 * c4.r + 0.7152 * c4.g + 0.0722 * c4.b;
    }
    function contrast(a, b) {
      let L1 = luminance(a);
      let L2 = luminance(b);
      return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    }
    var a98 = useMode(definition_default2);
    var cubehelix = useMode(definition_default3);
    var dlab = useMode(definition_default4);
    var dlch = useMode(definition_default5);
    var hsi = useMode(definition_default6);
    var hsl = useMode(definition_default7);
    var hsv = useMode(definition_default8);
    var hwb = useMode(definition_default9);
    var jab = useMode(definition_default10);
    var jch = useMode(definition_default11);
    var lab = useMode(definition_default12);
    var lab65 = useMode(definition_default13);
    var lch = useMode(definition_default14);
    var lch65 = useMode(definition_default15);
    var lchuv = useMode(definition_default16);
    var lrgb = useMode(definition_default17);
    var luv = useMode(definition_default18);
    var okhsl = useMode(modeOkhsl_default);
    var okhsv = useMode(modeOkhsv_default);
    var oklab = useMode(definition_default19);
    var oklch = useMode(definition_default20);
    var p3 = useMode(definition_default21);
    var prophoto = useMode(definition_default22);
    var rec2020 = useMode(definition_default23);
    var rgb3 = useMode(definition_default);
    var xyb = useMode(definition_default24);
    var xyz50 = useMode(definition_default25);
    var xyz65 = useMode(definition_default26);
    var yiq = useMode(definition_default27);
  }
});

// node_modules/daisyui/src/theming/functions.js
var require_functions = __commonJS({
  "node_modules/daisyui/src/theming/functions.js"(exports2, module2) {
    var pc2 = require_picocolors();
    var colorNames = require_colorNames();
    var themeDefaults = require_themeDefaults();
    var { oklch, interpolate, wcagContrast } = require_culori();
    var colorIsInvalid = (input) => {
      console.error(
        `\u251C\u2500 ${pc2.red("\u26A0\uFE0E")} ${pc2.bgRed(" Error ")} Invalid color ${pc2.red(input)} in ${pc2.green(
          "tailwind.config.js"
        )}`
      );
    };
    var cutNumber = (number) => {
      try {
        if (number) {
          return +number.toFixed(6);
        }
        return 0;
      } catch (e) {
        return false;
      }
    };
    module2.exports = {
      isDark: (color) => {
        try {
          if (wcagContrast(color, "black") < wcagContrast(color, "white")) {
            return true;
          }
          return false;
        } catch (e) {
          return false;
        }
      },
      colorObjToString: (input) => {
        const { l, c, h } = input;
        return `${Number.parseFloat((cutNumber(l) * 100).toFixed(6))}% ${cutNumber(c)} ${cutNumber(h)}`;
      },
      generateForegroundColorFrom: function(input, percentage = 0.8) {
        try {
          const result = interpolate(
            [input, this.isDark(input) ? "white" : "black"],
            "oklch"
          )(percentage);
          return this.colorObjToString(result);
        } catch (e) {
          return false;
        }
      },
      generateDarkenColorFrom: function(input, percentage = 0.07) {
        try {
          const result = interpolate([input, "black"], "oklch")(percentage);
          return this.colorObjToString(result);
        } catch (e) {
          return false;
        }
      },
      convertColorFormat: function(input) {
        if (typeof input !== "object" || input === null) {
          return input;
        }
        const resultObj = {};
        for (const [rule, value] of Object.entries(input)) {
          if (Object.hasOwn(colorNames, rule)) {
            try {
              const colorObj = oklch(value);
              resultObj[colorNames[rule]] = this.colorObjToString(colorObj);
            } catch (e) {
              colorIsInvalid(value);
              return false;
            }
          } else {
            resultObj[rule] = value;
          }
          if (!Object.hasOwn(input, "base-100")) {
            resultObj["--b1"] = "100% 0 0";
          }
          if (!Object.hasOwn(input, "base-200")) {
            resultObj["--b2"] = this.generateDarkenColorFrom(input["base-100"], 0.07);
          }
          if (!Object.hasOwn(input, "base-300")) {
            if (Object.hasOwn(input, "base-200")) {
              resultObj["--b3"] = this.generateDarkenColorFrom(input["base-200"], 0.07);
            } else {
              resultObj["--b3"] = this.generateDarkenColorFrom(input["base-100"], 0.14);
            }
          }
          if (!Object.hasOwn(input, "info")) {
            resultObj["--in"] = "72.06% 0.191 231.6";
          }
          if (!Object.hasOwn(input, "success")) {
            resultObj["--su"] = "64.8% 0.150 160";
          }
          if (!Object.hasOwn(input, "warning")) {
            resultObj["--wa"] = "84.71% 0.199 83.87";
          }
          if (!Object.hasOwn(input, "error")) {
            resultObj["--er"] = "71.76% 0.221 22.18";
          }
          if (!Object.hasOwn(input, "base-content")) {
            resultObj["--bc"] = this.generateForegroundColorFrom(input["base-100"], 0.8);
          }
          if (!Object.hasOwn(input, "primary-content")) {
            resultObj["--pc"] = this.generateForegroundColorFrom(input.primary, 0.8);
          }
          if (!Object.hasOwn(input, "secondary-content")) {
            resultObj["--sc"] = this.generateForegroundColorFrom(input.secondary, 0.8);
          }
          if (!Object.hasOwn(input, "accent-content")) {
            resultObj["--ac"] = this.generateForegroundColorFrom(input.accent, 0.8);
          }
          if (!Object.hasOwn(input, "neutral-content")) {
            resultObj["--nc"] = this.generateForegroundColorFrom(input.neutral, 0.8);
          }
          if (!Object.hasOwn(input, "info-content")) {
            if (Object.hasOwn(input, "info")) {
              resultObj["--inc"] = this.generateForegroundColorFrom(input.info, 0.8);
            } else {
              resultObj["--inc"] = "0% 0 0";
            }
          }
          if (!Object.hasOwn(input, "success-content")) {
            if (Object.hasOwn(input, "success")) {
              resultObj["--suc"] = this.generateForegroundColorFrom(input.success, 0.8);
            } else {
              resultObj["--suc"] = "0% 0 0";
            }
          }
          if (!Object.hasOwn(input, "warning-content")) {
            if (Object.hasOwn(input, "warning")) {
              resultObj["--wac"] = this.generateForegroundColorFrom(input.warning, 0.8);
            } else {
              resultObj["--wac"] = "0% 0 0";
            }
          }
          if (!Object.hasOwn(input, "error-content")) {
            if (Object.hasOwn(input, "error")) {
              resultObj["--erc"] = this.generateForegroundColorFrom(input.error, 0.8);
            } else {
              resultObj["--erc"] = "0% 0 0";
            }
          }
          for (const item of Object.entries(themeDefaults.variables)) {
            const [variable, value2] = item;
            if (!Object.hasOwn(input, variable)) {
              resultObj[variable] = value2;
            }
          }
          if (!Object.hasOwn(colorNames, rule)) {
            resultObj[rule] = value;
          }
        }
        return resultObj;
      },
      injectThemes: function(addBase, config, themes2) {
        const includedThemesObj = {};
        const themeRoot = config("daisyui.themeRoot") ?? ":root";
        for (const [theme, value] of Object.entries(themes2)) {
          includedThemesObj[theme] = this.convertColorFormat(value);
        }
        if (Array.isArray(config("daisyui.themes"))) {
          for (const item of config("daisyui.themes")) {
            if (typeof item === "object" && item !== null) {
              for (const [customThemeName, customThemevalue] of Object.entries(item)) {
                includedThemesObj[customThemeName] = this.convertColorFormat(customThemevalue);
              }
            }
          }
        }
        let themeOrder = [];
        if (Array.isArray(config("daisyui.themes"))) {
          for (const theme of config("daisyui.themes")) {
            if (typeof theme === "object" && theme !== null) {
              for (const customThemeName of Object.keys(theme)) {
                themeOrder.push(customThemeName);
              }
            } else if (Object.hasOwn(includedThemesObj, theme)) {
              themeOrder.push(theme);
            }
          }
        } else if (config("daisyui.themes") === true) {
          themeOrder = themeDefaults.themeOrder;
        } else {
          themeOrder = ["light", "dark"];
        }
        const themesToInject = {};
        themeOrder.forEach((themeName, index) => {
          if (index === 0) {
            themesToInject[themeRoot] = includedThemesObj[themeName];
          } else if (index === 1) {
            if (config("daisyui.darkTheme")) {
              if (themeOrder[0] !== config("daisyui.darkTheme") && themeOrder.includes(config("daisyui.darkTheme"))) {
                themesToInject["@media (prefers-color-scheme: dark)"] = {
                  [themeRoot]: includedThemesObj[`${config("daisyui.darkTheme")}`]
                };
              }
            } else if (config("daisyui.darkTheme") === false) {
            } else {
              if (themeOrder[0] !== "dark" && themeOrder.includes("dark")) {
                themesToInject["@media (prefers-color-scheme: dark)"] = {
                  [themeRoot]: includedThemesObj.dark
                };
              }
            }
            themesToInject[`[data-theme=${themeOrder[0]}]`] = includedThemesObj[themeOrder[0]];
            themesToInject[`${themeRoot}:has(input.theme-controller[value=${themeOrder[0]}]:checked)`] = includedThemesObj[themeOrder[0]];
            themesToInject[`[data-theme=${themeOrder[1]}]`] = includedThemesObj[themeOrder[1]];
            themesToInject[`${themeRoot}:has(input.theme-controller[value=${themeOrder[1]}]:checked)`] = includedThemesObj[themeOrder[1]];
          } else {
            themesToInject[`[data-theme=${themeName}]`] = includedThemesObj[themeName];
            themesToInject[`${themeRoot}:has(input.theme-controller[value=${themeName}]:checked)`] = includedThemesObj[themeName];
          }
        });
        addBase(themesToInject);
        return {
          includedThemesObj,
          themeOrder
        };
      }
    };
  }
});

// node_modules/daisyui/src/lib/utility-classes.js
var require_utility_classes = __commonJS({
  "node_modules/daisyui/src/lib/utility-classes.js"(exports2, module2) {
    module2.exports = {
      borderRadius: {
        badge: "var(--rounded-badge, 1.9rem)",
        btn: "var(--rounded-btn, 0.5rem)",
        box: "var(--rounded-box, 1rem)"
      }
    };
  }
});

// node_modules/daisyui/src/theming/index.js
var require_theming = __commonJS({
  "node_modules/daisyui/src/theming/index.js"(exports2, module2) {
    var colorObject2 = {
      "transparent": "transparent",
      "current": "currentColor",
      "primary": "var(--fallback-p,oklch(var(--p)/<alpha-value>))",
      "primary-content": "var(--fallback-pc,oklch(var(--pc)/<alpha-value>))",
      "secondary": "var(--fallback-s,oklch(var(--s)/<alpha-value>))",
      "secondary-content": "var(--fallback-sc,oklch(var(--sc)/<alpha-value>))",
      "accent": "var(--fallback-a,oklch(var(--a)/<alpha-value>))",
      "accent-content": "var(--fallback-ac,oklch(var(--ac)/<alpha-value>))",
      "neutral": "var(--fallback-n,oklch(var(--n)/<alpha-value>))",
      "neutral-content": "var(--fallback-nc,oklch(var(--nc)/<alpha-value>))",
      "base-100": "var(--fallback-b1,oklch(var(--b1)/<alpha-value>))",
      "base-200": "var(--fallback-b2,oklch(var(--b2)/<alpha-value>))",
      "base-300": "var(--fallback-b3,oklch(var(--b3)/<alpha-value>))",
      "base-content": "var(--fallback-bc,oklch(var(--bc)/<alpha-value>))",
      "info": "var(--fallback-in,oklch(var(--in)/<alpha-value>))",
      "info-content": "var(--fallback-inc,oklch(var(--inc)/<alpha-value>))",
      "success": "var(--fallback-su,oklch(var(--su)/<alpha-value>))",
      "success-content": "var(--fallback-suc,oklch(var(--suc)/<alpha-value>))",
      "warning": "var(--fallback-wa,oklch(var(--wa)/<alpha-value>))",
      "warning-content": "var(--fallback-wac,oklch(var(--wac)/<alpha-value>))",
      "error": "var(--fallback-er,oklch(var(--er)/<alpha-value>))",
      "error-content": "var(--fallback-erc,oklch(var(--erc)/<alpha-value>))"
    };
    module2.exports = colorObject2;
  }
});

// node_modules/daisyui/src/index.js
var tailwindPlugin = require_createPlugin();
var postcssJs = require_postcss_js();
var pc = require_picocolors();
var postcssPrefix = require_addPrefix();
var daisyuiInfo = require_package();
var utilities = require_utilities();
var base = require_base();
var unstyled = require_unstyled();
var styled = require_styled();
var utilitiesUnstyled = require_utilities_unstyled();
var utilitiesStyled = require_utilities_styled();
var themes = require_themes();
var colorFunctions = require_functions();
var utilityClasses = require_utility_classes();
var colorObject = require_theming();
var mainFunction = ({ addBase, addComponents, config }) => {
  let logs = false;
  if (config("daisyui.logs") !== false) {
    logs = true;
  }
  if (logs) {
    console.log();
    console.log(`\u{1F33C}   ${pc.magenta("daisyUI")} ${pc.dim(daisyuiInfo.version)}`);
  }
  if (config("daisyui.base") !== false) {
    addBase(base);
  }
  let file = styled;
  if (config("daisyui.styled") === false) {
    file = unstyled;
  }
  const prefix = config("daisyui.prefix");
  let postcssJsProcess;
  if (prefix) {
    try {
      postcssJsProcess = postcssJs.sync(postcssPrefix({ prefix, ignore: [] }));
    } catch (error) {
      logs && console.error(`Error occurred and prevent applying the "prefix" option:`, error);
    }
  }
  const shouldApplyPrefix = prefix && postcssJsProcess;
  if (shouldApplyPrefix) {
    file = postcssJsProcess(file);
  }
  addComponents(file);
  const themeInjector = colorFunctions.injectThemes(addBase, config, themes);
  themeInjector;
  if (config("daisyui.utils") !== false) {
    addComponents(utilities, { variants: ["responsive"] });
    let toAdd = utilitiesUnstyled;
    if (shouldApplyPrefix) {
      toAdd = postcssJsProcess(toAdd);
    }
    addComponents(toAdd, { variants: ["responsive"] });
    toAdd = utilitiesStyled;
    if (shouldApplyPrefix) {
      toAdd = postcssJsProcess(toAdd);
    }
    addComponents(toAdd, { variants: ["responsive"] });
  }
  if (logs) {
    if (config("daisyui.styled") === false) {
      console.log(
        `\u251C\u2500 ${pc.yellow("\u2139\uFE0E")} ${pc.blue("styled")} ${pc.reset("config is")} ${pc.blue(
          "false"
        )} ${pc.dim("	components won't have design decisions")}`
      );
    }
    if (config("daisyui.utils") === false) {
      console.log(
        `\u251C\u2500 ${pc.yellow("\u2139\uFE0E")} ${pc.blue("utils")} ${pc.reset("config is")} ${pc.blue(
          "false"
        )} ${pc.dim("	daisyUI utility classes are disabled")}`
      );
    }
    if (config("daisyui.prefix") && config("daisyui.prefix") !== "") {
      console.log(
        `\u251C\u2500 ${pc.green("\u2714\uFE0E")} ${pc.blue("prefix")} is enabled${pc.dim(
          "		daisyUI classnames must use"
        )} ${pc.blue(config("daisyui.prefix"))} ${pc.dim("prefix")}`
      );
    }
    if (themeInjector.themeOrder.length > 0) {
      console.log(
        `\u251C\u2500 ${pc.green("\u2714\uFE0E")} ${themeInjector.themeOrder.length} ${themeInjector.themeOrder.length > 1 ? "themes" : "theme"} added${pc.dim("		https://daisyui.com/docs/themes")}`
      );
    }
    if (themeInjector.themeOrder.length === 0) {
      console.log(
        `\u251C\u2500 ${pc.yellow("\u2139\uFE0E")} All themes are disabled in config${pc.dim(
          "		https://daisyui.com/docs/themes"
        )}`
      );
    }
    const messages = [
      `${pc.green("\u2764\uFE0E")} ${pc.reset("Support daisyUI project:")}	${pc.dim(
        daisyuiInfo.funding.url
      )}`,
      `${pc.green("\u2605")} ${pc.reset("Star daisyUI on GitHub")}	${pc.dim(
        "https://github.com/saadeghi/daisyui"
      )}`
    ];
    console.log(`\u2570\u2500 ${messages[Math.floor(Math.random() * messages.length)]}`);
    console.log();
  }
};
module.exports = tailwindPlugin(mainFunction, {
  theme: {
    extend: {
      colors: {
        ...colorObject,
        // adding all Tailwind `neutral` shades here so they don't get overridden by daisyUI `neutral` color
        "neutral-50": "#fafafa",
        "neutral-100": "#f5f5f5",
        "neutral-200": "#e5e5e5",
        "neutral-300": "#d4d4d4",
        "neutral-400": "#a3a3a3",
        "neutral-500": "#737373",
        "neutral-600": "#525252",
        "neutral-700": "#404040",
        "neutral-800": "#262626",
        "neutral-900": "#171717",
        "neutral-950": "#0a0a0a"
      },
      ...utilityClasses
    }
  }
});
/*! Bundled license information:

cssesc/cssesc.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)
*/
