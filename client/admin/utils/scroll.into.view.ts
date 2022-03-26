import _scrollIntoView from 'scroll-into-view-if-needed';

export default function scrollIntoView(elementId: string) {
    const $el = document.getElementById(elementId);
    if ($el) {
        _scrollIntoView($el, { behavior: 'smooth', scrollMode: 'if-needed', block: 'start', inline: 'nearest' });
    }
}
