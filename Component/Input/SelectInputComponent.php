<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;

use XVEngine\Core\Component\Input\AbstractInputComponent;

class SelectInputComponent extends AbstractInputComponent {

    
    public function initialize() {
        $this->setComponentName('form.input.selectInputComponent');
        parent::initialize();
    }

    
    /**
     * 
     * @param array $list
     * @return SelectInputComponent
     */
    public function setList(array $list){
        $this->setParam("list", $list);
        return $this;
    }
    
    
    public static function arrayToList(array $list){
        $result = [];
        foreach($list as $key => $label){
            $result[] = [
                "value" => $key,
                "label" => $label
            ];
        }
        return $result;
    }

}
