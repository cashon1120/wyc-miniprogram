Component({
  properties: {
    item: Object,
    disableShowRequire: Boolean
  },
  lifetimes: {
    ready(){
      console.log(this.data.item, this.data.disableShowRequire)
    }
  }
})
