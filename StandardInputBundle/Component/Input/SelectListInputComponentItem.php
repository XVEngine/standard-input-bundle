<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;

use JsonSerializable;
use XVEngine\Core\Component\AbstractComponent;


class SelectListInputComponentItem implements JsonSerializable {

    /**
     *
     * @var AbstractComponent
     */
    private $component;


    /**
     *
     * @var string
     */
    private $id = "";


    /**
     *
     * @param AbstractComponent $component
     */
    public function __construct($id, $component = null) {
        $this->setId($id);
        $component && $this->setComponent($component);
    }


    /**
     * @param AbstractComponent $component
     * @return $this
     */
    public function setComponent(AbstractComponent $component){
        $this->component = $component;
        return $this;
    }


    /**
     * @param string $id
     * @return $this
     */
    public function setId($id){
        $this->id = $id;
        return $this;
    }



    /**
     *
     * @return mixed[]
     */
    public function jsonSerialize() {
        return array(
            "component" => $this->component,
            "id" => $this->id,
        );
    }

}
