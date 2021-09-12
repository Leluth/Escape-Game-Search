Component({
  properties: {
    interval: {
      type: Number,
      value: 414,
    },
    focus: {
      type: Number,
      value: 0
    }
  },
  data: {
    focus: 0
  },
  lifetimes: {
    ready: function() {
      this.setData({
        focus: this.properties.focus
        // TODO: focus init
      })
    }
  },
  methods: {
    scroll: function(e) {
      const left = e.detail.scrollLeft
      const n = parseInt((left + 207) / this.properties.interval)
      if (n === this.data.focus) return
      else {
        this.triggerEvent('slide-change', [this.data.focus, n])
        this.setData({
          focus: n
        })
      }
    }
  },
})