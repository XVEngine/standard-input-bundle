(function(namespace, app, globals) {

    namespace.textInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.textInputComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
             <xv-text-input class="event-insert">
                <label>
                    <span class="label fcolor-after"></span>
                    <input type="text" class="input" value="">
                </label>
             </xv-text-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.textInputComponent.prototype.getDefaultParams = function() {
        return {
            minLength: null,
            maxLength: null,
            mustContain: null,
            mustBeEqual: null,
            mustBeNotEqual: null,
            mustBeIn: null,
            mustValidRegex: null,
            mustValidRegexFlags: null,
            type: "text",
            "placeholder" : "",
            list : []
        };
    };


    /**
     * 
     * @param {Type} type
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.setType = function(type) {
        this._type = type;
        this._autocompleteList = [];


        if(this._type == "textarea"){
            var $input = $("<textarea>");
            $input.addClass("input");
            this.$input.replaceWith($input);
            this.$input = $input;
            
        }else if (this._type == "tel") {
            this.initTel();
            this.$input.attr("type", "text");
        } else if (this._type == "number") {
            this.initNumber();
            this.$input.attr("type", "text");
        } else if (this._type == "zip") {
            this.initZip();
            this.$input.attr("type", "text");
        } else if (this._type == "currency") {
            this.initCurrency();
            this.$input.attr("type", "text");
            this.$input.css({
                "text-align" : ""
            });
        } else if (this._type == "password") {
            this.initPassword();
            this.$input.attr("type", "password");
        }else if (this._type == "autocomplete") {
            this.initAutocomplete();
            this.$input.attr("type", "text");
        }else{
            this.$input.attr("type", this._type);
        }
        
        return this;
    };
    
    /**
     * 
     * @param {Number} size
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.setMinLength = function(size) {
        this._minLength = size;
        return this;
    };

    /**
     * Binds action to select input text on click/tab
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.setClickSelectAll = function(){
        this.$input.on('focus', function() {
            var $this = $(this)
                .one('mouseup.mouseupSelect', function() {
                    $this.select();
                    return false;
                })
                .one('mousedown', function() {
                    // compensate for untriggered 'mouseup' caused by focus via tab
                    $this.off('mouseup.mouseupSelect');
                })
                .select();
        });
        return this;
    };
    


    /**
     * 
     * @param {Number} size
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.setMaxLength = function(size) {
        this._maxLength = size;
        if (size) {
            this.$input.attr("maxlength", this._maxLength);
        } else {
            this.$input.removeAttr('maxlength');
        }
        return this;
    };

    /**
     * 
     * @param {Number} size
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.setPlaceholder = function(placeholder) {
            this.$input.attr("placeholder", placeholder);
        return this;
    };


 

    
    /**
     * 
     * @param {String} word
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.mustBeEqual = function(word) {
        this._mustBeEqual = word;
        return this;
    };

    /**
     *
     * @param {String} word
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.mustBeNotEqual = function(word) {
        this._mustBeNotEqual = word;
        return this;
    };

    /**
     * 
     * @param {String} word
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.mustContain = function(word) {
        this._mustContain = word;
        return this;
    };

    

    /**
     * 
     * @param {String} word
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.mustBeIn = function(arr) {
        this._mustBeIn = arr;
        return this;
    };

    /**
     * 
     * @param {String} word
     * @returns {_L8.namespace.textInputComponent.prototype}
     */
    namespace.textInputComponent.prototype.mustValidRegex = function(val, flags) {
        flags = flags ? flags : undefined;
        this._mustValidRegex = val ?  new RegExp(val, flags) : null ;
        return this;
    };

    
    namespace.textInputComponent.prototype.validators = {
        "mustBeEqual": function(value) {
            if (this._mustBeEqual) {
                if (this._mustBeEqual != value) {
                    return false;
                }
            }
            return true;
        },
        "mustBeNotEqual": function(value) {
            if (this._mustBeNotEqual) {
                if (this._mustBeNotEqual == value) {
                    return false;
                }
            }
            return true;
        },
        "maxLength": function(value) {
            if (this._maxLength) {
                if (value.length > this._maxLength) {
                    return false;
                }
            }
            return true;
        },
        "minLength": function(value) {
            if (this._minLength) {
                if(value.length == 0){
                    return true; //here should be required type field
                }

                if (value.length < this._minLength) {
                    return false;
                }
            }
            return true;
        },
        "required": function(value) {
            if(!this._required){
                return true;
            }
            
            if(!value){
                return false;
            }
            return true;
        },
        "email" : function(value){
            if(this._type != "email"){
                return true;
            }

            if(value.length == 0){
                return true; //here should be required type field
            }

            return app.utils.validateEmail(value);
        },
        "mustValidRegex" : function(value){
            if(!this._mustValidRegex){
                return true;
            }

            if(value.length == 0){
                return true; //here should be required type field
            }
            
            
            return this._mustValidRegex.test(value);
        }
    };

    /**
     * 
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.prepare = function() {
        this.setType(this.params.type);
        this.setPlaceholder(this.params.placeholder);
        this.setMinLength(this.params.minLength);
        this.setMaxLength(this.params.maxLength);
        this.mustBeIn(this.params.mustBeIn);
        this.mustContain(this.params.mustContain);
        this.mustBeEqual(this.params.mustBeEqual);
        this.mustBeNotEqual(this.params.mustBeNotEqual);
        this.mustValidRegex(this.params.mustValidRegex, this.params.mustValidRegexFlags);
        this.setAutocompleteList(this.params.list);
        this.bindEvents();
    };
    
    
    namespace.textInputComponent.prototype.setValue = function(value) {
        this.$input.val(value);
        return this;
    };
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.bindEvents = function() {
        var self = this;

        this.$input.on("input", function(){
            self.onInput();
        });
        
        this.$input.on("focusout", function(){
            self.showErrorTips();
            self.trigger("onFocusOut");
        });
        
        
        this.$input.on("focusin", function(){
            self.hideTip();
            self.trigger("onFocusIn");
        });

        this.$input.on("keypress", function(e) {
            if(e.keyCode === $.ui.keyCode.ENTER && self._type != "textarea"){
                self.trigger("onEnter");
                return true;
            }

            return true;
        });
        
    };
    

    
    namespace.textInputComponent.prototype.getValue = function() {
        var value = this.$input.val();
        
        if (this._type == "tel" || this._type == "zip") {
            return value.replace(/\D/g, '');
        }

        if (this._type == "currency") {
            var value = value.replace(/[^\d\.]/g, '');
            if((value === "" )){return 0 };
            return parseFloat(value.replace(/[^\d\.]/g, ''));
        }
        
        return value;
    };

    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.initTel = function() {
        this.$input.inputmask({
            mask: [{"mask": "(###) ###-###-###"}, {"mask": "(###) ###-###-###-###"}],
            greedy: false,
            definitions: {'#': {
                    validator: "[0-9]",
                    cardinality: 1
                }}
        });
    };
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.initZip = function() {
        this.$input.inputmask({
            mask: [{"mask": "##-###"}, {"mask": "#####-####"}],
            greedy: false,
            definitions: {'#': {
                    validator: "[0-9]",
                    cardinality: 1
                }}
        });
    };
    
    

    /**
     *
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.initCurrency = function() {
        this.__type = "currency";
        this.$input.inputmask("currency", {
            prefix: "€"
        });
    };



    
    /**
     * 
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.initNumber = function() {
        this.$input.on("keypress", function(e) {
            if(!e.charCode){
                return true;
            }
            if (String.fromCharCode(e.charCode).match(/[^0-9]/g)) {
                return false;
            }
        });
    };
    
    
    /**
     * 
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.initPassword = function() {
        this.$input.on("keypress", function(e) {
            if(e.keyCode === $.ui.keyCode.SPACE){
                return false;
            }
        });
    };


    /**
     *
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.initAutocomplete = function() {
        var self = this;
        this.$input.autoComplete({
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var suggestions = [];
                for (i=0;i<self._autocompleteList.length;i++)
                    if (~self._autocompleteList[i].toLowerCase().indexOf(term)) suggestions.push(self._autocompleteList[i]);
                suggest(suggestions);
            }
        });

        this.$input.on("keypress", function(e) {
            if(e.keyCode === $.ui.keyCode.ENTER){
                self.$input.trigger("blur");
                return true;
            }
        });


    };


    namespace.textInputComponent.prototype.setAutocompleteList = function(list) {
        this._autocompleteList = list;
        return this;
    };
    /**
     * 
     * @returns {undefined}
     */
    namespace.textInputComponent.prototype.setInvalidMessage = function(message) {
        this.setPlaceholder(message);
        this.setValue("");
        return this._super(arguments.callee)(message);
    };


    return namespace.textInputComponent;
})(__ARGUMENT_LIST__);