(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['contact'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "      <a href=\"#\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"contact\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":31}}}) : helper)))
    + "\">\n  <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"full_name") || (depth0 != null ? lookupProperty(depth0,"full_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"full_name","hash":{},"data":data,"loc":{"start":{"line":2,"column":6},"end":{"line":2,"column":19}}}) : helper)))
    + "</h3>\n  <div>\n    <strong>e-mail:</strong>\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":5,"column":7},"end":{"line":5,"column":16}}}) : helper)))
    + "</p>\n    <strong>Phone:</strong>\n    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"phone_number") || (depth0 != null ? lookupProperty(depth0,"phone_number") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phone_number","hash":{},"data":data,"loc":{"start":{"line":7,"column":7},"end":{"line":7,"column":23}}}) : helper)))
    + "</p>\n    <strong>Tags:</strong>\n    <p>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":12,"column":15}}})) != null ? stack1 : "")
    + "    </p>\n\n  </div>\n  <button class=\"edit-btn\">Edit</button>\n  <button class=\"delete-btn\">Delete</button>\n</div>";
},"useData":true});
templates['form'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "  <h3>Edit Contact:</h3>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  <h3>Create New Contact:</h3>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"'form-field\">\n      <label for=\"full_name\">Full Name: </label>\n      <input type=\"text\" name=\"full_name\" id=\"full_name\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"full_name") || (depth0 != null ? lookupProperty(depth0,"full_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"full_name","hash":{},"data":data,"loc":{"start":{"line":11,"column":64},"end":{"line":11,"column":77}}}) : helper)))
    + "\" required>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"email\">e-mail Address: </label>\n      <input type=\"email\" name=\"email\" id=\"email\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":15,"column":57},"end":{"line":15,"column":66}}}) : helper)))
    + "\" required>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"phone_number\">Phone Number: </label>\n      <input type=\"tel\" name=\"phone_number\" id=\"phone_number\" value=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"phone_number") || (depth0 != null ? lookupProperty(depth0,"phone_number") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phone_number","hash":{},"data":data,"loc":{"start":{"line":19,"column":69},"end":{"line":19,"column":85}}}) : helper)))
    + "\" required>\n    </div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"'form-field\">\n      <label for=\"full_name\">Full Name: </label>\n      <input type=\"text\" name=\"full_name\" id=\"full_name\" required>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"email\">e-mail Address: </label>\n      <input type=\"email\" name=\"email\" id=\"email\" required>\n    </div>\n    <div class=\"form-field\">\n      <label for=\"phone_number\">Phone Number: </label>\n      <input type=\"tel\" name=\"phone_number\" id=\"phone_number\" required>\n    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal-inner\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"full_name") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":2},"end":{"line":6,"column":9}}})) != null ? stack1 : "")
    + "  <form id=\"contact-form\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"full_name") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":34,"column":11}}})) != null ? stack1 : "")
    + "    <div class=\"form-field\">\n      <label for=\"tags\">Tags: </label>\n      <select name=\"tags\" id=\"tags\" multiple>\n        <option id=\"family\" value=\"family\">Family</option>\n        <option id=\"friends\" value=\"friends\">Friends</option>\n        <option id=\"work\" value=\"work\">Work</option>\n        <option id=\"school\" value=\"school\">School</option>\n        <option id=\"other\" value=\"other\">Other</option>\n      </select>\n    </div>\n    <input class=\"submit\" type=\"submit\" value=\"Submit\">\n  </form>\n</div>";
},"useData":true});
})();