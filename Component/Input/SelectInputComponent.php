<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;

use XVEngine\Core\Component\Input\AbstractInputComponent;

/**
 * Class SelectInputComponent
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\StandardInputBundle\Component\Input
 */
class SelectInputComponent extends AbstractInputComponent {


    /**
     * @author Krzysztof Bednarczyk
     */
    public function initialize() {
        $this->setComponentName('input.selectInputComponent');
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


    /**
     * @author Krzysztof Bednarczyk
     * @param array $list
     * @return array
     */
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
