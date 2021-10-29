import scrollIntoView from 'scroll-into-view-if-needed';

const scroll = (elementId: string) => {
    const $el = document.getElementById(elementId);
    if ($el) {
        scrollIntoView($el, { behavior: 'smooth', scrollMode: 'if-needed', block: 'start', inline: 'nearest' });
    }
};

export default scroll;
