import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'
import { $wuxBackdrop } from '../index'

baseComponent({
    useSafeArea: true,
    externalClasses: ['wux-content-class', 'wux-header-class', 'wux-body-class', 'wux-footer-class', 'wux-close-class'],
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-popup',
        },
        animationPrefixCls: {
            type: String,
            value: 'wux-animate',
        },
        title: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
        position: {
            type: String,
            value: 'center',
            observer: 'getTransitionName',
        },
        wrapStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
        closable: {
            type: Boolean,
            value: false,
        },
        mask: {
            type: Boolean,
            value: true,
        },
        maskClosable: {
            type: Boolean,
            value: true,
        },
        visible: {
            type: Boolean,
            value: false,
            observer: 'setPopupVisible',
        },
        zIndex: {
            type: Number,
            value: 1000,
        },
        hasHeader: {
            type: Boolean,
            value: true,
        },
        hasFooter: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        transitionName: '',
        popupVisible: false,
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, position, safeAreaConfig, isIPhoneX', function(prefixCls, position, safeAreaConfig, isIPhoneX) {
            const wrap = classNames(`${prefixCls}-position`, {
                [`${prefixCls}-position--${position}`]: position,
                [`${prefixCls}-position--is-iphonex`]: safeAreaConfig.bottom && isIPhoneX,
            })
            const content = `${prefixCls}__content`
            const hd = `${prefixCls}__hd`
            const title = `${prefixCls}__title`
            const bd = `${prefixCls}__bd`
            const ft = `${prefixCls}__ft`
            const extra = `${prefixCls}__extra`
            const close = `${prefixCls}__close`
            const x = `${prefixCls}__close-x`

            return {
                wrap,
                content,
                hd,
                title,
                bd,
                ft,
                extra,
                close,
                x,
            }
        }],
    },
    methods: {
        /**
         * ????????????????????????
         */
        close() {
            this.triggerEvent('close')
        },
        /**
         * ??????????????????
         */
        onMaskClick() {
            if (this.data.maskClosable) {
                this.close()
            }
        },
        /**
         * ??????????????????????????????
         */
        onExited() {
            this.triggerEvent('closed')
        },
        /**
         * ?????????????????????
         */
        getTransitionName(value = this.data.position) {
            const { animationPrefixCls } = this.data
            let transitionName = ''

            switch (value) {
                case 'top':
                    transitionName = `${animationPrefixCls}--slideInDown`
                    break
                case 'right':
                    transitionName = `${animationPrefixCls}--slideInRight`
                    break
                case 'bottom':
                    transitionName = `${animationPrefixCls}--slideInUp`
                    break
                case 'left':
                    transitionName = `${animationPrefixCls}--slideInLeft`
                    break
                default:
                    transitionName = `${animationPrefixCls}--fadeIn`
                    break
            }

            this.setData({ transitionName })
        },
        /**
         * ?????? popup ?????????????????????
         */
        setPopupVisible(popupVisible) {
            if (this.data.popupVisible !== popupVisible) {
                this.setData({ popupVisible })
                this.setBackdropVisible(popupVisible)
            }
        },
        /**
         * ?????? backdrop ?????????????????????
         */
        setBackdropVisible(visible) {
            if (this.data.mask && this.$wuxBackdrop) {
                this.$wuxBackdrop[visible ? 'retain' : 'release']()
            }
        },
    },
    created() {
        if (this.data.mask) {
            this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
        }
    },
    attached() {
        this.setPopupVisible(this.data.visible)
        this.getTransitionName()
    },
})
