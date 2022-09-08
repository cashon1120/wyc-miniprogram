// components/myButton/index.ts
Component({
  behaviors: ['wx://form-field-button'],
  properties: {
    title: String,
    type: String,
    icon: String,
    customStyle: String,
    formType: String,
    loading: Boolean,
    disabled: Boolean,
    tabbarPath: String,
    path: String
  },

  methods: {
    dispatchTapEvent() {
      if(this.data.disabled || this.data.loading) return
      this.triggerEvent("click");
    },
  },
});
