// components/asu/pentagon/pentagon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    r: {
      type: Number,
      value: 100
    },
    n: {
      type: Number,
      value: 3
    },
    v: {
      type: Array,
      value: [1, 0.5, 0.8, 0.2, 0.6].map((v, i) => ({
        val: v,
        name: i
      }))
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    line: '50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%'
  },

  lifetimes: {
    ready: function() {
      const {
        r,
        n,
        v
      } = this.properties
      const _r = r * 0.7
      const [cos, sin] = [Math.cos, Math.sin].map(v => deg => v(deg / 180 * Math.PI))
      const ps = [
        [cos(18), sin(18)],
        [0, 1],
        [-cos(18), sin(18)],
        [-cos(54), -sin(54)],
        [cos(54), -sin(54)]
      ]
      const lines = []
      for (let i = 1; i <= n; ++i) {
        lines.unshift(ps.map((val, j) => [i / n * val[0] * _r + r, -i / n * val[1] * _r + r]))
      }
      this.setData({
        line: ps.reduce((acc, p, i) => (acc ? (acc + ',') : '') + `${p[0]*v[i].val*50+50}% ${-p[1]*v[i].val*50+50}%`, null)
      })

      const ctx = wx.createCanvasContext('cvs', this)
      ctx.setStrokeStyle('white')
      ctx.setFillStyle('white')
      ctx.setFontSize(12)
      lines.forEach(line => line.forEach((p, i) => {
        if (!i) {
          ctx.beginPath()
          ctx.moveTo(...p)
        } else
          ctx.lineTo(...p)
        if (i === 4) {
          ctx.lineTo(...line[0])
          ctx.stroke()
        }
      }))
      lines.forEach(line => line.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(...p, 4, 0, Math.PI * 2)
        ctx.fill()
      }))
      ctx.beginPath()
      ctx.arc(r, r, 4, 0, Math.PI * 2)
      ctx.fill()
      lines[0].forEach((p, i) => {
        ctx.beginPath()
        ctx.moveTo(...p)
        ctx.lineTo(r, r)
        ctx.stroke()

        let align, baseline, [x, y] = p
        switch (i) {
          case 0:
            x += 10
            break
          case 1:
            y -= 10
            align = 'center'
            break
          case 2:
            x -= 10
            align = 'end'
            break
          case 3:
          case 4:
            y += 10
            align = 'center'
            baseline = 'hanging'
            break
        }
        align && ctx.setTextAlign(align)
        baseline && ctx.setTextBaseline(baseline)
        ctx.fillText(v[i].name, x, y)
      })
      ctx.draw()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})