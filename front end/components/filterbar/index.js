import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import {
  $wuxBackdrop
} from '../index'

baseComponent({
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-filterbar',
    },
    items: {
      type: Array,
      value: [],
    },
  },
  computed: {
    classes: ['prefixCls', function(prefixCls) {
      const wrap = classNames(prefixCls)
      const bd = `${prefixCls}__bd`
      const item = `${prefixCls}__item`
      const text = `${prefixCls}__text`
      const icon = `${prefixCls}__icon`
      const pop = `${prefixCls}__pop`
      const scrollView = `${prefixCls}__scroll-view`
      const panel = `${prefixCls}__panel`
      const panelHd = `${prefixCls}__panel-hd`
      const panelTitle = `${prefixCls}__panel-title`
      const panelSelected = `${prefixCls}__panel-selected`
      const panelBd = `${prefixCls}__panel-bd`
      const groups = `${prefixCls}__groups`
      const group = `${prefixCls}__group`
      const radio = `${prefixCls}__radio`
      const btn = `${prefixCls}__btn`
      const check = `${prefixCls}__check`
      const btns = `${prefixCls}__btns`
      const select = `${prefixCls}__select`

      return {
        wrap,
        bd,
        item,
        text,
        icon,
        pop,
        scrollView,
        panel,
        panelHd,
        panelTitle,
        panelSelected,
        panelBd,
        groups,
        group,
        radio,
        btn,
        check,
        btns,
        select,
      }
    }],
  },
  methods: {
    /**
     * 重置按钮
     * @param {Object} e 事件对象
     * @param {Object} prevState 上一个状态值
     */
    onReset(e, prevState) {
      const {
        index,
        item
      } = e.currentTarget.dataset
      const children = prevState && prevState.children || item.children.map((n) => {
        return Object.assign({}, n, {
          children: n.children.map((m) => Object.assign({}, m, {
            checked: false,
          })),
          selected: '',
        })
      })
      this.triggerEvent('handleReset', {}, {})
      this.setData({
        [`options[${index}].children`]: children,
      })
    },
    /**
     * 关闭侧边栏筛选框
     * @param {Object} e 事件对象
     * @param {Function} callback 回调函数
     */
    onClose(e, callback) {
      const {
        index
      } = e.currentTarget.dataset
      const params = {
        [`options[${index}].visible`]: false,
      }

      this.setData(params, () => {
        if (typeof callback === 'function') {
          callback.call(this, e)
        } else {
          this.onReset(e, this.prevState)
        }

        this.$wuxBackdrop.release()
      })
    },
    /**
     * 确认按钮
     * @param {Object} e 事件对象
     */
    onConfirm(e) {
      this.onClose(e, this.onChange)
      this.triggerEvent('handleConfirm', {}, {})
    },
    /**
     * 筛选栏内单项选择触发 change 事件
     * @param {Object} e 事件对象
     */
    onRadioChange(e) {
      const {
        value
      } = e.detail
      const {
        index,
        item,
        parentIndex
      } = e.currentTarget.dataset
      const children = item.children.map((n) => Object.assign({}, n, {
        checked: n.value === value,
      }))
      const selected = children.filter((n) => n.checked).map((n) => n.label).join(',')
      this.triggerEvent('handleRadio', {
        value
      }, {})
      this.setData({
        [`options[${parentIndex}].children[${index}].children`]: children,
        [`options[${parentIndex}].children[${index}].selected`]: selected,
      })
    },
    /**
     * 筛选栏内多项选择触发 change 事件
     * @param {Object} e 事件对象
     */
    onCheckboxChange(e) {
      const {
        value
      } = e.detail
      const {
        index,
        item,
        parentIndex
      } = e.currentTarget.dataset
      const children = item.children.map((n) => Object.assign({}, n, {
        checked: value.includes(n.value),
      }))
      const selected = children.filter((n) => n.checked).map((n) => n.label).join(',')
      this.triggerEvent('handleCheck', {
        value
      }, {})

      this.setData({
        [`options[${parentIndex}].children[${index}].children`]: children,
        [`options[${parentIndex}].children[${index}].selected`]: selected,
      })
    },
    /**
     * 下拉框内单项选择触发 change 事件
     * @param {Object} e 事件对象
     */
    radioChange(e) {
      const {
        value
      } = e.detail
      const {
        index,
        item
      } = e.currentTarget.dataset
      const children = item.children.map((n) => Object.assign({}, n, {
        checked: n.value === value,
      }))
      const params = {
        [`options[${index}].children`]: children,
      }

      this.setData(params, this.onChange)
    },
    /**
     * 下拉框内多项选择触发 change 事件
     * @param {Object} e 事件对象
     */
    checkboxChange(e) {
      const {
        value
      } = e.detail
      const {
        index,
        item
      } = e.currentTarget.dataset
      const data = item.children.filter((n) => n.checked).map((n) => n.value)
      const children = item.children.map((n) => Object.assign({}, n, {
        checked: n.value === value ? !data.includes(n.value) : n.checked,
      }))
      const params = {
        [`options[${index}].children`]: children,
      }

      this.setData(params, this.onChange)
    },
    /**
     * 点击事件
     * @param {Object} e 事件对象
     */
    onClick(e) {
      const {
        index
      } = e.currentTarget.dataset
      this.onOpenSelect(this.data.options, index)
      this.triggerEvent('handleChange', {
        index
      }, {})
    },
    /**
     * 打开下拉框
     * @param {Array} data 菜单数据
     * @param {Number} index 当前索引
     */
    onOpenSelect(data = [], index = 0) {
      const current = data[index]
      const options = data.map((n, i) => {
        const params = Object.assign({}, n, {
          checked: index === i ? !n.checked : false,
        })

        // 判断已选择的元素是否同组
        if (n.checked) {
          const has = this.getDifference(n.groups, current.groups)

          params.checked = !!has.length

          // 判断非同组的元素清空选择内容
          if (index !== i && !has.length) {
            if (typeof params.children === 'object') {
              if (['radio', 'checkbox'].includes(n.type)) {
                params.children = params.children.map((n) => Object.assign({}, n, {
                  checked: false,
                }))
              }

              if (['filter'].includes(n.type)) {
                params.children = params.children.map((n) => {
                  return Object.assign({}, n, {
                    children: n.children.map((m) => Object.assign({}, m, {
                      checked: false,
                    })),
                    selected: '',
                  })
                })
              }
            }

            if (['sort'].includes(n.type)) {
              params.sort = undefined
            }
          }
        }

        // 展开或隐藏下拉框
        if (['radio', 'checkbox', 'filter'].includes(n.type)) {
          params.visible = index === i ? !n.visible : false

          if (n.type === 'filter') {
            this.$wuxBackdrop[index === i ? !n.visible ? 'retain' : 'release' : 'release']()
          }
        }

        // 当前点击排序做出处理
        if (index === i && ['sort'].includes(n.type)) {
          params.sort = typeof params.sort === 'number' ? -params.sort : 1
        }

        return params
      })

      this.setData({
        options,
        index
      }, () => {
        this.prevState = current
        if (!['radio', 'checkbox', 'filter'].includes(current.type)) {
          this.onChange()
        }
      })
    },
    /**
     * 关闭下拉框
     */
    onCloseSelect() {
      const options = this.data.options
      const params = {}

      options.forEach((n, i) => {
        if (n.checked && n.visible) {
          params[`options[${i}].visible`] = false
        }
      })

      this.setData(params)
    },
    /**
     * 获取两个数组相同的元素
     * @param {Array} data 数组
     * @param {Array} values 数组
     */
    getDifference(data = [], values = []) {
      return data.filter(v => values.includes(v))
    },
    /**
     * 元素发生变化时的事件
     */
    onChange() {
      setTimeout(() => {
        const {
          options: items
        } = this.data
        const checkedItems = items.filter((n) => n.checked)

        this.onCloseSelect()
        this.triggerEvent('change', {
          checkedItems,
          items
        })
      }, 300)
    },
    /**
     * scroll-view 滚动时触发的事件
     * @param {Object} e 事件对象
     */
    onScroll(e) {
      this.triggerEvent('scroll', e)
    },
    /**
     * 打开 select 或 filter 时触发的回调函数
     * @param {Object} e 事件对象
     */
    onEnter(e) {
      this.triggerEvent('open', e)
    },
    /**
     * 关闭 select 或 filter 时触发的回调函数
     * @param {Object} e 事件对象
     */
    onExit(e) {
      this.triggerEvent('close', e)
    },
  },
  created() {
    this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
  },
  attached() {
    this.setData({
      options: this.data.items,
    })
  },
})