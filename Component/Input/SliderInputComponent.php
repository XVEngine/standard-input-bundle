<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;

use XVEngine\Core\Component\Input\AbstractInputComponent;


class SliderInputComponent extends AbstractInputComponent
{

    public function initialize()
    {
        $this->setComponentName('form.input.sliderInputComponent');
        parent::initialize();
    }

    /**
     * @param $value
     * @return $this
     */
    public function setTip($value)
    {
        return $this->setParam("tip", $value);
    }

    /**
     * @param $value
     * @return $this
     */
    public function setInverted($value = true)
    {
        return $this->setParam("inverted", !!$value);
    }


    /**
     * @param $value
     * @return $this
     */
    public function setRange($min, $max)
    {
        $this->setParam("range", [
            "min" => (int) $min,
            "max" => (int) $max
        ]);

        return $this;
    }


    /**
     * @param string $value
     * @return $this
     */
    public function setOrientation($value = "horizontal"){
        return $this->setParam("orientation", $value);
    }

    /**
     * @param array $helpers
     * @return $this
     */
    public function setHelpers(array $helpers){
        return $this->setParam("helpers", $helpers);
    }


    /**
     * @param $icon
     * @return $this
     */
    public function setIcon($icon){
        return $this->setParam("icon", $icon);
    }

}
