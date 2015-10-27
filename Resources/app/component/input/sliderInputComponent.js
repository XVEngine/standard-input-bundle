(function (namespace, app, globals) {

    namespace.sliderInputComponent = app.newClass({
        extend: function () {
            return app.core.component.input.abstractInputComponent;
        }
    });

    namespace.sliderInputComponent.prototype.validators = {};

    namespace.sliderInputComponent.prototype.getTemplate = function () {
        var tmplString = app.utils.getString(function () {
            //@formatter:off
            /**<string>
             <xv-slider-input>
                 <div class="input"></div>
                 <div class="helpers"></div>
             </xv-slider-input>
             </string>*/
            //@formatter:on
        });
        return $(tmplString);
    };

    namespace.sliderInputComponent.prototype.getDefaultParams = function () {
        return {
            icon: "icon-horizontal",
            helpers: [0, 100],
            range: {min: 0, max: 100},
            orientation: 'horizontal',
            inverted : false
        };
    };


    namespace.sliderInputComponent.prototype.prepare = function () {
        this._icon = null;
        this.setInverted(this.params.inverted);
        this.initSlider();

        this.$helpers = this.$element.find(" > .helpers");
        this.setIcon(this.params.icon);
        this.setHelpers(this.params.helpers);
        this.setRange(this.params.range.min , this.params.range.max);
        this.setOrientation(this.params.orientation);
        this.params.tip && this.setTip(this.params.tip);

        this.bindEvents();
    };

    namespace.sliderInputComponent.prototype.setInverted = function (value) {
        this._inverted = !!value;
        return this;
    };

    namespace.sliderInputComponent.prototype.setCenterValue = function (value) {
        this._centerValue = value;
        return this;
    };

    namespace.sliderInputComponent.prototype.setIcon = function (icon) {
        this._icon = icon;
        this.refreshIcon();
        return this;
    };

    namespace.sliderInputComponent.prototype.refreshIcon = function (icon) {
        this.$span = $("<span>");
        var $i = $("<i>");
        $i.html(this.$span);
        $i.addClass("icon");
        $i.addClass(this._icon);
        this.$input.find(".noUi-handle").html($i);
        return this;
    };


    namespace.sliderInputComponent.prototype.getValue = function () {
        return this.convertValue(this.$input.val());
    };


    namespace.sliderInputComponent.prototype.convertValue = function (value) {
        if(!this._inverted){
            return Number(value);
        }

        var normalDistance = value - this._range.min;


        return Number(this._range.max - (normalDistance));
    };


    namespace.sliderInputComponent.prototype.setValue = function (value) {
        var self = this;
        this.$input.val(this.convertValue(value));
        setTimeout(function(){
            self.detectCenter();
        }, 50);
        this.refreshValue();
        return this;
    };


    namespace.sliderInputComponent.prototype.setTip = function (value) {
        return this.$input.find(".noUi-handle ").addClass("xv-tip-hover").attr("xv-tip", value);
    };

    namespace.sliderInputComponent.prototype.setRange = function (min, max) {
        this._range  =  {
            'min': Number(min),
            'max': Number(max)
        };

        this.$input.noUiSlider({
            range: this._range
        }, true);
        this.refreshIcon();
        return this;
    };

    namespace.sliderInputComponent.prototype.setOrientation = function (value) {
        value = app.utils.ifsetor(value, true);
        this.$element.addClass(value);
        this.$input.noUiSlider({
            orientation: value
        }, true);
        this.refreshIcon();
        return this;
    };


  namespace.sliderInputComponent.prototype.setHelpers = function (helpers) {
      var self = this;
      this.$helpers.html("");
      var $box = $("<div>");
      this.$helpers.html($box);

      helpers.forEach(function(item){
          var $i = $("<i>");
          var percent = item+"%";

          $i.css({
              "top" : percent,
              "left" : percent
          });
          $box.append($i);

          $i.on("click", function () {
              self.setValue(self.percentToValue((item|0)/100));
              self.onInput();
              return false;
          });

      })
    };


    namespace.sliderInputComponent.prototype.initSlider = function () {
        var self = this;
        this.$input.noUiSlider({
            start: 127,
            range: {
                'min': 0,
                'max': 255
            }
        });

        var lastMove = 0;

        this.$input.on("slide", function () {
            var currentTime = (new Date()).getTime();
            if((currentTime - lastMove) > 300){
                self.trigger("onStart");
            }
            lastMove = currentTime;



            self.onInput();
            self.refreshValue();
            self.detectCenter();
        });

        return this;
    };



    namespace.sliderInputComponent.prototype.percentToValue = function (percent) {
        if(this._inverted){
            percent = 1-percent;
        }
        return ((this._range.max - this._range.min) * percent)  + this._range.min;
    };


    namespace.sliderInputComponent.prototype.refreshValue = function () {
        if(!this.$span){
            return false;
        }

        this.$span.text(Math.round(this.$input.val()));
        return true;
    };



    namespace.sliderInputComponent.prototype.bindEvents = function () {
        var self = this;
        this.$element.on("dblclick", ".noUi-handle",  function(){
            if(typeof self._centerValue === "number"){
                self.setValue(self._centerValue);
            }else{
                self.setValue(self.percentToValue(0.5));
            }
            self.onInput();
            return false;
        });

        return this;
    };


    namespace.sliderInputComponent.prototype.detectCenter = function () {
        var distance = this._range.max - this._range.min;
        var center = this.percentToValue(0.5);
        var toleration = (distance*0.01);
        var isBetween = this.getValue().between(center-toleration, center+toleration);

        this.$element[isBetween ? "addClass" : "removeClass"]("centered");
    };

    return namespace.sliderInputComponent;
})(__ARGUMENT_LIST__);