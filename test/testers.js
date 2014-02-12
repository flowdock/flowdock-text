var testers = {
  getTester: function(suite, section){
    switch (suite) {
      case "autolink":
        switch (section) {
        case "emails":
          return function(test) {
            return FlowdockText.autoLinkEmails(test.text, { emailClass: 'email-link' });
          }
        case "urls":
          return function(test) {
          return FlowdockText.autoLinkUrlsCustom(test.text);
        };
        case "hashtags":
          return function(test) {
          return FlowdockText.autoLinkHashtags(test.text);
        };
        case "usernames":
          return function(test) {
          return FlowdockText.autoLinkMentions(test.text);
        };
        case "all":
          return function(test) {
          return FlowdockText.autoLink(test.text);
        };
      }
      case "extract":
        switch (section) {
        case "emails":
          return function(test) {
            return FlowdockText.extractEmails(test.text);
          };
        case "emails_with_indices":
          return function(test) {
            return FlowdockText.extractEmailsWithIndices(test.text);
          };
        case "mentions":
          return function(test) {
          return FlowdockText.extractMentions(test.text);
        };
        case "mentions_with_predefined_usertags":
          return function(test) {
          return FlowdockText.extractMentions(test.text, ["@username", "@everyone", "@everybody", "@all", "@anyone", "@anybody"]);
        };
        case "mentions_with_indices":
          return function(test) {
          return FlowdockText.extractMentionsWithIndices(test.text);
        };
        case "mentions_with_indices_with_predefined_usertags":
          return function(test) {
          return FlowdockText.extractMentionsWithIndices(test.text, ["@username", "@everyone", "@everybody", "@all", "@anyone", "@anybody"]);
        };
        case "urls":
          return function(test) {
          return FlowdockText.extractUrls(test.text);
        };
        case "urls_with_indices":
          return function(test) {
          return FlowdockText.extractUrlsWithIndices(test.text);
        };
        case "hashtags":
          return function(test) {
          return FlowdockText.extractHashtags(test.text);
        };
        case "hashtags_with_indices":
          return function(test) {
          return FlowdockText.extractHashtagsWithIndices(test.text);
        };
      }
      case "validate":
        switch (section) {
        case "urls":
          return function(test) {
          return FlowdockText.isValidUrl(test.text);
        };
        case "urls_without_protocol":
          return function(test) {
          return FlowdockText.isValidUrl(test.text, true, false);
        };
      }
      case "get_tags":
        var me = {nick: "Me", id: 1, in_flow: true, disabled: false};
        var user_foo = {nick: "Foo", in_flow: true, id: 2, disabled: false};
        var user_bar = {nick: "Foo-Bar",id: 3, disabled: false};
        var disabled_user = {nick: "Disabled-User",id: 4, disabled: true};//Disabled user!!
        var team_flowdock = {nick: "Flowdock",id: 0, disabled: true}; //Disabled user!!
        var user_not_in_flow = {nick: "Idler", in_flow: false, id: 5, disabled: false}
        var users = [team_flowdock, me, user_foo, user_bar, disabled_user];
        switch (section){
        case "get_tags_from_message":
          return function(test){
            return FlowdockText.parseTags(test.text, users, me);
        };
        case "get_tags_from_message_without_extra_parameters":
          return function(test){
            return FlowdockText.parseTags(test.text);
        };
        case "get_tags_from_message_without_supplied_me":
          return function(test){
            return FlowdockText.parseTags(test.text, users);
        };
        case "get_unread_tags_for_everyone_tag_only_for_users_in_flow":
          return function(test){
            return FlowdockText.parseTags(test.text, users.concat(user_not_in_flow), me)
        };
      }
    }
  }
};
if (typeof module != 'undefined' && module.exports) {
  module.exports = testers;
}
