(function (namespace, app, globals) {

    namespace.checkboxInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.checkboxInputComponent.prototype.getTemplate = function () {
        var tmplString = app.utils.getString(function () {
            //@formatter:off
            /**<string>
                 <xv-checkbox-input>
                    <div class="input">

                    </div>
                 </xv-checkbox-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.checkboxInputComponent.prototype.getDefaultParams = function () {
        return {
            list : []
        };
    };


    namespace.checkboxInputComponent.prototype.prepare = function () {
        this.setList(this.params.list);
        this.bindEvents();
    };



    namespace.checkboxInputComponent.prototype.validators = {
        "required": function (value) {
            if (!this._required) {
                return true;
            }

            return !!value;
        }
    };


    namespace.checkboxInputComponent.prototype.setValue = function (value) {
        this.$input.find("> a.active").removeClass("active");

        if (!$.isArray(value)) {
            return this;
        }



        this.$input.find("> a").each(function(){
            var v = $(this).attr("radio-id");
            if(jQuery.inArray(v, value) !== -1 ){
                $(this).addClass("active");
            }
        });

        return this;
    };


    namespace.checkboxInputComponent.prototype.getValue = function () {

        var value = [];
        this.$input.find("> a.active").each(function(){
            value.push($(this).attr("radio-id"));
        });

        return value;
    };


    namespace.checkboxInputComponent.prototype.bindEvents = function () {
        var self = this;

        this.$input.on("click", " > a", function(){
            $(this).toggleClass("active");
            self.onInput();
            return false;
        });
    };

    namespace.checkboxInputComponent.prototype.setValue = function (arr) {

        return this;
    };

    namespace.checkboxInputComponent.prototype.setList = function (list) {
        var self = this;
        this.$input.html("");
        list.forEach(function(item){
            var $item = $("<a>");
            $item.attr("href", "javascript:");
            $item.html(item.label);
            $item.attr("radio-id", item.key);
            self.$input.append($item);
        });

        this.setValue(this.__value);
    };

    return namespace.checkboxInputComponent;
})(__ARGUMENT_LIST__);