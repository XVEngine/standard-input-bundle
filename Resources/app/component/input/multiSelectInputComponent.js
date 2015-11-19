(function(namespace, app, globals) {

    namespace.multiSelectInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.multiSelectInputComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                <xv-multi-select-input>
                   <label>
                       <span class="label fcolor-after"></span>
                       <div class='border-color-hover'>
                           <select class="input"></select>
                           <div class="arrow">
                               <i class="icon icon-chevron-down"></i>
                           </div>
                       </div>
                        <div class='selected'>
                        </div>
                   </label>
                </xv-select-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.multiSelectInputComponent.prototype.getDefaultParams = function() {
        return {
            selectLabel : '- select -',
            list: [],
            hightlight : []
        };
    };
    
    
    namespace.multiSelectInputComponent.prototype.prepare = function() {
        this._value = [];
        this._listValues = [];
        this.$selected = this.$element.find("div.selected");

        this.setHightlightItems(this.params.hightlight);
        this.setList(this.params.list);
        this.bindEvents();
    };
    
    namespace.multiSelectInputComponent.prototype.buildItem = function(item){
        var $option = $("<option>");
        $option.text(item.label);
        this._listValues.push(item.value);

        $option.attr("value", this._listValues.length);



        if(!!~this._hightlight.indexOf(item.value)){
            $option.addClass("hightlight");
        }
        return $option;
    };

    namespace.multiSelectInputComponent.prototype.setHightlightItems = function(items){
        this._hightlight = items;
        return this;
    };
    
    
    namespace.multiSelectInputComponent.prototype.setList = function(list) {
        var self = this;
        this.$input.find(">*").remove();
        this._listValues = [];

        var $option = $("<option>");
        $option.attr("value", 0);
        $option.html(this.params.selectLabel);
        this.$input.append($option);


        list.forEach(function(item){
            self.$input.append(self.buildItem(item));
        });

        this._refresh();
        return this;
    };



   namespace.multiSelectInputComponent.prototype.validators = {
        "required": function(value) {
            return true;
        }
    };

    namespace.multiSelectInputComponent.prototype.bindEvents = function() {
        var self = this;
        this.$input.on("change", function() {
            var val = $(this).val();
            if(!val){
                self.onInput();
                return;
            }

            $(this).val(0);
            self._value.push(self._listValues[val-1]);
            self._refresh();
            self.onInput();
        });

        this.$selected.on("click", "> a", function(){
            var val = $(this).attr("value")|0;
            var index = self._value.indexOf(self._listValues[val-1]);
            if(index > -1){
                self._value.splice(index, 1);
            }
            self._refresh();
            return false;
        });
    };


    namespace.multiSelectInputComponent.prototype._refresh  = function(value) {
        var self = this, selected, val, valIndex;

        this.$selected.html("");

        this.$input.find("option").each(function(){
            valIndex = $(this).val()|0;
            if(!valIndex) return;
            val = self._listValues[valIndex-1];
            selected = self._value.indexOf(val) !== -1;
            if(selected){
                var $a = $("<a>");
                $a.attr("href", "#");
                $a.attr("value", valIndex);
                $a.append($("<span>").text($(this).text()));
                $a.append($("<i>").addClass("icon icon-trash-bin"));
                self.$selected.append($a);
            }


            $(this)[selected  ?  'addClass' :  "removeClass"]("selected");
        });
    };


    namespace.multiSelectInputComponent.prototype.getValue = function(value) {
        return this._value;
    };



    namespace.multiSelectInputComponent.prototype.setValue = function(value) {
        if(!app.utils.isArray(value))  value = [];

        this._value = value;
        this._refresh();

        return this;
    };
    
    


    return namespace.multiSelectInputComponent;
})(__ARGUMENT_LIST__);