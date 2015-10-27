<?php
/**
 * @author Krzysztof Bednarczyk
 * User: devno
 * Date: 27.10.2015
 * Time: 14:04
 */

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;


use JsonSerializable;

class IconInputComponentItem implements JsonSerializable {

    /**
     *
     * @var string
     */
    public $value = null;

    /**
     *
     * @var string
     */
    public $icon = null;

    /**
     *
     * @var string
     */
    public $label = "";

    /**
     *
     * @param string $value
     * @param string $icon
     * @param string $label
     */
    public function __construct($value = null, $icon = null, $label = null) {
        $this->setIcon($icon);
        $this->setValue($value);
        $this->setLabel($label);
    }


    /**
     *
     * @param string $icon
     * @return IconInputComponentItem
     */
    public function setIcon($icon) {
        $this->icon = $icon;
        return $this;
    }

    /**
     *
     * @param string $value
     * @return IconInputComponentItem
     */
    public function setValue($value){
        $this->value = $value;

        return $this;
    }

    /**
     *
     * @param string $label
     * @return IconInputComponentItem
     */
    public function setLabel($label){
        $this->label = $label;

        return $this;
    }

    /**
     *
     * @return string[]
     */
    public function jsonSerialize() {
        return array(
            "value" => $this->value,
            "icon" => $this->icon,
            "label" => $this->label
        );
    }

}
