<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;

use XVEngine\Core\Component\Input\AbstractInputComponent;

class IconInputComponent extends AbstractInputComponent {

    /**
     *
     * @var IconInputComponentItem[] 
     */
    public $icons;


    /**
     * @author Krzysztof Bednarczyk
     */
    public function initialize() {
        $this->setComponentName('input.iconInputComponent');
        $this->setParamByRef("icons", $this->icons);
        parent::initialize();
    }

    
    /**
     * @deprecated
     */
    public function addIcon(IconInputComponentItem $icon) {
        return $this->addItem($icon);
    }

    /**
     *
     * @param IconInputComponentItem $icon
     * @return IconInputComponent
     */
    public function addItem(IconInputComponentItem $icon) {
        $this->icons[] = $icon;
        return $this;
    }

    
}
