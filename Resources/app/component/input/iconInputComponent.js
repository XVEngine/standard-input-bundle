(function(namespace, app, globals) {

    namespace.iconInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.iconInputComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                <xv-icon-input>
                   <label>
                       <span class="label fcolor-after"></span>
                       <div class='icons input'>
                       </div>
                   </label>
                </xv-icon-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.iconInputComponent.prototype.getDefaultParams = function() {
        return {
            icons: [],
            hightlight : []
        };
    };
    
    
    namespace.iconInputComponent.prototype.prepare = function() {
        this.$icons = this.$element.find("> label > div.icons");
        this.setIcons(this.params.icons);
        this.bindEvents();
    };
    
    namespace.iconInputComponent.prototype.buildItem = function(item){
        var $icon = $("<a>");
        $icon.attr("href", "#");
        $icon.addClass("xv-tip-hover");
        $icon.attr("xv-tip", item.label);
        var $i = $("<i>");
        $i.addClass("icon");
        $i.addClass(item.icon);
        $icon.append($i);
        //$icon.attr("title", item.label);
        $icon.attr("value", item.value);
        
        if(item.value == this._value){
            $icon.addClass("active");
        }
        
        return $icon;
    };


    
    namespace.iconInputComponent.prototype.setLabel = function(label) {
        if(label){
            this.$label.removeClass('dnone');
        }else{
            this.$label.addClass('dnone');
        }
        this.$label.html(label);
        return this;
    };
    
    
    namespace.iconInputComponent.prototype.setIcons = function(list) {
        var self = this;
        this.$input.find(">*").remove();
        
        list.forEach(function(item){
            self.$input.append(self.buildItem(item));
        });
        return this;
    };



   namespace.iconInputComponent.prototype.validators = {
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

    namespace.iconInputComponent.prototype.getValue = function () {
        var $item = this.$icons.find(".active").first();
        if (!$item.length) {
            return  null;
        }

        return $item.attr("value");
    };
    
    namespace.iconInputComponent.prototype.setValue = function (value) {
        this._value = value;
        this.$icons.find(">a.active").removeClass("active");
        this.$icons.find(">a").filter(function () {
            return $(this).attr("value") == value;
        }).addClass("active");
        return this;
    };


    namespace.iconInputComponent.prototype.bindEvents = function () {
        var self = this;

        this.$icons.on("click", "> a", function () {
            if(self.isDisabled()){
                return false;
            }
            var $this = $(this);
            if($this.is(".active")){
                return false;
            }
            
            self.setValue($this.attr("value"));
            self.onInput();
            return false;
        });
    };

    
    


    return namespace.iconInputComponent;
})(__ARGUMENT_LIST__);