define([], function () {
  "use strict";
  return function () {
    return function (scribe) {
      var insertHTMLCommandPatch = new scribe.api.CommandPatch('insertHTML');
      var nodeHelpers = scribe.node;

      insertHTMLCommandPatch.execute = function (value) {
        scribe.transactionManager.run(function () {
          var selection = new scribe.api.Selection();
          var parent = document.createElement('div');
          parent.innerHTML = value;

          selection.range.insertNode(parent);
        }.bind(this));
      };

      scribe.commandPatches.insertHTML = insertHTMLCommandPatch;
    };
  };

});
