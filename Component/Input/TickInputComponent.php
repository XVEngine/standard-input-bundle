<?php


namespace XVEngine\Bundle\StandardInputBundle\Component\Input;


use XVEngine\Core\Component\Input\AbstractInputComponent;

class TickInputComponent extends AbstractInputComponent {

    /**
     * @author Krzysztof Bednarczyk
     */
    public function initialize() {
        $this->setComponentName('form.input.tickInputComponent');
        $this->setValidatorMessage("required", "You must tick this");
        parent::initialize();
    }

}
