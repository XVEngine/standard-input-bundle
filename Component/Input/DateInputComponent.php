<?php


namespace XVEngine\Bundle\StandardInputBundle\Component\Input;
use XVEngine\Core\Component\Input\AbstractInputComponent;


/**
 * Class DateInputComponent
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\StandardInputBundle\Component\Input
 */
class DateInputComponent extends AbstractInputComponent {


    /**
     * @author Krzysztof Bednarczyk
     */
    public function initialize() {
        $this->setComponentName('input.dateInputComponent');
        parent::initialize();
    }

}
