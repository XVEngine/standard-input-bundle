(function(namespace, app, globals) {

    namespace.selectListInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.selectListInputComponent.prototype.getTemplate = function() {
        var tmplString = app.utils.getString(function() {
            //@formatter:off
            /**<string>
                <xv-list-select-input class="event-insert event-resize">
                       <label>
                            <span class="label"></span>
                        </label>
                       <div class="scroll ">
                            <div class="list input">

                                 <footer class="tattoo-footer">
                                    <div>
                                        <i class="icon icon-logo"></i>
                                    </div>
                                 </footer>
                            </div>


                             <div class="empty">
                                <h2> NO RESULTS </h2>
                             </div>
                       </div>

                </xv-list-select-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.selectListInputComponent.prototype.getDefaultParams = function() {
        return {
            items: [],
            disableFooter: false
        };
    };
    

    namespace.selectListInputComponent.prototype.prepare = function() {
        this.$scroll = this.$element.find(".scroll");
        this.$list = this.$scroll.find(".list");
        this.disableFooter(this.params.disableFooter);
        this.setItems(this.params.items);
        this.bindEvents();

        this.refreshCount();
    };

    
    
    namespace.selectListInputComponent.prototype.clear = function() {
        this.$list.find("> .item").remove();
        return true;
    };

    namespace.selectListInputComponent.prototype.setItems = function(items) {
        var self = this;
        var worker = app.utils.getResolved();
        this.clear();
        items.forEach(function(item){
            worker = worker.then(function(){
                return self.addItem(item);
            });
        });
        worker = worker.then(function(){
            return true;
        });

        return worker;
    };





    namespace.selectListInputComponent.prototype.generateItem = function(item) {
        var self = this;
        var $item = $("<div>");
        $item.addClass("item");
        $item.attr("item-id", item.id);

        return app.utils.buildComponent(item.component).then(function($html){
            $item.html($("<div>").html($html));
            return $item;
        });
    };

    namespace.selectListInputComponent.prototype.disableFooter = function(value) {
        this.$element[value ? 'addClass' : 'removeClass']("without-footer");
        return this;
    };

    namespace.selectListInputComponent.prototype.addItem = function(item, position) {
        var self = this;
        return this.generateItem(item).then(function($item){
            var $current  = self.$list.find("> .item").filter(function(){
               return $(this).attr("item-id") == item.id;
            });

            if($current.length){
                $current.replaceWith($item);
                return true;
            }

            position = app.utils.ifsetor(position, "append");
            self.$list[position]($item);

            self.refreshSelected();
            return true;
        });
    };

    namespace.selectListInputComponent.prototype.removeItem = function(id) {
        var $items = this.$list.find(" > .item").filter(function(){
            return id ==  $(this).attr("item-id") ;
        }).remove();
        this.refreshSelected();
        this.update();
        return this;
    };


    namespace.selectListInputComponent.prototype.setValue = function(value) {
        this._value = value;
        this.refreshSelected();
        return this;
    };

    namespace.selectListInputComponent.prototype.refreshSelected = function() {
        var self = this;
        var $items = this.$list.find(" > .item");
        $items.removeClass("active");
        $items.filter(function(){
            return self._value ==  $(this).attr("item-id") ;
        }).addClass("active");

        this.refreshCount();
        return this;
    };

    namespace.selectListInputComponent.prototype.refreshCount = function() {
        var length = this.$list.find(" > .item").length;
        this.$element.alterClass("count-*", "count-"+length);
        return this;
    };

    namespace.selectListInputComponent.prototype.getValue = function() {
        return this.$list.find(" > .item.active").attr("item-id");
    };


    /**
     * Update scrollbar position
     * @returns {namespace.selectListInputComponent}
     */
    namespace.selectListInputComponent.prototype.update = function() {
        this.$scroll.perfectScrollbar("update");
        return this;
    };




    namespace.selectListInputComponent.prototype.validators  = {};



    namespace.selectListInputComponent.prototype.bindEvents = function() {
        var self = this;

        this.$element.on("event-insert", function(){
            setTimeout(function(){
                self.update();
            }, 600);
            if(self.$scroll.is(".ps-container")){
                self.update();
                return;
            }
           self.$scroll.perfectScrollbar();

        });

        var resizeTimeout = null;
        this.$element.on("event-resize", function(){
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function(){
                if(self.$scroll.is(".ps-container")){
                    self.update();
                    return;
                }
            }, 200);

        });

        this.$list.on("click", " > .item:not(.active)" , function(e){
            if(self.isDisabled()){
                return false;
            }
            var $target = $(e.target);

            if($target.is(".clickable")){
                return true;
            }

            self.setValue($(this).attr("item-id"));
            self.onInput();
            return false;
        });

        this.$list.on("click", " > footer" , function(){
            self.$scroll.scrollTop(0);
            self.update();
            return false;
        });

    };





    return namespace.selectListInputComponent;
})(__ARGUMENT_LIST__);