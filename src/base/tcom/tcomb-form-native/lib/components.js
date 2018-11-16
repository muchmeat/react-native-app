"use strict";

import React from "react";
import t from "tcomb-validation";
import {
  humanize,
  merge,
  getTypeInfo,
  getOptionsOfEnum,
  move,
  UIDGenerator,
  getTypeFromUnion,
  getComponentOptions
} from "./util";

let SOURCE = "tcomb-form-native";
let nooptions = Object.freeze({});
let noop = function() {};
let noobj = Object.freeze({});
let noarr = Object.freeze([]);
let Nil = t.Nil;

function getFormComponent(type, options) {
  if (options.factory) {
    return options.factory;
  }
  if (type.getTcombFormFactory) {
    return type.getTcombFormFactory(options);
  }
  let name = t.getTypeName(type);
  switch (type.meta.kind) {
    case "irreducible":
      return type === t.File ?  ImagePicker : type === t.Boolean
        ? Checkbox
        : type === t.Date ? DatePicker : Textbox;
    case "struct":
      return Struct;
    case "list":
      return List;
    case "enums":
      return Select;
    case "maybe":
    case "subtype":
      return getFormComponent(type.meta.type, options);
    default:
      t.fail(`[${SOURCE}] unsupported type ${name}`);
  }
}

function sortByText(a, b) {
  return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
}

function getComparator(order) {
  return {
    asc: sortByText,
    desc: (a, b) => -sortByText(a, b)
  }[order];
}

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.typeInfo = getTypeInfo(props.type);
    this.state = {
      hasError: false,
      // value: (mode == 'date' || mode == 'datetime') ? null : this.getTransformer().format(props.value)
      value: this.getTransformer().format(props.value),
      position:{}
    };
  }

  getTransformer() {
    return this.props.options.transformer || this.constructor.transformer;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let should =
      nextState.value !== this.state.value ||
      nextState.hasError !== this.state.hasError ||
      nextProps.options !== this.props.options ||
      nextProps.type !== this.props.type;
    return should;
  }

  componentWillReceiveProps(props) {
    if (props.type !== this.props.type) {
      this.typeInfo = getTypeInfo(props.type);
    }
    this.setState({ value: this.getTransformer().format(props.value) });
  }

  onChange(value) {
    this.setState({ value }, () =>{
        this.props.onChange(value, this.props.ctx.path);
        this.changeAfter(value);
    });
  }

  changeAfter(newDate){
      if(this.props.options.changeAfter)
          this.props.options.changeAfter(newDate);
  }

  getValidationOptions() {
    return {
      path: this.props.ctx.path,
      context: t.mixin(
        t.mixin({}, this.props.context || this.props.ctx.context),
        { options: this.props.options }
      )
    };
  }

  getValue() {
    return this.getTransformer().parse(this.state.value);
  }

  isValueNully() {
    return Nil.is(this.getValue());
  }

  removeErrors() {
    this.setState({ hasError: false });
  }

  pureValidate() {
    return t.validate(
      this.getValue(),
      this.props.type,
      this.getValidationOptions()
    );
  }

  validate() {
    let result = this.pureValidate();
    this.setState({ hasError: !result.isValid() });
    return result;
  }

  getAuto() {
    return this.props.options.auto || this.props.ctx.auto;
  }

  getI18n() {
    return this.props.options.i18n || this.props.ctx.i18n;
  }

  getDefaultLabel() {
    let ctx = this.props.ctx;
    if (ctx.label) {
      return (
        ctx.label +
        (this.typeInfo.isMaybe
          ? this.getI18n().optional
          : this.getI18n().required)
      );
    }
  }

  getLabel() {
    let label = this.props.options.label || this.props.options.legend;
    if (Nil.is(label) && this.getAuto() === "labels") {
      label = this.getDefaultLabel();
    }
    return label;
  }

  getError() {
    if (this.hasError()) {
      let error =
        this.props.options.error || this.typeInfo.getValidationErrorMessage;
      if (t.Function.is(error)) {
        let validationOptions = this.getValidationOptions();
        return error(
          this.getValue(),
          validationOptions.path,
          validationOptions.context
        );
      }
      return error;
    }
  }

  hasError() {
    return this.props.options.hasError || this.state.hasError;
  }

  getConfig() {
    return merge(this.props.ctx.config, this.props.options.config);
  }

  getStylesheet() {
    return this.props.options.stylesheet || this.props.ctx.stylesheet;
  }

  getLocals() {
    return {
      isMaybe:this.typeInfo.isMaybe,
      path: this.props.ctx.path,
      error: this.getError(),
      hasError: this.hasError(),
      label: this.getLabel(),
      onChange: this.onChange.bind(this),
      changeAfter: this.changeAfter.bind(this),
      config: this.getConfig(),
      value: this.state.value,
      hidden: this.props.options.hidden,
      stylesheet: this.getStylesheet()
    };
  }

  render() {
    let locals = this.getLocals();
    // getTemplate is the only required implementation when extending Component
    t.assert(
      t.Function.is(this.getTemplate),
      `[${SOURCE}] missing getTemplate method of component ${this.constructor
        .name}`
    );
    let template = this.getTemplate();
    return template(locals);
  }
}

Component.transformer = {
  format: value => (Nil.is(value) ? null : value),
  parse: value => value
};

function toNull(value) {
  return (t.String.is(value) && value.trim() === "") || Nil.is(value)
    ? null
    : value;
}

function parseNumber(value) {
  let n = parseFloat(value);
  let isNumeric = value - n + 1 >= 0;
  return isNumeric ? n : toNull(value);
}

class Textbox extends Component {
  getTransformer() {
    let options = this.props.options;
    return options.transformer
      ? options.transformer
      : this.typeInfo.innerType === t.Number
        ? Textbox.numberTransformer
        : Textbox.transformer;
  }

  getTemplate() {
    return this.props.options.template || this.props.ctx.templates.textbox;
  }

  getPlaceholder() {
    let placeholder = this.props.options.placeholder;
    if (Nil.is(placeholder) && this.getAuto() === "placeholders") {
      placeholder = this.getDefaultLabel();
    }
    return placeholder;
  }

  getKeyboardType() {
    let keyboardType = this.props.options.keyboardType;
    if (t.Nil.is(keyboardType) && this.typeInfo.innerType === t.Number) {
      return "numeric";
    }
    return keyboardType;
  }

  onChange(value) {
      this.setState({ value }, () =>{
          this.props.onChange(value, this.props.ctx.path);
          this.changeAfter(value);
      });
  }

  getLocals() {
    let locals = super.getLocals();
    locals.placeholder = this.getPlaceholder();
    locals.onChangeNative = this.props.options.onChange;
    locals.keyboardType = this.getKeyboardType();
    locals.underlineColorAndroid =
      this.props.options.underlineColorAndroid || "transparent";
    [
      "help",
      "mode",
      "autoCapitalize",
      "autoCorrect",
      "autoFocus",
      "blurOnSubmit",
      "editable",
      "maxLength",
      "multiline",
      "onBlur",
      "onEndEditing",
      "onFocus",
      "onLayout",
      "onSelectionChange",
      "onSubmitEditing",
      "onContentSizeChange",
      "placeholderTextColor",
      "secureTextEntry",
      "selectTextOnFocus",
      "selectionColor",
      "numberOfLines",
      "clearButtonMode",
      "clearTextOnFocus",
      "enablesReturnKeyAutomatically",
      "keyboardAppearance",
      "onKeyPress",
      "returnKeyType",
      "selectionState"
    ].forEach(name => (locals[name] = this.props.options[name]));

    return locals;
  }
}

Textbox.transformer = {
  format: value => (Nil.is(value) ? "" : value),
  parse: toNull
};

Textbox.numberTransformer = {
  format: value => (Nil.is(value) ? "" : String(value)),
  parse: parseNumber
};

class Checkbox extends Component {
  getTemplate() {
    return this.props.options.template || this.props.ctx.templates.checkbox;
  }

  getLocals() {
    let locals = super.getLocals();
    locals.label =
      this.props.ctx.auto !== "none"
        ? locals.label || this.getDefaultLabel()
        : null;

    ["help", "disabled", "onTintColor", "thumbTintColor", "tintColor"].forEach(
      name => (locals[name] = this.props.options[name])
    );

    return locals;
  }
}

Checkbox.transformer = {
  format: value => (Nil.is(value) ? false : value),
  parse: value => value
};

class Select extends Component {
  getTransformer() {
    let options = this.props.options;
    if (options.transformer) {
      return options.transformer;
    }
    return Select.transformer(this.getNullOption());
  }

  getTemplate() {
    return this.props.options.template || this.props.ctx.templates.select;
  }

  getNullOption() {
    return this.props.options.nullOption || { value: "", text: " - " };
  }

  getEnum() {
    return this.typeInfo.innerType;
  }

  getOptions() {
    let options = this.props.options;
    let items = options.options
      ? options.options.slice()
      : getOptionsOfEnum(this.getEnum());
    if (options.order) {
      items.sort(getComparator(options.order));
    }
    let nullOption = this.getNullOption();
    if (options.nullOption !== false) {
      items.unshift(nullOption);
    }
    return items;
  }

  getLocals() {
    let locals = super.getLocals();
    locals.options = this.getOptions();

    ["help", "enabled", "mode", "prompt", "itemStyle"].forEach(
      name => (locals[name] = this.props.options[name])
    );

    return locals;
  }
}

Select.transformer = nullOption => {
  return {
    format: value =>
      Nil.is(value) && nullOption ? nullOption.value : String(value),
    parse: value => (nullOption && nullOption.value === value ? null : value)
  };
};

class DatePicker extends Component {
  getTemplate() {
    return this.props.options.template || this.props.ctx.templates.datepicker;
  }

  getLocals() {
    let locals = super.getLocals();
    [
      "help",
      "disabled",
      "changeAfter",
      "maximumDate",
      "minimumDate",
      "minuteInterval",
      "mode",
      "timeZoneOffsetInMinutes",
      "onPress"
    ].forEach(name => (locals[name] = this.props.options[name]));

    return locals;
  }

}

DatePicker.transformer = {
  format: value => (Nil.is(value) ? null: value),
  parse: value => value
};

class Struct extends Component {
  isValueNully() {
    return Object.keys(this.refs).every(ref => this.refs[ref].isValueNully());
  }

  removeErrors() {
    this.setState({ hasError: false });
    Object.keys(this.refs).forEach(ref => this.refs[ref].removeErrors());
  }

  getValue() {
    let value = {};
    for (let ref in this.refs) {
      value[ref] = this.refs[ref].getValue();
    }
    return this.getTransformer().parse(value);
  }

  validate() {
    let value = {};
    let errors = [];
    let hasError = false;
    let result;

    if (this.typeInfo.isMaybe && this.isValueNully()) {
      this.removeErrors();
      return new t.ValidationResult({ errors: [], value: null });
    }

    for (let ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        result = this.refs[ref].validate();
        errors = errors.concat(result.errors);
        value[ref] = result.value;
      }
    }

    if (errors.length === 0) {
      let InnerType = this.typeInfo.innerType;
      value = new InnerType(value);
      if (this.typeInfo.isSubtype && errors.length === 0) {
        result = t.validate(
          value,
          this.props.type,
          this.getValidationOptions()
        );
        hasError = !result.isValid();
        errors = errors.concat(result.errors);
      }
    }

    this.setState({ hasError: hasError });
    return new t.ValidationResult({ errors, value });
  }

  onChange(fieldName, fieldValue, path) {
    let value = t.mixin({}, this.state.value);
    value[fieldName] = fieldValue;
    this.setState({ value }, () => {
      this.props.onChange(value, path);
    });
  }

  getTemplates() {
    return merge(this.props.ctx.templates, this.props.options.templates);
  }

  getTemplate() {
    return this.props.options.template || this.getTemplates().struct;
  }

  getTypeProps() {
    return this.typeInfo.innerType.meta.props;
  }

  getOrder() {
    return this.props.options.order || Object.keys(this.getTypeProps());
  }

  getInputs() {
    let { ctx, options } = this.props;
    let props = this.getTypeProps();
    let auto = this.getAuto();
    let i18n = this.getI18n();
    let config = this.getConfig();
    let value = this.state.value || {};
    let templates = this.getTemplates();
    let stylesheet = this.getStylesheet();
    let inputs = {};
    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        let type = props[prop];
        let propValue = value[prop];
        let propType = getTypeFromUnion(type, propValue);
        let fieldsOptions = options.fields || noobj;
        let propOptions = getComponentOptions(
          fieldsOptions[prop],
          noobj,
          propValue,
          type
        );
        inputs[prop] = React.createElement(
          getFormComponent(propType, propOptions),
          {
            key: prop,
            ref: prop,
            type: propType,
            options: propOptions,
            value: value[prop],
            onChange: this.onChange.bind(this, prop),
            ctx: {
              context: ctx.context,
              uidGenerator: ctx.uidGenerator,
              auto,
              config,
              label: humanize(prop),
              i18n,
              stylesheet,
              templates,
              path: this.props.ctx.path.concat(prop)
            }
          }
        );
      }
    }
    return inputs;
  }

  getLocals() {
    let templates = this.getTemplates();
    let locals = super.getLocals();
    locals.order = this.getOrder();
    locals.inputs = this.getInputs();
    locals.template = templates.struct;
    return locals;
  }
}

function toSameLength(value, keys, uidGenerator) {
  if (!value || value.length === keys.length) {
    return keys;
  }
  let ret = [];
  for (let i = 0, len = value.length; i < len; i++) {
    ret[i] = keys[i] || uidGenerator.next();
  }
  return ret;
}

class List extends Component {
  constructor(props) {
     super(props);
     this.first = true;
     this.state.images = [];
     this.oldLen = 0;         //
     this.oldImages = [];     //表单通过value配置带入的图片数组
     this.old = [];           //表单通过value配置带入的图片对象
     this.oldRemoveId = [];   //删除的图片数组id
     this.addImages = [];     //新增的图片数组
     this.state.keys = this.state.value.map(() => props.ctx.uidGenerator.next());
  }

  // componentWillReceiveProps(props) {
  //
  //     if (props.type !== this.props.type) {
  //       this.typeInfo = getTypeInfo(props.type);
  //     }
  //     let value = this.getTransformer().format(props.value);
  //     if(value === )
  //     this.setState({
  //         value,
  //         keys: toSameLength(value, this.state.keys, props.ctx.uidGenerator)
  //     });
  // }

  isValueNully() {
      let length = this.oldImages.concat(this.addImages).length;
      return length === 0;
  }

  removeErrors() {
    this.setState({ hasError: false });
    Object.keys(this.refs).forEach(ref => this.refs[ref].removeErrors());
  }

  getValue() {
    let value = {};
    value.remove = this.oldRemoveId;
    value.add = this.addImages;
    return value;
  }

  validate() {
    let errors = [];
    let hasError = false;
    //可为空，并且值为空
    if (this.typeInfo.isMaybe && this.isValueNully()) {
        this.removeErrors();
        return new t.ValidationResult({errors:errors,value:null});
    }
    //不可为空，并且值为空
    if (!this.typeInfo.isMaybe && this.isValueNully()) {
        hasError = true;
        errors = [{ message:"not null to " + this.getValidationOptions().path,path:this.getValidationOptions().path}];
    }
    this.setState({ hasError: hasError});
    return new t.ValidationResult({errors:errors,value:this.addImages.concat([this.oldRemoveId.join(",")])});
  }

  onChange(value, keys, path, kind, index) {
      if(kind==="remove"){
          this.addImages.splice(index - this.oldImages.length,1);
      }else {
          this.addImages.push(value);
      }
      this.setState({ value:this.old.concat(this.addImages), keys: this.props.ctx.uidGenerator.next(), isPristine: false, kind:kind, index:index });
  }

  getTemplates() {
    return merge(this.props.ctx.templates, this.props.options.templates);
  }

  getTemplate() {
    return this.props.options.template || this.getTemplates().list;
  }

  setImages(locals){
      //编辑页面，初始化时带入的数据
      if(locals.value && !this.old.length && !this.addImages.length){
          for(let i in locals.value) {
              if (locals.value[i].base64) {
                  this.old.push(locals.value[i]);
                  this.oldImages.push(locals.value[i].base64);
              } else {
                  this.addImages.push(locals.value[i]);
              }
          }
          if(this.oldLen === 0)
              this.oldLen = this.old.length;
      }
      // else if(locals.value && this.old.length && !this.addImages.length){
      //     for(let i in locals.value) {
      //         if (locals.value[i].base64) {
      //             this.oldImages.push(locals.value[i].base64);
      //         } else {
      //             this.addImages.push(locals.value[i]);
      //         }
      //     }
      // }
  }

  getLocals() {
      let locals = super.getLocals();
      if(this.props.options.navigation){
          locals.navigation =  this.props.options.navigation;
      }
      if(this.props.options.limit){
          locals.limit =  this.props.options.limit;
      }
      locals.mode = this.props.options.mode;
      locals.fileType = this.props.options.fileType;
      this.setImages(locals);
      locals.items = this.oldImages.concat(this.addImages);
      if(locals.value && locals.value.length != locals.items.length)
        locals.value = this.old.concat(this.addImages);
      return locals;
  }
}

List.transformer = {
  format: value => (Nil.is(value) ? noarr : value),
  parse: value => value
};

class Form extends React.Component {
  pureValidate() {
    return this.refs.input.pureValidate();
  }

  validate() {
    return this.refs.input.validate();
  }

  getValue() {
    let result = this.validate();
    // return result.isValid() ? result.value : null;
    return result.value;
  }

  getComponent(path) {
    path = t.String.is(path) ? path.split(".") : path;
    return path.reduce((input, name) => input.refs[name], this.refs.input);
  }

  getSeed() {
    let rii = this._reactInternalInstance;
    if (rii) {
      if (rii._hostContainerInfo) {
        return rii._hostContainerInfo._idCounter;
      }
      if (rii._nativeContainerInfo) {
        return rii._nativeContainerInfo._idCounter;
      }
      if (rii._rootNodeID) {
        return rii._rootNodeID;
      }
    }
    return "0";
  }

  getUIDGenerator() {
    this.uidGenerator = this.uidGenerator || new UIDGenerator(this.getSeed());
    return this.uidGenerator;
  }

  render() {
    let stylesheet = this.props.stylesheet || Form.stylesheet;
    let templates = this.props.templates || Form.templates;
    let i18n = this.props.i18n || Form.i18n;

    if (process.env.NODE_ENV !== "production") {
      t.assert(
        t.isType(this.props.type),
        `[${SOURCE}] missing required prop type`
      );
      t.assert(
        t.maybe(t.Object).is(this.props.options) ||
          t.Function.is(this.props.options) ||
          t.list(t.maybe(t.Object)).is(this.props.options),
        `[${SOURCE}] prop options, if specified, must be an object, a function returning the options or a list of options for unions`
      );
      t.assert(
        t.Object.is(stylesheet),
        `[${SOURCE}] missing stylesheet config`
      );
      t.assert(t.Object.is(templates), `[${SOURCE}] missing templates config`);
      t.assert(t.Object.is(i18n), `[${SOURCE}] missing i18n config`);
    }

    let value = this.props.value;
    let type = getTypeFromUnion(this.props.type, value);
    let options = getComponentOptions(
      this.props.options,
      noobj,
      value,
      this.props.type
    );

    // this is in the render method because I need this._reactInternalInstance._rootNodeID in React ^0.14.0
    // and this._reactInternalInstance._nativeContainerInfo._idCounter in React ^15.0.0
    let uidGenerator = this.getUIDGenerator();

    let fun = getFormComponent(type, options);
    let dom =  React.createElement(fun, {
          ref: "input",
          type: type,
          options: options,
          value: this.props.value,
          onChange: this.props.onChange || noop,
          ctx: {
              context: this.props.context,
              uidGenerator,
              auto: "labels",
              stylesheet,
              templates,
              i18n,
              path: []
          }
      });
    return  dom;
  }

}

module.exports = {
  getComponent: getFormComponent,
  Component,
  Textbox,
  Checkbox,
  Select,
  DatePicker,
  Struct,
  List: List,
  Form
};
