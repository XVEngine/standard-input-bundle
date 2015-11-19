(function(namespace, app, globals) {


    namespace.dateInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.dateInputComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                 <xv-date-input>
                    <label>
                        <span class="label fcolor-after"></span>
                    </label>
                    <div class="picker input">
                    </div>
                 </xv-date-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.dateInputComponent.prototype.getDefaultParams = function() {
        return {
            minDate: null,
            maxDate: null
        };
    };


    /**
     * 
     * @returns {undefined}
     */
    namespace.dateInputComponent.prototype.prepare = function() {
        this.initPicker()
    };


    namespace.dateInputComponent.prototype.validators = {

    };


    namespace.dateInputComponent.prototype.prepareDatePicker = function(){
        if(jQuery.datepicker.__xvPrepared) {
            return;
        }

        /**
         * replace next,prev btns
         */
        jQuery.datepicker.__proto__.__generateHTML = jQuery.datepicker.__proto__._generateHTML;
        jQuery.extend(jQuery.datepicker.__proto__, {
            _generateHTML: function (inst) {
                var html = this.__generateHTML.apply(this, arguments);
                html = html.replace(/<span(.*?)ui-icon-circle-triangle-w(.*?)<\/span>/g, "<i class='icon-arrow-left'></i>");
                html = html.replace(/<span(.*?)ui-icon-circle-triangle-e(.*?)<\/span>/g, "<i class='icon-arrow-right'></i>");
                return html;
            }
        });
        jQuery.datepicker.__xvPrepared = true;
    };

    namespace.dateInputComponent.prototype.initPicker = function(){
        this.prepareDatePicker();
        var self = this;
        this.$input.datepicker({
            dateFormat: 'yy-mm-dd',
            showOtherMonths: true,
            firstDay: 1,
            onSelect: function (date) {
                if(self._date === date){
                    self._date = null;
                }else{
                    self._date = date;
                }
                self.refreshClass();
                self.onInput();
            }
        });

        this.$input.datepicker( "option", "dayNamesMin",  this.$input.datepicker("option", "dayNamesShort"));
    };


    namespace.dateInputComponent.prototype.refreshClass = function () {
        this.$input[this._date ? 'removeClass' : 'addClass']("unselected");
        return this;
    };


    namespace.dateInputComponent.prototype.setMinDate = function (val) {
        this.$input.datepicker("option", "minDate", val);
        return this;
    };

    namespace.dateInputComponent.prototype.setMaxDate = function (val) {
        this.$input.datepicker("option", "maxDate", val);
        return this;
    };

    namespace.dateInputComponent.prototype.getValue = function (val) {
        return this._date;
    };

    namespace.dateInputComponent.prototype.setValue = function (val) {
        this._date = val;
        this._date && this.$input.datepicker("setDate", this._date);
        this.refreshClass();
        return this;
    };

    return namespace.dateInputComponent;
})(__ARGUMENT_LIST__);