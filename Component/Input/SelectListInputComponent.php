<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;

use XVEngine\Core\Component\Input\AbstractInputComponent;

class SelectListInputComponent extends AbstractInputComponent {

    private $items = [];
    
    public function initialize() {
        $this->setComponentName('input.selectListInputComponent');
        $this->setParamByRef("items", $this->items);
        parent::initialize();
    }


    /**
     * @param bool $value
     * @return $this
     */
    public function disableFooter($value = false){
        $this->setParam("disableFooter", !!$value);
        return $this;
    }

    public function addItem(SelectListInputComponentItem $item){
        $this->items[] = $item;
        return $this;
    }
}
