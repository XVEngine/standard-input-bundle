<?php

namespace XVEngine\Bundle\StandardInputBundle\Component\Input;


use XVEngine\Core\Component\Input\AbstractInputComponent;

/**
 * Class TextInputComponent
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Bundle\StandardInputBundle\Component\Input
 */
class TextInputComponent extends AbstractInputComponent
{

    /**
     * @author Krzysztof Bednarczyk
     */
    public function initialize()
    {
        $this->initValidationMessages();
        $this->setComponentName('input.textInputComponent');
        $this->setType("text");
        parent::initialize();
    }


    /**
     * @author Krzysztof Bednarczyk
     */
    public function initValidationMessages(){
        $this->setValidatorMessage("mustBeEqual", "Fields must be equal");
        $this->setValidatorMessage("maxLength", "Value is too big");
        $this->setValidatorMessage("minLength", "Value is too short");
        $this->setValidatorMessage("required", "This field is required");
        $this->setValidatorMessage("email", "Invalid email address");
        $this->setValidatorMessage("mustValidRegex", "Invalid value");
    }

    /**
     *
     * @param int $size
     * @return TextInputComponent
     */
    public function setMinLength($size = null) {
        $this->setParam('minLength', $size);
        return $this;
    }


    /**
     *
     * @param int $size
     * @return TextInputComponent
     */
    public function setMaxLength($size = null) {
        $this->setParam('maxLength', $size);
        return $this;
    }


    /**
     *
     * @param string $word
     * @return TextInputComponent
     */
    public function mustContain($word = null) {
        $this->setParam('mustContain', $word);
        return $this;
    }


    /**
     *
     * @param string $value
     * @return TextInputComponent
     */
    public function mustBeEqual($value = null) {
        $this->setParam("mustBeEqual", $value);
        return $this;
    }

    /**
     *
     * @param string $value
     * @return TextInputComponent
     */
    public function mustBeNotEqual($value = null) {
        $this->setParam("mustBeNotEqual", $value);
        return $this;
    }


    /**
     *
     * @param array $list
     * @return TextInputComponent
     */
    public function mustBeIn($list = null) {
        $this->setParam("mustBeIn", $list);
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $value
     * @return $this
     */
    public function setPlaceholder($value) {
        $this->setParam("placeholder", $value);
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $value
     * @param null $flags
     * @return $this
     */
    public function mustValidRegex($value, $flags= null) {
        $this->setParam("mustValidRegex", $value);
        $this->setParam("mustValidRegexFlags", $flags);
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $type
     * @return $this
     */
    public function setType($type) {
        $this->setParam("type", $type);
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string[] $list
     * @return $this
     */
    public function setAutocompleteList($list) {
        $this->setParam("list", $list);
        return $this;
    }

}