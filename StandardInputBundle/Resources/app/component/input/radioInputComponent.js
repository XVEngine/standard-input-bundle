(function (namespace, app, globals) {

    namespace.radioInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.radioInputComponent.prototype.getTemplate = function () {
        var tmplString = app.utils.getString(function () {
            //@formatter:off
            /**<string>
             <xv-radio-input>
                <div class="input">

                </div>
             </xv-radio-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.radioInputComponent.prototype.getDefaultParams = function () {
        return {
            list : []
        };
    };


    namespace.radioInputComponent.prototype.prepare = function () {
        this.setList(this.params.list);
        this.bindEvents();
    };



    namespace.radioInputComponent.prototype.validators = {
        "required": function (value) {
            if (!this._required) {
                return true;
            }

            if (!value) {
                return false;
            }
            return true;
        }
    };


    /**
     * 
     * @param {boolean} value
     * @returns {tickInputComponent_L1.namespace.selectInputComponent.prototype}
     */
    namespace.radioInputComponent.prototype.setValue = function (value) {
        this.$element[value ? "addClass" : "removeClass" ]("ticked");
        return this;
    };


    namespace.radioInputComponent.prototype.getValue = function (value) {
        return this.$input.find("> a.active").attr("radio-id");
    };


    namespace.radioInputComponent.prototype.bindEvents = function () {
        var self = this;

        this.$input.on("click", " > a", function(){

            var value = $(this).is(".active") && !self.isRequired() ? null : $(this).attr("radio-id");
            self.setValue(value);
            self.onInput();
            return false;
        });
    };

    namespace.radioInputComponent.prototype.setValue = function (id) {
        this.__value = id;
        var $radios = this.$input.find(" > a");
        $radios.removeClass("active");

        $radios.filter(function(){
            return $(this).attr("radio-id") == id;
        }).addClass("active");

        return this;
    };

    namespace.radioInputComponent.prototype.setList = function (list) {
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

    return namespace.radioInputComponent;
})(__ARGUMENT_LIST__);