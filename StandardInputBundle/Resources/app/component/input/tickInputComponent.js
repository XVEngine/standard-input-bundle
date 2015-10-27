(function (namespace, app, globals) {

    namespace.tickInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.tickInputComponent.prototype.getTemplate = function () {
        var tmplString = app.utils.getString(function () {
            //@formatter:off
            /**<string>
             <xv-tick-input>
                <label>
                   <a href="javascript:" class="input">
                        <i class="icon icon-check-mark-2"></i>
                        <i class="icon icon-square-line"></i>
                   </a>
                   <span class="label fcolor-after"></span>
                </label>
             </xv-select-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.tickInputComponent.prototype.getDefaultParams = function () {
        return {
        };
    };


    namespace.tickInputComponent.prototype.prepare = function () {
        this.bindEvents();
    };



    namespace.tickInputComponent.prototype.validators = {
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
     * @param value
     * @returns {namespace.tickInputComponent}
     */
    namespace.tickInputComponent.prototype.setValue = function (value) {
        this.$element[value ? "addClass" : "removeClass" ]("ticked");
        return this;
    };


    namespace.tickInputComponent.prototype.getValue = function (value) {
        return this.$element.is(".ticked") ?  1 : 0;
    };


    namespace.tickInputComponent.prototype.toggleValue = function () {
        return this.$element.toggleClass("ticked");
    };




    namespace.tickInputComponent.prototype.bindEvents = function () {
        var self = this;
        
        this.$element.on("click", function() {
            self.$element.toggleClass("ticked");
            self.onInput();
            self.showErrorTips();
            return true;
        });
        
        
   
        this.$element.on("focusin", function(){
            self.hideTip();
        });
        
        
        
    };

    return namespace.tickInputComponent;
})(__ARGUMENT_LIST__);