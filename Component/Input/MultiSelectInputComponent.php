<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;

use XVEngine\Core\Component\Input\AbstractInputComponent;

/**
 * Class MultiSelectInputComponent
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\StandardInputBundle\Component\Input
 */
class MultiSelectInputComponent extends SelectInputComponent {

    
    public function initialize() {
        parent::initialize();
        $this->setComponentName('input.multiSelectInputComponent');
    }

    /**
     * @author Krzysztof Bednarczyk
     * @param array $value
     * @return $this
     */
    public function setValue($value){
        if(!is_array($value)){
            throw new \InvalidArgumentException("Argument should be a array");
        }

        return parent::setValue($value);
    }

}
