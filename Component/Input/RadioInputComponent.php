<?php


namespace XVEngine\Bundle\StandardInputBundle\Component\Input;


use XVEngine\Core\Component\Input\AbstractInputComponent;

class RadioInputComponent extends AbstractInputComponent {

    public function initialize() {
        $this->setComponentName('input.radioInputComponent');
        $this->setValidatorMessage("required", "You must select one of option");
        parent::initialize();
    }


    /**
     * @param array $list
     */
    public function setList(array $list){
        $this->setParam("list", $list);
    }


    /**
     * @param $arr
     */
    public static function arrayToList($arr){
        $result = [];
        foreach($arr as $key => $label){
            $result[] = [
                "key" => $key,
                "label" => $label
            ];
        }

        return $result;
    }
}
