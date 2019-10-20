/* eslint-disable */
let createNotification = () => ({
    // 此处用于避免服务器端渲染，导致dom节点undefined问题
    addNotice: (notice: any) => {return notice},
});

if (typeof window !== 'undefined') {
    createNotification = require('./notice').default;
}

let $dom = createNotification();

export default {
    info(content: any, duration = 3500, onClose?: any) {
        return $dom.addNotice({
            type: 'info',
            content,
            duration,
            onClose,
        });
    },
    success(content: any, duration = 4000, onClose?: any) {
        return $dom.addNotice({
            type: 'success',
            content,
            duration,
            onClose,
        });
    },
    warning(content: any, duration = 3500, onClose?: any) {
        return $dom.addNotice({
            type: 'warning',
            content,
            duration,
            onClose,
        });
    },
    error(content: any, duration = 3500, onClose?: any) {
        return $dom.addNotice({
            type: 'error',
            content,
            duration,
            onClose,
        });
    },
    loading(content: any, duration = 3500, onClose?: any) {
        return $dom.addNotice({
            type: 'loading',
            content,
            duration,
            onClose,
        });
    },
};
