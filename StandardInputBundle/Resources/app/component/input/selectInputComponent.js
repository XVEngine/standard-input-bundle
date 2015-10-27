(function(namespace, app, globals) {

    namespace.selectInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.selectInputComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                <xv-select-input>
                   <label>
                       <span class="label fcolor-after"></span>
                       <div class='border-color-hover'>
                           <select class="input"></select>
                           <div class="arrow">
                               <i class="icon icon-chevron-down"></i>
                           </div>
                       </div>
                   </label>
                </xv-select-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.selectInputComponent.prototype.getDefaultParams = function() {
        return {
            list: [],
            hightlight : []
        };
    };
    
    
    namespace.selectInputComponent.prototype.prepare = function() {
        this.setHightlightItems(this.params.hightlight);
        this.setList(this.params.list);
        this.bindEvents();
    };
    
    namespace.selectInputComponent.prototype.buildItem = function(item){
        var $option = $("<option>");
        $option.text(item.label);
        $option.attr("value", item.value);
        if(!!~this._hightlight.indexOf(item.value)){
            $option.addClass("fcolor");
        }
        return $option;
    };

    namespace.selectInputComponent.prototype.setHightlightItems = function(items){
        this._hightlight = items;
        return this;
    };
    
    namespace.selectInputComponent.prototype.setLabel = function(label) {
        if(label){
            this.$label.removeClass('dnone');
        }else{
            this.$label.addClass('dnone');
        }
        this.$label.html(label);
        return this;
    };
    
    
    namespace.selectInputComponent.prototype.setList = function(list) {
        var self = this;
        this.$input.find(">*").remove();
        
        list.forEach(function(item){
            self.$input.append(self.buildItem(item));
        });
        return this;
    };



   namespace.selectInputComponent.prototype.validators = {
        "required": function(value) {
            if(!this._required){
                return true;
            }
            
            if(value == null){
                return false;
            }
            return true;
        }
    };

    namespace.selectInputComponent.prototype.bindEvents = function() {
        var self = this;
        this.$input.on("change", function() {
            self.onInput();
        });
    };


    namespace.selectInputComponent.prototype.setValue = function(value) {
        var len = this.$input.find("option").filter(function(){
            return this.value == value;
        }).length;
        
        if(!len){
            return this;
        }
        
        return this._super(arguments.callee)(value);
    };
    
    


    return namespace.selectInputComponent;
})(__ARGUMENT_LIST__);